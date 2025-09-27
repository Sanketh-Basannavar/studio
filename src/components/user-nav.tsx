'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserNav() {
  const pathname = usePathname();
  const isTeacher = pathname.startsWith('/teacher');
  const avatarImage = PlaceHolderImages.find(p => p.id === (isTeacher ? 'teacher-avatar-1' : 'student-avatar-1'));
  const profileLink = isTeacher ? '/teacher/settings' : '/student/profile';
  const settingsLink = isTeacher ? '/teacher/settings' : '/student/settings';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={avatarImage.description} data-ai-hint={avatarImage.imageHint} />}
            <AvatarFallback>{isTeacher ? 'T' : 'S'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{isTeacher ? "Teacher" : "Student"}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {isTeacher ? "teacher@neuroquad.ai" : "student@neuroquad.ai"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={profileLink}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={settingsLink}>Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">Log out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
