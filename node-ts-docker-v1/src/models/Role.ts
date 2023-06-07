import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";


interface IAction extends Document {
  name: String;
  isActive: Boolean;
}

interface IModule extends Document {
  name: String;
  key: String;
  actions: IAction[]
}

export interface IRole extends Document {
  name: String;
  createdBy: IUser["_id"];
  modules: IModule[];
  isExpired: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

const actionObjectSchema: Schema = new Schema({
  name: {
    type: String,
    require: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
}, { _id: false })

const moduleObjectSchema: Schema = new Schema({
  name: {
    type: String,
    require: true
  },
  key: {
    type: String
  },
  actions: [actionObjectSchema]
}, { _id: false })

const RolesSchema: Schema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    modules: [moduleObjectSchema],
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRole>("Role", RolesSchema);
