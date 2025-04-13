import { Schema, model, Types } from "mongoose";

export interface IProductData {
	id: Types.ObjectId;
	group: Types.ObjectId;
	versions: ProductDataVersion[];
}

export interface ProductDataVersion {
	text: string;
	files: string[];
}

const PostDataSchema = new Schema<IProductData>(
	{
		versions: {
			type: [
				{
					_id: false,
					text: { type: String, required: true },
					files: { type: [String], required: true, default: [] },
				},
			],
			required: true,
		},
		group: { type: Schema.Types.ObjectId, ref: "Group", required: true },
	},
	{
		timestamps: true,
		collection: "postsdata",
	}
);

const ProductData = model<IProductData>("Profile", PostDataSchema);
export default ProductData;