import {Request, Response} from 'express';
import tryCatchBlock from '../middleware/tryCatchBlock';
import ApplicationError, {ApplicationErrorType} from '../utils/applicationError';
import Product from '../models/product';

const addNewProduct = tryCatchBlock(async (req: Request, res: Response) => {
    const {name, description, price, category} = req.body;
    const existingProduct = await Product.findOne({ _id: req.params.id, name: name });
    if (!name || !description || !price || !category) {
        throw new ApplicationError({
            message: 'All fields are required',
            type: ApplicationErrorType.VALIDATION_ERROR
        });
    }
    else if (existingProduct) {
        throw new ApplicationError({
            message: 'Product with this name already exists',
            type: ApplicationErrorType.VALIDATION_ERROR
        });
    }
    else if (price < 0) {
        throw new ApplicationError({
            message: 'Price cannot be negative',
            type: ApplicationErrorType.VALIDATION_ERROR
        });
    }
    else if (typeof name !== 'string' || typeof description !== 'string' || typeof price !== 'number' || typeof category !== 'string') {
        throw new ApplicationError({
            message: 'Invalid data types provided',
            type: ApplicationErrorType.VALIDATION_ERROR
        });
    }

    const newProduct = new Product({
        name,
        description,
        price,
        category
    });

    await newProduct.save();
    res.status(201).json({
        status: 'success',
        data: {
            product: newProduct,
        },
        message: 'Product created successfully',
    });
});

const getAllProducts = tryCatchBlock(async (req: Request, res: Response) => {
    const products = await Product.find();
    if (!products || products.length === 0) {
        throw new ApplicationError({
            message: 'No products found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            products,
        },
        message: 'Products retrieved successfully',
    });
});

const getProductById = tryCatchBlock(async (req: Request, res: Response) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new ApplicationError({
            message: 'Product not found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            product,
        },
        message: 'Product retrieved successfully',
    });
});

const updateProduct = tryCatchBlock(async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, description, price, category} = req.body;
    const product = await Product.findByIdAndUpdate(id, {
        name,
        description,
        price,
        category,
    });
    if (!product) {
        throw new ApplicationError({
            message: 'Product not found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            product,
        },
        message: 'Product updated successfully',
    });
});

const deleteProduct = tryCatchBlock(async (req: Request, res: Response) => {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        throw new ApplicationError({
            message: 'Product not found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(204).json({
        status: 'success',
        data: null,
        message: 'Product deleted successfully',
    });
});

export {
    addNewProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};