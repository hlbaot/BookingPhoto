'use client';
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "../styles/Review.scss";
import { API_SubmitFeedBack } from "../api/API_Feedback";

const Review: React.FC = () => {
  const [rating, setRating] = useState<number>(0);

  // get email từ cookies
  const email = Cookies.get("email");

  return (
    <section className="w-full h-[auto] flex justify-center items-center" id="review">
      <div className="review w-100% flex py-4 bg-white">
        {/* Left Side */}
        <div className="left">
          <Formik
            initialValues={{ email: email || "", message: "" }}
            validationSchema={Yup.object({
              message: Yup.string().required("Feedback is required"),
            })}
            onSubmit={async (values, { resetForm }) => {
              const token = Cookies.get("token");
              if (!token) {
                alert("Vui lòng đăng nhập để gửi feedback!");
                return;
              }

              try {
                await API_SubmitFeedBack(
                  {
                    ratingIndex: rating,
                    content: values.message,
                  },
                  token
                );
                toast.success("Cảm ơn bạn đã gửi feedback!", {
                  autoClose: 1500,
                });
                resetForm();
                setRating(0);
              } catch {
                toast.error("Gửi feedback thất bại. Vui lòng thử lại sau.", {
                  autoClose: 1500,
                });
              }
            }}
          >
            {() => (
              <Form className="bg-black shadow-xl shadow-black grid grid-cols-6 gap-4 rounded-xl max-w-[500px] w-[100%]">
                <h1 className="text-center mt-2 text-white font-bold col-span-6">
                  Send Feedback
                </h1>

                {/* Email */}
                <div className="col-span-6">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Your email..."
                    className="bg-slate-100 text-slate-600 border border-black w-full rounded-lg mb-2 p-2 focus:border-slate-600"
                    style={{ pointerEvents: "none" }}
                  />
                </div>

                {/* Message */}
                <div className="col-span-6">
                  <ErrorMessage
                    name="message"
                    component="p"
                    className="pb-[5px] text-red-500 text-sm"
                  />
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    placeholder="Your feedback..."
                    className="bg-slate-100 text-slate-600 h-[250px] w-full placeholder:text-slate-600 placeholder:opacity-80 border border-slate-200 outline-none rounded-lg p-2 focus:border-slate-600"
                  />
                </div>

                {/* Star rating */}
                <div className="head_form w-full flex justify-between items-center col-span-6">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`cursor-pointer text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"
                          }`}
                        onClick={() => setRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* btn submit */}
                  <button
                    type="submit"
                    className="bg-white rounded text-black py-2 px-4 transition duration-200 hover:opacity-70"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Right Side */}
        <div className="right">
          <div className="text_head w-full h-auto">
            <h1
              className="text-center text-black font-script text-[50px] font-bold"
              data-aos="fade-down"
            >
              Your review
            </h1>
          </div>
          <div className="text_body" data-aos="fade-up">
            <p className="text-black text-xl text-center px-4 pt-4">
              {"Hãy để lại ý kiến của bạn! Chúng tôi luôn lắng nghe và trân trọng mọi góp ý để cải thiện chất lượng dịch vụ. Đánh giá của bạn giúp chúng tôi ngày càng hoàn thiện hơn! "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
