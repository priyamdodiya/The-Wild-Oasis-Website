"use client";

import { isPast, isSameDay, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
import { differenceInDays } from "date-fns";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range

  const { regularPrice, discount } = cabin;
  const { minBookingLength, maxBookingLength } = settings;

  const numNights =
    range.from && range.to ? differenceInDays(range.to, range.from) : 0;

  const pricePerNight = discount ? regularPrice - discount : regularPrice;
  const totalPrice = numNights * pricePerNight;


  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-15 place-self-center"
        selected={displayRange}
        onSelect={setRange}
        mode="range"
        min={minBookingLength}
        max={maxBookingLength}
        fromDate={new Date()}
        numberOfMonths={2}
        captionLayout="dropdown"
        toYear={new Date().getFullYear() + 5}
        disabled={(curDate) => isPast(curDate) || bookedDates.some((date) => isSameDay(date, curDate))}
      />

      <div className={`flex items-center justify-between ${range.from && range.to ? "mt-12" : "mt-3"
        } px-8 bg-accent-500 text-primary-800 h-[72px]`}>
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${pricePerNight}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span>/night</span>
          </p>
          {numNights > 0 && (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                × {numNights}
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${totalPrice}</span>
              </p>
            </>
          )}
        </div>

        {(range.from || range.to) && (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;