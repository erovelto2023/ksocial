import { mutation } from "convex/server";
import { v } from "convex/values";

export const sendContact = mutation({
  args: { name: v.string(), email: v.string(), message: v.string() },
  handler: async (ctx: any, args: any) => {
    return await ctx.db.insert("contact_messages", {
      name: args.name,
      email: args.email,
      message: args.message,
      createdAt: Date.now(),
    });
  },
});
