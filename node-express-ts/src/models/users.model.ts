import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: String;
    firstName: String;
    lastName: String;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    }
});

export default mongoose.model<IUser>('User', UserSchema);