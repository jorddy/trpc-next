import { initTRPC } from "@trpc/server";
import { z } from "zod";
import superjson from "superjson";

const messages = [
  {
    message: "hello world",
    sent: new Date()
  }
];

export const t = initTRPC()({
  transformer: superjson
});

export const appRouter = t.router({
  greeting: t.procedure
    .input(
      z.object({
        text: z.string()
      })
    )
    .query(({ ctx, input }) => ({
      message: `hello ${input.text}`,
      sent: new Date()
    })),
  messages: t.procedure.query(() => messages),
  createMessage: t.procedure
    .input(
      z.object({
        message: z.string()
      })
    )
    .mutation(({ input }) =>
      messages.push({
        message: input.message,
        sent: new Date()
      })
    )
});

export type AppRouter = typeof appRouter;
