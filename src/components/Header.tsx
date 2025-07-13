import { Bell, BellDot, CircleUserRound, Plus } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useEffect, useState } from "react";

const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [isNewNotificationAvailable, setIsNewNotificationAvailable] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => {
            setIsNewNotificationAvailable(true)
        }, 2000)
    }, [])

    const hideNavbarRoutes = ["/"];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

    return (
        <div className="sticky top-0 z-50 w-full flex justify-between items-center p-3 
                    bg-white/30 backdrop-blur-md border-b border-white/20 shadow-md">
            {shouldShowNavbar &&
                <Tooltip>
                    <TooltipTrigger asChild>
                        <SidebarTrigger className="pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Toggle Sidebar</p>
                    </TooltipContent>
                </Tooltip>
            }
            {!shouldShowNavbar &&
                <Tooltip>
                    <TooltipTrigger asChild>
                        <h1
                            className="text-xl cursor-pointer font-semibold"
                            onClick={() => navigate("/add")}
                        >
                            <Button className="mr-2" variant="outline">
                                <Plus />
                            </Button>
                        </h1>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add an Event</p>
                    </TooltipContent>
                </Tooltip>
            }
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
            <div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className="mr-2" variant="outline">
                            {
                                isNewNotificationAvailable ? <BellDot /> : <Bell />
                            }
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Notification
                    </TooltipContent>
                </Tooltip>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline">
                                    <CircleUserRound />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Account
                            </TooltipContent>
                        </Tooltip>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Follow Up</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>About</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default Header;
