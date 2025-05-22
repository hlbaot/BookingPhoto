export interface DataService {
  id: string;
  price: string;
  description: string;
  title: string;
  images: string[];
}

export const dataListService: DataService[] = [
  {
    images: [
      "https://i.pinimg.com/474x/7d/fe/4b/7dfe4b9d2a1e1f37215a199f659a13a6.jpg",
      "https://i.pinimg.com/474x/59/d8/4c/59d84ce9f4c171c4a2dbd9e6dbcc539d.jpg",
      "https://i.pinimg.com/474x/dc/dd/99/dcdd99e98e5b6a5e95cdeebef6ef5b4f.jpg"
    ],
    title: "Gói Chụp Gia Đình",
    description: "Chụp ảnh cả gia đình, không gian ấm cúng, chỉnh sửa ảnh cơ bản.",
    price: "200.000 vnđ",
    id: "1"
  },
  {
    images: [
      "https://i.pinimg.com/736x/58/fd/ce/58fdcea20afd70bdc138360abde17b64.jpg",
      "https://i.pinimg.com/236x/8e/b9/0d/8eb90d73d2395e9cedc76bf8082b2389.jpg",
      "https://i.pinimg.com/236x/7e/b2/85/7eb285f52e9bd757fbc4658c7f1f0bd4.jpg"
    ],
    title: "Gói Chụp Cặp Đôi",
    description: "Concept lãng mạn, ngoại cảnh hoặc studio, chỉnh sửa chuyên nghiệp.",
    price: "150.000 vnđ",
    id: "2"
  },
  {
    images: [
      "https://i.pinimg.com/474x/7f/7c/31/7f7c3154d3501cde1921eb34bef7fb31.jpg",
      "https://i.pinimg.com/236x/5b/8f/75/5b8f7574044afcaa1ee39197fe89a9d1.jpg",
      "https://i.pinimg.com/736x/6b/79/de/6b79deac03bfabea07356d881fdbdaa4.jpg"
    ],
    title: "Gói Chụp Cá Nhân",
    description: "Chụp chân dung, phong cách thời trang, chỉnh sửa màu sắc.",
    price: "400.000 vnđ",
    id: "3"
  }
];
