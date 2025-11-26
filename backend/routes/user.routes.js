import express from 'express';
import {
  getUsers,
  getUserById,
  getProfile,
  updateProfile,
  createUser,
  updateUser,
  deleteUser,
  upload,
  uploadProfilePicture,
  deleteProfilePicture,
} from '../controllers/user.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Profile picture routes
router.post('/profile/picture', upload.single('profilePicture'), uploadProfilePicture);
router.delete('/profile/picture', deleteProfilePicture);

// Admin only routes
router.get('/', authorize('admin', 'manager'), getUsers);
router.post('/', authorize('admin'), createUser);
router.get('/:id', authorize('admin', 'manager'), getUserById);
router.put('/:id', authorize('admin'), updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

export default router;
