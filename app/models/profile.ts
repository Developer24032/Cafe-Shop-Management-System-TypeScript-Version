import { Schema, Types, model } from "mongoose";

export interface IProfile {
	customer: Types.ObjectId;
	group: Types.ObjectId;
	times: string[];
	daysInterval: number;
	posts: Types.ObjectId[];
	lastPublished: Date;
	type: profileType;
	access: accessType;
}

export enum profileType {
	Group,
	Page,
}

export enum accessType {
	Cookies,
	accessToken,
}

const ProfileSchema = new Schema<IProfile>(
	{
		customer: {
			type: Schema.Types.ObjectId,
			ref: "Customer",
			required: true,
		},
		group: {
			type: Schema.Types.ObjectId,
			ref: "Group",
			required: true,
		},
		times: {
			type: [String],
			required: true,
			default: ["2000"], // in hhmm format. ex: 2000 means hour: 20, minutes: 00
		},
		daysInterval: {
			type: Number,
			required: true,
			default: 1,
		},
		posts: {
			type: [Schema.Types.ObjectId],
			ref: "Posts",
			required: true,
			default: [],
		},
		type: {
			type: Number,
			enum: profileType,
			required: true,
			default: profileType.Group,
		},
		access: {
			type: Number,
			enum: accessType,
			required: true,
			default: accessType.Cookies,
		},
	},
	{
		timestamps: true,
	}
);

const Profile = model<IProfile>("Profile", ProfileSchema);
export default Profile;