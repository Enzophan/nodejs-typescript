import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  email: String;
  firstName: String;
  lastName: String;
  password: String;
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
