import { FilterQuery, ProjectionType, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductDocument } from "../models/product.model";


interface ICreateProductInput {
    user: ProductDocument['user'];
    title: ProductDocument['title'];
    description: ProductDocument['description'];
    price: ProductDocument['price'];
    image: ProductDocument['image'];
    rating: ProductDocument['rating'];
    genre: ProductDocument['genre'];
}

export async function countProducts(query: FilterQuery<ProductDocument>) {
    return ProductModel.count(query)
}

export async function findAllProducts(query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) {
    return ProductModel.find(query, { _id: 1, productId: 1, title: 1, price: 1, image: 1 }, options)
}

export async function createProduct(input: ICreateProductInput) {
    return ProductModel.create(input)
}

export async function findProduct(query: FilterQuery<ProductDocument>, projection: ProjectionType<ProductDocument> = {}, options: QueryOptions = { lean: true }) {
    return ProductModel.findOne(query, projection, options)
}

export async function findAndUpdateProduct(query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>, options: QueryOptions = { lean: true }) {
    return ProductModel.findOneAndUpdate(query, update, options)
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
    return ProductModel.deleteOne(query)
}

