import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  blog_posts: defineTable({
    title: v.string(),
    content: v.string(),
    createdAt: v.number(),
  }),
  contact_messages: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }),
  about_info: defineTable({
    content: v.string(),
  }),
});
