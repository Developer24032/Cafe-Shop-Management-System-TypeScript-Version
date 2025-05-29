import {Schema, Types, model, Document} from 'mongoose';

 export interface ITransaction extends Document{
    product_id: Types.ObjectId[];
    user_id: Types.ObjectId;
    quantity: number;
    price: number;
    date_of_purchase: Date;
 }

const transactionSchema = new Schema<ITransaction>({
    product_id: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: 'Product'
    },

    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
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
},
{
    timestamps: true,
});

const Transaction = model<ITransaction>('Transaction', transactionSchema);
export default Transaction;
