'use client';
import { useEffect, useState } from "react";
import '../styles/Home.scss';
import "aos/dist/aos.css";
import AOS from "aos";
import { API_Home } from "@/api/API_Home";

interface Image {
  id: number,
  images: string
}

const dataSlide = [
  {
    "id": 0,
    "images": "https://i.pinimg.com/736x/7f/b5/c9/7fb5c9b2e42b031c8ef97509df9a3d8d.jpg"
  },
  {
    "id": 1,
    "images": "https://i.pinimg.com/736x/8f/5b/19/8f5b19b5b350521bf48d9772997897d5.jpg"
  },
  {
    "id": 2,
    "images": "https://i.pinimg.com/1200x/9f/9a/6e/9f9a6ea35e5540bd6ff6b1369ffc0ad0.jpg"
  },
  {
    "id": 3,
    "images": "https://i.pinimg.com/1200x/1a/82/c8/1a82c801eb62df9495468fa925424f5b.jpg"
  },
  {
    "id": 4,
    "images": "https://i.pinimg.com/1200x/01/46/14/014614fba1c3e0069480767a0d8f931d.jpg"
  }
];

const Home: React.FC = () => {
  const [dataimg, setDataImg] = useState<Image[]>([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  
  useEffect(() => {
    const getData = async () => {
      try {
        // const data = await API_Home();
        //thay api thật
        setDataImg(dataSlide);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const slide = document.getElementById("slide");
      const lists = document.querySelectorAll(".item");

      if (slide && lists.length > 0) {
        slide.appendChild(lists[0]); 
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-[100%] h-[100vh]" id="home">
      <div className="home">
        <div className="content-wrapper" data-aos="fade-up">
          <h1 className="font-script text-white text-4xl md:text-5xl font-bold text-center title">
            My Studio
          </h1>

          <p className="text-white font-sans text-lg md:text-xl font-bold text-center max-w-lg mx-auto">
            Chúng tôi cung cấp dịch vụ chụp ảnh chuyên nghiệp, từ ảnh cưới, sự kiện đến sản phẩm, giúp bạn lưu giữ những khoảnh khắc tuyệt vời.
          </p>
        </div>

        <div className="container">
          <div id="slide" className="slide-container">
            {dataimg.map((item) => (
              <div
                key={item.id}
                className="item"
                style={{ backgroundImage: `url(${item.images})` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
