import { db } from "@/db";
import { notifications } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";

export const notificationsRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(20),
        unreadOnly: z.boolean().default(false),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, unreadOnly } = input;

      const whereConditions = and(
        eq(notifications.userId, ctx.auth.user.id),
        unreadOnly ? eq(notifications.read, false) : undefined
      );

      const data = await db
        .select()
        .from(notifications)
        .where(whereConditions)
        .orderBy(desc(notifications.createdAt))
        .limit(limit);

      return data;
    }),

  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    const [result] = await db
      .select({ count: notifications.id })
      .from(notifications)
      .where(
        and(
          eq(notifications.userId, ctx.auth.user.id),
          eq(notifications.read, false)
        )
      );

    return { count: result?.count || 0 };
  }),

  markAsRead: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db
        .update(notifications)
        .set({ read: true })
        .where(
          and(
            eq(notifications.id, input.id),
            eq(notifications.userId, ctx.auth.user.id)
          )
        );
    }),

  markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
    await db
      .update(notifications)
      .set({ read: true })
      .where(eq(notifications.userId, ctx.auth.user.id));
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db
        .delete(notifications)
        .where(
          and(
            eq(notifications.id, input.id),
            eq(notifications.userId, ctx.auth.user.id)
          )
        );
    }),
});
