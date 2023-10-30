import mongoose, { Document, Model, Schema } from "mongoose";

interface IUserProgressSubunit {
  subunitId: Schema.Types.ObjectId;
  progress: number;
}

interface IUserProgressUnit {
  unitId: Schema.Types.ObjectId;
  subunits: IUserProgressSubunit[];
}

interface IUserProgressCourse {
  courseId: Schema.Types.ObjectId;
  units: IUserProgressUnit[];
}

interface IUser {
  name: string;
  email: string;
  image?: string;
  progress: IUserProgressCourse[];
}

interface UserModel extends IUser, Document {}

const UserProgressSubunitSchema = new Schema<IUserProgressSubunit>({
  subunitId: {
    type: Schema.Types.ObjectId,
    ref: "Subunit",
  },
  progress: {
    type: Number,
    default: 0, // Progress out of 6
  },
});

const UserProgressUnitSchema = new Schema<IUserProgressUnit>({
  unitId: {
    type: Schema.Types.ObjectId,
    ref: "Unit",
  },
  subunits: [UserProgressSubunitSchema],
});

const UserProgressCourseSchema = new Schema<IUserProgressCourse>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  units: [UserProgressUnitSchema],
});

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
  },
  progress: [UserProgressCourseSchema],
});

const User: Model<UserModel> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
