import mongoose from "mongoose";
import { customAlphabet } from 'nanoid';
import { UserDocument } from "./user.model";
import { GENRE } from "../utils/enums"

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10)

export interface ProductDocument extends mongoose.Document {
    productId: string;
    user: UserDocument['_id'];
    title: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    genre: string;
    tags: string[]
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        default: () => `product_${nanoid()}`
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    genre: {
        type: String,
        enum: GENRE,
        default: "technology"
    },
    tags: {
        type: [String],
    }
}, {
    timestamps: true
});

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel