import {Request, Response} from 'express';
import tryCatchBlock from '../middleware/tryCatchBlock';
import ApplicationError, {ApplicationErrorType} from '../utils/applicationError';
import Product from '../models/product';

const createReceipt = tryCatchBlock(async (req: Request, res: Response) => {
    const {productId, quantity, total_price} = req.body;
    if (!productId || !quantity || !total_price) {
        throw new ApplicationError({
            message: 'All fields are required',
            type: ApplicationErrorType.VALIDATION_ERROR
        });
    }
    const newReceipt = new Product({
        productId,
        quantity,
        total_price
    });

    await newReceipt.save();
    res.status(201).json({
        status: 'success',
        data: {
            receipt: newReceipt,
        },
        message: 'Receipt created successfully',
    });
});

const getAllReceipts = tryCatchBlock(async (req: Request, res: Response) => {
    const receipts = await Product.find();
    if (!receipts || receipts.length === 0) {
        throw new ApplicationError({
            message: 'No receipts found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            receipts,
        },
        message: 'Receipts retrieved successfully',
    });
});

const getReceiptById = tryCatchBlock(async (req: Request, res: Response) => {
    const {id} = req.params;
    const receipt = await Product.findById(id);
    if (!receipt) {
        throw new ApplicationError({
            message: 'Receipt not found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            receipt,
        },
        message: 'Receipt retrieved successfully',
    });
});

const updateReceipt = tryCatchBlock(async (req: Request, res: Response) => {
    const {id} = req.params;
    const {productId, quantity, total_price} = req.body;
    const updatedReceipt = await Product.findByIdAndUpdate(id, {
        productId,
        quantity,
        total_price
    }, {new: true});
    if (!updatedReceipt) {
        throw new ApplicationError({
            message: 'Receipt not found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            receipt: updatedReceipt,
        },
        message: 'Receipt updated successfully',
    });
});

const deleteReceipt = tryCatchBlock(async (req: Request, res: Response) => {
    const {id} = req.params;
    const deletedReceipt = await Product.findByIdAndDelete(id);
    if (!deletedReceipt) {
        throw new ApplicationError({
            message: 'Receipt not found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(204).json({
        status: 'success',
        message: 'Receipt deleted successfully',
    });
});

export default {
    createReceipt,
    getAllReceipts,
    getReceiptById,
    updateReceipt,
    deleteReceipt
};
