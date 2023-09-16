import { Express, Request, Response } from "express";
import { createProductHandler, deleteProductHandler, getAllProductsHandler, getProductHandler, newSearchProductsHandler, searchProductsHandler, updateProductHandler } from "./controllers/product.controller";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource"
import { createProductSchema, deleteProductSchema, getProductSchema, searchProductSchema, updateProductSchema } from "./schema/product.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";


function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => {
        return res.sendStatus(200)
    })

    app.post('/api/users', validateResource(createUserSchema), createUserHandler);
    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler);
    app.get('/api/sessions', requireUser, getUserSessionHandler);
    app.delete('/api/sessions', requireUser, deleteSessionHandler);

    app.get('/api/products', validateResource(searchProductSchema), searchProductsHandler);
    app.get('/api/v2/products', validateResource(searchProductSchema), newSearchProductsHandler);
    app.get('/api/all-product', [requireUser], getAllProductsHandler);
    app.get('/api/product/:productId', [requireUser, validateResource(getProductSchema)], getProductHandler);
    app.post('/api/product', [requireUser, validateResource(createProductSchema)], createProductHandler);
    app.put('/api/product/:productId', [requireUser, validateResource(updateProductSchema)], updateProductHandler);
    app.delete('/api/product/:productId', [requireUser, validateResource(deleteProductSchema)], deleteProductHandler);
}

export default routes