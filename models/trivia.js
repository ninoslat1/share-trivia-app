import mongoose, {Schema, model, models} from "mongoose";

const TriviaSchema = new Schema ({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    trivia: {
        type: String,
        required: [true, 'Trivia is required'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required'],
    }
})

const Trivia = models.Trivia || model('Trivia', TriviaSchema)

export default Trivia