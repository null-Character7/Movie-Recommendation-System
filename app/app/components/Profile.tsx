'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Star, Clock, X } from 'lucide-react'
import Image from 'next/image'

export function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [watchLaterMovies, setWatchLaterMovies] = useState([
    { id: 1, title: 'Inception', poster: '/placeholder.svg?height=300&width=200&text=Inception' },
    { id: 2, title: 'The Matrix', poster: '/placeholder.svg?height=300&width=200&text=The+Matrix' },
    { id: 3, title: 'Interstellar', poster: '/placeholder.svg?height=300&width=200&text=Interstellar' },
  ])
  const [ratedMovies, setRatedMovies] = useState([
    { id: 1, title: 'The Shawshank Redemption', poster: '/placeholder.svg?height=300&width=200&text=Shawshank', rating: 5 },
    { id: 2, title: 'Pulp Fiction', poster: '/placeholder.svg?height=300&width=200&text=Pulp+Fiction', rating: 4 },
    { id: 3, title: 'The Dark Knight', poster: '/placeholder.svg?height=300&width=200&text=Dark+Knight', rating: 5 },
  ])

  const removeWatchLaterMovie = (id: number) => {
    setWatchLaterMovies(watchLaterMovies.filter(movie => movie.id !== id))
  }

  const editRating = (id: number, newRating: number) => {
    setRatedMovies(ratedMovies.map(movie => 
      movie.id === id ? { ...movie, rating: newRating } : movie
    ))
  }

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mt-12 mb-6">Watch Later</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {watchLaterMovies.map((movie) => (
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
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mt-12 mb-6">Previously Rated</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {ratedMovies.map((movie) => (
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
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}