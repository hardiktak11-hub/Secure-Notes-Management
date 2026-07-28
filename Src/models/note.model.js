import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    isPinned:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
}
);

const Note = mongoose.model("Note",notesSchema);
export default Note;