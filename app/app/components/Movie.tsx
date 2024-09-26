"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon, PlusCircle, PlayCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import { convertFromSlug } from "../utils/movie-name";
import { BackgroundBeams } from "./ui/background-beams";
import { HoverEffect } from "./ui/card-hover-effect";
import { Spotlight } from "./ui/Spotlight";
import { WobbleCard } from "./ui/wobble-card";

interface MovieProps {
  moviename: string;
}

export function Movie({ moviename }: MovieProps) {
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");

  console.log("movie name in slug in component ", moviename);

  const movieName = convertFromSlug(moviename);

  return (
    <div className="min-h-screen bg-zinc-900 text-gray-100">
      {/* Movie Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src="/placeholder.svg?height=1080&width=1920&text=Movie+Poster"
          alt="Movie Poster"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-4">{movieName}</h1>
            <p className="text-xl mb-4">Sci-Fi, Adventure | 2014</p>
            <div className="flex items-center space-x-4">
              <Button className="bg-purple-600 hover:bg-purple-700 transition-colors">
                <PlusCircle className="mr-2 h-4 w-4" /> Add to Watchlist
              </Button>
              <Button
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
              >
                <PlayCircle className="mr-2 h-4 w-4" /> Watch Trailer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-4">Plot Summary</h2>
              <p className="text-lg mb-8">
                A team of explorers travel through a wormhole in space in an
                attempt to ensure humanity's survival.
              </p>

              <h2 className="text-3xl font-bold mb-4">Cast & Crew</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((member) => (
                  <div key={member} className="text-center group">
                    <Avatar className="w-24 h-24 mx-auto mb-2 group-hover:ring-2 group-hover:ring-purple-500 transition-all">
                      <AvatarImage
                        src={`/placeholder.svg?height=96&width=96&text=Cast+${member}`}
                      />
                      <AvatarFallback>C{member}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold group-hover:text-purple-400 transition-colors">
                      Actor Name
                    </p>
                    <p className="text-sm text-gray-400">Character</p>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl font-bold mb-4">Write a Review</h2>
              <Card className="bg-zinc-900">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex justify-between mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`w-6 h-6 cursor-pointer ${
                            star <= userRating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`} // Conditionally apply the color
                          fill={star <= userRating ? "currentColor" : "none"} // Uses "currentColor" to apply the class color
                          onClick={() => setUserRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                  <Textarea
                    placeholder="Write your review here..."
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                    className="mb-4 text-white"
                  />
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-colors">
                    Submit Review
                  </Button>
                </CardContent>
              </Card>
            </div>

            <WobbleCard containerClassName="col-span-1 min-h-[300px]">
              <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                No shirt, no shoes, no weapons.
              </h2>
              <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                If someone yells “stop!”, goes limp, or taps out, the fight is
                over.
              </p>
            </WobbleCard>
          </div>
        </div>
      </section>

      {/* Similar Movies */}
      <section className=" w-full rounded-md bg-zinc-900 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-8 p-4">Similar Movies</h2>
          <HoverEffect movies={movies} />
        </div>
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
    posterUrl:
      "https://images.hdqwalls.com/download/the-dark-knight-trilogy-jl-1920x1080.jpg",
    releaseYear: "2010",
    link: "/movies/inception",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy",
  },
  {
    title: "The Dark Knight",
    posterUrl:
      "https://images.hdqwalls.com/download/the-dark-knight-trilogy-jl-1920x1080.jpg",
    releaseYear: "2008",
    link: "/movies/the-dark-knight",
    cast: "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
  },
  {
    title: "Forrest Gump",
    posterUrl:
      "https://images.hdqwalls.com/download/the-dark-knight-trilogy-jl-1920x1080.jpg",
    releaseYear: "1994",
    link: "/movies/forrest-gump",
    cast: "Tom Hanks, Robin Wright, Gary Sinise, Sally Field",
  },
  {
    title: "The Shawshank Redemption",
    posterUrl:
      "https://images.hdqwalls.com/download/the-dark-knight-trilogy-jl-1920x1080.jpg",
    releaseYear: "1994",
    link: "/movies/the-shawshank-redemption",
    cast: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
  },
  {
    title: "The Godfather",
    posterUrl:
      "https://images.hdqwalls.com/download/the-dark-knight-trilogy-jl-1920x1080.jpg",
    releaseYear: "1972",
    link: "/movies/the-godfather",
    cast: "Marlon Brando, Al Pacino, James Caan, Robert Duvall",
  },
  {
    title: "Pulp Fiction",
    posterUrl:
      "https://images.hdqwalls.com/download/the-dark-knight-trilogy-jl-1920x1080.jpg",
    releaseYear: "1994",
    link: "/movies/pulp-fiction",
    cast: "John Travolta, Uma Thurman, Samuel L. Jackson, Bruce Willis",
  },
];
