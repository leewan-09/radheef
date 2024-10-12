import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import wordService from "@/service/word";
import { isString } from "@/schema";

const wordRouter = createTRPCRouter({
  search: publicProcedure.input(isString).mutation(async ({ input }) => {
    return await wordService.search(input);
  }),
  get: publicProcedure.input(isString).query(async ({ input }) => {
    return await wordService.get(input);
  }),
});

export default wordRouter;
