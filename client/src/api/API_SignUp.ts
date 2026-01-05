import axios from "axios";
import { SignUpResponse } from "../interfaces/auth";
// gửi OTP về email
export const API_SendOTP = async (email: string) => {
    const res = await axios.post(
        `http://localhost:8080/auth/send-otp?email=${email}`
    );
    return res.data;
};


// xác minh OTP
export const API_SignUp = async (email: string, password: string, otp: string): Promise<SignUpResponse> => {
    const res = await axios.post<SignUpResponse>(
        "http://localhost:8080/auth/register",
        { email, password, otp }
    );
    return res.data;
};