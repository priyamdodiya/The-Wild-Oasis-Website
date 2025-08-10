"use client"
import React, { useOptimistic } from 'react'
import ReservationCard from "@/app/_components/ReservationCard";
import { deleteBooking } from '../_lib/actions';

const ReservationList = ({ bookings }) => {

    const [optimisticBookings, optimisitcDelete] = useOptimistic(bookings, (curBookings, bookingId) => {
        return curBookings.filter(booking => booking.id !== bookingId);
    })

    async function handleDelete(bookingId) {
        optimisitcDelete(bookingId)
        await deleteBooking(bookingId)
    }

    return (
        <div>
            <ul className="space-y-6">
                {optimisticBookings.map((booking) => (
                    <ReservationCard onDelete={handleDelete} booking={booking} key={booking.id} />
                ))}
            </ul>
        </div>
    )
}
export default ReservationList


