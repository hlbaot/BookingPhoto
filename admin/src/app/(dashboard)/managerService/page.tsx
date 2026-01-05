'use client';
import React, { useState, useEffect } from 'react';
import '@/styles/managerService.scss';
import ButtonAddService from '@/components/btnAddService';
import Swal from 'sweetalert2';
import ModalPackage from '@/components/modalPackage';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import {
  API_GetPackages,
  API_DeleteService,
  API_UpdateService
} from '@/api/API_mngService';


function ManagerService() {
  const [data, setData] = useState<ServicePackage[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<ServicePackage>({
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrls: []
  });
  const [openModal, setOpenModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);

  const token = Cookies.get('token');

  // Fetch danh sách dịch vụ
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return;
        const response = await API_GetPackages(token);

        setData(response);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách dịch vụ:', error);
      }
    };
    fetchData();
  }, [token]);

  const handleAddService = (newService: ServicePackage) => {
    setData((prevData) => [...prevData, newService]);
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa!',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed && token) {
        try {
          await API_DeleteService(id, token);
          setData((prevData) => prevData.filter((item) => item.id !== id));

          toast.success("Xóa gói dịch vụ thành công!", {
            autoClose: 1500,
          });
        } catch (error) {
          console.error('Lỗi khi xóa gói dịch vụ:', error);
          toast.error("Xóa gói dịch vụ thất bại!", {
            autoClose: 1500,
          });
        }
      }
    });
  };

  const handleChange = (id: number) => {
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setEditingIndex(id);
      setEditData(itemToEdit);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!token) return;
      const payload: any = {
        id: editData.id,
        name: editData.name,
        price: editData.price,
        description: editData.description,
        imageUrls: editData.imageUrls || []  
      };


      const response = await API_UpdateService(editData.id, payload, token);

      if (response) {
        const newData = [...data];
        const dataIndex = newData.findIndex((item) => item.id === editData.id);
        if (dataIndex !== -1) {
          newData[dataIndex] = { ...newData[dataIndex], ...payload };
          setData(newData);
        }

        toast.success("Gói dịch vụ được cập nhật thành công!", {
          autoClose: 1500,
        });
        setEditingIndex(null);
      }
    } catch (error) {
      console.error('Lỗi khi lưu gói dịch vụ:', error);
      toast.error("Cập nhật gói dịch vụ thất bại!", {
        autoClose: 1500,
      });
      return;
    }
  };

  const handleOpenModal = (item: ServicePackage) => {
    setSelectedPackage(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPackage(null);
  };

  return (
    <div className="relative">
      <div className="mngService">
        <h1 className="w-full bg-white z-10 text-2xl font-bold text-center py-2 sticky top-0">
          Quản lí dịch vụ
        </h1>
        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Tên gói</th>
              <th className="border px-4 py-2 text-left">Giá</th>
              <th className="border px-4 py-2 text-left">Mô tả</th>
              <th className="border px-4 py-2 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Chưa có dịch vụ nào
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition duration-200">
                  <td className="border px-4 py-2">
                    {editingIndex === item.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingIndex === item.id ? (
                      <input
                        type="text"
                        name="price"
                        value={editData.price.toString()}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <>
                        {item.price.toLocaleString()} <span>VNĐ</span>
                      </>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingIndex === item.id ? (
                      <textarea
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full"
                        rows={2}
                      />
                    ) : (
                      item.description
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-2">
                      {editingIndex === item.id ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="inline-flex hover:cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0 shadow w-[4rem] h-4 duration-300 text-white bg-green-500 hover:bg-green-600"
                          >
                            Lưu
                          </button>
                          <button
                            onClick={() => setEditingIndex(null)}
                            className="inline-flex hover:cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0 shadow w-[4rem] h-4 duration-300 text-white bg-gray-500 hover:bg-gray-600"
                          >
                            Hủy
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleOpenModal(item)}
                            className="inline-flex hover:cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0 shadow w-[4rem] h-4 duration-300 text-white bg-blue-500 hover:bg-blue-600"
                          >
                            Xem
                          </button>

                          <button
                            onClick={() => handleChange(item.id)}
                            className="inline-flex hover:cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0 shadow w-[4rem] h-4 duration-300 text-white bg-yellow-500 hover:bg-yellow-600"
                          >
                            Sửa
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="inline-flex hover:cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0 shadow w-[4rem] h-4 duration-300 text-white bg-red-600 hover:bg-red-600"
                          >
                            Xóa
                          </button>

                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="absolute right-8 bottom-8">
        <ButtonAddService onAddService={handleAddService} />
      </div>
      {openModal && selectedPackage && (
        <ModalPackage
          open={openModal}
          handleClose={handleCloseModal}
          data={selectedPackage}
        />
      )}
    </div>
  );
}

export default ManagerService;
