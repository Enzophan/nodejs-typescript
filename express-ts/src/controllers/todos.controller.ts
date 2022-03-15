import { Express, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TodoInstance } from '../models/todos.model';


export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    const id = uuidv4()
    try {
        const record = await TodoInstance.create({ ...req.body, id })
        return res.json({ record, message: "Successfully create" })

    } catch (error) {
        return res.status(400).json({ message: "Somthing went wrong!", errorCode: 500, route: '/api/todos/create' })
    }

}

export const readTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = req.query?.limit as number | undefined;
        const offset = req.query?.offset as number | undefined;
        const records = await TodoInstance.findAll({ where: {}, limit, offset })
        return res.json({ records, message: "Successfully" })
    } catch (error) {
        return res.status(400).json({ message: "Somthing went wrong!", errorCode: 500, route: '/api/todos/read' })
    }
}

export const readTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const record = await TodoInstance.findOne({ where: { id } })
        return res.json({ record, message: "Successfully" })
    } catch (error) {
        return res.status(400).json({ message: "Somthing went wrong!", errorCode: 500, route: '/api/todos/read/:id' })
    }
}

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        let updatedRecord;
        const record = await TodoInstance.findOne({ where: { id } });
        if (!record) {
            return res.json({ message: "not found todo" })
        }

        if (!title) {
            updatedRecord = await record.update({ completed: !record.getDataValue("completed") });
        } else {
            updatedRecord = await record.update({ title: title, completed: completed });
        }

        return res.json({ record: updatedRecord, message: "Updated successfully" })
    } catch (error) {
        return res.status(400).json({ message: "Somthing went wrong!", errorCode: 500, route: '/api/todos/update/:id' })
    }
}

export const deteleTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const record = await TodoInstance.findOne({ where: { id } });
        if (!record) {
            return res.json({ message: "not found todo" })
        }
        const deleteRecord = await record.destroy()
        return res.json({ record: deleteRecord, message: "Deleted successfully" })
    } catch (error) {
        return res.status(400).json({ message: "Somthing went wrong!", errorCode: 500, route: '/api/todos/delete/:id' })
    }
}

