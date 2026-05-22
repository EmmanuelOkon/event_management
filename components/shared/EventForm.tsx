"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validator";

import { eventDefaultValues } from "@/constants";
import { useUploadThing } from "@/lib/uploadthing";
import type { Event as EventType } from "@/types";
import { useState } from "react";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import Dropdown from "./Dropdown";
import { FileUploader } from "./FileUploader";

import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { useProgress } from "@bprogress/react";
import { useRouter } from "next/navigation";

import { Link, MapPin } from "lucide-react";
import { notifyError, notifySuccess } from "../shared/Toast";
import { DatePickerField } from "../ui/date-picker-field";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { TimePickerField } from "../ui/time-picker-field";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: EventType;
  eventId?: string;
};

const formatTimeForField = (date: Date) => {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
};

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

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          capacity: event.capacity?.toString() ?? "",
          startDate: new Date(event.startDateTime),
          startTime: formatTimeForField(new Date(event.startDateTime)),
          endDate: new Date(event.endDateTime),
          endTime: formatTimeForField(new Date(event.endDateTime)),
        }
      : eventDefaultValues;

  const router = useRouter();
  const { start } = useProgress();

  const { startUpload, routeConfig } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  const isFree = form.watch("isFree");

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;
    }

    const eventPayload = {
      title: values.title,
      description: values.description,
      location: values.location,
      imageUrl: uploadedImageUrl,
      startDateTime: combineDateAndTime(values.startDate, values.startTime),
      endDateTime: combineDateAndTime(values.endDate, values.endTime),
      categoryId: values.categoryId,
      // price: values.price,
      price: values.isFree ? "" : values.price,
      capacity: Number(values.capacity),
      isFree: values.isFree,
      url: values.url,
    };

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: eventPayload,
          userId,
          path: "/profile",
        });

        if (newEvent) {
          notifySuccess("New Event Created", {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: false,
          });
          form.reset();
          start();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.error(error);
        notifyError(
          error instanceof Error ? error.message : "Error Creating Event",
          {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: false,
          },
        );
      }
    }
    if (type === "Update") {
      if (!eventId) {
        start();
        router.back();
        return;
      }
      try {
        const updatedEvent = await updateEvent({
          userId,
          event: {
            ...eventPayload,
            _id: eventId,
          },
          path: `/events/${eventId}`,
        });

        if (updatedEvent) {
          notifySuccess("Event Updated successfully", {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: false,
          });
          form.reset();
          start();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.error(error);
        notifyError(
          error instanceof Error ? error.message : "Error Updating Event",
          {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: false,
          },
        );
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Cover image <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
                  routeConfig={routeConfig}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Event title <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Midnight Vinyl: Analog Sessions"
                  {...field}
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={8}
                  placeholder="What's special about this event?"
                  {...field}
                  className="rounded-none h-36 resize-none remove-scrollbar"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Category <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Location <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    startContent={<MapPin className="w-5 h-5" />}
                    placeholder="Brooklyn, NY or Online"
                    {...field}
                    className="input-field pl-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-base font-medium">Start Date &amp; Time</h3>
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Date <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <DatePickerField
                      date={field.value}
                      onDateChange={field.onChange}
                      placeholder="Select date"
                      iconPosition="start"
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Time <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <TimePickerField
                      value={field.value}
                      onTimeChange={field.onChange}
                      placeholder="Select time"
                      iconPosition="start"
                      className="text-sm cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-medium">End Date &amp; Time</h3>
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Date <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <DatePickerField
                      date={field.value}
                      onDateChange={field.onChange}
                      placeholder="Select date"
                      iconPosition="start"
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Time <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <TimePickerField
                      value={field.value}
                      onTimeChange={field.onChange}
                      placeholder="Select time"
                      iconPosition="start"
                      className="text-sm cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-none border border-border bg-card p-5 space-y-4">
            <FormLabel className="space-x-1">
              Pricing
              <span className="text-red-500 ml-1">*</span>
              {isFree ? (
                <span className="text-[10px] text-muted-foreground">
                  Free Event
                </span>
              ) : (
                <span className="text-[10px] text-muted-foreground">
                  Paid Event
                </span>
              )}
            </FormLabel>
            <div className="flex items-center justify-between bg-red500">
              <div>
                {/* <Label className="text-base">Free event</Label> */}
                <p className="text-[12px] text-muted-foreground">
                  {!isFree
                    ? "Set an amount to charge attendees for this event"
                    : "Toggle off if this is a paid event"}
                </p>
              </div>
              <FormField
                control={form.control}
                name="isFree"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
            {!isFree && (
              <div className="mt-4pt-4border-t border-zinc-100 flex items-center justify-between gap-4">
                <label className="text-sm font-medium text-zinc-700 whitespace-nowrap">
                  Ticket price (USD)
                </label>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="mb-0 w-1/2">
                      {/* <FormLabel>Ticket price (USD)</FormLabel> */}
                      <FormControl>
                        <Input
                          startContent={<span>$</span>}
                          className="pl-3"
                          type="number"
                          min={1}
                          step={1}
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                          placeholder="0.00"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          <div className="rounded-none border border-border bg-card p-5 space-y-4">
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>
                      Capacity <span className="text-red-500">*</span>
                    </FormLabel>
                    <p className="text-[12px] text-muted-foreground">
                      Maximum number of attendees
                    </p>
                  </div>
                  {/* <FormLabel>
                    Capacity <span className="text-red-500">*</span>
                  </FormLabel> */}
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      step={1}
                      placeholder="Ticket or seat capacity"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>External URL (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://evoria.com"
                  startContent={<Link className="w-5 h-5" />}
                  {...field}
                  className="input-field pl-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full rounded-none"
        >
          {form.formState.isSubmitting
            ? type === "Create"
              ? "Creating..."
              : "Updating..."
            : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
