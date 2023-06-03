const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");


module.exports={
//getAll
async getAll(req,res){
    try{
        const allThoughts = await Thought.find()
        res.status(200).json(allThoughts)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
},

//getOne

//createNew
async createThought(req,res){
    try{

        const newThought=await Thought.create(req.body)
        res.status(200).json(newThought)

    }catch(err){
        res.status(500).json(err)
    }
}

//update

//delete
}
