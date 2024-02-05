import express from "express";
const router = express.Router();
import {
    authuser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById
}
 from "../controllers/userController.js";
 import { protect, admin } from "../middleware/authMiddleware.js";

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout',logoutUser);
router.post('/auth', authuser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin,updateUser);

//router.route('/:id').get(getUserById); 


export default router; 