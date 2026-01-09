import axios from "axios";

// Hàm xóa ảnh
export async function API_DeleteImage(public_id: string, token: string) {
  const res = await axios.delete(`https://bookingphoto.onrender.com/delete-image`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { public_id },
  });
  return res.data;
}
