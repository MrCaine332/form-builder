import { Avatar, AvatarImage } from "@/shared/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { useUnit } from "effector-react"
import { LogOutIcon, SettingsIcon } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { $authStore, signOut } from "@/entities/user/model"

export const UserDropdown = () => {
  const { user } = useUnit($authStore)

  const onSignOut = () => {
    signOut()
  }

  /** TODO: Update avatar image */
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-8 h-8">
        <Avatar className="w-full h-full">
          <AvatarImage
            src={"https://api.dicebear.com/8.x/initials/svg?seed=Max"}
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background absolute top-2 -right-2 border-transparent shadow-xl shadow-foreground/20 w-72 flex flex-col gap-2 p-2 rounded-xl">
        <DropdownMenuLabel className="flex gap-4 items-center">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={"https://api.dicebear.com/8.x/initials/svg?seed=Max"}
            />
          </Avatar>
          <span className="text-lg">{user?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center cursor-pointer">
          <div className="w-10 h-7 grid place-items-center">
            <SettingsIcon className="text-foreground/30 w-5 h-5 ml-[10px]" />
          </div>
          <span className="text-[11pt] font-medium text-foreground/40 ml-4">
            Settings
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center cursor-pointer" asChild>
          <Button variant="ghost" className="justify-start" onClick={onSignOut}>
            <div className="w-10 h-7 grid place-items-center">
              <LogOutIcon className="text-foreground/30 w-5 h-5 ml-[10px]" />
            </div>
            <span className="text-[12pt] font-medium text-foreground/40 ml-4">
              Sign Out
            </span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
