import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSession } from "next-auth/react";

export default function UserAvatar() {
  const { data: session } = useSession();

  return (
    <Avatar className="size-8">
      <AvatarImage
        src={session?.user?.image as string}
        alt="User profile menu"
      />
      <AvatarFallback>
        {session?.user?.email?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
