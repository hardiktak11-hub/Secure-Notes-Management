import { application } from "express";
import Note from "../models/note.model.js";

//creating a note Api
export const createnote = async(req,res)=>{
 try{

const title = req.body.title
const content = req.body.content

//if all required field are not entered
if(!title || !content){
   return res.status().json({
        success:false,
        message:"please enter both title and content"
    });
}

//creating note

const note = await Note.create({
    title,
    content,
    owner:req.user._id
});

return res.status(201).json({
    success:true,
    message:"note is created succesfully",
    data:note
});
} 
catch(error){
 return res.status(404).json({
    succes:false,
    message:"error.message"
 });
}
}

//getting all notes Api

export const getallnotes = async(req,res)=>{

 try{

   const search = req.query.search
   const pageNumber = Number(req.query.page) ||1
   const limitNumber = Number(req.query.limit) ||10
   const sort = req.query.sort ||"newest"

const filter = {
    owner:req.user._id
}

//search
if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,//looks for search(keyword) inside db
                        $options: "i"//ignore case sensitivity
                    }
                },
                {
                    content: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

//pagination
const skip = (pageNumber-1)*limitNumber;

//sorting
const sortOption = 
 sort==="newest"
   ?{isPinned:-1 , createdAt:-1}//means newest first 
   :{isPinned:-1 , createdAt:1}//means oldest first

const totalNotes = await Note.countDocuments(filter);
const notes = await Note.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber)

return res.status(200).json({
    success:true,
    totalNotes,
    currPage:pageNumber,
    totalPage:Math.ceil(totalNotes/limitNumber),
    count:notes.length,
    data:notes
});
}
catch(error){
    return res.status(404).json({
        success:false,
        message:"internal server error"
    });
}
}

//getting an notes by id Api
export const getNoteById = async (req, res) => {
    try {

        const note = await Note.findOne({
            _id: req.params.id,
            owner: req.user._id
        });
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: note
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//updating an note Api

export const updateNote = async (req,res)=>{
try{
const title = req.body.title;
const content = req.body.content;

const note = await Note.findOne({
    _id : req.params.id,
    owner : req.user._id
});
if(!note){
   return res.status(401).json({
        success:false,
        message:"Note not found"
    })
}

//update only those field who are changed
if(title!==undefined) note.title = title;
if(content!==undefined) note.content = content;

await note.save();
return res.status(200).json({
    success:true,
    message:"updation is completed",
    data:note
});
}
catch(error){
return res.status(404).json({
    success:false,
    message:"internal server error"
});
}
}

//Deleting a note application
export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            owner: req.user._id
        });
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        await note.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//pin/unpin an note

export const pinUnpin = async(req,res)=>{
try{

const note = await Note.findOne({
    _id:req.params.id,
    owner:req.user._id,
});
if(!note){
    return res.status(404).json({
        success:false,
        message:"unable to find note"
    });
}

//toggle
note.isPinned = !note.isPinned

await note.save();

return res.status(200).json({
    success:true,
    message: note.isPinned
           ?"note is pinned succesfully"
           :"note is unpinned succesfully",
    data:note
});
}
catch(error){
  return res.status(404).json({
    success:false,
    message: error.message
  });
}
}