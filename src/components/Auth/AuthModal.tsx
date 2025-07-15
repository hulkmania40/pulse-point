import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { login, signup, type SignupRequest } from "@/services/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner";
import { CircleCheck, LoaderCircle, LogIn, XCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cleanObject } from "@/common/helper";

const AuthModal = () => {
    const [open, setOpen] = useState(false);
    const [loginData, setLoginData] = useState({
        identifier: "",
        password: "",
    });
    const [signupData, setSignupData] = useState<SignupRequest>({
        username: "",
        password: "",
        email: "",
        mobile: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) {
            setLoginData({ identifier: "", password: "" });
            setSignupData({
                username: "",
                password: "",
                email: "",
                mobile: "",
            });
        }
    }, [open]);

    const {
        login: loginContext,
    } = useAuth();

    const isEmailValid = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isMobileValid = (mobile: string) => /^[6-9]\d{9}$/.test(mobile);

    const handleLogin = async () => {
        if (!loginData.identifier.trim() || !loginData.password.trim()) {
            toast.error("Username/Email and Password are required", {
                icon: <XCircle className="text-red-500" />,
            });
            return;
        }

        try {
            setLoading(true);
            const res = await login(loginData);
            loginContext(res.access_token, res.user);
            setOpen(false);
            toast.success("Login Successful",{
                icon: <CircleCheck className="text-green-500" />,
            });
        } catch (err: any) {
            toast.error(err?.response?.data?.detail || "Login failed", {
                icon: <XCircle className="text-red-500" />,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async () => {
        const { username, password, email, mobile } = signupData;

        if (!username.trim() || !password.trim()) {
            toast.error("Username and Password are required", {
                icon: <XCircle className="text-red-500" />,
            });
            return;
        }

        if (email && !isEmailValid(email)) {
            toast.error("Invalid email format", {
                icon: <XCircle className="text-red-500" />,
            });
            return;
        }

        if (mobile && !isMobileValid(mobile)) {
            toast.error("Invalid mobile number", {
                icon: <XCircle className="text-red-500" />,
            });
            return;
        }

        try {
            setLoading(true);
            const updatedSignupData = cleanObject(signupData) as SignupRequest;
            const res = await signup(updatedSignupData);
            toast.success(res.message,{
                icon: <CircleCheck className="text-green-500" />,
            });
            toast.success("You may Login with your credentials now",{
                icon: <CircleCheck className="text-green-500" />,
            });
            setOpen(false);
        } catch (err: any) {
            toast.error(err?.response?.data?.detail || "Signup failed", {
                icon: <XCircle className="text-red-500" />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="rounded-full ml-2">
                            <LogIn className="w-4 h-4" />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Login</TooltipContent>
            </Tooltip>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Welcome</DialogTitle>
                    <DialogDescription>
                        Login or Signup to access additional features!!
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Signup</TabsTrigger>
                    </TabsList>

                    {/* ✅ Login Tab */}
                    <TabsContent value="login" className="space-y-4">
                        <form
                            className="space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleLogin();
                            }}
                        >
                            <Input
                                placeholder="Username / Email"
                                value={loginData.identifier}
                                onChange={(e) =>
                                    setLoginData({
                                        ...loginData,
                                        identifier: e.target.value,
                                    })
                                }
                            />
                            <Input
                                placeholder="Password"
                                type="password"
                                value={loginData.password}
                                onChange={(e) =>
                                    setLoginData({
                                        ...loginData,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? (
                                    <span className="flex items-center">
                                        Logging in...{" "}
                                        <LoaderCircle className="animate-spin ml-2" />
                                    </span>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </form>
                    </TabsContent>

                    {/* ✅ Signup Tab */}
                    <TabsContent value="signup" className="space-y-3">
                        <form
                            className="space-y-3"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSignup();
                            }}
                        >
                            <Input
                                placeholder="Username"
                                value={signupData.username}
                                onChange={(e) =>
                                    setSignupData({
                                        ...signupData,
                                        username: e.target.value,
                                    })
                                }
                            />
                            <Input
                                placeholder="Password"
                                type="password"
                                value={signupData.password}
                                onChange={(e) =>
                                    setSignupData({
                                        ...signupData,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <Input
                                placeholder="Email (optional)"
                                type="email"
                                value={signupData.email}
                                onChange={(e) =>
                                    setSignupData({
                                        ...signupData,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <Input
                                placeholder="Mobile (optional)"
                                value={signupData.mobile}
                                onChange={(e) =>
                                    setSignupData({
                                        ...signupData,
                                        mobile: e.target.value,
                                    })
                                }
                            />
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? (
                                    <span className="flex items-center">
                                        Signing up...{" "}
                                        <LoaderCircle className="animate-spin ml-2" />
                                    </span>
                                ) : (
                                    "Signup"
                                )}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
