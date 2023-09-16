import mongoose from "mongoose";
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10)

interface ICategoryDocument extends mongoose.Document {
    categoryId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true,
        unique: true,
        default: () => `product_${nanoid()}`
    },
    name: {
        type: String,
        require: true,
    }
}, {
    timestamps: true
})

const CategoryModel = mongoose.model<ICategoryDocument>("Category", categorySchema);

export default CategoryModel