import {z} from "zod";
import {dbConnect} from "@/utils/dbConnect";
import mongoose, {Schema} from "mongoose";
import {procedure, router} from "../trpc";


import Course from "../models/Course";

export const courseRouter = router({
/*
        COURSES APIS
     */

    //add course to db
    addCourse: procedure
        .input(
            z.object({
                name: z.string(),
                units: z.array(
                    z.object({
                        title: z.string(),
                        subunits: z.array(
                            z.object({
                                title: z.string(),
                            })
                        ),
                    })
                ),
                description: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            await dbConnect();

            try {
                const newCourse = new Course(input);
                await newCourse.save();
                return { message: "Course added successfully." };
            } catch (error) {
                if ((error as any).code === 11000) {
                    throw new Error("Course with this ID already exists.");
                }
                throw new Error((error as Error).message);
            }
        }),

    //get all courses from db
    getCourses: procedure
        .query(async () => {
        await dbConnect();
        const courses = await Course.find({});
        return { courses };
    }),


    //get course by id from db
    getCourse: procedure
        .input(
            z.object({
                id: z.instanceof(mongoose.Types.ObjectId)
            })
        )
        .query(async ({ input }) => {
            await dbConnect();
            const course = await Course.findById(input.id);
            return { course };
        }),

    });

export default courseRouter;