import {Request, Response } from 'express';
import Category from '../models/category';
import tryCatchBlock from '../middleware/tryCatchBlock';
import ApplicationError, {ApplicationErrorType, ApplicationErrorProps} from '../utils/applicationError';

const addNewCategory = tryCatchBlock(async (req: Request, res: Response) => {
    const { name, description } = req.body;
    if (!name || !description) {
        throw new ApplicationError({
            type: ApplicationErrorType.VALIDATION_ERROR,
            message: 'Name and description are required fields',
        });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        throw new ApplicationError({
            type: ApplicationErrorType.VALIDATION_ERROR,
            message: 'Category with this name already exists',
        });
    }

    const category = await Category.create({ name, description });
    res.status(201).json({
        status: 'success',
        statusCode: 201,
        message: 'Category created successfully',
        data: { category }
    });
});

const getAllCategories = tryCatchBlock(async (req: Request, res: Response) => {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
        throw new ApplicationError({
            type: ApplicationErrorType.NOT_FOUND,
            message: 'No categories found',
        });
    }
    res.status(200).json({
        status: 'success',
        statusCode: 200,
        data: { categories },
        message: 'Categories retrieved successfully',
    });
});

const getCategoryById = tryCatchBlock(async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
        throw new ApplicationError({
            type: ApplicationErrorType.NOT_FOUND,
            message: 'Category not found',
        });
    }
    res.status(200).json({
        status: 'success',
        statusCode: 200,
        data: { category },
        message: 'Category retrieved successfully',
    });
});

const updateCategory = tryCatchBlock(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
        throw new ApplicationError({
            type: ApplicationErrorType.VALIDATION_ERROR,
            message: 'Name and description are required fields',
        });
    }

    const category = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!category) {
        throw new ApplicationError({
            type: ApplicationErrorType.NOT_FOUND,
            message: 'Category not found',
        });
    }
    res.status(200).json({
        status: 'success',
        statusCode: 200,
        data: { category },
        message: 'Category updated successfully',
    });
});

const deleteCategory = tryCatchBlock(async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        throw new ApplicationError({
            type: ApplicationErrorType.NOT_FOUND,
            message: 'Category not found',
        });
    }
    res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Category deleted successfully',
    });
});

export default {
    addNewCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
