import 'bootstrap/dist/css/bootstrap.min.css';
import "aos/dist/aos.css";
import "../assets/styles/Service.scss";
import AOS from "aos";
import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import CustomModal from "../components/Modal";
import API_Service from '../api/service';


interface Item {
  id: number;
  images: string[];
  title: string;
  description: string;
  price: number;  
}


const Service: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Item | null>(null);
  const [carouselData, setCarouselData] = useState<Item[]>([]);

  const handleOpen = (service: Item) => {
    setSelectedService(service);
    setOpen(true);
    // console.log(open);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Item[]>(API_Service);
        setCarouselData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error.message || error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="w-full h-[100vh]">
      <div className="service">
        <div className="text_head w-full h-auto text-center">
          <h1 className="text-white font-script text-[50px] font-bold" data-aos="fade-down">
            Service
          </h1>
        </div>

        <Carousel data-bs-theme="dark" className="w-full h-[80vh] bg-black flex items-center justify-center relative">
          {carouselData.map((item) => (
            <Carousel.Item key={item.id} className="flex justify-center items-center">
              <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-[4rem]">
                <div className="left flex flex-col md:flex-row justify-center items-center gap-4 w-full md:w-1/2">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    {item.images?.length > 1 && (
                      <img
                        className="h-[230px] w-[160px] object-cover rounded-lg md:rounded-none hidden md:block"
                        src={item.images[1]}
                        alt={`Slide ${item.id + 1} - Image 2`}
                        data-aos="fade-up"
                      />
                    )}
                    {item.images?.length > 0 && (
                      <img
                        className="h-[350px] w-[250px] object-cover rounded-lg md:rounded-none"
                        src={item.images[0]}
                        alt={`Slide ${item.id + 1} - Image 1`}
                        data-aos="fade-down"
                      />
                    )}
                    {item.images?.length > 2 && (
                      <img
                        className="h-[230px] w-[160px] object-cover rounded-lg md:rounded-none hidden md:block"
                        src={item.images[2]}
                        alt={`Slide ${item.id + 1} - Image 3`}
                        data-aos="fade-up"
                      />
                    )}

                  </div>
                </div>

                <div className="right flex flex-col items-center justify-center w-full md:w-1/2">
                  <p className="text-white text-center text-[24px] md:text-3xl font-bold tracking-wide max-w-md mx-auto">
                    {item.title}
                  </p>
                  <p className="text-white text-center text-lg md:text-xl font-light max-w-sm mx-auto">
                    {item.description}
                  </p>
                  <div className="p-5 flex items-center justify-center">
                    <button
                      onClick={() => handleOpen(item)}
                      className="px-4 py-2 text-sm font-semibold text-black bg-white rounded-full  hover:bg-green-500 hover:text-white transform hover:translate-y-0 active:translate-y-1 focus:outline-none"
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
      {selectedService && <CustomModal open={open} handleClose={handleClose} serviceData={selectedService} />
    }
    </section>
  );
};

export default Service;