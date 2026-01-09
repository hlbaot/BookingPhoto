import axios from "axios";

const API_BASE_URL = "https://bookingphoto.onrender.com";

// Lấy danh sách gói dịch vụ
export async function API_GetPackages(token: string) {
  const res = await axios.get(`${API_BASE_URL}/packages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Tạo gói dịch vụ
export async function API_CreateService(
  payload: Values,
  token: string
) {
  const res = await axios.post(`${API_BASE_URL}/packages/create`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Xóa gói dịch vụ
export async function API_DeleteService(id: number, token: string) {
  const res = await axios.delete(
    `${API_BASE_URL}/packages/delete?packageId=${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}


// Cập nhật gói dịch vụ
export async function API_UpdateService(
  id: number,
  payload: Partial<{ name: string; price: number; description: string, imageUrls: string[] }>,
  token: string
) {
  const res = await axios.put(`${API_BASE_URL}/packages/update?packageId=${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
