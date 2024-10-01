"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

export function Auth() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('./movie_bg.jpg')",
          filter: "brightness(0.6) contrast(1.2)",
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md px-4"
      >
        <Card className="bg-black bg-opacity-30 text-white border border-gray-600 shadow-2xl backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-yellow-400">
              MovieMind
            </CardTitle>
            <CardDescription className="text-gray-200">
              Your cinematic journey begins here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-black bg-opacity-50">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black transition-all duration-300"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <div className="relative h-[280px]">
                <TabsContent
                  value="login"
                  className="absolute inset-0 transition-all duration-300"
                >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-gray-200">
                        Email
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="bg-black bg-opacity-50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-gray-200">
                        Password
                      </Label>
                      <Input
                        id="login-password"
                        type="password"
                        required
                        className="bg-black bg-opacity-50 border-gray-600 text-white"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold transition-colors duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent
                  value="signup"
                  className="absolute inset-0 transition-all duration-300"
                >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-gray-200">
                        Name
                      </Label>
                      <Input
                        id="signup-name"
                        placeholder="John Doe"
                        required
                        className="bg-black bg-opacity-50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-gray-200">
                        Email
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="bg-black bg-opacity-50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="signup-password"
                        className="text-gray-200"
                      >
                        Password
                      </Label>
                      <Input
                        id="signup-password"
                        type="password"
                        required
                        className="bg-black bg-opacity-50 border-gray-600 text-white"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold transition-colors duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing up..." : "Sign Up"}
                    </Button>
                  </form>
                </TabsContent>
              </div>
            </Tabs>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-600"></span>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black bg-opacity-30 text-gray-300">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
                  onClick={() =>signIn("google")}
                >
                  <FaGoogle className="mr-2" />
                  Sign in with Google
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-center text-gray-300">
            <p className="text-xs">
              By signing up, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
