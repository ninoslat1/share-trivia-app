import { connectToDatabase } from "@/utils/database"
import Trivia from "@/models/trivia"
import User from "@/models/user"

export const GET = async (req, {params}) => {
    try{
        await connectToDatabase()

        const trivias = await Trivia.find({creator: params.id}).populate('creator')
        return new Response(JSON.stringify(trivias), {
            status: 200
        })
    }
    catch(err){
        return new Response('Failed to fetch trivia', {
            status: 500
        })
    }
}