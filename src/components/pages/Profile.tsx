import {
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  CircleCheck,
  CircleX,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { _get } from "@/utils/crudService";
import type { User } from "@/common/schema";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const Profile = () => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchUserDetails(user.id);
    }
  }, [user?.id]);

  const fetchUserDetails = async (user_id: string) => {
    const res: any = await _get(`/user_details/${user_id}`);
    if (res) {
      setUserDetails(res);
    }
  };

  if (!userDetails) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center text-muted-foreground">
        Loading profile...
      </div>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-10 rounded-2xl shadow-md p-6 relative">
      {/* Pro Badge */}
      <div className="absolute top-4 left-4">
        <span className="bg-black text-white text-xs font-semibold px-2 py-1 rounded capitalize">
          {userDetails.role}
        </span>
      </div>

      {/* Avatar */}
      <div className="flex justify-center">
        <Avatar className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-4xl">
          <AvatarImage src="https://bundui-images.netlify.app/avatars/01.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      {/* Name and Role */}
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold">
          {userDetails.username}
        </h2>
        <p className="text-sm text-muted-foreground capitalize">
          {userDetails.role}
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 text-center bg-muted/20 rounded-lg overflow-hidden">
        <div className="p-4">
          <p className="text-lg font-bold">184</p>
          <p className="text-sm text-muted-foreground">Post</p>
        </div>
        <div className="p-4 border-l border-r">
          <p className="text-lg font-bold">32</p>
          <p className="text-sm text-muted-foreground">Projects</p>
        </div>
        <div className="p-4">
          <p className="text-lg font-bold">4.5K</p>
          <p className="text-sm text-muted-foreground">Members</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-6 space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span className="flex items-center">
            {userDetails.email || "N/A"}
            {userDetails.email_verified ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleCheck className="w-4 h-4 ml-2" color="green" />
                </TooltipTrigger>
                <TooltipContent>Verified</TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleX className="w-4 h-4 ml-2" color="red" />
                </TooltipTrigger>
                <TooltipContent>Not Verified</TooltipContent>
              </Tooltip>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span className="flex items-center">
            {userDetails.mobile || "N/A"}{" "}
            {userDetails.mobile_verified ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleCheck className="w-4 h-4 ml-2" color="green" />
                </TooltipTrigger>
                <TooltipContent>Verified</TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleX className="w-4 h-4 ml-2" color="red" />
                </TooltipTrigger>
                <TooltipContent>Not Verified</TooltipContent>
              </Tooltip>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>New York</span>
        </div>
        <div className="flex items-center gap-2">
          <LinkIcon className="w-4 h-4" />
          <a
            href="https://shadcnui.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            https://shadcnui.com
          </a>
        </div>
      </div>
    </Card>
  );
};

export default Profile;
