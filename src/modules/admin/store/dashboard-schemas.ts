import { z } from "zod";

/**
 * Schema for individual dashboard statistic cards
 */
export const DashboardStatSchema = z.object({
  title: z.string(),
  value: z.string(),
  change: z.string(),
  changeColor: z.string(), // e.g., 'text-green-600' or 'text-red-600'
});

/**
 * Schema for chart data (simple key-value pairs for now)
 */
export const ChartDataPointSchema = z.object({
  label: z.string(),
  value: z.number(),
});

/**
 * Main Dashboard Data Schema
 */
export const DashboardDataSchema = z.object({
  stats: z.array(DashboardStatSchema),
  donationTrends: z.array(ChartDataPointSchema).optional(),
  userGrowth: z.array(ChartDataPointSchema).optional(),
});

export type DashboardStat = z.infer<typeof DashboardStatSchema>;
export type ChartDataPoint = z.infer<typeof ChartDataPointSchema>;
export type DashboardData = z.infer<typeof DashboardDataSchema>;
