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
import { Fragment, useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { login, signup } from "@/services/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner";
import { LoaderCircle, LogIn } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const AuthModal = () => {
    const [open, setOpen] = useState(false);
    const [loginData, setLoginData] = useState({
        identifier: "",
        password: "",
    });
    const [signupData, setSignupData] = useState({
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
        isAuthenticated,
    } = useAuth();

    const isEmailValid = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isMobileValid = (mobile: string) => /^[6-9]\d{9}$/.test(mobile);

    const handleLogin = async () => {
        if (!loginData.identifier.trim() || !loginData.password.trim()) {
            toast.error("Username/Email and Password are required");
            return;
        }

        try {
            setLoading(true);
            const res = await login(loginData);
            loginContext(res.access_token, res.user);
            setOpen(false);
            toast.success("Login Successful");
        } catch (err: any) {
            toast.error(err?.response?.data?.detail || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async () => {
        const { username, password, email, mobile } = signupData;

        if (!username.trim() || !password.trim()) {
            toast.error("Username and Password are required");
            return;
        }

        if (email && !isEmailValid(email)) {
            toast.error("Invalid email format");
            return;
        }

        if (mobile && !isMobileValid(mobile)) {
            toast.error("Invalid mobile number");
            return;
        }

        try {
            setLoading(true);
            const res = await signup(signupData);
            toast.success(res.message);
        } catch (err: any) {
            toast.error(err?.detail || "Signup failed");
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
                        <Button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    Logging in...{" "}
                                    <LoaderCircle className="animate-spin ml-2" />
                                </span>
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </TabsContent>

                    {/* ✅ Signup Tab */}
                    <TabsContent value="signup" className="space-y-3">
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
                        <Button
                            onClick={handleSignup}
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    Signing up...{" "}
                                    <LoaderCircle className="animate-spin ml-2" />
                                </span>
                            ) : (
                                "Signup"
                            )}
                        </Button>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
