const router = require("express").Router();
const Post = require("../models/Post");
const User=require("../models/User");
//create a post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like / dislike a post

router.put("/:id/upvote", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("This post has been upvoted");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Your upvote removed.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get users all posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user=await User.findOne({username:req.params.username});
    const posts=await Post.find({userId:user._id});
    res.status(200).json(posts);
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
