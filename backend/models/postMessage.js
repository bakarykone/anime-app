import mongoose from 'mongoose'

// Voici notre Schema
const postSchema = mongoose.Schema ({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default:  [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

//On va transformer notre Schema en Modèle

const PostMessage = mongoose.model('PostMessage', postSchema);

//on ajoute le(s) like actuels de chaque post: ligne 10

export default PostMessage;
