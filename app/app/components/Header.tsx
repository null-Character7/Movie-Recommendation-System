"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  LogOut,
  Film,
  Clock,
  BookmarkCheck,
  Sparkles,
  User,
  LogIn,
  Router,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export function Header() {
  const router = useRouter();

  const { data: session } = useSession();
  console.log("session is ",session)
  const handleClick = () => {
    if (session) {
      // Sign the user out if they are logged in
      signOut();
    } else {
      // Redirect to the /auth page if the user is not logged in
      router.push("/auth");
    }
  };

  return (
    <header className="bg-zinc-950 border-b border-zinc-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-purple-500 hover:text-purple-400 transition-colors"
        >
          MovieMind
        </Link>
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <Link
            href="/popular-movies"
            className="group p-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
          >
            <Film className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
            <span className="sr-only sm:not-sr-only sm:ml-2 text-sm font-medium text-gray-300 group-hover:text-purple-400 transition-colors">
              Popular
            </span>
          </Link>
          <Link
            href="/recent-releases"
            className="group p-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
          >
            <Clock className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
            <span className="sr-only sm:not-sr-only sm:ml-2 text-sm font-medium text-gray-300 group-hover:text-purple-400 transition-colors">
              Recent
            </span>
          </Link>
          <Link
            href="/watchlist"
            className="group p-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
          >
            <BookmarkCheck className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
            <span className="sr-only sm:not-sr-only sm:ml-2 text-sm font-medium text-gray-300 group-hover:text-purple-400 transition-colors">
              Watchlist
            </span>
          </Link>
          <Link
            href="/recommendations"
            className="group p-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
          >
            <Sparkles className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
            <span className="sr-only sm:not-sr-only sm:ml-2 text-sm font-medium text-gray-300 group-hover:text-purple-400 transition-colors">
              For You
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-800 transition-all duration-200"
            onClick={() => router.push("/profile")}
          >
            <Avatar className="h-8 w-8 transition-transform hover:scale-110">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
          <Button
      size="icon"
      className="bg-black text-white"
      onClick={handleClick}
    >
      {session ? (
        <>
          <LogOut className="h-5 w-5 text-white" />
        </>
      ) : (
        <>
          <LogIn className="h-5 w-5 text-white" />
        </>
      )}
    </Button>
        </nav>
      </div>
    </header>
  );
}
