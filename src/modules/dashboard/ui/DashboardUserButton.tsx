import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.user) {
    return null;
  }

  const onLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => router.push("/sign-in"),
          onError: (error) => console.error("Logout failed:", error),
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-xl border border-[#45475a] p-3 w-full flex items-center justify-between bg-[#313244]/50 hover:bg-[#45475a] transition-all overflow-hidden">
          {data.user.image ? (
            <Avatar className="size-9 mr-3">
              <AvatarImage src={data.user.image} alt={`${data.user.name}'s avatar`} />
              <AvatarFallback>{data.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          ) : (
            <GeneratedAvatar seed={data.user.name || "User"} variant="initials" className="size-9 mr-3" />
          )}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm font-medium text-[#cdd6f4] truncate">{data.user.name}</p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0 text-[#6c7086]" />
        </DrawerTrigger>
        <DrawerContent className="bg-[#313244] border-[#45475a]">
          <DrawerHeader>
            <DrawerTitle className="text-[#cdd6f4]">{data.user.name}</DrawerTitle>
            <DrawerDescription className="text-[#6c7086]">{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="outline" className="border-[#45475a] bg-[#45475a]/50 text-[#cdd6f4] hover:bg-[#45475a]">
              <CreditCardIcon className="size-4 mr-2" /> Billing
            </Button>
            <Button variant="outline" className="border-[#45475a] bg-[#45475a]/50 text-[#cdd6f4] hover:bg-[#45475a]" onClick={onLogout}>
              <LogOutIcon className="size-4 mr-2" /> Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-xl border border-[#45475a] p-3 w-full flex items-center justify-between bg-[#313244]/50 hover:bg-[#45475a] transition-all overflow-hidden">
        {data.user.image ? (
          <Avatar className="size-9 mr-3">
            <AvatarImage src={data.user.image} alt={`${data.user.name}'s avatar`} />
            <AvatarFallback className="bg-[#89b4fa]/20 text-[#89b4fa]">{data.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        ) : (
          <GeneratedAvatar seed={data.user.name || "User"} variant="initials" className="size-9 mr-3" />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm font-medium text-[#cdd6f4] truncate">{data.user.name}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0 text-[#6c7086]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-[#313244] border-[#45475a]">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-[#cdd6f4]">{data.user.name}</span>
            <span className="text-sm text-[#6c7086]">{data.user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#45475a]" />
        <DropdownMenuItem className="text-[#a6adc8] focus:bg-[#45475a] focus:text-[#cdd6f4]">
          <SettingsIcon className="size-4 mr-2" /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="text-[#a6adc8] focus:bg-[#45475a] focus:text-[#cdd6f4]">
          <CreditCardIcon className="size-4 mr-2" /> Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#45475a]" />
        <DropdownMenuItem onClick={onLogout} className="text-[#f38ba8] focus:bg-[#f38ba8]/10 focus:text-[#f38ba8]">
          <LogOutIcon className="size-4 mr-2" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
