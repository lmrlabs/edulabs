import { dbConnect } from "@/utils/dbConnect";
import mongoose from "mongoose";
import { z } from "zod";
import Course from "../models/Course";
import { procedure, router } from "../trpc";

import User from "../models/User";

export const userRouter = router({
  me: procedure.query(async ({ ctx }) => {
    await dbConnect();
    if (!ctx.session) {
      return null;
    }
    return User.findById(ctx.session.user.id);
  }),

  addCourse: procedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await dbConnect();
      const user = await User.findById(ctx.session?.user.id);

      if (!user) {
        throw new Error("User not found.");
      }

      const existingCourse = user.progress.find(
        (course) => course.courseId.toString() === input.courseId.toString()
      );
      if (existingCourse) {
        throw new Error("User already has this course.");
      }

      const course = await Course.findById(input.courseId);
      if (!course) {
        throw new Error("Course not found.");
      }

      const unitsForUser = course.units.map((unit: any) => {
        return {
          unitId: new mongoose.Types.ObjectId(unit._id),
          subunits: unit.subunits.map((subunit: any) => {
            return {
              subunitId: new mongoose.Types.ObjectId(subunit._id),
              progress: 0,
            };
          }),
        };
      });

      let courseIdRecieved = course._id;
      user.progress.push({
        courseId: courseIdRecieved,
        units: unitsForUser,
      });

      await user.save();
      return { message: "Course added successfully." };
    }),

  courses: procedure.query(async ({ input, ctx }) => {
    await dbConnect();
    const user = await User.findById(ctx.session?.user.id).populate({
      path: "progress.courseId",
      model: "Course",
      populate: {
        path: "units.subunits",
        model: "Subunit",
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return { courses: user.progress.map((p) => p.courseId) };
  }),

  course: procedure
    .input(
      z.object({
        courseCode: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      await dbConnect();
      const user = await User.findById(ctx.session?.user.id).populate({
        path: "progress.courseId",
        model: "Course",
        populate: {
          path: "units.subunits",
          model: "Subunit",
        },
      });
      const theCourse = await Course.find({ courseCode: input.courseCode });

      if (!theCourse) {
        throw new Error("Course not found.");
      }

      if (!user) {
        throw new Error("User not found.");
      }

      const course = user.progress.find(
        (course) =>
          course.courseId._id.toString() === theCourse[0]._id.toString()
      );

      if (!course) {
        throw new Error("Course not found.");
      }

      return { course: course.courseId, units: course.units };
    }),
});

export default userRouter;
