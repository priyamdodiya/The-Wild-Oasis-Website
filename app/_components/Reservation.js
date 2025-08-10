import React from 'react'
import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import { auth } from '../_lib/auth';
import LoginMessage from './LoginMessage';

const Reservation = async ({ cabin }) => {
  const [settings, bookedDates] = await Promise.all([getSettings(), getBookedDatesByCabinId(cabin.id)]);
  const session = await auth();
  return (
    <div className="flex flex-col md:flex-row border border-primary-800 shadow-md overflow-hidden">
      <div className="flex-1 min-h-[400px]">
        <DateSelector
          settings={settings}
          bookedDates={bookedDates}
          cabin={cabin}
        />
      </div>
      <div className="w-full md:w-[450px] min-h-[400px] border-t md:border-t-0 border-primary-800 ">
        {session.user ? (
          <ReservationForm user={session.user} cabin={cabin} />
        ) : (
          <LoginMessage />
        )}
      </div>
    </div>

  )
}

export default Reservation;
