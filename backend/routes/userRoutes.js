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

router.route('/').post(registerUser).get(getUsers);
router.post('/logout',logoutUser);
router.post('/login', authuser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);

//router.route('/:id').get(getUserById); 


export default router; 