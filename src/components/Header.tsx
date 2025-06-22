import { CircleQuestionMark } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="sticky top-0 z-50 w-full flex justify-between items-center p-3 
                    bg-white/30 backdrop-blur-md border-b border-white/20 shadow-md">
            <Tooltip>
                <TooltipTrigger asChild>
                    <SidebarTrigger className="pointer" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Toggle Sidebar</p>
                </TooltipContent>
            </Tooltip>
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
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">
                        <CircleQuestionMark size="icon" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Help</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
};

export default Header;
