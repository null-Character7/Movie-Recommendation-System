import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/app/lib/db';
// GET endpoint to retrieve a user's watchlist
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    console.log("params is ",params)
    const { userId } = params;
    
    try {
        // Fetch the user's watchlist from the database
        const watchlist = await prismaClient.watchlist.findMany({
            where: { userId: (userId) },
            include: {
                movie: true, // This will fetch movie details along with the watchlist entry
            },
        });

        return NextResponse.json(watchlist, { status: 200 });
    } catch (error) {
        console.error('Error retrieving watchlist: ', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}