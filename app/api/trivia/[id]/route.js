import { connectToDatabase } from "@/utils/database"
import Trivia from "@/models/trivia"
import User from "@/models/user"

export const GET = async (req, {params}) => {
    try{
        await connectToDatabase()

        const trivia = await Trivia.findById(params.id).populate('creator')
        if(!trivia) 
        {
            return new Response('Trivia not found', {status:404})
            } else {
            return new Response(JSON.stringify(trivia), {
                status: 200
            })
        }
    }
    catch(err){
        return new Response('Failed to fetch trivia', {
            status: 500
        })
    }
}

export const PATCH = async (req, {params}) => {
    const {trivia, tag} = await req.json()

    try{
        await connectToDatabase()

        const existTrivia = await Trivia.findById(params.id)
        if(!existTrivia){
            return new Response("Trivia not found", {status:400})
        }
        else{
            existTrivia.trivia = trivia
            existTrivia.tag = tag

            await existTrivia.save()
            return new Response(JSON.stringify(existTrivia), {status:200})
        }
    }
    catch(err){
        return new Response("Failed to patch trivia", {status:500})
    }
}

export const DELETE = async(req, {params}) => {
    try{
        await connectToDatabase()
        await Trivia.findByIdAndRemove(params.id)
        return new Response("Trivia has been deleted successfully", {status:200})
    }
    catch(err){
        return new Response("Failed to delete trivia", {status:500})
    }
}