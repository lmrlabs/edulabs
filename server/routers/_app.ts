import { z } from "zod";
import { dbConnect } from "@/utils/dbConnect";
import mongoose from "mongoose";
import { procedure, router } from "../trpc";
import { userRouter } from "./UserRouter";
import courseRouter from "./CourseRouter";

import Course from "../models/Course";

export const appRouter = router({
  user: userRouter,
  course: courseRouter,
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
