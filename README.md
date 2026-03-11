# Dự án Đặt Lịch Chụp Ảnh (Booking Photo)

Dự án cung cấp nền tảng đặt lịch chụp ảnh trực tuyến, bao gồm hệ thống Web (Client và Admin) và phiên bản Ứng dụng Di động.

Phần Web (Monorepo) bao gồm hai hệ thống chính:
- **Client**: Giao diện người dùng để xem dịch vụ, portfolio và đặt lịch chụp.
- **Admin**: Giao diện ban quản trị để quản lý dịch vụ, theo dõi đơn đặt lịch và quản lý khách hàng.

> **Lưu ý:** Dự án này cũng có một phiên bản Mobile App dành cho iOS. 
> Quý khách có thể xem mã nguồn tại đây: [IOS Mobile App - BookingPhoto](https://github.com/hlbaot/IOS_Mobile-App-BookingPhoto)

---

## Thông tin Web Admin (Tài khoản Test)

Để trải nghiệm các chức năng dành cho quản trị viên, vui lòng đăng nhập bằng tài khoản thử nghiệm sau:

- **Email**: `admin@gmail.com`
- **Mật khẩu**: `admin123`

---

## Hướng dẫn Clone và Khởi chạy Frontend (Client)

Vui lòng đảm bảo máy của bạn đã cài đặt **Node.js** và **pnpm** trước khi bắt đầu.

### 1. Clone source code
Mở Terminal / Command Prompt và chạy lệnh dưới đây để tải dự án về máy:
```bash
git clone <URL_CUA_REPO_GITHB>
cd BookingPhoto
```

### 2. Cài đặt và chạy ứng dụng
Mở Terminal bên trong thư mục `BookingPhoto` và chạy các lệnh sau:
```bash
# Di chuyển vào thư mục client
cd client

# Cài đặt toàn bộ các thư viện cần thiết
pnpm install

# Khởi chạy server phát triển
pnpm dev
```

Sau khi chạy thành công, mở trình duyệt và truy cập vào địa chỉ [http://localhost:3000](http://localhost:3000) để trải nghiệm ứng dụng.
