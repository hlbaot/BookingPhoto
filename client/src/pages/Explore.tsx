import React, { useEffect, useState } from 'react';
import '../assets/styles/Explore.scss';
import styled from 'styled-components';

type ExploreProps = {};

const Explore: React.FC<ExploreProps> = () => {
  const images: string[] = [
    'https://i.pinimg.com/736x/fb/9d/1f/fb9d1f797ac3ffbda0e7e2537f7c9a6e.jpg',
    'https://i.pinimg.com/736x/5f/98/35/5f9835dd694de0b91d6f8c35bd236abe.jpg',
    'https://i.pinimg.com/736x/3d/c8/ee/3dc8ee81c1de2e057ea0062c3468341e.jpg',
    'https://i.pinimg.com/736x/d6/4c/1b/d64c1b46f691db8509f81b62bf43d4c2.jpg',
    'https://i.pinimg.com/736x/f2/68/cf/f268cf26e3695a96325a2211827d934c.jpg',
  ];

  const texts: string[] = [
    "Studio chúng tôi lưu giữ những khoảnh khắc quý giá, từ kỷ niệm gia đình đến dấu ấn thành công, biến chúng thành ký ức vĩnh cửu qua ánh sáng, màu sắc và cảm xúc."
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full h-[100vh]">
      <div className="explore">
        <div className="left">
          <div className="text_head w-full h-auto">
            <h1
              className="text-center text-black font-script text-[50px] font-bold"
              data-aos="fade-down"
            >
              Explore
            </h1>
          </div>
          <div className="rounded-[20px] bg-gray-100 shadow-[0px_4px_10px_rgba(0,0,0,0.3)] p-[1rem] mt-[2rem]">
            <h1 className="text-black text-2xl font-bold text-center">
              Nơi lưu giữ khoảnh khắc trọn vẹn!
            </h1>
            <div className="text-center">
              {texts.map((text, index) => (
                <p
                  key={index}
                  className="text-l font-bold italic text-black"
                  data-aos="fade-right"
                >
                  {text}
                </p>
              ))}
            </div>
            <h4 className="text-center font-semibold text-black text-[20px]">
              Hãy để BT Studio giúp bạn lưu giữ những khoảnh khắc quý giá nhất!
            </h4>
          </div>
        </div>

        <div className="right">
          <StyledWrapper>
            <div className="stack">
              <div className="card">
                <div
                  className="image"
                  style={{
                    backgroundImage: `url(${images[currentImageIndex]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>
            </div>
          </StyledWrapper>
        </div>
      </div>
    </section>
  );
};

const StyledWrapper = styled.div`
  img {
    display: block;
    max-width: 100%;
  }

  .stack {
    width: 380px;
    max-width: 400px;
    transition: 0.25s ease;

    &:hover {
      transform: rotate(5deg);

      .card:before {
        transform: translatey(-2%) rotate(-4deg);
      }

      .card:after {
        transform: translatey(2%) rotate(4deg);
      }
    }
  }

  .card {
    aspect-ratio: 3 / 2;
    border: 4px solid;
    background-color: #fff;
    position: relative;
    transition: 0.15s ease;
    cursor: pointer;
    padding: 5% 5% 15% 5%;

    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      border: 4px solid;
      background-color: #fff;
      transform-origin: center center;
      z-index: -1;
      transition: 0.15s ease;
      top: 0;
      left: 0;
    }

    &:before {
      transform: translatey(-2%) rotate(-6deg);
    }

    &:after {
      transform: translatey(2%) rotate(6deg);
    }
  }

  .image {
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: #eee;
    background-size: cover;
    background-position: center;
    border: 4px solid;
    position: relative;
  }

  .browser-warning {
    margin-bottom: 4rem;
  }

  @supports (aspect-ratio: 1 / 1) {
    .browser-warning {
      display: none;
    }
  }
`;

export default Explore;
