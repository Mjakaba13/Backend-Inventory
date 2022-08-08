import { Router } from 'express';
import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js';

const router = Router();

router.use('/api', userRoutes);
router.use('/api', productRoutes);

export default router;
