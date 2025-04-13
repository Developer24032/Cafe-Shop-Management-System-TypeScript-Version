import { Schema, model } from "mongoose";

export interface ICustomer {
	first_name: string;
	last_name: string;
	age: number;
	gender: CustomerGender;
	phone_number: number;

}

enum CustomerGender{
	Male = 'M',
	Female = 'F'
}

const CustomerSchema = new Schema<ICustomer>(
	{
		first_name: {
			type: String,
			required: [true, 'A first name is required'],
			minlength: [7, 'The first name must have at least 7 characters'],
			maxlength: [20, 'The first name mustn\'t have more then 20 characters'],
		},

		last_name: {
			type: String,
			required: [true, 'A last name is required'],
			minlength: [7, 'The last name must have at least 7 characters'],
			maxlength: [20, 'The last name mustn\'t have more then 20 characters'],
		},

		age: {
			type: Number,
			required: [true, 'An age must be provided'],
			min: [20, '20 is the minimum age'],
			max: [120, '120 is the meximum age'],
		},

		gender: {
			type: String,
			enum: CustomerGender,
			required: [true, 'Age is required'],
		},
	},
	{
		timestamps: true,
	}
);

const Customer = model<ICustomer>("Customer", CustomerSchema);

export default Customer;