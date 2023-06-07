import { Request, Response, NextFunction } from "express";
import RoleService from "./../services/role.service";


const findRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let query = {};
        let options = {};

        const roles = await RoleService.findRole(query, options);
        return res.send({ roles })
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
        next();
    }
}

const createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = res.locals.user?._id;
        const role = await RoleService.createRole({
            name: req.body.name,
            createdBy: userId,
            modules: req.body.modules
        });
        return res.send({ role })
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
        next();
    }
}


const editRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = res.locals.user?._id;
        const query = {
            _id: req.params.id
        };
        const update = { ...req.body, createdBy: userId };
        const options = { new: true };
        const role = await RoleService.editRole(
            query,
            update,
            options
        );
        return res.send({ role })
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
        next();
    }
}

const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await RoleService.deleteRole({ _id: req.params.id });
        return res.sendStatus(200);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
        next();
    }
}

export default {
    findRole,
    createRole,
    editRole,
    deleteRole
}