import {Request, Response, NextFunction} from 'express';
import tryCatchBlock from '../middleware/tryCatchBlock';
import ApplicationError, {ApplicationErrorType} from '../utils/applicationError';
import Transaction from '../models/transaction';

const createTransaction = tryCatchBlock(async (req: Request, res: Response) => {
    const {customer_id, product_id, quantity, price} = req.body;

    if (!customer_id || !product_id || !quantity || !price) {
        throw new ApplicationError({
            message: 'All fields are required',
            type: ApplicationErrorType.VALIDATION_ERROR
        });
    }

    const newTransaction = new Transaction({
        customer_id,
        product_id,
        quantity,
        price,
    });

    await newTransaction.save();

    res.status(201).json({
        status: 'success',
        data: {
            transaction: newTransaction,
        },
        message: 'Transaction created successfully',
    });
});

const getAllTransactions = tryCatchBlock(async (req: Request, res: Response) => {
    const transactions = await Transaction.find().populate('customer_id').populate('product_id');

    if (!transactions || transactions.length === 0) {
        throw new ApplicationError({
            message: 'No transactions found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            transactions,
        },
        message: 'Transactions retrieved successfully',
    });
});

const getTransactionById = tryCatchBlock(async (req: Request, res: Response) => {
    const {id} = req.params;

    const transaction = await Transaction.findById(id).populate('customer_id').populate('product_id');
    if (!transaction) {
        throw new ApplicationError({
            message: 'Transaction not found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            transaction,
        },
        message: 'Transaction retrieved successfully',
    });
});

const updateTransaction = tryCatchBlock(async (req: Request, res: Response) => {
    const {id} = req.params;
    const {customer_id, product_id, quantity, price} = req.body;

    const transaction = await Transaction.findByIdAndUpdate(id, {
        customer_id,
        product_id,
        quantity,
        price,
    }, {new: true}).populate('customer_id').populate('product_id');

    if (!transaction) {
        throw new ApplicationError({
            message: 'Transaction not found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            transaction,
        },
        message: 'Transaction updated successfully',
    });
});

const deleteTransaction = tryCatchBlock(async (req: Request, res: Response) => {
    const {id} = req.params;

    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
        throw new ApplicationError({
            message: 'Transaction not found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Transaction deleted successfully',
    });
});

export {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
};