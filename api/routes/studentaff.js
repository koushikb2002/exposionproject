const router = require("express").Router();
const User=require("../models/User");
const Student=require("../models/Student");

//create a student affair post
router.post("/", async (req, res) => {
    const newPost = new Student(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
});

//get timeline posts

router.get("/timeline/:userId", async (req, res) => {
    try {
      const allAffairs = await Student.find();
      res.status(200).json(allAffairs);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //get users all posts
  router.get("/profile/:username", async (req, res) => {
    try {
      const user=await User.findOne({username:req.params.username});
      const posts=await Student.find({userId:user._id});
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const post = await Student.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/:id/comment", async (req, res) => {
    const postId = req.params.id;
    const { userId, username, text } = req.body;
    try {
      const post = await Post.findById(postId);
      post.comments.push({ userId, username, text });
      const updatedPost = await post.save();
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;