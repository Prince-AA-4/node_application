import express from 'express';
import { Router } from 'express';
import validateRequest from '../middleware/validation.middleware.js';
import { postSchema } from '../validation/post.schema.js';
import { createPost, deletePost, getAllPosts, getASinglePost } from '../controller/post.controller.js';
import { authenticateRequest } from '../middleware/authmiddleware.js';

const router = express.Router();


router.post('/post', authenticateRequest, validateRequest(postSchema), createPost)
router.get('/', getAllPosts);
router.get('/:id', authenticateRequest, getASinglePost)
router.delete('/delete/:id', authenticateRequest, deletePost)
// work on the updatePost route

export default router;

