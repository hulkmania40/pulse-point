import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useGlobalLogout = () => {
	const { logout } = useAuthContext();
	const navigate = useNavigate();

	return () => {
		// toast.error("Session expired. You've been logged out.", {
    //     icon: <XCircle className="text-red-500" />,
    // });
		logout(); // this clears user state + localStorage
		navigate('/');
	};
};
