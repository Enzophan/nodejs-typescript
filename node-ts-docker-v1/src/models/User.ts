import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IRole } from "./Role";

export interface IUser extends Document {
  email: String;
  firstName: String;
  lastName: String;
  password: String;
  useType: String;
  role?: IRole["_id"];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      require: true,
      trim: true,
    },
    lastName: {
      type: String,
      require: false,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    useType: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    }
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  let user = this as IUser;

  if (!user.isModified("password")) {
    return next();
  }
  const rounds =
    process.env["SALT"] !== undefined ? parseInt(process.env["SALT"]) : 10;

  const salt = await bcrypt.genSalt(rounds);
  const hashPassword = bcrypt.hashSync(user.password.toString(), salt);
  user.password = hashPassword;
  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUser;

  return bcrypt
    .compare(candidatePassword, user.password.toString())
    .catch((e) => false);
};

export default mongoose.model<IUser>("User", UserSchema);
