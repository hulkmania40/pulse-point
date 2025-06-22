import { CircleQuestionMark } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
    return (
        <div className="w-full justify-between bg-white shadow-md items-center p-3 flex">
            <SidebarTrigger className="pointer"/>
            <h1 className="text-xl font-semibold">Pulse Point</h1>
            <CircleQuestionMark size={18}/>
        </div>
    );
};

export default Header;
