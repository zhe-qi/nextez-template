import prismadb from "@/lib/prismadb";

import "server-only";

export const getToolById = async (id: number) => {
  try {
    const tool = await prismadb.tool.findUnique({ where: { id } });

    return tool;
  } catch {
    return null;
  }
};
