const Post = require('../../post/model/postModel');
const Person = require('../../person/model/personModel');
const Report = require('../model/reportModel');


const userReporting = async (req, res) => {
    const { userID, postID, reportComment } = req.body;
    const user = await Person.findById({ _id: userID }).catch(error => { return });
    const post = await Post.findById({ _id: postID }).catch(error => { return });
    const userReporting = await Report.find({ userID, postID }).catch(error => { return });
    console.log(userReporting);
    if (!user) {
        res.status(400).json({ message: "Please enter a valid user id" })
    }
    else if (!post) {
        res.status(400).json({ message: "Please enter a valid post id" })
    }
    else if (post.createdBy.toHexString() === userID) {
        res.status(400).json({ message: "you can not report your posts" })
    }
    else if (userReporting.length > 0) {
        res.status(400).json({ message: "you can report the post only one time" })
    }
    else {
        let newReport = new Report({ userID, postID, reportComment });
        await newReport.save()
            .then(re => res.status(200).send({ message: "Success" }))
            .catch((error) => {
                res.status(500).json({ message: "Something went wrong" })
            })
    }
}

const getAllReport = async (req, res) => {
    await Report.find({})
        .then(data => res.status(200).send({ message: data }))
        .catch(error => {
            res.status(500).json({ message: "Something went wrong" })
        })
}

module.exports = {
    userReporting,
    getAllReport,
}