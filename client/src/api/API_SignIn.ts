import axios from "axios";
import { LoginRequest, LoginResponse } from "@/interfaces/auth";
// API request login
export const API_SignIn = async (values: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(
    "https://bookingphoto.onrender.com/auth/login",
    values
  );
  return res.data;
};
