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

      user.progress.push({
        courseId: course._id,
        units: unitsForUser,
      });

      await user.save();
      return { message: "Course added successfully." };
    }),

  myCourses: procedure.query(async ({ input, ctx }) => {
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

  myCourse: procedure
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

  updateProgress: procedure
    .input(
      z.object({
        courseId: z.string(),
        unitId: z.string(),
        subunitId: z.string(),
        newProgress: z
        .union([z.string(), z.number()])
        .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val)),      })
    )
    .mutation(async ({ input, ctx }) => {
      await dbConnect();
      const userId = ctx.session?.user.id;
      try {
        const { courseId, unitId, subunitId, newProgress } = input;

        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found.");
        }

        const courseIndex = user.progress.findIndex(
          (course) => course.courseId.toString() === courseId
        );

        if (courseIndex === -1) {
          throw new Error("Course not found.");
        }

        const unitIndex = user.progress[courseIndex].units.findIndex(
          (unit) => unit.unitId.toString() === unitId
        );

        if (unitIndex === -1) {
          throw new Error("Unit not found.");
        }

        const subunitIndex = user.progress[courseIndex].units[
          unitIndex
        ].subunits.findIndex(
          (subunit) => subunit.subunitId.toString() === subunitId
        );

        if (subunitIndex === -1) {
          throw new Error("Subunit not found.");
        }

        // Update progress
        user.progress[courseIndex].units[unitIndex].subunits[
          subunitIndex
        ].progress+=newProgress;

        // Save the updated user document
        await user.save();

        return { message: "Progress updated successfully." };
      } catch (error) {
        console.error(error);
        throw error;
      }
    }),
});

export default userRouter;
