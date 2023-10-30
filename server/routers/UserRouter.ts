import { z } from "zod";
import { dbConnect } from "@/utils/dbConnect";
import mongoose, { Schema } from "mongoose";
import { procedure, router } from "../trpc";
import Course from "../models/Course";

import User from "../models/User";

export const userRouter = router({
  addCourse: procedure
    .input(
      z.object({
        userId: z.string(),
        courseId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await dbConnect();
      const user = await User.findById(input.userId);

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

  courses: procedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      await dbConnect();
      const user = await User.findById(input.userId).populate({
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
        userId: z.string(),
        courseId: z.string(),
      })
    )
    .query(async ({ input }) => {
      await dbConnect();
      const user = await User.findById(input.userId).populate({
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
      const course = user.progress.find(
        (course) => course.courseId._id.toString() === input.courseId.toString()
      );

      if (!course) {
        throw new Error("Course not found.");
      }

      return { course: course.courseId, units: course.units };
    }),
});

export default userRouter;
