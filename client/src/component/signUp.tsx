'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API_SendOTP, API_SignUp } from "@/api/API_SignUp";
import { SignUpForm } from '../interfaces/auth';


interface Props {
  switchToSignIn: () => void;
}

const FormSignUp: React.FC<Props> = ({ switchToSignIn }) => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailTemp, setEmailTemp] = useState("");
  const [passwordTemp, setPasswordTemp] = useState("");
  const [message, setMessage] = useState("");

  const formik = useFormik<SignUpForm>({
    initialValues: { email: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Email không hợp lệ').required('Bắt buộc nhập'),
      password: Yup.string().min(6, 'Tối thiểu 6 ký tự').required('Bắt buộc nhập'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
        .required("Xác nhận mật khẩu là bắt buộc"),
    }),

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await API_SendOTP(values.email);
        setEmailTemp(values.email);
        setPasswordTemp(values.password);
        setShowOtpInput(true);
        setMessage("OTP đã gửi về email của bạn");
      } catch (error: unknown) {
        console.error(error);

        let message = "Không thể gửi OTP";
        // if (error instanceof Error) {
        //   message = error.message;
        // }

        setErrors({ password: message });
      }
      finally {
        setSubmitting(false);
      }
    }

  });

  // xác minh OTP
  const handleVerifyOtp = async () => {
    try {
      await API_SignUp(emailTemp, passwordTemp, otp);
      setMessage("Đăng ký thành công 🎉");
      setShowOtpInput(false);
      switchToSignIn();
    } catch (error: unknown) {
      console.error(error);

      // const message =
      //   error instanceof Error
      //     ? error.message
      //     : "Xác minh OTP thất bại, vui lòng thử lại";

      const message = "Xác minh OTP thất bại, vui lòng thử lại";
      setMessage(message);
    }
  };

  return (
    <StyledWrapper>
      <div className="card">
        <p className="title">Sign Up!</p>
        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div className="field">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="input-icon">
              <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z" />
            </svg>
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              {...formik.getFieldProps('email')}
            />
          </div>
          {formik.errors.email && <p className="error text-red-400">{formik.errors.email}</p>}

          {/* Password */}
          <div className="field">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="input-icon">
              <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z" />
            </svg>
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              {...formik.getFieldProps('password')}
            />
          </div>
          {formik.errors.password && <p className="error text-red-400">{formik.errors.password}</p>}

          {/* Confirm Password */}
          <div className="field">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="input-icon">
              <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z" />
            </svg>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input-field"
              {...formik.getFieldProps('confirmPassword')}
            />
          </div>
          {formik.errors.confirmPassword && <p className="error text-red-400">{formik.errors.confirmPassword}</p>}

          {/* Submit */}
          {!showOtpInput && (
            <button type="submit" className="btn" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Sending OTP...' : 'Sign Up'}
            </button>
          )}

          {/* Nhập OTP */}
          {showOtpInput && (
            <div>
              <div className="field mt-3">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="input-field"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button type="button" className="btn" onClick={handleVerifyOtp}>
                Verify OTP
              </button>
            </div>
          )}

          {message && <p className="text-yellow-400 text-sm">{message}</p>}

          <p className="text-white text-sm">
            If you already have an account{" "}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); switchToSignIn(); }}
              className="text-blue-400"
            >
              Sign In
            </a>
          </p>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    height: auto;
    width: 380px;
    padding: 1.9rem 1.2rem;
    text-align: center;
    background: #2a2b38;
  }
  .field {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    background-color: #1f2029;
    border-radius: 4px;
    padding: 0.5em 1em;
  }

  .input-icon {
    height: 1em;
    width: 1em;
    fill: #ffeba7;
  }
  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #d3d3d3;
  }
  .title {
    margin-bottom: 1rem;
    font-size: 1.5em;
    font-weight: 500;
    color: #f5f5f5;
  }
  .btn {
    cursor: pointer;
    margin: 1rem;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.8em;
    text-transform: uppercase;
    padding: 0.6em 1.2em;
    background-color: #ffeba7;
    color: #5e6681;
    box-shadow: 0 8px 24px 0 rgb(255 235 167 / 20%);
    transition: all 0.3s ease-in-out;
  }
  .btn:hover {
    background-color: #5e6681;
    color: #ffeba7;
    box-shadow: 0 8px 24px 0 rgb(16 39 112 / 20%);
  }
  .error {
    font-size: 0.75em;
  }
`;

export default FormSignUp;
