import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// POST endpoint to add a rating for a movie
export async function POST(req: NextRequest, { params }: { params: { movieId: string } }) {
    try {
        const { movieId } = params; // Extract movieId from URL params
        const { userId, rating } = await req.json(); // Get userId and rating from request body

        // Check if movie exists
        const movie = await prisma.movie.findUnique({
            where: { id: parseInt(movieId) },
        });

        if (!movie) {
            return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
        }

        // Check if the user already rated this movie
        const existingRating = await prisma.rating.findUnique({
            where: {
                userId_movieId: {
                    userId,
                    movieId: parseInt(movieId),
                },
            },
        });

        if (existingRating) {
            return NextResponse.json({ error: 'You have already rated this movie' }, { status: 400 });
        }

        // Create a new rating
        const newRating = await prisma.rating.create({
            data: {
                userId,
                movieId: parseInt(movieId),
                rating,
            },
        });

        return NextResponse.json(newRating, { status: 201 });
    } catch (error) {
        console.error('Error adding rating: ', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}


export async function GET(req: NextRequest, { params }: { params: { movieId: string } }) {
    try {
        const { movieId } = params; // Extract movieId from URL params

        // Check if movie exists
        const movie = await prisma.movie.findUnique({
            where: { id: parseInt(movieId) },
        });

        if (!movie) {
            return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
        }

        // Fetch ratings for the movie, including user details
        const ratings = await prisma.rating.findMany({
            where: { movieId: parseInt(movieId) },
            include: {
                user: {
                    select: { id: true, name: true, profilePicture: true }, // Include user details
                },
            },
        });

        if (ratings.length === 0) {
            return NextResponse.json({ message: 'No ratings found for this movie' }, { status: 200 });
        }

        return NextResponse.json(ratings, { status: 200 });
    } catch (error) {
        console.error('Error fetching ratings: ', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}