// import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
// export async function GET(request, { params }) {
// console.log('✌️params --->', params);
//     const { cabinId } = params;
//     try {
//         const [cabin, bookedDates] = await Promise.all([getCabin(cabinId), getBookedDatesByCabinId(cabinId)]);
//         return Response.json({ cabin, bookedDates })
//     } catch {
//         return Response.json({ message: "cabin not found" })
//     }
// }




// app/api/cabins/[cabinId]/route.js
import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  try {
    const { cabinId } = params;
    
    if (!cabinId) {
      return Response.json({ message: "Missing cabinId" }, { status: 400 });
    }

    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    if (!cabin) {
      return Response.json({ message: "Cabin not found" }, { status: 404 });
    }

    return Response.json({ cabin, bookedDates });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
