# Bước 1: Build ứng dụng
FROM gradle:7.4-jdk17 AS build
WORKDIR /app
# Sao chép toàn bộ mã nguồn vào
COPY . .
# Build và bỏ qua chạy test để nhanh hơn, dùng --no-daemon để tiết kiệm tài nguyên
RUN gradle build -x test --no-daemon

# Bước 2: Chạy ứng dụng
FROM eclipse-temurin:17-alpine
WORKDIR /app

# Sử dụng ký tự đại diện (*) để copy file jar mà không sợ sai tên version
# Thường là /home/gradle/project/build/libs/*.jar nếu dùng image gradle mặc định
COPY --from=build /app/build/libs/*.jar app.jar

# Expose cổng 8080
EXPOSE 8080

# Cấu hình Java heap size để không bị tràn RAM 512MB của Render
ENTRYPOINT ["java", "-Xmx300m", "-Xss512k", "-jar", "app.jar"]
