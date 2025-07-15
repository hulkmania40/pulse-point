import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { handleLogout } from "./authUtils";

export const useGlobalLogout = () => {
  const {
    setAccessToken,
    setUser,
  } = useAuthContext();

  const navigate = useNavigate();

  const logoutAndRedirect = useCallback(async () => {
    await handleLogout();
    setAccessToken(null);
    setUser(null);
    toast.error("Session expired. You've been logged out.");
    navigate("/");
  }, [setAccessToken, setUser, navigate]);

  return logoutAndRedirect;
};
