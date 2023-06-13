import mongoose from 'mongoose'

// Voici notre Schema
const postSchema = mongoose.Schema ({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

//On va transformer notre Schema en Modèle

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
