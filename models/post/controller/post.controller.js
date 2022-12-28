const Post = require('../model/postModel');
const Person = require('../../person/model/personModel');

const addPost = async (req, res) => {
    const { title, desc, createdBy, isBlocked } = req.body;
    try {
        let newPost = new Post({ title, desc, createdBy, isBlocked });
        await newPost.save();
        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ message: "some thing wrong" });
    }
}

const updatePost = async (req, res) => {
    const { title, desc, createdBy } = req.body;
    const { id } = req.params;
    const post = await Post.findById({ _id: id }).catch(error => { return });
    if (!post) {
        res.status(400).json({ message: "Please enter a valid id" })
    }
    else {
        await Post.findByIdAndUpdate({ _id: id }, { title, desc })
            .then(re => res.status(200).send({ message: "Success" }))
            .catch((error) => {
                res.status(500).json({ message: "Something went wrong" })
            })
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById({ _id: id }).catch(error => { return });
    if (!post) {
        res.status(400).json({ message: "Please enter a valid id" })
    }
    else {
        await Post.findByIdAndDelete({ _id: id })
            .then(re => res.status(200).send({ message: "Success" }))
            .catch(error => {
                if (error.name == "CastError") {
                    res.status(400).json({ message: "Please enter a valid id" })
                }
                else {
                    res.status(500).json({ message: "Something went wrong" })
                }
            })
    }
}

const getAllPost = async (req, res) => {
    await Post.find({})
        .then(data => res.status(200).send({ message: data }))
        .catch(error => {
            res.status(500).json({ message: "Something went wrong" })
        })
}

const getUserPost = async (req, res) => {
    const { id } = req.params;
    const user = await Person.findById({ _id: id }).catch(error => { return });
    if (!user) {
        res.status(400).json({ message: "Please enter a valid id" })
    }
    else {
        await Post.find({ createdBy: id })
            .then(data => res.status(200).send({ message: data }))
            .catch(error => {
                res.status(500).json({ message: "Something went wrong" })
            })
    }
}

const newsFeed = async (req, res) => {
    try {
        const posts = await Post.aggregate([
            {
                $lookup: {
                    "localField": "createdBy",
                    "from": "people",
                    "foreignField": "_id",
                    "as": "userinfo"
                }
            },
            { "$match": { "isBlocked": false, "userinfo.deactivated": false } },
        ]);
        res.status(200).send({ message: posts })
    } catch (error) {
        console.log(error);
    }
}

const blockPost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById({ _id: id }).catch(error => { return });
    if (!post) {
        res.status(400).json({ message: "Please enter a valid id" })
    }
    else {
        await Post.findByIdAndUpdate({ _id: id }, { isBlocked: !post.isBlocked })
            .then(re => res.status(200).send({ message: "Success" }))
            .catch((error) => {
                res.status(500).json({ message: "Something went wrong" })
            })
    }
}


module.exports = {
    addPost,
    updatePost,
    deletePost,
    getUserPost,
    newsFeed,
    getAllPost,
    blockPost,
}