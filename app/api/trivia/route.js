import { connectToDatabase } from "@/utils/database"
import Trivia from "@/models/trivia"
import {headers}  from 'next/headers';
import User from "@/models/user"

export const GET = async (req) => {
    const headersList = headers();
    const referer = headersList.get('referer');
    const url = new URL(request.url);
    url.searchParams.set("t", Date.now());
    
    try{
        await connectToDatabase()

        const trivias = await Trivia.find({}).populate('creator')
        return new Response(JSON.stringify(trivias), {
            status: 200,
            headers: {
                referer: referer,
                'Cache-Control':'no-cache, no-store, max-age=0, must-revalidate',
            }
        })
    }
    catch(err){
        return new Response('Failed to fetch trivia', {
            status: 500
        })
    }
}