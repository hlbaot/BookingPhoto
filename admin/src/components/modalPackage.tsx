'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

type ModalPackageProps = {
  open: boolean;
  handleClose: () => void;
  data: ServicePackage | null; 
};

export default function ModalPackage({ open, handleClose, data }: ModalPackageProps) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: 4,
    boxShadow: 24,
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ zIndex: 1000 }}>
      <Box sx={style}>
        <h1 className="text-2xl text-center font-semibold mb-4 text-gray-800">Thông tin gói</h1>

        {data ? (
          <div className="space-y-2 text-base text-gray-700 mb-6">
            <p><strong>Tên gói:</strong> {data.name}</p>
            <p><strong>Giá:</strong> {data.price.toLocaleString()} VNĐ</p>
            <p><strong>Mô tả:</strong> {data.description}</p>
          </div>
        ) : (
          <p>Đang tải dữ liệu...</p>
        )}

        <div className="flex flex-wrap gap-4">
          {data?.imageUrls?.map((url, index) => (
            <div key={index} className="relative w-28 h-28 rounded-lg overflow-hidden border">
              <img src={url} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </Box>
    </Modal>
  );
}
