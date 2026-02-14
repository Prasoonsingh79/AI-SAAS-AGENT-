"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import {
  OctagonAlertIcon,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Github,
  Chrome,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z.string().min(1, { message: "Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: ({ error }) => {
            setError(error.message || "An error occurred during sign up");
            setIsLoading(false);
          },
        }
      );
    } catch (err) {
      setError("An error occurred during sign up. Please try again.");
      setIsLoading(false);
      console.log(err);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setIsLoading(true);
    setError(null);

    try {
      if (provider === "google") {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
        });
      } else if (provider === "github") {
        await authClient.signIn.social({
          provider: "github",
          callbackURL: "/",
        });
      }
    } catch (err) {
      setError(`Failed to sign in with ${provider}. Please try again.`);
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => {
          // Use index-based consistent positioning
          const left = (i * 17 + 23) % 100;
          const top = (i * 23 + 17) % 100;
          const delay = (i * 0.5) % 3;
          const duration = 2 + (i % 3);

          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl overflow-hidden">
          <CardContent className="grid p-0 lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="p-8 lg:p-12">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Header */}
                  <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Create Account
                    </h1>
                    <p className="text-gray-300">Join Apex-Agent today</p>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/90 font-medium">
                            Name
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                              <Input
                                type="text"
                                placeholder="Enter your name"
                                disabled={isLoading}
                                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 hover:bg-white/10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/90 font-medium">
                            Email
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                              <Input
                                type="email"
                                placeholder="m@example.com"
                                disabled={isLoading}
                                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 hover:bg-white/10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/90 font-medium">
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                disabled={isLoading}
                                className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 hover:bg-white/10"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                disabled={isLoading}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/90 font-medium">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                disabled={isLoading}
                                className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 hover:bg-white/10"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                disabled={isLoading}
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Error Alert */}
                  {error && (
                    <Alert className="bg-red-500/10 border-red-500/30 backdrop-blur-sm animate-in slide-in-from-top-2">
                      <OctagonAlertIcon className="h-4 w-4 text-red-400" />
                      <AlertTitle className="text-red-300">{error}</AlertTitle>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={isLoading}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {isLoading && (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      )}
                      {isLoading ? "Creating account..." : "Create Account"}
                    </div>
                  </Button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-slate-900/50 px-3 text-gray-300 backdrop-blur-sm">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => {
                        authClient.signIn.social({
                          provider: "google",
                        });
                      }}
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      disabled={isLoading}
                    >
                      <Chrome className="w-4 h-4 mr-2" />
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => {
                        authClient.signIn.social({
                          provider: "github",
                        });
                      }}
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      disabled={isLoading}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  </div>

                  {/* Sign In Link */}
                  <div className="text-center text-sm">
                    <span className="text-gray-300">
                      Already have an account?{" "}
                    </span>
                    <Link
                      href="/sign-in"
                      className="text-white font-semibold hover:text-purple-300 transition-colors underline underline-offset-4"
                    >
                      Sign in
                    </Link>
                  </div>
                </form>
              </Form>
            </div>

            {/* Right Side - Branding */}
            <div className="relative hidden lg:flex flex-col gap-y-6 items-center justify-center bg-gradient-to-br from-purple-600/30 to-blue-600/30 backdrop-blur-sm overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-white/20 rounded-full"></div>
                <div className="absolute top-3/4 left-1/2 w-16 h-16 border border-white/20 rounded-full"></div>
              </div>

              {/* Logo and Branding */}
              <div className="relative z-10 text-center space-y-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <Image
                    height={100}
                    width={100}
                    src="/logp.jpg"
                    alt="Apex-Agent Logo"
                    className="relative h-24 w-24 object-contain rounded-full border-2 border-white/30 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    Apex-Agent
                  </h2>
                  <p className="text-gray-300 text-sm max-w-xs mx-auto leading-relaxed">
                    Your intelligent agent for seamless automation and
                    productivity
                  </p>
                </div>
                {/* Feature Pills */}
                <div className="flex flex-wrap gap-2 justify-center max-w-xs mx-auto">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                    AI-Powered
                  </span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                    Secure
                  </span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                    24/7 Support
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms - Improved styling */}
        <div className="text-center text-xs text-gray-400 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="text-purple-300 hover:text-purple-200 transition-colors underline underline-offset-2"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-purple-300 hover:text-purple-200 transition-colors underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
};
