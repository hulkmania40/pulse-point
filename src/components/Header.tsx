import {
    BellIcon,
    Home,
    LoaderCircle,
    Plus,
} from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect, useState } from "react";
import AuthModal from "./Auth/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, isAdmin, logout, isLoadingState } = useAuth();

    const [isNewNotificationAvailable, setIsNewNotificationAvailable] =
        useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setIsNewNotificationAvailable(true);
        }, 2000);
    }, []);

    const hideNavbarRoutes = ["/"];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

    return (
        <div
            className="sticky top-0 z-50 w-full flex justify-between items-center p-3 
                    bg-white/30 backdrop-blur-md border-b border-white/20 shadow-md"
        >
            <div className="flex">
                {shouldShowNavbar && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <SidebarTrigger className="pointer mr-2" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Toggle Sidebar</p>
                        </TooltipContent>
                    </Tooltip>
                )}
                {isAuthenticated && isAdmin ? (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <h1
                                className="text-xl cursor-pointer font-semibold"
                                onClick={() => navigate("/add")}
                            >
                                <Button className="rounded-full mr-2" variant="outline">
                                    <Plus />
                                </Button>
                            </h1>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add an Event</p>
                        </TooltipContent>
                    </Tooltip>
                ) : (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <h1
                                className="text-xl cursor-pointer font-semibold"
                                onClick={() => navigate("/")}
                            >
                                <Button className="rounded-full mr-2" variant="outline">
                                    <Home />
                                </Button>
                            </h1>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Homepage</p>
                        </TooltipContent>
                    </Tooltip>
                )}
            </div>
            <Tooltip>
                <TooltipTrigger asChild>
                    <h1
                        className="text-xl cursor-pointer font-semibold"
                        onClick={() => navigate("/")}
                    >
                        Pulse Point
                    </h1>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Go to Homepage</p>
                </TooltipContent>
            </Tooltip>
            <div className="flex items-center">
                {isAuthenticated &&
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="icon" variant="outline" className="relative rounded-full mr-3">
                                {isNewNotificationAvailable ? (
                                    <>
                                        <BellIcon />
                                        <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1 text-[10px]">
                                            5
                                        </Badge>
                                    </>
                                ) : (
                                    <BellIcon />
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Notification</TooltipContent>
                    </Tooltip>
                }
                {
                    isAuthenticated ?
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        {isLoadingState ? (
                                            <LoaderCircle className="animate-spin ml-2" />
                                        ) : (
                                            <div className="relative cursor-pointer ml-2">
                                                <Avatar>
                                                    <AvatarImage src="https://bundui-images.netlify.app/avatars/01.png" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <div className="border-background absolute -end-0.5 -top-0.5 size-3 rounded-full border-2 bg-green-500">
                                                    <span className="sr-only">
                                                        Online
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </TooltipTrigger>
                                    <TooltipContent>Account</TooltipContent>
                                </Tooltip>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => {
                                        navigate("/me");
                                    }}
                                >
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                >
                                    Subscription
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer" 
                                    onClick={logout}
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> :
                        <AuthModal />
                }
            </div>
        </div>
    );
};

export default Header;
