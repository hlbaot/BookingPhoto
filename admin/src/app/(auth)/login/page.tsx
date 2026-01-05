'use client';

import React from 'react';
import Swal from 'sweetalert2';
import '@/styles/login.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { API_Signin } from '@/api/API_Login';

interface SigninProps {
  onLogin: () => void;
}

const Signin: React.FC<SigninProps> = ({ onLogin }) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Email không hợp lệ').required('Bắt buộc nhập'),
      password: Yup.string().min(6, 'Tối thiểu 6 ký tự').required('Bắt buộc nhập'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const data = await API_Signin(values);

        if (data.token) {
          const roles = data.roleList.map((r: any) => r.authority);
          onLogin();
          if (!roles.includes("ADMIN")) {
            Swal.fire({
              icon: "error",
              title: "Không có quyền",
              text: "Tài khoản này không phải ADMIN!",
            });
            return;
          }

          Cookies.set("token", data.token);
          

          Swal.fire({
            icon: "success",
            title: "Đăng nhập thành công",
            timer: 1000,
            showConfirmButton: false,
            willClose: () => router.push("/managerHome"),
          });
        }



      } catch (err: any) {
        const message = err.response?.data?.message || 'Sai email hoặc mật khẩu';
        if (message.toLowerCase().includes('email')) {
          setErrors({ email: message });
        } else {
          setErrors({ password: message });
        }

        Swal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại',
          text: message,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section className="formSignin">
      <div className="login-box">
        <p>Login Admin</p>
        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div className="user-box">
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <label>Email</label>
            {formik.touched.email && formik.errors.email && (
              <div className="error-text">{formik.errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="user-box">
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <label>Password</label>
            {formik.touched.password && formik.errors.password && (
              <div className="error-text">{formik.errors.password}</div>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="submit-btn" disabled={formik.isSubmitting}>
            <span />
            <span />
            <span />
            <span />
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Signin;
