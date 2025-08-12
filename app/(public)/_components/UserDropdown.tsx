import {
  BookOpen,
  CircleUserRoundIcon,
  Home,
  LayoutDashboard,
  LogOutIcon,
} from "lucide-react";

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
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface iAppProps {
  name: string;
  email: string;
  image: string ;
}

export function UserDropdown({ email, name, image }: iAppProps) {
  const router = useRouter();

  // Função segura para extrair as iniciais do nome
  const getInitials = (name?: string) => {
    if (!name || typeof name !== 'string') return '?';
    
    const names = name.trim().split(' ');
    if (names.length === 0) return '?';
    
    let initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    
    return initials;
  };

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signed out successfully");
        },
        onError: () => {
          toast.error("Failed to sign out");
        },
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" aria-label="Open account menu">
          <CircleUserRoundIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-64">
        <DropdownMenuLabel className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src={image} alt="Profile Image"/>
            <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm font-medium">
              {name || 'Usuário'}
            </span>
            {email && (
              <span className="text-muted-foreground truncate text-xs font-normal">
                {email}
              </span>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home size={16} className="opacity-60" aria-hidden="true" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/course" className="flex items-center gap-2">
              <BookOpen size={16} className="opacity-60" aria-hidden="true" />
              <span>Courses</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              <LayoutDashboard
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="flex items-center gap-2">
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}