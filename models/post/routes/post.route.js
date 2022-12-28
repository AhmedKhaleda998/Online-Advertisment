const app = require("express").Router();
const { addPost, updatePost, deletePost, getUserPost, newsFeed, getAllPost, blockPost } = require('../controller/post.controller');
const validator = require('../../../validation/common.validation');
const { addPostValidation, updatePostValidation } = require('../validation/post.validation');
const isAuthorized = require("../../../config/isAuthorized");
const { ADD_POST, UPDATE_POST, DELETE_POST, GET_USER_POST, NEWS_FEED, GET_ALL_POST, BLOCK_POST } = require('../../../endPoints/endPoints')


app.post('/addPost', [isAuthorized(ADD_POST), validator(addPostValidation)], addPost);
app.put('/updatePost/:id', [isAuthorized(UPDATE_POST), validator(updatePostValidation)], updatePost);
app.put('/blockPost/:id', [isAuthorized(BLOCK_POST)], blockPost);
app.delete('/deletePost/:id', [isAuthorized(DELETE_POST)], deletePost);
app.get('/getUserPost/:id', [isAuthorized(GET_USER_POST)], getUserPost);
app.get('/newsFeed', [isAuthorized(NEWS_FEED)], newsFeed);
app.get('/getAllPost', [isAuthorized(GET_ALL_POST)], getAllPost);



module.exports = app;