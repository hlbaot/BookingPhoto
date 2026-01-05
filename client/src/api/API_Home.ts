import axios from "axios";
// API get img home
export async function API_Home() {
  try {
    const res = await axios.get("https://68d20c23cc7017eec5425e30.mockapi.io/home");
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error;
  }
}