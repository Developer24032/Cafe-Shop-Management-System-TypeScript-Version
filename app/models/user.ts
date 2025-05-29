import {Schema, model, Document} from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    phone_number?: string;
    address?: string;
    isActive: boolean;
    // Additional fields can be added as needed, such as profile picture, date of birth, etc.
    // Methods can also be added for user-specific functionality, such as password hashing, etc.
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regex pattern for email validation
        lowercase: true, // Convert email to lowercase
        trim: true, // Trim whitespace from email
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    role: {
        type: String,
        enum: Object.values(UserRole), // Ensure role is one of the defined UserRole values
        default: UserRole.USER, // Default role is USER
    },
    phone_number: {
        type: String,
        required: false, // Optional field
        minlength: 11, // Minimum length for phone number
        maxlength: 11, // Maximum length for phone number
        match: /^\d{11}$/, // Regex pattern for phone number
    },
    address: {
        type: String,
        required: false, // Optional field
        maxlength: 255, // Maximum length for address
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});

const User = model<IUser>('User', userSchema);
export default User;
// This code defines a User model for a MongoDB database using Mongoose.
// The model includes fields for username, password, role ID, email, first name, last name, and an active status.
// It also includes validation rules for required fields and uniqueness constraints for username and email.
// The schema is set to automatically manage timestamps for creation and updates.