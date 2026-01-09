# Bước 1: Build ứng dụng bằng Gradle và JDK 21
FROM gradle:8.5-jdk21 AS build
WORKDIR /app

# Sao chép mã nguồn
COPY . .

# Build dự án, bỏ qua test để tiết kiệm RAM trên Render
RUN gradle build -x test --no-daemon

# Bước 2: Chạy ứng dụng với JRE 21 nhẹ hơn
FROM eclipse-temurin:21-alpine
WORKDIR /app

# Copy file jar từ bước build sang (Sử dụng wildcard * để tránh sai tên version)
COPY --from=build /app/build/libs/*.jar app.jar

# Mở cổng 8080
EXPOSE 8080

# Giới hạn RAM cho Java để không vượt quá 512MB của Render
ENTRYPOINT ["java", "-Xmx300m", "-Xss512k", "-jar", "app.jar"]
