import * as z from "zod";

const combineDateAndTime = (date: Date, time: string) => {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) return date;

  const [, hourValue, minuteValue, periodValue] = match;
  const period = periodValue.toUpperCase();
  let hour = Number(hourValue);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  const dateTime = new Date(date);
  dateTime.setHours(hour, Number(minuteValue), 0, 0);

  return dateTime;
};

export const eventFormSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .min(3, "Description must be at least 3 characters")
      .max(400, "Description must be less than 400 characters"),
    location: z
      .string()
      .min(3, "Location must be at least 3 characters")
      .max(400, "Location must be less than 400 characters"),
    imageUrl: z.string(),
    startDate: z.date(),
    startTime: z.string().min(1, "Start time is required"),
    endDate: z.date(),
    endTime: z.string().min(1, "End time is required"),
    categoryId: z.string(),
    price: z.string(),
    capacity: z
      .string()
      .min(1, "Capacity is required")
      .refine((value) => Number.isInteger(Number(value)), {
        message: "Capacity must be a whole number",
      })
      .refine((value) => Number(value) >= 1, {
        message: "Capacity must be at least 1",
      }),
    // price: z.string().refine((val) => val.length > 0, {
    //   message: "Input ticket price for event",
    // }),
    isFree: z.boolean(),
    url: z.string().url(),
  })
  .refine(
    (data) =>
      combineDateAndTime(data.startDate, data.startTime) <
      combineDateAndTime(data.endDate, data.endTime),
    {
    message: "End date must be after start date",
      path: ["endTime"],
    },
  );
