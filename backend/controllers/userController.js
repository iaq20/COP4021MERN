import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

// @desc auth user
//@route POST/api/users/login
// @access Public
const authuser = asyncHandler(async (req, res) => {
    //console.log(req.body);
    const {email, password } = req.body;

    const user = await User.findOne({ email});

    if (user && (await user.matchPassword(password))) {
        generateToken(res,user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
    //res.send('auth user');
});

// @desc register user
//@route POST/api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    //res.send('register user');
    const { name, email, password} = req.body;

    const userExists = await User.findOne({email}); 

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name, 
        email,
        password
    });

    if (user) {
        generateToken(res,user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
    res.status(401);
    throw new Error('Invalid user data');
    }
});

// @desc logout user && clear cookie
//@route POST/api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
    //res.send('logout user');
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Logged out successfully'});
});

// @desc get user profile
//@route GET/api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    //res.send('get user profile');
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('User not found');
    }
});

// @desc auth user
//@route PUT/api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    //res.send('update user profile');

    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            user.password = req.body.password;
        }

        const updateUser = await user.save();

        res.status(201).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('User not found');
    }
});

// @desc  Get user
//@route GET/api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
});

// @desc  Delete user
//@route DELETE/api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});

// @desc  Get user by id
//@route GET/api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by id');
});

// @desc  update user
//@route PUT/api/users
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    //res.send('update user');

    
});

export {
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