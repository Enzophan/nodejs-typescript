import { Request, Response } from 'express';
import { CreateProductInput, FindProductIds, SearchProductInput, UpdateProductInput } from '../schema/product.schema';
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct, findAllProducts, countProducts } from '../services/product.service';
import { GENRE } from '../utils/enums';

export async function searchProductsHandler(req: Request<{}, {}, {}, SearchProductInput["query"]>, res: Response) {
    try {
        const page: number = parseInt(req.query.page as any) || 1;
        const limit: number = parseInt(req.query.limit as any) || 20;
        const search: string = req.query.q || "";
        let sort: string = req.query.sort || "";
        let query = {};
        let options = {};

        if (req.query.q) {
            query = {
                ...query,
                $or: [
                    { title: new RegExp(search.toString(), 'i') },
                    { description: new RegExp(search.toString(), 'i') }
                ]
            }
        }

        if (req.query.sort) {
            options = {
                ...options,
                sort: { price: sort.toString().toUpperCase() }
            }
        }

        const total = await countProducts(query);
        const products = await findAllProducts(query, { ...options, limit: limit, skip: ((page - 1) * limit) });
        return res.send({ data: products, total, page, last_page: Math.ceil(total / limit) });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" })
    }
}


export async function newSearchProductsHandler(req: Request<{}, {}, {}, SearchProductInput["query"]>, res: Response) {
    try {
        const page: number = parseInt(req.query.page as any) || 1;
        const limit: number = parseInt(req.query.limit as any) || 20;
        const search: string = req.query.q || "";
        let sort: string | string[] | undefined = req.query.sort ?? "rating";
        let genre: string | string[] | undefined = req.query.genre ?? "All";
        let tags: string | string[] | undefined = req.query.tags ?? "All";

        let query = {};
        let options = {};

        // const genreOptions = ["action", "music", "technology", "life", "movie"];
        const genreOptions: string[] = Object.values(GENRE);
        genre === "All" ? (genre = [...genreOptions]) : (genre = req.query.genre?.split(","));

        tags === "All" ? (tags = []) : (tags = req.query.tags?.split(","));

        if (search) {
            query = {
                ...query,
                $or: [
                    { title: new RegExp(search.toString(), 'i') },
                    { description: new RegExp(search.toString(), 'i') }
                ]
            }
        }

        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
        let sortBy: { [key: string]: string } = {};

        if (sort[1]) {
            sortBy[sort[0]] = sort[1]
        } else {
            sortBy[sort[0]] = "asc"; // asc or desc
        };

        options = {
            ...options,
            "sort": sortBy
        };

        let countQuery = { ...query };
        if (req.query.genre) {
            countQuery = { ...countQuery, "genre": { $in: genre } };
            query = { ...query, "genre": { $in: genre } }
        };

        if (req.query.tags) {
            countQuery = { ...countQuery, "tags": { $in: tags } };
            query = { ...query, "tags": { $in: tags } }
        };

        // console.log("countQuery ", countQuery)
        // console.log("query ", query)
        // console.log("options ", options)
        // https://www.mongodb.com/docs/manual/reference/operator/query/in/

        const total = await countProducts(countQuery);
        const products = await findAllProducts(query, { ...options, limit: limit, skip: ((page - 1) * limit) });
        return res.send({ data: products, total, page, last_page: Math.ceil(total / limit) });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" })
    }
}


export async function getProductsByIdHandler(req: Request<{}, {}, {}, FindProductIds["query"]>, res: Response) {
    try {
        const ids: string[] = (req.query.productIds as string).split(',');
        let query = {};
        let options = {};
        if (ids.length > 0) {
            query = {
                ...query,
                productId: {
                    $in: [...ids]
                }
            }
        };
        const products = await findAllProducts(query, options);
        return res.send(products);
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" })
    }
}


export async function getAllProductsHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
    const userId = res.locals.user._id;
    const products = await findAllProducts({ user: userId });
    return res.send(products);
}

export async function getProductPublicHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
    try {
        const productId = req.params.productId;
        const product = await findProduct({ productId }, { _id: 0, createdAt: 0, updatedAt: 0 });
        if (!product) return res.status(404).json({ error: true, message: "Not found" });
        return res.send({ data: product });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" })
    }
}

export async function getProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
    try {
        const productId = req.params.productId;
        const product = await findProduct({ productId });
        if (!product) return res.status(404).json({ error: true, message: "Not found" });
        return res.send({ data: product });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" })

    }
}

export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res: Response) {
    try {
        const userId = res.locals.user._id;
        const body = req.body;
        const product = await createProduct({ ...body, user: userId, rating: 0 });
        return res.send(product);
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" })
    }
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