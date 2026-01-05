'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { API_CreateService } from '@/api/API_mngService';
import { ServicePackage } from '@/interfaces/servicePackage';
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from "@/api/API_cloudinary";

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const validationSchema = Yup.object({
  name: Yup.string().required('Tên gói là bắt buộc'),
  price: Yup.number().min(0, 'Giá gói không được âm').required('Giá gói là bắt buộc'),
  description: Yup.string().required('Mô tả là bắt buộc'),
});

export default function ButtonAddService({ onAddService }: { onAddService: (s: ServicePackage) => void }) {
  const [open, setOpen] = React.useState(false);
  const [previewImages, setPreviewImages] = React.useState<string[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setPreviewImages([]);
    setOpen(false);
  };

  // Upload ảnh lên Cloudinary
  const handleUploadImages = async (files: FileList): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
      urls.push(res.data.secure_url);
    }
    return urls;
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styleModal}>
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Tạo gói dịch vụ mới</h1>
          <Formik<Values>
            initialValues={{ name: '', price: 0, description: '', imageUrls: [] }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                const token = Cookies.get('token');
                if (!token) {
                  toast.error("Vui lòng đăng nhập lại!", {
                    autoClose: 1500,});
                  // alert("Vui lòng đăng nhập lại!");
                  return;
                }

                const newService = await API_CreateService(values, token);
                onAddService(newService);
                toast.success("Gói đã được tạo!", {
                  autoClose: 1500,});
                // alert("Gói đã được tạo!");
                resetForm();
                handleClose();
              } catch (err) {
                console.error(err);
                toast.error("Không thể tạo gói!", {
                  autoClose: 1500,});
                // alert("Không thể tạo gói!");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="space-y-6">
                {/* Tên và Giá */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên gói</label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Tên gói"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Giá</label>
                    <Field
                      id="price"
                      name="price"
                      type="number"
                      placeholder="0"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                {/* Mô tả */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Nhập mô tả"
                    rows={4}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Upload ảnh */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ảnh dịch vụ (tối đa 3)</label>
                  <div className="flex gap-4 flex-wrap">
                    {previewImages.map((url, idx) => (
                      <div key={idx} className="relative w-28 h-28 rounded-lg overflow-hidden border">
                        <img src={url} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const newList = previewImages.filter((_, i) => i !== idx);
                            setPreviewImages(newList);
                            setFieldValue("imageUrls", newList);
                          }}
                          className="absolute top-1 right-1 bg-black/60 text-white w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}

                    {previewImages.length < 3 && (
                      <label className="w-28 h-28 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 text-gray-500">
                        <span className="text-2xl">+</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={async (e) => {
                            if (!e.target.files) return;
                            if (previewImages.length + e.target.files.length > 3) {
                              Swal.fire("Lỗi", "Chỉ được chọn tối đa 3 ảnh", "warning");
                              return;
                            }
                            const urls = await handleUploadImages(e.target.files);
                            const newList = [...previewImages, ...urls].slice(0, 3);
                            setPreviewImages(newList);
                            setFieldValue("imageUrls", newList);
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-[3rem] w-[3rem] bg-green-500 text-white font-bold rounded-md hover:bg-green-600 disabled:opacity-50"
                  >
                    {isSubmitting ? "Đang tạo..." : "Tạo"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      <button
        onClick={handleOpen}
        className="bg-green-500 rounded-full text-sm w-[10rem] h-[2rem] hover:bg-green-700 text-white flex justify-center items-center gap-2"
        type="button"
      >
        <FontAwesomeIcon icon={faPlus} />
        Thêm gói dịch vụ
      </button>
    </>
  );
}
