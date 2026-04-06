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

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-xl border border-slate-700/50 p-3 w-full flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 transition-all overflow-hidden">
          {data.user.image ? (
            <Avatar className="size-9 mr-3">
              <AvatarImage
                src={data.user.image}
                alt={`${data.user.name}'s avatar`}
              />
              <AvatarFallback>
                {data.user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={data.user.name || "User"}
              variant="initials"
              className="size-9 mr-3"
            />
          )}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{data.user.name}</p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0 text-slate-500" />
        </DrawerTrigger>
        <DrawerContent className="bg-slate-800 border-slate-700">
          <DrawerHeader>
            <DrawerTitle className="text-white">{data.user.name}</DrawerTitle>
            <DrawerDescription className="text-slate-400">{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="outline" className="border-slate-700 bg-slate-700/50 text-white hover:bg-slate-700">
              <CreditCardIcon className="size-4 mr-2" />
              Billing
            </Button>
            <Button variant="outline" className="border-slate-700 bg-slate-700/50 text-white hover:bg-slate-700" onClick={onLogout}>
              <LogOutIcon className="size-4 mr-2" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  const onLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
          },
          onError: (error) => {
            console.error("Logout failed:", error);
          },
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-xl border border-slate-700/50 p-3 w-full flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 transition-all overflow-hidden">
        {data.user.image ? (
          <Avatar className="size-9 mr-3">
            <AvatarImage
              src={data.user.image}
              alt={`${data.user.name}'s avatar`}
            />
            <AvatarFallback className="bg-indigo-500/20 text-indigo-300">
              {data.user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name || "User"}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{data.user.name}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0 text-slate-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-white">{data.user.name}</span>
            <span className="text-sm text-slate-500">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem className="text-slate-300 focus:bg-slate-700 focus:text-white">
          <SettingsIcon className="size-4 mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="text-slate-300 focus:bg-slate-700 focus:text-white">
          <CreditCardIcon className="size-4 mr-2" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem onClick={onLogout} className="text-red-400 focus:bg-red-500/10 focus:text-red-400">
          <LogOutIcon className="size-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
