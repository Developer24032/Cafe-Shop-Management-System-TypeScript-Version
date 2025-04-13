import {Schema, model} from 'mongoose';

export interface IProduct{
    product_name: string;
    product_type: ProductType;
    stock: number;
    price: number;
    status: ProductStatus;
    image: string;
    date_of_registery: Date;
}

export enum ProductType{
    Meals = 'Meals',
    Drinks = 'Drinks',
}

export enum ProductStatus{
    Available = 'Available',
    Unavailable = 'Unavailable',
}

const productSchema = new Schema<IProduct>({
    product_name: {
        type: String,
        required: [true, "Product Name must be provided"],
        unique: true,
    },

    product_type: {
        type: String,
        enum: ProductType,
        required: true,
        default: ProductType.Meals,
    },

    stock: {
        type: Number,
        required: true,
        default: 0,
    },

    price: {
        type: Number,
        required: [true, 'Product price must be provided']
    },

    status: {
        type: String,
        enum: ProductStatus,
        required: true,
        default: ProductStatus.Unavailable,
    },

    image: {
        type: String,
        required: [true, 'You must add an image'],
        unique: true,
    },

    date_of_registery: {
        type: Date,
        default: Date.now(),
    }
});

const Product = model<IProduct>('Product', productSchema);
export default Product;
