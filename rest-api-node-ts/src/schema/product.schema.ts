import { number, object, string, TypeOf } from 'zod';

const payload = {
    body: object({
        title: string({
            required_error: "Title is required"
        }),
        description: string({
            required_error: "Description is required"
        }).min(120, "Description should be at least 120 characters long"),
        price: number({
            required_error: "Price is required"
        }),
        image: string({
            required_error: "Image is required"
        }),
        genre: string({
            required_error: "Genre is required"
        }),
    })
}

const params = {
    params: object({
        productId: string({
            required_error: "ProductId is required"
        })
    })
}


const queries = {
    query: object({
        q: string().optional(),
        sort: string().optional(),
        page: string().optional(),
        limit: string().optional(),
        genre: string().optional(),
    })
}

export const searchProductSchema = object({
    ...queries
})

export const createProductSchema = object({
    ...payload
})

export const updateProductSchema = object({
    ...payload,
    ...params
})

export const deleteProductSchema = object({
    ...params
})

export const getProductSchema = object({
    ...params
})

export type SearchProductInput = TypeOf<typeof searchProductSchema>
export type CreateProductInput = TypeOf<typeof createProductSchema>
export type UpdateProductInput = TypeOf<typeof updateProductSchema>
export type ReadProductInput = TypeOf<typeof getProductSchema>
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>