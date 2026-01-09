import axios from "axios";
const API_BASE_URL = "https://bookingphoto.onrender.com";


// Lấy danh sách bookings
export async function API_GetBookings(token: string) {
  const res = await axios.get(`${API_BASE_URL}/formBookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Lấy danh sách packages
export async function API_GetPackages(token: string) {
  const res = await axios.get(`${API_BASE_URL}/packages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Xóa lịch booking theo id
export async function API_DeleteBooking(formBookingId: number, token: string) {
  const res = await axios.delete(`${API_BASE_URL}/formBookings/delete?formBookingId=${formBookingId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Duyệt booking theo id
export async function API_ApproveBooking(formBookingId: number, token: string) {
  const res = await axios.put(`${API_BASE_URL}/formBookings/approve?formBookingId=${formBookingId}`,
    { formBookingId, status: true },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return res.data;
}
