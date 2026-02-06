const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const pageController = require('../controllers/pageController');
const authMiddleware = require('../middleware/authMiddleware');

// --- Auth Routes ---
router.post("/auth/register", userController.register);
router.post("/auth/login", userController.login);
router.get("/auth/me", authMiddleware, userController.getMe);

// --- User Routes ---
router.get("/users/:userId", authMiddleware, userController.getProfile);
router.put("/users/:userId", authMiddleware, userController.updateProfile);
router.put("/users/:userId/password", authMiddleware, userController.changePassword);
router.post("/users/:userId/favorites", authMiddleware, userController.addFavorite);
router.delete("/users/:userId/favorites/:bookId", authMiddleware, userController.removeFavorite);
router.get("/users/:userId/stats", authMiddleware, userController.getStats);
router.post("/users/:userId/heartbeat", authMiddleware, userController.updateHeartbeat);

// --- Page/Content Routes (Books, Borrows, News) ---
router.get("/books", pageController.getAllBooks);
router.get("/books/search", pageController.searchBooks);
router.get("/books/:id", pageController.getBookById);
router.get("/books/:id/read", pageController.getBookContent);
router.post("/books", authMiddleware, pageController.createBook);
router.put("/books/:id", authMiddleware, pageController.updateBook);
router.delete("/books/:id", authMiddleware, pageController.deleteBook);

router.post("/borrows", authMiddleware, pageController.borrowBook);
router.get("/borrows/user/:userId", authMiddleware, pageController.getUserBorrows);
router.put("/borrows/:borrowId/return", authMiddleware, pageController.returnBook);
router.get("/borrows", authMiddleware, pageController.getAllBorrows);

router.get("/news", pageController.getAllNews);
router.get("/news/:id", pageController.getNewsById);
router.post("/news", authMiddleware, pageController.createNews); 
router.put("/news/:id", authMiddleware, pageController.updateNews);
router.delete("/news/:id", authMiddleware, pageController.deleteNews);

// --- Admin Routes ---
router.get("/admin/stats", authMiddleware, adminController.getDashboardStats);
router.get("/admin/users", authMiddleware, adminController.getAllUsers);
router.put("/admin/users/:userId/role", authMiddleware, adminController.updateUserRole);
router.delete("/admin/users/:userId", authMiddleware, adminController.deleteUser);
router.get("/admin/logs", authMiddleware, adminController.getActivityLogs);

module.exports = router;
