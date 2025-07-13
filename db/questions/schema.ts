import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { user } from "../auth/schema";

export const results = pgTable("results", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  examType: text("examType").notNull(),
  topic: text("topic").notNull(),
  subtopic: text("subtopic").notNull(),
  questionId: text("question_id").notNull(),
  answered: text("answered").notNull(),
  timeTaken: integer("time_taken").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});
