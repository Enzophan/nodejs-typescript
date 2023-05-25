import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface ISession extends Document {
  userId: IUser["_id"];
  access_token: String;
  refresh_token: String;
  userAgent: String;
  isExpired: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    access_token: {
      type: String,
      require: true,
    },
    refresh_token: {
      type: String,
      require: true,
    },
    userAgent: { type: String },
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISession>("Session", SessionSchema);
