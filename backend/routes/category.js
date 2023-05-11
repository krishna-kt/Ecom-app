const express = require('express');
const router = express.Router();

const {getCategoryById, createCategory, getAllCategory, getCategory, updateCategory, removeCategory} = require('../controllers/category');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');
const {getUserById} = require('../controllers/user');

// Params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//Actual Routes:

// Create routes
router.post('/category/create/:userId', isSignedIn, isAuthenticated, isAdmin, createCategory);

// Read routes
router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategory);

// Update routes
router.put('/category/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, updateCategory);

// Delete routes
router.delete('/category/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, removeCategory);

module.exports = router;

