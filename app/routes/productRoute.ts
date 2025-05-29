import express, { Router } from 'express';
import {
    addNewProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct } from '../controllers/productsController';

const router = Router();
router.use(express.json());
router.post('/', addNewProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
export default router;
