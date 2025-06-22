import { CircleQuestionMark } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 w-full flex justify-between items-center p-3 
                    bg-white/30 backdrop-blur-md border-b border-white/20 shadow-md">
      <SidebarTrigger className="pointer" />
      <h1
        className="text-xl cursor-pointer font-semibold"
        onClick={() => navigate("/")}
      >
        Pulse Point
      </h1>
      <CircleQuestionMark size={18} />
    </div>
  );
};

export default Header;
