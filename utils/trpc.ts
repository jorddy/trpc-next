import { setupTRPC } from "@trpc/next";
import { AppRouter } from "../server";
import superjson from "superjson";

export const trpc = setupTRPC<AppRouter>({
  config() {
    const url = process.env.NEXT_PUBLIC_URL
      ? `https://${process.env.NEXT_PUBLIC_UR}L/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      transformer: superjson
    };
  },
  ssr: true
});
