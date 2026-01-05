'use client';
import React, { useState, useEffect } from 'react';
import '@/styles/managerClient.scss';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import {
  API_GetBookings,
  API_GetPackages,
  API_DeleteBooking,
  API_ApproveBooking
} from '@/api/API_mngClient';

const fakedb =
  [
    {
      formBookingId: 1,
      packageId: 101,
      email: "nguyen.an@example.com",
      bookTime: "2025-10-01T09:30:00",
      location: "Studio A - Đà Nẵng",
      pricePackage: 1500000,
      packageName: "Gói Chụp Ngoại Cảnh",
      status: true,
      message: "Muốn chụp buổi sáng sớm.",
    },
    {
      formBookingId: 2,
      packageId: 102,
      email: "tran.binh@example.com",
      bookTime: "2025-10-02T14:00:00",
      location: "Công viên 29/3, Đà Nẵng",
      pricePackage: 2000000,
      packageName: "Gói Chụp Studio",
      status: false,
      message: "Mang thêm phông nền trắng.",
    },
    {
      formBookingId: 3,
      packageId: 103,
      email: "le.hoa@example.com",
      bookTime: "2025-10-03T16:00:00",
      location: "Biển Mỹ Khê",
      pricePackage: 2500000,
      packageName: "Gói Chụp Gia Đình",
      status: true,
      message: "Chụp gia đình 5 người.",
    },
    {
      formBookingId: 4,
      packageId: 104,
      email: "pham.khanh@example.com",
      bookTime: "2025-10-05T10:00:00",
      location: "Trường Đại học Bách Khoa",
      pricePackage: 5000000,
      packageName: "Gói Chụp Kỷ Yếu",
      status: false,
      message: "Chụp cho lớp 20 người.",
    },
    {
      formBookingId: 5,
      packageId: 105,
      email: "doan.mai@example.com",
      bookTime: "2025-10-07T08:00:00",
      location: "Hội An",
      pricePackage: 10000000,
      packageName: "Gói Chụp Cưới",
      status: true,
      message: "Chụp cả trong phố cổ và biển.",
    },
  ];

const ManagerClient: React.FC = () => {
  const [data, setData] = useState<Booking[]>([]);
  const [filteredData, setFilteredData] = useState<Booking[]>([]);
  const [packages, setPackages] = useState<ServicePackage[]>([]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          return;
        }

        const bookings = await API_GetBookings(token);
        setData(bookings);

        const pkgs = await API_GetPackages(token);
        setPackages(pkgs);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        toast.error("Lỗi khi lấy dữ liệu!", {
          autoClose: 1500,
        });
      }
    };

    fetchData();
  }, []);

  const handleDelete = (formBookingId: number) => {
    const token = Cookies.get('token');
    if (!token) return;

    Swal.fire({
      title: "Bạn chắc chắn muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa!",
      cancelButtonText: "Hủy"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await API_DeleteBooking(formBookingId, token);
          setData(prevData => prevData.filter(item => item.formBookingId !== formBookingId));

          toast.success("Xóa lịch đặt thành công!", {
            autoClose: 1500,
          });
        } catch (error) {
          console.error('Lỗi khi xóa lịch đặt:', error);
          toast.error("Xóa lịch đặt thất bại!", {
            autoClose: 1500,
          });
        }
      }
    });
  }

  const handleApprove = async (formBookingId: number) => {
    const token = Cookies.get('token');
    if (!token) return;

    try {
      await API_ApproveBooking(formBookingId, token);
      setData(prevData =>
        prevData.map(item =>
          item.formBookingId === formBookingId ? { ...item, status: true } : item
        )
      );
      toast.success("Duyệt lịch đặt thành công!", {
        autoClose: 1500,
      });
    } catch (error) {
      console.error('Lỗi khi duyệt lịch đặt:', error);
      toast.error("Duyệt lịch đặt thất bại!", {
        autoClose: 1500,
      });
    }
  }

  return (
    <div className='mngClient'>
      <h1 className='w-full bg-white z-10 text-2xl font-bold text-center py-2 sticky top-0'>Đặt lịch</h1>

      {/* Tìm kiếm và bộ lọc */}
      <div className="search w-full mb-4 flex gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            className="w-[300px] rounded-xl h-12 px-4 border border-gray-300 focus:outline-none"
            type="text"
            placeholder="Tìm kiếm theo email khách hàng"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              setFilteredData(
                data.filter(item => item.email.toLowerCase().includes(searchTerm))
              );
            }}
          />

          <div className="px-2 bg-white rounded-xl">
            <select
              className="w-fit rounded-xl h-12 px-4 focus:outline-none"
              onChange={(e) => {
                const packageFilter = e.target.value;
                if (packageFilter) {
                  setFilteredData(data.filter(item => item.packageName === packageFilter));
                } else {
                  setFilteredData(data);
                }
              }}
            >
              <option value="">Tất cả gói dịch vụ</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.name}>
                  {pkg.name} - {pkg.price} VNĐ
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bảng danh sách */}
      <table className="tb table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Ngày & Giờ</th>
            <th className="border px-4 py-2 text-left">Gói</th>
            <th className="border px-4 py-2 text-left">Địa chỉ</th>
            <th className="border px-4 py-2 text-left">Giá</th>
            <th className="border px-4 py-2 text-left">Ghi chú</th>
            <th className="border px-4 py-2 text-left">Trạng Thái</th>
            <th className="border px-4 py-2 text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-4">
                Chưa có lịch đặt nào
              </td>
            </tr>
          ) : (
            filteredData.map((item) => (
              <tr key={item.formBookingId} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.bookTime}</td>
                <td className="border px-4 py-2">{item.packageName}</td>
                <td className="border px-4 py-2">{item.location}</td>
                <td className="border px-4 py-2">{item.pricePackage} VNĐ</td>
                <td className="border px-4 py-2">{item.message}</td>
                <td className="border text-center">
                  {item.status === true ?
                    <p className='text-green-500'>Đã duyệt</p> :
                    <p className='text-red-500'>Chưa duyệt</p>}
                </td>
                <td className='border'>
                  <div className='ml-1 flex gap-2'>
                    {item.status !== true && (
                      <button
                        className="inline-flex hover:cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0 shadow w-[4rem] h-4 duration-300 text-white bg-green-500 hover:bg-green-600"
                        onClick={() => handleApprove(item.formBookingId)}
                      >
                        Duyệt
                      </button>
                    )}
                    <button
                      className="inline-flex hover:cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0 shadow w-[4rem] h-4 duration-300 text-white bg-red-500 hover:bg-red-600"
                      onClick={() => handleDelete(item.formBookingId)}
                    >
                      Xóa
                    </button>
                  </div>

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerClient;
