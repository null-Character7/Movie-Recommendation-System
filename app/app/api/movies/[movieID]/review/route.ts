import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// POST endpoint to add a review for a movie
export async function POST(req: NextRequest, { params }: { params: { movieId: string } }) {
    try {
        const { movieId } = params; // Extract movieId from params
        const body = await req.json(); // Parse the request body
        const { userId, content } = body;

        // Check if the movie exists
        const movie = await prisma.movie.findUnique({
            where: { id: parseInt(movieId) },
        });

        if (!movie) {
            return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
        }

        // Create a new review
        const review = await prisma.review.create({
            data: {
                content,
                movieId: parseInt(movieId),
                userId,
            },
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error) {
        console.error('Error adding review: ', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// GET endpoint to fetch reviews for a specific movie
export async function GET(req: NextRequest, { params }: { params: { movieId: string } }) {
    try {
        const { movieId } = params; // Extract movieId from URL params

        // Check if the movie exists
        const movie = await prisma.movie.findUnique({
            where: { id: parseInt(movieId) },
        });

        if (!movie) {
            return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
        }

        // Fetch reviews for the movie, including user details
        const reviews = await prisma.review.findMany({
            where: { movieId: parseInt(movieId) },
            include: {
                user: {
                    select: { id: true, name: true, profilePicture: true }, // Include user details in response
                },
            },
        });

        if (reviews.length === 0) {
            return NextResponse.json({ message: 'No reviews found for this movie' }, { status: 200 });
        }

        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        console.error('Error fetching reviews: ', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}