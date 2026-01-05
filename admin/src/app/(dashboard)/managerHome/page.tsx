'use client';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import '@/styles/managerHome.scss';
import ButtonAddImg from '@/components/btnAddImgHome';
import { API_DeleteImage } from '@/api/API_deleteImgHome';
import Cookies from 'js-cookie';

const ManagerHome: React.FC = () => {
  const [images, setImages] = useState<{ url: string; public_id: string }[]>([]);

  useEffect(() => {
    const storedImages = localStorage.getItem('images');
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
  }, []);

  const handleUpload = (img: { url: string; public_id: string }) => {
    const updatedImages = [...images, img];
    setImages(updatedImages);

    localStorage.setItem('images', JSON.stringify(updatedImages));
    toast.success("Thêm ảnh thành công!", {
      autoClose: 1500,});
  };

  const handleDelete = async (public_id: string) => {
    const result = await Swal.fire({
      title: "Bạn chắc chắn muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa!",
      cancelButtonText: "Hủy"
    });

    if (result.isConfirmed) {
      try {
        const token = Cookies.get('token')!; 
        await API_DeleteImage(public_id, token);

        const updatedImages = images.filter(img => img.public_id !== public_id);
        setImages(updatedImages);
        localStorage.setItem('images', JSON.stringify(updatedImages));

        toast.success("Xóa ảnh thành công!", {
          autoClose: 1500,});
      } catch (error) {
        toast.error("Xóa ảnh thất bại!", {
          autoClose: 1500,});
        console.error('Lỗi khi xóa ảnh:', error);
      }
    }
  };


  return (
    <div className='realtive'>
      <div className="mngHome">
        <h1 className='w-full bg-white z-10 text-2xl font-bold text-center py-2 sticky top-0'>Quản lí home</h1>
        <div className="flex gap-4 p-2 flex-wrap z-0">
          {images.length === 0 ? (
            <p className="w-full text-center py-4">Chưa có ảnh nào</p>
          ) : (
            images.map((img, idx) => (
              <div key={idx} className="card">
                <img src={img.url} alt={`upload-${idx}`} />
                <button
                  onClick={() => handleDelete(img.public_id)}
                  className="delete-btn"
                  title="Xóa ảnh"
                >
                  −
                </button>
              </div>
            ))
          )}
        </div>
        <div className="absolute right-8 bottom-8">
          <ButtonAddImg onImageUpload={handleUpload} />
        </div>
      </div>
    </div>
  );
};

export default ManagerHome;
