import {Schema, model} from 'mongoose';

export interface IEmployee{
	username: string;
	password: string;
	question: Questions;
	answer: string;
	registery_date: Date;
}

export enum Questions{
    first_question = 'What is your favourite color?',
    second_question = 'Wnat is your favourite food?',
    third_question = 'What is your favourite sport?'
}

const employeeSchema = new Schema<IEmployee>({
    username: {
        type: String,
        required: [true, 'Username must be provided'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Password must be provided'],
        minlength: [10, 'Password must be at least 10 characters'],
        maxlength: [20, 'Password must be at most 20 characters']
    },

    question: {
        type: String,
        enum: Questions,
        required: true,
    },

    answer: {
        type: String,
        required: [true, 'Security answer must be provided'],
    },

    registery_date: {
        type: Date,
        default: Date.now(),
    },
});

const Employee = model<IEmployee>('Employee', employeeSchema);
export default Employee;
