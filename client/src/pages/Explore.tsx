'use client';
import { useEffect, useState } from 'react';
import '../styles/Explore.scss';
import styled from 'styled-components';

const Explore: React.FC = () => {
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
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % images.length
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="explore-container" id='explore'>
      <div className="explore">
        <div className="left">
          <div className="text_head">
            <h1 className="text-center text-black font-script text-[50px] font-bold" data-aos="fade-down">
              Explore
            </h1>
          </div>
          <div className="info-card">
            <h1 className="title">Nơi lưu giữ khoảnh khắc trọn vẹn!</h1>
            <div className="description">
              {texts.map((text, index) => (
                <p key={index} className="text" data-aos="fade-right">
                  {text}
                </p>
              ))}
            </div>
            <h4 className="footer">Hãy để Timer Studio giúp bạn lưu giữ những khoảnh khắc quý giá nhất!</h4>
          </div>
        </div>

        <div className="right relative">
          <StyledWrapper>
            <div className="w-[400px] h-[auto] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justufy-center align-center">
              <div className="stack">
                <div className="card">
                  <div
                    className="image"
                    style={{
                      backgroundImage: `url(${images[currentImageIndex]})`,
                    }}
                  />
                </div>
              </div>
            </div>
          </StyledWrapper>
        </div>

      </div>
    </section>
  );
};

const StyledWrapper = styled.div`
  .stack {
    width: 100%;
    transition: 0.25s ease;
    aspect-ratio: 1 / 1;

    &:hover {
      transform: rotate(5deg);

      .card:before {
        transform: translateY(-2%) rotate(-4deg);
      }

      .card:after {
        transform: translateY(2%) rotate(4deg);
      }
    }
  }

  .card {
    position: relative;
    border: 4px solid #000;
    background-color: #fff;
    height: 100%;
    width: 100%;
    transition: 0.15s ease;
    cursor: pointer;

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      border: 4px solid #000;
      background-color: #fff;
      z-index: -1;
      top: 0;
      left: 0;
      transform-origin: center;
      transition: 0.15s ease;
    }

    &:before {
      transform: translateY(-2%) rotate(-6deg);
    }

    &:after {
      transform: translateY(2%) rotate(6deg);
    }
  }

  .image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }
`;

export default Explore;
