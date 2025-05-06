import { query, mutation } from "convex/server";
import { v } from "convex/values";

export const getPosts = query({
  args: {},
  handler: async (ctx: any, args: any) => {
    return await ctx.db.query("blog_posts").collect();
  },
});

export const addPost = mutation({
  args: { title: v.string(), content: v.string() },
  handler: async (ctx: any, args: any) => {
    return await ctx.db.insert("blog_posts", {
      title: args.title,
      content: args.content,
      createdAt: Date.now(),
    });
  },
});
