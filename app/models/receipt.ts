import { Schema, Types, model } from 'mongoose';

export interface IReceipt{
    customer_id: Types.ObjectId;
    total_price: number;
    date: Date;
    employee_username: string;
}

const receiptSchema = new Schema<IReceipt>({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'You must enter a Customer ID'],
        unique: false,

    },

    total_price: {
        type: Number,
        required: true,
        default: 0.0,
    },

    date: {
        type: Date,
        required: false,
        default: Date.now(),
    },

    employee_username: {
        type: String,
        required: [true, 'Empployee Name Must be provided'],
        unique: false,
    },
});

const Receipt = model<IReceipt>('Receipt', receiptSchema);
export default Receipt;
