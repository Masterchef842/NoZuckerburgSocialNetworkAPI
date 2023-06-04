const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  //getAll
  async getAll(req, res) {
    try {
      const allThoughts = await Thought.find();
      res.status(200).json(allThoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //getOne

  async getOne(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.id });
      res.status(200).json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //createNew
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const thoughtAuthor = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: newThought._id } },
        { runValidators: true, new: true }
      );
      res.status(200).json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update
  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thoughtData) {
        return res.status(404).json({ message: "Thought Not Found" });
      }
      return res.status(200).json(thoughtData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //delete
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndDelete({
        _id: req.params.id,
      });
      if (!thoughtData) {
        return res.status(404).json({ message: "thought Not Found" });
      }
      const thoughtAuthor = await User.findOneAndUpdate(
        { username: thoughtData.username },
        { $pull: { thoughts: thoughtData._id } },
        { runValidators: true, new: true }
      );
      return res.status(200).json(thoughtData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //create reaction
  async addReaction(req, res) {
    try {
      const verifyUser = await User.findOne({ username: req.body.username });
      if (!verifyUser) {
        return res.status(404).json({ message: "User Not Found" });
      }
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thoughtData) {
        return res.status(404).json({ message: "thought Not Found" });
      }
      res.status(200).json("reaction added");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //delete reaction
  async deleteReaction(req, res) {
    try {
        const deletedReaction =await await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: {reactionId: req.body.reactionId} } },
            { runValidators: true, new: true }
          );
          return res.status(404).json({ message: "reaction Deleted" });
    } catch (err) {

      console.log(err);
      return res.status(500).json(err);
    }
  },
};
