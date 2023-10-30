import mongoose from "mongoose";

interface ISubunit {
  title: string;
}

interface IUnit {
  title: string;
  subunits: ISubunit[];
}

interface ICourse {
  name: string;
  courseCode: string;
  units: IUnit[];
  description?: string;
}

const subunitSchema = new mongoose.Schema<ISubunit>({
  title: {
    type: String,
    required: true,
  },
});

const unitSchema = new mongoose.Schema<IUnit>({
  title: {
    type: String,
    required: true,
  },
  subunits: [subunitSchema],
});

const courseSchema = new mongoose.Schema<ICourse>({
  name: {
    type: String,
    required: true,
  },
  courseCode: String,
  units: [unitSchema],
  description: {
    type: String,
  },
});

let Course: mongoose.Model<ICourse>;

if (mongoose.models.Course) {
  Course = mongoose.model<ICourse>("Course");
} else {
  Course = mongoose.model<ICourse>("Course", courseSchema, "newcourses");
}

export default Course;
