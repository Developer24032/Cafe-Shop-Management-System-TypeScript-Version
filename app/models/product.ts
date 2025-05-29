import {Schema, model, Types} from 'mongoose';

export interface IProduct{
    name: string;
    description?: string;
    price: number;
    categoryID: Types.ObjectId;
    imageUrl: string;
}

export enum ProductStatus{
    Available = 'Available',
    Unavailable = 'Unavailable',
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: [true, "Product Name must be provided"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Product Description must be provided"],
        default: '',
    },
    price: {
        type: Number,
        required: [true, "Product Price must be provided"],
        min: [0, "Price cannot be negative"],
    },
    categoryID: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Category ID must be provided"],
    },
    imageUrl: {
        type: String,
        required: [true, "Image URL must be provided"],
        default: '',
    },
});

const Product = model<IProduct>('Product', productSchema);
export default Product;
