// api/API_SubmitPackage.ts
import axios from "axios";
import { FormBooking } from "@/interfaces/formBooking";
export async function API_SubmitBooking(
  payload: FormBooking,
  token: string,
  packageId: number
) {
  try {
    const response = await axios.post<FormBooking>(
      `http://localhost:8080/formBookings/create?packageId=${packageId}`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting booking:", error);
    throw error;
  }
}
