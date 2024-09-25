"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, Search, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Vortex } from "./ui/vortex";
import { PlaceholdersAndVanishInput } from "./ui/placholders-and-vanish-input";
import { HoverEffect } from "./ui/card-hover-effect";
import { BackgroundBeams } from "./ui/background-beams";

export function Landing() {
  const placeholders = [
    "Inception",
    "500 Days of Summer",
    "La La Land",
    "Iron Man",
    "The Godfather",
  ];
  const handleChange = () => {};
  const onSubmit = () => {};
  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-500">
            MovieMind
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/my-movies"
              className="hover:text-purple-400 transition-colors"
            >
              My Movies
            </Link>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="w-[calc(100%-4rem)] h-screen mx-auto rounded-md overflow-hidden">
        <Vortex
          backgroundColor="black"
          className="flex items-center flex-col justify-center px-2 md:px-5 py-4 w-full h-full"
        >
          <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
            Discover Your Next Favorite Movie
          </h2>
          <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center my-3">
            Personalized recommendations powered by AI
          </p>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </Vortex>
      </section>

      {/* Popular Movies */}
      
      <section className=" w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-5xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8">Popular Movies</h2>
          <HoverEffect movies={movies} />
        </div>
        <BackgroundBeams/>
      </section>

      {/* Top Rated Movies */}
      <section className=" w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-5xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8">Top Rated Movies</h2>
          <HoverEffect movies={movies} />
        </div>
        <BackgroundBeams/>
      </section>

      {/* Recent Movies */}
      <section className=" w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-5xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8">Recent Movies</h2>
          <HoverEffect movies={movies} />
        </div>
        <BackgroundBeams/>
      </section>

      {/* Personalised Recomendations */}
      <section className=" w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-5xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8">Personalised Recomendations</h2>
          <HoverEffect movies={movies} />
        </div>
        <BackgroundBeams/>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 px-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 MovieMind. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const movies = [
    {
        title: "Inception",
        posterUrl: "https://images.hdqwalls.com/download/the-dark-knight-trilogy-jl-1920x1080.jpg",
        releaseYear: "2010",
        link: "/movies/inception",
        cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy",
    },
    {
        title: "The Dark Knight",
        posterUrl: "https://images.hdqwalls.com/download/the-dark-knight-trilogy-jl-1920x1080.jpg",
        releaseYear: "2008",
        link: "/movies/the-dark-knight",
        cast: "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
    },
    {
        title: "Forrest Gump",
        posterUrl: "https://images.hdqwalls.com/download/the-dark-knight-trilogy-jl-1920x1080.jpg",
        releaseYear: "1994",
        link: "/movies/forrest-gump",
        cast: "Tom Hanks, Robin Wright, Gary Sinise, Sally Field",
    },
    {
        title: "The Shawshank Redemption",
        posterUrl: "https://images.hdqwalls.com/download/the-dark-knight-trilogy-jl-1920x1080.jpg",
        releaseYear: "1994",
        link: "/movies/the-shawshank-redemption",
        cast: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
    },
    {
        title: "The Godfather",
        posterUrl: "https://images.hdqwalls.com/download/the-dark-knight-trilogy-jl-1920x1080.jpg",
        releaseYear: "1972",
        link: "/movies/the-godfather",
        cast: "Marlon Brando, Al Pacino, James Caan, Robert Duvall",
    },
    {
        title: "Pulp Fiction",
        posterUrl: "https://images.hdqwalls.com/download/the-dark-knight-trilogy-jl-1920x1080.jpg",
        releaseYear: "1994",
        link: "/movies/pulp-fiction",
        cast: "John Travolta, Uma Thurman, Samuel L. Jackson, Bruce Willis",
    },
];
