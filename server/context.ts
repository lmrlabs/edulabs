import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  // const session = await getSessionFromCookie({ req: req as NextApiRequest });
  const session = await getServerSession(req, res, authOptions);

  return {
    req,
    res,
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
