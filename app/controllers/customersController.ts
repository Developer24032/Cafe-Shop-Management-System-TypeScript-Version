import {Request, Response} from 'express';
import tryCatchBlock from '../middleware/tryCatchBlock';
import ApplicationError, {ApplicationErrorType} from '../utils/applicationError';
import Customer from '../models/customer';

const addNewCustomer = tryCatchBlock(async (req: Request, res: Response) => {
  const {first_name, last_name, age, gender, phone_number} = req.body;
    if (!first_name || !last_name || !age || !gender || !phone_number) {
        throw new ApplicationError({
            message: 'All fields are required',
            type: ApplicationErrorType.VALIDATION_ERROR
        });
    }
    const newCustomer = new Customer({
        first_name,
        last_name,
        age,
        gender,
        phone_number
    });

    await newCustomer.save();
    res.status(201).json({
        status: 'success',
        data: {
            customer: newCustomer,
        },
        message: 'Customer created successfully',
    });
});

const getAllCustomers = tryCatchBlock(async (req: Request, res: Response) => {
    const customers = await Customer.find();
    if (!customers || customers.length === 0) {
        throw new ApplicationError({
            message: 'No customers found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            customers,
        },
        message: 'Customers retrieved successfully',
    });
});

const getCustomerById = tryCatchBlock(async (req: Request, res: Response) => {
    const {id} = req.params;
    const customer = await Customer.findById(id);
    if (!customer) {
        throw new ApplicationError({
            message: 'Customer not found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            customer,
        },
        message: 'Customer retrieved successfully',
    });
});

const updateCustomer = tryCatchBlock(async (req: Request, res: Response) => {
    const {id} = req.params;
    const {first_name, last_name, age, gender, phone_number} = req.body;
    const customer = await Customer.findByIdAndUpdate(id, {
        first_name,
        last_name,
        age,
        gender,
        phone_number,
    });
    if (!customer) {
        throw new ApplicationError({
            message: 'Customer not found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            customer,
        },
        message: 'Customer updated successfully',
    });
});

const deleteCustomer = tryCatchBlock(async (req: Request, res: Response) => {
    const {id} = req.params;
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
        throw new ApplicationError({
            message: 'Customer not found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(204).json({
        status: 'success',
        data: null,
        message: 'Customer deleted successfully',
    });
});
const getCustomerByPhoneNumber = tryCatchBlock(async (req: Request, res: Response) => {
    const {phone_number} = req.params;
    const customer = await Customer.findOne({phone_number});
    if (!customer) {
        throw new ApplicationError({
            message: 'Customer not found',
            type: ApplicationErrorType.NOT_FOUND,
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            customer,
        },
        message: 'Customer retrieved successfully',
    });
});

export {
    addNewCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    getCustomerByPhoneNumber,
};