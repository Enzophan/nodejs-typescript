import { Request, Response } from 'express';
import { CreateProductInput, SearchProductInput, UpdateProductInput } from '../schema/product.schema';
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct, findAllProducts, countProducts } from '../services/product.service';


export async function searchProductsHandler(req: Request<{}, {}, {}, SearchProductInput["query"]>, res: Response) {
    const page: number = parseInt(req.query.page as any) || 1;
    const limit: number = parseInt(req.query.limit as any) || 5;
    let query = {};
    let options = {};
    if (req.query.q) {
        query = {
            ...query,
            $or: [
                { title: new RegExp(req.query.q.toString(), 'i') },
                { description: new RegExp(req.query.q.toString(), 'i') }
            ]
        }
    }

    if (req.query.sort) {
        options = {
            ...options,
            sort: { price: req.query.sort.toString().toUpperCase() }
        }
    }

    const total = await countProducts(query);
    const products = await findAllProducts(query, { ...options, limit: limit, skip: ((page - 1) * limit) });
    return res.send({ data: products, total, page, last_page: Math.ceil(total / limit) });
}

export async function getAllProductsHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
    const userId = res.locals.user._id;
    const products = await findAllProducts({ user: userId });
    return res.send(products);
}


export async function getProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
    const productId = req.params.productId;
    const product = await findProduct({ productId });
    if (!product) return res.sendStatus(404);

    return res.send(product);
}

export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res: Response) {
    const userId = res.locals.user._id;
    const body = req.body;
    const product = await createProduct({ ...body, user: userId });
    return res.send(product);
}

export async function updateProductHandler(req: Request<UpdateProductInput["params"], {}, UpdateProductInput["body"]>, res: Response) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;
    const product = await findProduct({ productId });
    if (!product) return res.sendStatus(404);

    if (String(product.user) !== userId) return res.sendStatus(403);

    const updatedProduct = await findAndUpdateProduct({ productId }, update, { new: true })
    return res.send(updatedProduct)
}



export async function deleteProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const product = await findProduct({ productId });
    if (!product) return res.sendStatus(404);

    if (String(product.user) !== userId) return res.sendStatus(403);

    await deleteProduct({ productId });
    return res.sendStatus(200)
}