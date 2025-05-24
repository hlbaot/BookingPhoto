import React, { useState, useEffect } from 'react';
import '../assets/styles/managerService.scss';
import ButtonAddService from '../ui/btnAddService';
import Swal from 'sweetalert2';
import ModalPackage from '../component/modalPackage';
import axios from 'axios';
// import API_SERVICE from '../api/service';

interface ServicePackage {
  id: number;
  namePackage: string;
  pricePackage: number;
  description: string;
}

function ManagerService() {
  const [data, setData] = useState<ServicePackage[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<ServicePackage>({
    id: 0,
    namePackage: '',
    pricePackage: 0,
    description: '',
  });
  const [openModal, setOpenModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);

  const getToken = () => sessionStorage.getItem('token'); // Hàm lấy token từ sessionStorage

  //Chỗ mới sửa
  useEffect(() => {
    const fetchData = async () => {
      try {
        //API_GET_PACKAGE
        const response = await axios.get("", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
  
        // Chuyển price từ string thành number
        const packages = response.data.packages.map((pkg: ServicePackage) => ({
          ...pkg,
          price: parseFloat(String(pkg.pricePackage)), // Chuyển price thành số
        }));
  
        setData(packages); // Cập nhật state data
      } catch (error) {
        console.error('Lỗi khi lấy danh sách dịch vụ:', error);
      }
    };
    fetchData();
  }, []);//đến đây
  
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
      if (result.isConfirmed) {
        try {
          //API_DELETE_SERVICE
          await axios.delete("", {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
            data: {package_id: id}
          });

          setData((prevData) => prevData.filter((item) => item.id !== id));

          Swal.fire({
            title: 'Đã xóa!',
            text: 'Gói dịch vụ đã được xóa thành công.',
            icon: 'success',
            timer: 1500,
            confirmButtonText: 'OK',
          });
        } catch (error) {
          console.error('Lỗi khi xóa gói dịch vụ:', error);
          Swal.fire({
            title: 'Lỗi!',
            text: 'Có lỗi xảy ra khi xóa gói dịch vụ!',
            icon: 'error',
            timer: 1500,
            confirmButtonText: 'OK',
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
  
  

  const handleSave = async (index: number) => {
    try {
      const { id, namePackage, pricePackage, description } = editData;
  
      // Tạo payload gửi BE (chỉ gửi nếu không undefined)
      const payload: any = { id };
      if (namePackage !== undefined) payload.name = namePackage;
      if (pricePackage !== undefined) payload.price = pricePackage;
      if (description !== undefined) payload.description = description;
      
      //API_UPDATE_PACKAGE
      const response = await axios.put(
        "",
        payload,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
  
      if (response.status === 200) {
        const newData = [...data];
        const dataIndex = newData.findIndex((item) => item.id === editData.id);
        if (dataIndex !== -1) {
          newData[dataIndex] = { ...newData[dataIndex], ...payload };
          setData(newData);
        }
  
        Swal.fire({
          title: 'Lưu thành công!',
          text: 'Gói dịch vụ đã được cập nhật.',
          icon: 'success',
          timer: 1500,
          confirmButtonText: 'OK',
        });
        setEditingIndex(null);
      }
    } catch (error) {
      console.error('Lỗi khi lưu gói dịch vụ:', error);
      Swal.fire({
        title: 'Lỗi!',
        text: 'Không thể cập nhật gói dịch vụ. Vui lòng thử lại.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
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
                        value={editData.namePackage}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      item.namePackage
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingIndex === item.id ? (
                      <input
                        type="text"
                        name="price"
                        value={editData.pricePackage.toString()}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <>
                        {item.pricePackage.toLocaleString()}
                        <span> VNĐ</span>
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
                            onClick={() => handleSave(item.id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Lưu
                          </button>
                          <button onClick={() => setEditingIndex(null)} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm">Hủy</button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleOpenModal(item)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                            Xem
                          </button>
                          <button
                            onClick={() => handleChange(item.id)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
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