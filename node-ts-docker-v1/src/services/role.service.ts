import Role, { IRole } from "./../models/Role";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";


interface ICreateRoleInput {
    name: IRole["name"];
    createdBy: IRole["createdBy"];
    modules: IRole["modules"];
    isExpired?: IRole["isExpired"]
}

const findRole = async (query: FilterQuery<IRole>, options: QueryOptions = { lean: true }) => {
    return Role.find(query, {}, options)
};

const createRole = async (input: ICreateRoleInput) => {
    return Role.create(input)
}

const editRole = async (query: FilterQuery<IRole>, update: UpdateQuery<IRole>, options: QueryOptions = { lean: true }) => {
    return Role.findOneAndUpdate(query, update, options)
}


const deleteRole = async (query: FilterQuery<IRole>) => {
    return Role.deleteOne(query)
}

export default {
    findRole,
    createRole,
    editRole,
    deleteRole
}