import React, { useEffect, useState } from "react";
import "../assets/styles/Home.scss";
import "aos/dist/aos.css";
import AOS from "aos";
import axios from "axios";
import API_Home from "../api/home";

interface Image {
    img: string;
    id: string;
}

const Home: React.FC = () => {
    const [dataimg, setDataimg] = useState<Image[]>([]);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("https://67e671d16530dbd31110075c.mockapi.io/api/home");
      
            const mappedData = response.data.img.map((url: string, index: number) => ({
              id: index.toString(),
              img: url
            }));
      
            setDataimg(mappedData);
          } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
          }
        };
        fetchData();
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
                    <div id="slide">
                        {dataimg.map((item) => (
                            <div
                                key={item.id}
                                className="item"
                                style={{ backgroundImage: `url(${item.img})` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
