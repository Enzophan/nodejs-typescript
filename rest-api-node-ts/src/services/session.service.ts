import { FilterQuery } from 'mongoose'
import SessionModel, { SessionDocument } from "../models/session.model";

export async function createSession(userId: string, userAgent: string) {
    try {
        const session = await SessionModel.create({ user: userId, userAgent });
        return session.toJSON()
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function findSession(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}