import {Schema, Types, model} from 'mongoose';

 export interface ITransaction{
    customer_id: Types.ObjectId;
    product_id: Types.ObjectId;
    quantity: number;
    price: number;
    date_of_purchase: Date;
 }

const transactionSchema = new Schema<ITransaction>({
    customer_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Customer',
    },

    product_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },

    quantity: {
        type: Number,
        required: true,
        default: 0,
    },

    price: {
        type: Number,
        required: true,
        default: 0.00,
    },

    date_of_purchase: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

const Transaction = model<ITransaction>('Transaction', transactionSchema);
export default Transaction;
