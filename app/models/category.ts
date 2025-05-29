import mongoose from 'mongoose';

export interface Icategory extends mongoose.Document {
    name: string;
    description?: string;
}

const categorySchema = new mongoose.Schema<Icategory>({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Category description is required'],
    }
}, {
    timestamps: true,
});

const Category = mongoose.model<Icategory>('Category', categorySchema);
export default Category;
// This code defines a Category model for a MongoDB database using Mongoose.
// The model includes fields for name and description, both of which are required.
// The name field is also unique, ensuring no two categories can have the same name.
// The schema is set to automatically manage timestamps for creation and updates.