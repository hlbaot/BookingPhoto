import axios from "axios";
import { FormFeedback } from "@/interfaces/feedBack";
export async function API_SubmitFeedBack(values: FormFeedback, token: string) {
  try {
    const response = await axios.post(
      "https://bookingphoto.onrender.com/ratings/create",
      values,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
}
