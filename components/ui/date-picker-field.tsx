"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn, formatDateToDashes } from "@/lib/utils"

export interface DatePickerFieldProps {
  id?: string
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  /** Filter-style (icon right) vs form-style (icon left) */
  iconPosition?: "start" | "end"
}

export function DatePickerField({
  id,
  date,
  onDateChange,
  placeholder = "Select date",
  className,
  iconPosition = "end",
}: DatePickerFieldProps) {
  const [open, setOpen] = React.useState(false)

  const today = new Date();

  const startOfCurrentMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1,
  );

  const endBoundary = new Date(2035, 11, 31);

  const icon = (
    <CalendarIcon
      className={cn(
        "h-4 w-4 shrink-0",
        iconPosition === "end" ? "text-[#9CA3AF]" : "text-[#9AA4B2]"
      )}
      aria-hidden
    />
  )

  

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          className={cn(
            "flex h-11 w-full items-center rounded-none border border-[#DBDFE6] bg-white text-sm ring-offset-accent outline-none transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 md:focus-visible:ring-offset-2 cursor-pointer",
            iconPosition === "end"
              ? "justify-between pl-5 pr-3"
              : "justify-start pl-3 pr-5",
            !date && "text-[#6B7280]",
            date && "text-[#374151]",
            className,
          )}
        >
          {iconPosition === "start" ? (
            <>
              <span className="flex shrink-0 items-center">{icon}</span>
              <span className="min-w-0 flex-1 truncate text-left pl-3">
                {date ? formatDateToDashes(date) : placeholder}
              </span>
            </>
          ) : (
            <>
              <span className="min-w-0 flex-1 truncate text-left">
                {date ? formatDateToDashes(date) : placeholder}
              </span>
              <span className="flex shrink-0 items-center">{icon}</span>
            </>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-accent/60" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            onDateChange?.(d);
            setOpen(false);
          }}
          captionLayout="dropdown"
          // startMonth={new Date(2026, 0)}
          // endMonth={new Date(2035, 11)}
          startMonth={startOfCurrentMonth}
          endMonth={endBoundary}
          defaultMonth={date}
          disabled={(day) => day < startOfCurrentMonth || day > endBoundary}
        />
      </PopoverContent>
    </Popover>
  );
}
