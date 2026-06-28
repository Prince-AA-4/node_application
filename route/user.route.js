import express from 'express'
import { Router } from "express";
import { registerUser, loginUser,getAllUsers,updateUserDetails }  from '../controller/user.controller.js';
import validateRequest from '../middleware/validation.middleware.js';
import { registerationSchema, loginSchema, updateUserSchema } from '../validation/user.schema.js';
import { authenticateRequest } from '../middleware/authmiddleware.js';

const router = express.Router();


router.post('/register',validateRequest(registerationSchema), registerUser)
router.post("/login", validateRequest(loginSchema), loginUser);
router.get('/', getAllUsers)
router.patch('/update/:id', authenticateRequest, validateRequest(updateUserSchema), updateUserDetails)



export default router;