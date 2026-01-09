import axios from "axios";

const API_BASE_URL = "https://bookingphoto.onrender.com";

// Lấy danh sách feedback
export async function API_GetFeedbacks(token: string): Promise<Feedback[]> {
  const res = await axios.get(`${API_BASE_URL}/ratings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}


// Xóa feedback theo id
export async function API_DeleteFeedback(id: number, token: string) {
  const res = await axios.delete(`${API_BASE_URL}/ratings/delete?ratingId=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { id },
  });
  return res.data;
}
