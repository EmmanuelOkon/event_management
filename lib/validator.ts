import * as z from "zod";

const requiredString = (message: string) => z.string().trim().min(1, message);

const requiredDate = (message: string) =>
  z.custom<Date>(
    (value) => value instanceof Date && !Number.isNaN(value.getTime()),
    { message },
  );

const optionalUrl = z
  .string()
  .trim()
  .refine((value) => value === "" || z.string().url().safeParse(value).success, {
    message: "Enter a valid URL",
  });

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
    title: requiredString("Title is required").min(
      3,
      "Title must be at least 3 characters",
    ),
    description: z
      .string()
      .trim()
      .min(1, "Description is required")
      .min(3, "Description must be at least 3 characters")
      .max(2000, "Description must be less than 2000 characters"),
    location: z
      .string()
      .trim()
      .min(1, "Location is required")
      .min(3, "Location must be at least 3 characters")
      .max(400, "Location must be less than 400 characters"),
    imageUrl: requiredString("Cover image is required"),
    startDate: requiredDate("Start date is required"),
    startTime: requiredString("Start time is required"),
    endDate: requiredDate("End date is required"),
    endTime: requiredString("End time is required"),
    categoryId: requiredString("Category is required"),
    price: z.string(),
    capacity: z
      .string()
      .trim()
      .min(1, "Capacity is required")
      .refine((value) => Number.isInteger(Number(value)), {
        message: "Capacity must be a whole number",
      })
      .refine((value) => Number(value) >= 1, {
        message: "Capacity must be at least 1",
      }),
    isFree: z.boolean(),
    url: optionalUrl,
  })
  .superRefine((data, ctx) => {
    if (!data.isFree) {
      if (!data.price.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "Ticket price is required",
          path: ["price"],
        });
      } else if (!Number.isFinite(Number(data.price)) || Number(data.price) < 1) {
        ctx.addIssue({
          code: "custom",
          message: "Ticket price must be at least 1.00",
          path: ["price"],
        });
      }
    }

    if (
      combineDateAndTime(data.startDate, data.startTime) >=
      combineDateAndTime(data.endDate, data.endTime)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "End date must be after start date",
        path: ["endTime"],
      });
    }
  });
