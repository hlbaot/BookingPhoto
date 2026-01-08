# Sử dụng OpenJDK để build ứng dụng
FROM gradle:7.4-jdk17 AS build

# Sao chép mã nguồn vào container
COPY . .

# Build ứng dụng
RUN gradle build

# Dùng image JDK để chạy ứng dụng
FROM eclipse-temurin:17-alpine

# Sao chép tệp JAR đã build vào container
COPY --from=build /build/libs/bookingphoto.jar /app/bookingphoto.jar

# Expose cổng
EXPOSE 8080

# Lệnh để chạy ứng dụng
ENTRYPOINT ["java", "-jar", "/app/bookingphoto.jar"]
