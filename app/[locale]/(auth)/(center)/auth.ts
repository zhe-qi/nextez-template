'use server';

import { signIn, signOut } from '@/server/auth';
import { db } from '@/server/db';
import { hash } from '@node-rs/argon2';
import { object, string } from 'zod';

// 注册表单验证 Schema
const signUpSchema = object({
  email: string({ required_error: '邮箱必填' })
    .min(1, '邮箱必填')
    .email('邮箱格式不正确'),
  password: string({ required_error: '密码必填' })
    .min(1, '密码必填')
    .min(8, '密码长度至少8位')
    .max(32, '密码长度不能超过32位'),
});

// 登录表单验证 Schema
const signInSchema = object({
  email: string({ required_error: '邮箱必填' })
    .min(1, '邮箱必填')
    .email('邮箱格式不正确'),
  password: string({ required_error: '密码必填' })
    .min(1, '密码必填')
    .min(8, '密码长度至少8位')
    .max(32, '密码长度不能超过32位'),
});

// 处理注册
export async function signup(_state: FormState, formData: FormData): Promise<FormState> {
  try {
    // 1. 验证表单数据
    const validatedFields = signUpSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return { message: '表单数据无效' };
    }

    const { email, password } = validatedFields.data;

    // 2. 检查邮箱是否已注册
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { message: '邮箱已被注册' };
    }

    // 3. 密码加密
    const hashedPassword = await hash(password);

    // 4. 创建用户
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // 5. 自动登录
    await signIn('credentials', formData);

    return undefined;
  } catch (error) {
    return { message: error instanceof Error ? error.message : '注册失败,请重试' };
  }
}

// 处理登录
export async function login(_state: FormState, formData: FormData): Promise<FormState> {
  try {
    // 1. 验证表单数据
    const validatedFields = signInSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return { message: '表单数据无效' };
    }

    // 2. 调用 next-auth 登录
    await signIn('credentials', formData);

    return undefined;
  } catch (error) {
    return { message: error instanceof Error ? error.message : '登录失败,请重试' };
  }
}

// 处理登出
export async function logout() {
  await signOut();
}

export type FormState =
  | {
    errors?: {
      name?: string[];
      email?: string[];
      password?: string[];
    };
    message?: string;
  }
  | undefined;
