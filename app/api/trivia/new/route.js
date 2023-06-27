import { connectToDatabase } from "@/utils/database"
import Trivia from "@/models/trivia"

export const POST = async (req, res) => {
    const {userId, trivia, tag} = await req.json()
    try{
        await connectToDatabase()
        const newTrivia = new Trivia({
            creator: userId,
            trivia,
            tag,
        })
        await newTrivia.save()
        return new Response(JSON.stringify(newTrivia), {
            status: 201
        })
    }
    catch(err){
        return new Response('Failed to create a new trivia', {
            status: 500
        })
    }
}