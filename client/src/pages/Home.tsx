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

const Home: React.FC = () => {
  const [dataimg, setDataImg] = useState<Image[]>([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await API_Home();
        setDataImg(data);
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
