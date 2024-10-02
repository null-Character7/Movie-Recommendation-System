'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Star, Clock, X } from 'lucide-react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

type WatchLaterMovie = {
  id: string;
  title: string;
  poster: string;
};

type MovieRating = {
  id: string;
  title: string;
  poster: string;
  rating: number;
};

export function Profile() {
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')

  const [watchLaterMovies, setWatchLaterMovies] = useState<WatchLaterMovie[]>([])
  const [ratedMovies, setRatedMovies] = useState<MovieRating[]>([])
  const [loadingWatchLater, setLoadingWatchLater] = useState(true); // New state for loading watch later
  const [loadingRatings, setLoadingRatings] = useState(true); // New state for loading ratings

  const fetchWatchlist = async () => {
    try {
      setLoadingWatchLater(true); // Set loading state
      const response = await fetch(`/api/watchlist/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch watchlist');

      const data = await response.json();

      // Map the API response to match the desired structure
      const formattedData = data.map((entry: any) => ({
        id: entry.movie.ttid,
        title: entry.movie.title,
        poster: entry.movie.posterUrl || '../../public/user.png',
      }));

      setWatchLaterMovies(formattedData);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    } finally {
      setLoadingWatchLater(false); // Stop loading after data is fetched
    }
  };

  const fetchMovieRatings = async () => {
    try {
      setLoadingRatings(true); // Set loading state
      const response = await fetch(`/api/rating/${userId}`);
      const data = await response.json();
      setRatedMovies(data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    } finally {
      setLoadingRatings(false); // Stop loading after data is fetched
    }
  }

  useEffect(() => {
    if (userId) {
      fetchWatchlist();
      fetchMovieRatings();
    }
  }, [userId]);

  const removeWatchLaterMovie = (id: string) => {
    setWatchLaterMovies(watchLaterMovies.filter(movie => movie.id !== id))
  }

  const editRating = (id: string, newRating: number) => {
    setRatedMovies(ratedMovies.map(movie =>
      movie.id === id ? { ...movie, rating: newRating } : movie
    ))
  }

  // Skeleton component for loading states
  const Skeleton = () => (
    <Card className="bg-zinc-800 transition-colors duration-200 relative group animate-pulse">
      <CardContent className="p-4">
        <div className="h-[300px] bg-zinc-700 rounded-lg mb-4" />
        <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-zinc-700 rounded w-1/2" />
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="bg-zinc-900 shadow-xl">
          <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://github.com/shadcn.png" alt={name} />
                <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-zinc-700 border-zinc-600 text-white"
                    />
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-zinc-700 border-zinc-600 text-white"
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p className="text-zinc-400">{email}</p>
                  </div>
                )}
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              className="bg-zinc-700 hover:bg-zinc-600 text-white"
            >
              {isEditing ? 'Save' : 'Edit Profile'}
              <Edit className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
        </Card>

        {/* Watch Later Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mt-12 mb-6">Watch Later</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loadingWatchLater ? (
              // Show skeletons while loading
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            ) : (
              watchLaterMovies.map((movie) => (
                <motion.div
                  key={movie.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200 relative group">
                    <CardContent className="p-4">
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        width={200}
                        height={300}
                        className="rounded-lg shadow-md mb-4"
                      />
                      <CardTitle className="text-lg">{movie.title}</CardTitle>
                      <div className="flex items-center mt-2 text-yellow-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">Watch Later</span>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={() => removeWatchLaterMovie(movie.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove from Watch Later</span>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Previously Rated Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mt-12 mb-6">Previously Rated</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loadingRatings ? (
              // Show skeletons while loading
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            ) : (
              ratedMovies.map((movie) => (
                <motion.div
                  key={movie.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200 relative group">
                    <CardContent className="p-4">
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        width={200}
                        height={300}
                        className="rounded-lg shadow-md mb-4"
                      />
                      <CardTitle className="text-lg">{movie.title}</CardTitle>
                      <div className="flex items-center mt-2 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < movie.rating ? 'fill-current' : 'stroke-current'}`}
                          />
                        ))}
                        <span className="ml-1 text-sm">{movie.rating}/5</span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-800 text-white">
                          <DialogHeader>
                            <DialogTitle>Edit Rating for {movie.title}</DialogTitle>
                          </DialogHeader>
                          <div className="flex justify-center space-x-2 mt-4">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <Button
                                key={rating}
                                variant={rating <= movie.rating ? "default" : "outline"}
                                size="sm"
                                onClick={() => editRating(movie.id, rating)}
                              >
                                {rating}
                              </Button>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
