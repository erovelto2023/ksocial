import { query, mutation } from "convex/server";
import { v } from "convex/values";

export const getAbout = query({
  args: {},
  handler: async (ctx: any, args: any) => {
    const about = await ctx.db.query("about_info").first();
    return about;
  },
});

export const updateAbout = mutation({
  args: { content: v.string() },
  handler: async (ctx: any, args: any) => {
    // Upsert about info
    const existing = await ctx.db.query("about_info").first();
    if (existing) {
      await ctx.db.patch(existing._id, { content: args.content });
      return { updated: true };
    } else {
      await ctx.db.insert("about_info", { content: args.content });
      return { created: true };
    }
  },
});
