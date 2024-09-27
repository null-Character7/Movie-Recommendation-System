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
    <div className="min-h-screen bg-black text-gray-100">
      
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


      {/* Top Rated Movies */}
      <section className=" w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-5xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8">Top Rated Movies</h2>
          <HoverEffect movies={topRatedMovies} />
        </div>
        <BackgroundBeams/>
      </section>

      {/* Recent Movies */}
      <section className=" w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-5xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8">Recent Movies</h2>
          <HoverEffect movies={recentMovies} />
        </div>
        <BackgroundBeams/>
      </section>

      {/* Personalised Recomendations */}
      <section className=" w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-5xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8">Personalised Recomendations</h2>
          <HoverEffect movies={recentMovies} />
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

const topRatedMovies = [
  {
      title: "The Shawshank Redemption",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_.jpg",
      releaseYear: "1994",
      link: "/movies/the-shawshank-redemption",
      cast: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
  },
  {
      title: "The Godfather",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BYTJkNGQyZDgtZDQ0NC00MDM0LWEzZWQtYzUzZDEwMDljZWNjXkEyXkFqcGc@._V1_.jpg",
      releaseYear: "1972",
      link: "/movies/the-godfather",
      cast: "Marlon Brando, Al Pacino, James Caan, Robert Duvall",
  },
  {
      title: "The Dark Knight",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      releaseYear: "2008",
      link: "/movies/the-dark-knight",
      cast: "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
  },
  {
      title: "The Godfather Part II",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BNzc1OWY5MjktZDllMi00ZDEzLWEwMGItYjk1YmRhYjBjNTVlXkEyXkFqcGc@._V1_.jpg",
      releaseYear: "1974",
      link: "/movies/the-godfather-part-ii",
      cast: "Al Pacino, Robert De Niro, Robert Duvall, Diane Keaton",
  },
  {
      title: "12 Angry Men",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BYjE4NzdmOTYtYjc5Yi00YzBiLWEzNDEtNTgxZGQ2MWVkN2NiXkEyXkFqcGc@._V1_.jpg",
      releaseYear: "1957",
      link: "/movies/12-angry-men",
      cast: "Henry Fonda, Lee J. Cobb, Martin Balsam, John Fiedler",
  },
  {
      title: "Schindler's List",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BNjM1ZDQxYWUtMzQyZS00MTE1LWJmZGYtNGUyNTdlYjM3ZmVmXkEyXkFqcGc@._V1_.jpg",
      releaseYear: "1993",
      link: "/movies/schindlers-list",
      cast: "Liam Neeson, Ralph Fiennes, Ben Kingsley, Caroline Goodall",
  },
];

const recentMovies = [
  // Original movies
  {
    title: "Bohurupi",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BN2Q4ZmI1OGYtMzhhYy00NmFkLWJlZGMtNzM0MzEwOTYyODg1XkEyXkFqcGc@._V1_.jpg",
    releaseYear: "2024",
    link: "/movies/bohurupi",
    cast: null // No cast info provided in the original data
  },
  {
    title: "Vicky Vidya Ka Woh Wala Video",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNDViYjk4ZmYtNjhhYS00OGQ0LWFlNTktZTYwMzcyZDUwODcwXkEyXkFqcGc@._V1_.jpg",
    releaseYear: "2024",
    link: "/movies/vicky-vidya-ka-woh-wala-video",
    cast: "Rajkummar Rao, Triptii Dimri"
  },
  {
    title: "Singham Again",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BOWU1NGExMDEtNzU0NS00NTU1LTg5YTAtNDcyODNmYWYzNjEzXkEyXkFqcGc@._V1_.jpg",
    releaseYear: "2024",
    link: "/movies/singham-again",
    cast: "Kareena Kapoor, Jackie Shroff, Ajay Devgn, Akshay Kumar, Arjun Kapoor, Deepika Padukone, Ranveer Singh, Tiger Shroff"
  },
  // Top three new movies
  {
    title: "Martin",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZjY3MTk3YzQtYjBhMC00N2FkLThiOTMtOWI2NmIxMDFhMDZhXkEyXkFqcGc@._V1_.jpg",
    releaseYear: "2024",
    link: "/movies/martin",
    cast: null
  },
  {
    title: "Vettaiyan",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjExZDc1MzUtNDc3Mi00NDcxLWFmYTAtYzI2MzhlMmE3YzBiXkEyXkFqcGc@._V1_.jpg",
    releaseYear: "2024",
    link: "/movies/vettaiyan",
    cast: null
  },
  {
    title: "Bhool Bhulaiyaa 3",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjYyMTM4NjMtMjgzOS00N2RiLTlmZDUtOWJlMDZiOTVkMzA4XkEyXkFqcGc@._V1_.jpg",
    releaseYear: "2024",
    link: "/movies/bhool-bhulaiyaa-3",
    cast: null
  },
  
  
];
