'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "aos/dist/aos.css";
import "../styles/Service.scss";
import AOS from "aos";
import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import CustomModal from "../component/modal_booking";
import { API_Service } from "@/api/API_Service";
import { Package } from "../interfaces/package";
import Image from 'next/image';

const dataService = [
  {
    "id": 1,
    "name": "Gói Chụp Ngoại Cảnh",
    "price": 1500000,
    "description": "Chụp ngoài trời tại công viên hoặc bãi biển, 20 ảnh chỉnh sửa.",
    "imageUrls": [
      "https://i.pinimg.com/1200x/93/6a/ae/936aaea7be30306f894fad8740442f02.jpg",
      "https://i.pinimg.com/1200x/60/45/31/6045313592e33843bbe3f45196378adf.jpg",
      "https://i.pinimg.com/1200x/70/ee/67/70ee6799e397fc49d3311ecc612d98b7.jpg"
    ]
  },
  {
    "id": 2,
    "name": "Gói Chụp Studio",
    "price": 2000000,
    "description": "Chụp trong studio với ánh sáng chuyên nghiệp và trang phục cơ bản.",
    "imageUrls": [
      "https://i.pinimg.com/1200x/0f/28/81/0f28810072cc9cb5d3a9b0bba9da8a11.jpg",
      "https://i.pinimg.com/1200x/47/96/1e/47961eec6a055c43d0127dc6b866b8a6.jpg",
      "https://i.pinimg.com/736x/a0/af/03/a0af03da331101be2773d3345403ae67.jpg"
    ]
  },
  {
    "id": 3,
    "name": "Gói Chụp Gia Đình",
    "price": 2500000,
    "description": "Chụp ảnh gia đình từ 3-6 người, 25 ảnh chỉnh sửa.",
    "imageUrls": [
      "https://i.pinimg.com/736x/12/a5/18/12a518c5408f64b35ed94341674d3db7.jpg",
      "https://i.pinimg.com/736x/8b/7c/fa/8b7cfa0f19de78880f2a60def0e5b289.jpg",
      "https://i.pinimg.com/736x/5f/fc/ab/5ffcab6bd87498541d71dc8e14dcd897.jpg"
    ]
  },
  {
    "id": 4,
    "name": "Gói Chụp Cá Nhân",
    "price": 1200000,
    "description": "Chụp chân dung cá nhân, 15 ảnh chỉnh sửa nghệ thuật.",
    "imageUrls": [
      "https://i.pinimg.com/736x/20/8d/f7/208df7dfce1ae0eae2007d605ddb0404.jpg",
      "https://i.pinimg.com/736x/71/2a/b6/712ab6d4b40c9d069fdba7897ef6a9b6.jpg",
      "https://i.pinimg.com/736x/22/40/50/224050792dc890d56151a8a0547c1ce6.jpg"
    ]
  },
  {
    "id": 5,
    "name": "Gói Chụp Kỉ Yếu",
    "price": 3000000,
    "description": "Chụp tập thể lớp hoặc cá nhân, 50 ảnh chỉnh sửa + file gốc.",
    "imageUrls": [
      "https://i.pinimg.com/736x/f5/ff/7d/f5ff7da8454c3c268c249dfe74e7ff93.jpg",
      "https://i.pinimg.com/736x/7a/9d/0e/7a9d0ee9566b4b31ca5b326af0d94304.jpg",
      "https://i.pinimg.com/736x/ff/e7/e5/ffe7e53ac18fef5b8fa5ad9e0953f1ae.jpg"
    ]
  }
]

const Service: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Package | null>(null);
  const [dataPackage, setDataPackage] = useState<Package[]>([]);

  const handleOpen = (service: Package) => {
    setSelectedService(service);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await API_Service();
        //thay api thật
        setDataPackage(dataService);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="w-full h-[100vh]" id='service'>
      <div className="service">
        <div className="text_head w-full h-auto text-center">
          <h1
            className="text-white font-script text-[50px] font-bold"
            data-aos="fade-down"
          >
            Service
          </h1>
        </div>

        <Carousel
          data-bs-theme="dark"
          className="w-full h-[80vh] bg-black flex items-center justify-center relative"
        >
          {dataPackage.map((item) => (
            <Carousel.Item
              key={item.id}
              className="flex justify-center items-center"
            >
              <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-[4rem]">
                {/* Left */}
                <div className="left flex flex-col md:flex-row justify-center items-center gap-4 w-full md:w-1/2">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    {item.imageUrls?.length > 1 && (
                      <Image
                        className="h-[230px] w-[160px] object-cover rounded-lg md:rounded-none hidden md:block"
                        src={item.imageUrls[1]}
                        alt={`Slide ${item.id}-2`}
                        width={160}
                        height={230}
                        data-aos="fade-up"
                      />
                    )}

                    {item.imageUrls?.length > 0 && (
                      <Image
                        className="h-[350px] w-[250px] object-cover rounded-lg md:rounded-none"
                        src={item.imageUrls[0]}
                        alt={`Slide ${item.id}-1`}
                        width={250}
                        height={350}
                        data-aos="fade-down"
                      />
                    )}

                    {item.imageUrls?.length > 2 && (
                      <Image
                        className="h-[230px] w-[160px] object-cover rounded-lg md:rounded-none hidden md:block"
                        src={item.imageUrls[2]}
                        alt={`Slide ${item.id}-3`}
                        width={160}
                        height={230}
                        data-aos="fade-up"
                      />
                    )}

                  </div>
                </div>

                {/* Right */}
                <div className="right flex flex-col items-center justify-center w-full md:w-1/2">
                  <p className="text-white text-center text-[24px] md:text-3xl font-bold tracking-wide max-w-md mx-auto">
                    {item.name}
                  </p>
                  <p className="text-white text-center text-lg md:text-xl font-light max-w-sm mx-auto">
                    {item.description}
                  </p>
                  <div className="p-5 flex items-center justify-center">
                    <button
                      onClick={() => handleOpen(item)}
                      className="px-4 py-2 text-sm rounded font-semibold text-black bg-white hover:bg-green-500 hover:text-white transform hover:translate-y-0 active:translate-y-1 focus:outline-none"

                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      {selectedService && (
        <CustomModal
          open={open}
          handleClose={handleClose}
          serviceData={selectedService}
        />
      )}
    </section>
  );
};

export default Service;
