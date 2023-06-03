const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  //getAll
  async getAllUsers(req, res) {
    try{
        const allUsers = await User.find()
        return res.status(200).json({allUsers})
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
  },
  
  //getOneUser
  async getOneUser(req, res) {
    try{
        const userData = await User.findOne({_id: req.params.userId}).populate('friends').populate('thoughts')
        if(!userData){
            return res.status(404).json({message: "User Not Found"})
        }
        return res.status(200).json({userData})
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
  },
 


  //createNew
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      //console.log(newUser);
        return res.json(newUser);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
  },

  async updateUs(req, res){

    try{

    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
  },
  //updateUser

  async updateUser(req, res){
    try{
        const userData = await User.findOneAndUpdate(
            {_id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true })
        if(!userData){
            return res.status(404).json({message: "User Not Found"})
        }
        return res.status(200).json({userData})
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
  },

  //addFriend
  async addFriend(req, res) {
    try{
        const friendData =await User.findOne({_id: req.body.friendId})
        if(!friendData){
            return res.status(404).json({message: "Cannot add a friend that doesn't exist"})
        }
        const userData = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.body.friendId}},
            {runValidators: true, new: true})
        if(!userData){
            return res.status(404).json({message: "User Not Found"})
        }
        return res.status(200).json({message: "successfully added friend"})
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
  },

  //removeFriend
  async removeFriend(req, res) {
    try{
        const friendData =await User.findOne({_id: req.body.friendId})
        if(!friendData){
            return res.status(404).json({message: "Cannot add a friend that doesn't exist"})
        }
        const userData = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.body.friendId}},
            {runValidators: true, new: true})
        if(!userData){
            return res.status(404).json({message: "User Not Found"})
        }
        
        return res.status(200).json({message: "successfully removed friend"})
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
  },

  //delete
  async deleteUser(req,res){
    try{
        const userData = await User.findOneAndDelete({_id: req.params.userId})
        if(!userData){
            return res.status(404).json({message: "User Not Found"})
        }
        return res.status(200).json({userData})
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
  }
};
