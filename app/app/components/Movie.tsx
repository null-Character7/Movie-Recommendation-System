"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon, PlusCircle, PlayCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { convertFromSlug } from "../utils/movie-name";
import { HoverEffect } from "./ui/card-hover-effect";

interface MovieProps {
  moviename: string;
}

interface Cast {
  name: string;
  image: string;
  character: string;
}

interface Movie {
  title: string;
  posterUrl: string;
  releaseYear: string;
  overview: string;
  rating: number;
}

  // Skeleton loader components
  interface SkeletonTextProps {
    width?: string;
    height?: string;
    className?: string; // Add className as an optional property
  }

  interface SkeletonImageProps {
    width: string;
    height: string;
    className?: string; // className is optional
  }

export function Movie({ moviename }: MovieProps) {
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[] | null>(null);
  const [genres, setGenres] = useState<string | null>(null);



const SkeletonText: React.FC<SkeletonTextProps> = ({ width = 'w-full', height = 'h-4', className = '' }) => (
  <div className={`${width} ${height} ${className} bg-gray-700 rounded animate-pulse`}></div>
);



const SkeletonImage: React.FC<SkeletonImageProps> = ({ width, height, className = '' }) => (
  <div className={`${width} ${height} ${className} bg-gray-700 rounded animate-pulse`}></div>
);

const SkeletonButton: React.FC = () => (
  <div className="w-40 h-10 bg-gray-700 rounded animate-pulse"></div>
);

  console.log("movie name in slug in component ", moviename);

  const movieName = convertFromSlug(moviename);
  useEffect(() => {
    const fetchttid = async () => {
      const url = `https://online-movie-database.p.rapidapi.com/v2/search?searchTerm=${encodeURIComponent(
        movieName
      )}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "10ffa9edf6msh1ef2d0c1b4f6438p1fda62jsna14460b93b1d",
          "x-rapidapi-host": "online-movie-database.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        const ttid = result.data.mainSearch.edges[0].node.entity.id;
        console.log("titty id ", ttid);

        return ttid; // Return ttid after fetching it
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMovieData = async (ttid: string) => {
      try {
        const url = `https://online-movie-database.p.rapidapi.com/title/v2/get-overview?tconst=${ttid}`;
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "10ffa9edf6msh1ef2d0c1b4f6438p1fda62jsna14460b93b1d",
            "x-rapidapi-host": "online-movie-database.p.rapidapi.com",
          },
        };
        const response = await fetch(url, options);
        const result = await response.json();
        const movie_data = result.data.title;
        console.log("movie data ", movie_data);
        setMovie({
          title: movie_data.titleText.text,
          releaseYear: movie_data.releaseYear.year,
          posterUrl: movie_data.primaryImage.url,
          overview: movie_data.plot.plotText.plainText,
          rating: movie_data.ratingsSummary.aggregateRating,
        });
        console.log("movie info ", movie);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCast = async (ttid: string) => {
      const url = `https://online-movie-database.p.rapidapi.com/title/v2/get-full-cast-and-crew?tconst=${ttid}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "10ffa9edf6msh1ef2d0c1b4f6438p1fda62jsna14460b93b1d",
          "x-rapidapi-host": "online-movie-database.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const castData: Cast[] = result.data.title.credits.edges.map(
          (edge: any) => {
            const { name, characters, attributes } = edge.node;
            return {
              name: name.nameText.text,
              image: name.primaryImage?.url || "",
              character:
                characters && characters.length > 0
                  ? characters[0].name
                  : "N/A",
              additional:
                attributes && attributes.length > 0 ? attributes[0].text : "",
            };
          }
        );

        setCast(castData);
        console.log("cast is ", cast);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchGenres = async (ttid: string) => {
      const url = `https://online-movie-database.p.rapidapi.com/title/v2/get-genres?tconst=${ttid}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "10ffa9edf6msh1ef2d0c1b4f6438p1fda62jsna14460b93b1d",
          "x-rapidapi-host": "online-movie-database.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const genres = result.data.title.titleGenres.genres;
        setGenres(genres.map((genreObj: any) => genreObj.genre.text)); // Mapping the `text` field
        console.log("genre is ", genres);
      } catch (error) {
        console.error(error);
      }
    };

    // This is the main async function that ensures `ttid` is fetched first
    const fetchData = async () => {
      const ttid = await fetchttid();
      if (ttid) {
        await fetchMovieData(ttid);
        await fetchCast(ttid);
        await fetchGenres(ttid);
      }
    };

    fetchData(); // Call the main function when the component is mounted
  }, [movieName]); // Add movieName as a dependency to refetch when it changes
  // Empty dependency array to run the effect only once
  return (
    <div className="min-h-screen bg-zinc-900 text-gray-100">
      {/* Conditional Rendering */}
      {movie && genres && cast ? (
        <>
          {/* Movie Hero Section */}
          <section className="relative h-[70vh] overflow-hidden">
            <Image
              src={
                movie?.posterUrl ||
                "/placeholder.svg?height=1080&width=1920&text=Movie+Poster"
              }
              alt="Movie Poster"
              layout="fill"
              objectFit="cover"
              className="brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="container mx-auto">
                <h1 className="text-5xl font-bold mb-4">{movie?.title}</h1>
                <p className="text-xl mb-4">
                  {movie?.releaseYear && `${movie.releaseYear}   |   `}
                  {genres && `${genres}   |   `}
                  {movie?.rating && `Rating: ${movie.rating}`}
                </p>
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
                  <p className="text-lg mb-8">{movie?.overview}</p>

                  <h2 className="text-3xl font-bold mb-4">Cast & Crew</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
                    {cast?.map((member) => (
                      <div className="text-center group" key={member.name}>
                        <Avatar className="w-24 h-24 mx-auto mb-2 group-hover:ring-2 group-hover:ring-purple-500 transition-all">
                          <AvatarImage
                            src={member.image} // Using the actual image URL from the API
                            alt={member.name} // Alt text for better accessibility
                          />
                          <AvatarFallback>
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-semibold group-hover:text-purple-400 transition-colors">
                          {member.name} {/* Display the actor's name */}
                        </p>
                        <p className="text-sm text-gray-400">
                          {member.character || "Unknown"}{" "}
                          {/* Display the character name */}
                        </p>
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
                              fill={
                                star <= userRating ? "currentColor" : "none"
                              } // Uses "currentColor" to apply the class color
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
              </div>
            </div>
          </section>

          {/* Similar Movies */}
          <section className="w-full rounded-md bg-zinc-900 relative flex flex-col items-center justify-center antialiased">
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
        </>
      ) : (
        <>
          {/* Skeleton for Movie Hero Section */}
          <section className="relative h-[70vh] overflow-hidden">
            <SkeletonImage width="w-full" height="h-full" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="container mx-auto">
                <SkeletonText width="w-3/4" height="h-12" />
                <SkeletonText width="w-1/2" height="h-6" className="mt-4" />
                <div className="flex items-center space-x-4 mt-4">
                  <SkeletonButton />
                  <SkeletonButton />
                </div>
              </div>
            </div>
          </section>

          {/* Skeleton for Movie Details */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <SkeletonText width="w-1/4" height="h-8" className="mb-4" />
                  <SkeletonText className="mb-2" />
                  <SkeletonText className="mb-2" />
                  <SkeletonText width="w-3/4" className="mb-8" />

                  <SkeletonText width="w-1/4" height="h-8" className="mb-4" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="text-center">
                        <SkeletonImage
                          width="w-24"
                          height="h-24"
                          className="mx-auto mb-2 rounded-full"
                        />
                        <SkeletonText width="w-20" className="mx-auto" />
                        <SkeletonText width="w-16" className="mx-auto mt-1" />
                      </div>
                    ))}
                  </div>

                  <SkeletonText width="w-1/4" height="h-8" className="mb-4" />
                  <Card className="bg-zinc-900">
                    <CardContent className="p-6">
                      <div className="flex justify-between mb-4">
                        {[...Array(5)].map((_, index) => (
                          <SkeletonImage key={index} width="w-6" height="h-6" />
                        ))}
                      </div>
                      <SkeletonText height="h-32" className="mb-4" />
                      <SkeletonButton />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Skeleton for Similar Movies */}
          <section className="w-full rounded-md bg-zinc-900 relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-5xl mx-auto px-8">
              <SkeletonText width="w-1/4" height="h-8" className="mb-8" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                  <SkeletonImage key={index} width="w-full" height="h-64" />
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-800 py-8 px-4">
            <div className="container mx-auto text-center">
              <SkeletonText width="w-48" className="mx-auto" />
            </div>
          </footer>
        </>
      )}
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
