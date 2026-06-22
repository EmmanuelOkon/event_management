"use client";

import * as React from "react";
import { Clock as ClockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface TimePickerFieldProps {
  id?: string;
  value?: string;
  onTimeChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  iconPosition?: "start" | "end";
  disabled?: boolean;
}

type TimeParts = {
  hour: string;
  minute: string;
  period: string;
};

const HOURS = Array.from({ length: 12 }, (_, index) =>
  String(index + 1).padStart(2, "0"),
);
const MINUTES = Array.from({ length: 60 }, (_, index) =>
  String(index).padStart(2, "0"),
);
const PERIODS = ["AM", "PM"] as const;

const emptyTimeParts: TimeParts = {
  hour: "",
  minute: "",
  period: "",
};

const parseTimeValue = (value?: string): TimeParts => {
  if (!value?.trim()) {
    return emptyTimeParts;
  }

  const normalized = value.trim().toUpperCase();
  const matched = normalized.match(/^(\d{1,2})(?::(\d{2}))?\s*([AP]M)?$/);

  if (!matched) {
    return emptyTimeParts;
  }

  const rawHour = Number(matched[1]);
  const minute = matched[2] ?? "00";
  const providedPeriod = matched[3];

  if (!Number.isFinite(rawHour) || rawHour < 0 || rawHour > 23) {
    return emptyTimeParts;
  }

  if (providedPeriod) {
    const normalizedHour = rawHour === 0 ? 12 : rawHour > 12 ? rawHour - 12 : rawHour;
    return {
      hour: String(normalizedHour).padStart(2, "0"),
      minute,
      period: providedPeriod,
    };
  }

  const period = rawHour >= 12 ? "PM" : "AM";
  const hour12 = rawHour % 12 || 12;

  return {
    hour: String(hour12).padStart(2, "0"),
    minute,
    period,
  };
};

const formatTimeValue = ({ hour, minute, period }: TimeParts) => {
  if (!hour || !minute || !period) {
    return "";
  }

  return `${hour}:${minute} ${period}`;
};

export function TimePickerField({
  id,
  value,
  onTimeChange,
  placeholder = "Select time",
  className,
  iconPosition = "end",
  disabled = false,
}: TimePickerFieldProps) {
  const [open, setOpen] = React.useState(false);
  const [draftValue, setDraftValue] = React.useState<TimeParts>(() =>
    parseTimeValue(value),
  );

  const parsedValue = React.useMemo(() => parseTimeValue(value), [value]);
  const displayValue = formatTimeValue(parsedValue);
  const isComplete = !!(
    draftValue.hour &&
    draftValue.minute &&
    draftValue.period
  );

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (nextOpen) {
      setDraftValue(parsedValue);
    }
  };

  const icon = (
    <ClockIcon
      className={cn(
        "h-4 w-4 shrink-0",
        iconPosition === "end" ? "text-[#9CA3AF]" : "text-[#9AA4B2]",
      )}
      aria-hidden
    />
  );

  const updateDraftValue = (patch: Partial<TimeParts>) => {
    setDraftValue((current) => ({ ...current, ...patch }));
  };

  const handleApply = () => {
    if (!isComplete) {
      return;
    }

    onTimeChange?.(formatTimeValue(draftValue));
    setOpen(false);
  };

  const handleClear = () => {
    setDraftValue(emptyTimeParts);
    onTimeChange?.("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange} modal={false}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          disabled={disabled}
          className={cn(
            "flex h-11 w-full items-center rounded-none border border-[#DBDFE6] bg-white text-sm ring-offset-black outline-none transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 md:focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
            iconPosition === "end"
              ? "justify-between pl-5 pr-3"
              : "justify-start pl-3 pr-5",
            !displayValue && "text-[#6B7280]",
            displayValue && "text-[#374151]",
            className,
          )}
        >
          {iconPosition === "start" ? (
            <>
              <span className="flex shrink-0 items-center">{icon}</span>
              <span className="min-w-0 flex-1 truncate pl-3 text-left">
                {displayValue || placeholder}
              </span>
            </>
          ) : (
            <>
              <span className="min-w-0 flex-1 truncate text-left">
                {displayValue || placeholder}
              </span>
              <span className="flex shrink-0 items-center">{icon}</span>
            </>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[320px] space-y-4 p-4 border-black/60! rounded-none"
        align="start"
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
              Hour
            </p>
            <Select
              value={draftValue.hour || undefined}
              onValueChange={(hour) => updateDraftValue({ hour })}
            >
              <SelectTrigger className="h-11 rounded-none border-[#DBDFE6] bg-white px-3 text-sm text-dark-slate-grey shadow-none cursor-pointer">
                <SelectValue placeholder="HH" />
              </SelectTrigger>
              <SelectContent className="border-[#DBDFE6] rounded-none">
                {HOURS.map((hour) => (
                  <SelectItem
                    key={hour}
                    value={hour}
                    className="cursor-pointer rounded-none"
                  >
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
              Minute
            </p>
            <Select
              value={draftValue.minute || undefined}
              onValueChange={(minute) => updateDraftValue({ minute })}
            >
              <SelectTrigger className="h-11 rounded-none border-[#DBDFE6] bg-white px-3 text-sm text-dark-slate-grey shadow-none cursor-pointer">
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent className="max-h-72 border-[#DBDFE6] rounded-none ">
                {MINUTES.map((minute) => (
                  <SelectItem
                    key={minute}
                    value={minute}
                    className="cursor-pointer"
                  >
                    {minute}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
              Period
            </p>
            <Select
              value={draftValue.period || undefined}
              onValueChange={(period) => updateDraftValue({ period })}
            >
              <SelectTrigger className="h-11 rounded-none border-[#DBDFE6] bg-white px-3 text-sm text-dark-slate-grey shadow-none cursor-pointer">
                <SelectValue placeholder="AM/PM" />
              </SelectTrigger>
              <SelectContent className="border-[#DBDFE6]">
                {PERIODS.map((period) => (
                  <SelectItem key={period} value={period} className="cursor-pointer">
                    {period}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#E5E7EB] pt-4">
          <Button
            type="button"
            variant="ghost"
            className="h-10 flex-1 rounded-none border border-[#E5E7EB] bg-white text-sm font-semibold text-black/70 hover:border-black/60 hover:bg-white hover:text-black/90"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            type="button"
            // variant="primaryBase"
            className="h-10 flex-1 rounded-none bg-black text-sm font-semibold text-white hover:bg-black/90"
            onClick={handleApply}
            disabled={!isComplete}
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
