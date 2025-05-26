import {Schema, Types, model} from 'mongoose';

export interface ICreditCard{
    type: CreditCardType;
    customer_ID: Types.ObjectId;
    card_number: number;
    cvv: number;
    expiry_date: Date;
}

enum CreditCardType{
    AmericanExpress = "American Express",
    MasterCard = "Master Card",
    VISA = "VISA",
    JCB = "JCB",

}

const creditCardSchema = new Schema<ICreditCard>({
    type: {
        type: String,
        enum: CreditCardType,
        required: true,
        default: CreditCardType.VISA,
    },

    customer_ID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },

    card_number: {
        type: Number,
        required: [true, 'Card Number is required'],
        unique: true,
    },

    cvv: {
        type: Number,
        required: [true, 'The CVV must be provided'],
    },

    expiry_date: {
        type: Date,
        required: [true, 'Expiry date is required']
    }
},
{
    timestamps: true,
});

const CreditCard = model<ICreditCard>('CreditCard', creditCardSchema);
export default CreditCard;
