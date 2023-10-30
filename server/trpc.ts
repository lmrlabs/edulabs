import { initTRPC } from "@trpc/server";
import { createContext } from "./context";

const t = initTRPC.context<typeof createContext>().create();

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
