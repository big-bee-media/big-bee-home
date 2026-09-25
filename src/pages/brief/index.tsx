import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@/components/header';
import styles from './styles.module.scss';

// Monochrome SVG Icons
const CategoryIcons: Record<string, React.ReactNode> = {
  sport_marathon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z"/>
    </svg>
  ),
  conference_forum: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
    </svg>
  ),
  corporate_gala: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  ),
  grand_opening: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3h-3z"/>
    </svg>
  ),
  teambuilding_trip: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
    </svg>
  ),
  restaurant_fnb: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
    </svg>
  ),
  fashion_beauty: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c1.1 0 2 .9 2 2 0 .74-.4 1.38-1 1.72V7l8 4.5v2L13 10.5V22h-2V10.5L3 13.5v-2L11 7V5.72C10.4 5.38 10 4.74 10 4c0-1.1.9-2 2-2z"/>
    </svg>
  ),
  ecommerce_product: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
    </svg>
  ),
  corporate_architecture: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
    </svg>
  ),
  personal_portrait: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  ),
};

// 10 Detailed Project Categories with Thumbnail Images
export const PROJECT_CATEGORIES = [
  {
    id: 'sport_marathon',
    title: 'Sự kiện Thể thao & Marathon',
    tag: 'AI Powered',
    image: '/portfolio/Sport/img-1.jpg',
    description: 'Giải chạy Marathon, Trail, Đạp xe, Triathlon, Giải thể thao phong trào/nội bộ',
    questions: [
      {
        id: 'sportType',
        label: 'Bộ môn thể thao chính',
        type: 'select',
        options: [
          'Chạy bộ Road Marathon (5km - 42km)',
          'Chạy địa hình Trail / Núi rừng',
          'Đạp xe (Cycling / Gran Fondo)',
          'Ba môn phối hợp (Triathlon / Duathlon)',
          'Bơi lội / Thể thao dưới nước',
          'Ngày hội thể thao / Giải đấu phong trào',
        ],
      },
      {
        id: 'athleteCount',
        label: 'Quy mô số lượng Vận động viên',
        type: 'radio',
        options: ['Dưới 500 VĐV', '500 - 2.000 VĐV', '2.000 - 5.000 VĐV', 'Trên 5.000 VĐV'],
      },
      {
        id: 'aiFeatures',
        label: 'Tính năng công nghệ AI bạn muốn tích hợp',
        type: 'checkbox',
        options: [
          'Tự động nhận diện số BIB vận động viên',
          'Tìm kiếm ảnh bằng khuôn mặt (Face Search)',
          'Trả ảnh trực tiếp (Live Photo) ngay trong giải',
          'Watermark tài trợ & Khung ảnh tự động',
        ],
      },
      {
        id: 'deliverables',
        label: 'Sản phẩm truyền thông bàn giao mong muốn',
        type: 'checkbox',
        options: [
          'Ảnh Highlight truyền thông chất lượng cao',
          'Video Highlight Recap (1-3 phút)',
          'Video ngắn Reels/TikTok/Shorts (9:16)',
          'Toàn bộ album ảnh phân loại theo BIB',
        ],
      },
    ],
  },
  {
    id: 'conference_forum',
    title: 'Hội thảo, Hội nghị & Diễn đàn',
    tag: 'Conference',
    image: '/portfolio/Event/img-1.jpg',
    description: 'Diễn đàn kinh tế/công nghệ, Hội thảo quốc tế, Workshop chuyên sâu, Lễ ký kết MOU',
    questions: [
      {
        id: 'eventType',
        label: 'Loại hình hội nghị',
        type: 'select',
        options: [
          'Hội thảo chuyên môn / Hội nghị quốc tế',
          'Diễn đàn kinh tế / Công nghệ / Đầu tư',
          'Workshop đào tạo / Tập huấn chuyên sâu',
          'Tọa đàm / Talkshow / Bàn tròn đối thoại',
          'Lễ ký kết hợp tác chiến lược (MOU)',
        ],
      },
      {
        id: 'guestCount',
        label: 'Số lượng đại biểu & khách tham dự',
        type: 'radio',
        options: ['Dưới 100 khách', '100 - 300 khách', '300 - 1.000 khách', 'Trên 1.000 khách'],
      },
      {
        id: 'technicalNeeds',
        label: 'Yêu cầu nhân sự & Kỹ thuật',
        type: 'checkbox',
        options: [
          'Chụp ảnh khoảnh khắc diễn giả & đại biểu',
          'Chụp backdrop / Thảm đỏ check-in',
          'Ghi hình full bài thuyết trình (Full session)',
          'Livestream đa điểm cầu / Kết nối màn hình LED',
        ],
      },
      {
        id: 'turnaroundTime',
        label: 'Thời gian trả ảnh phục vụ báo chí / PR',
        type: 'radio',
        options: [
          'Cần ảnh "nóng" ngay trong sự kiện để làm PR',
          'Bàn giao đầy đủ trong 24 giờ',
          'Bàn giao đầy đủ trong 48 giờ',
        ],
      },
    ],
  },
  {
    id: 'corporate_gala',
    title: 'Tiệc Kỷ niệm & Gala Dinner',
    tag: 'Gala & YEP',
    image: '/portfolio/Event/img-3.jpg',
    description: 'Tiệc tất niên (Year End Party), Lễ kỷ niệm thành lập, Lễ vinh danh, Tri ân khách hàng',
    questions: [
      {
        id: 'occasion',
        label: 'Dịp tổ chức sự kiện',
        type: 'select',
        options: [
          'Tiệc Tất niên (Year End Party - YEP)',
          'Lễ Kỷ niệm ngày thành lập công ty',
          'Lễ Vinh danh & Trao giải (Award Ceremony)',
          'Hội nghị tri ân khách hàng / Đối tác',
          'Tiệc Tân niên / Khởi động năm mới',
        ],
      },
      {
        id: 'venueType',
        label: 'Không gian & Địa điểm tổ chức',
        type: 'select',
        options: [
          'Khách sạn 5 sao / Trung tâm hội nghị tiệc cưới',
          'Không gian ngoài trời (Outdoor / Resort)',
          'Bar / Lounge / Rooftop hiện đại',
          'Văn phòng / Khuôn viên công ty',
        ],
      },
      {
        id: 'servicePackage',
        label: 'Hạng mục dịch vụ mong muốn',
        type: 'checkbox',
        options: [
          'Chụp ảnh phóng sự tiệc (Candid / Cảm xúc)',
          'Chụp ảnh thảm đỏ / Backdrop check-in',
          'In ảnh lấy liền tại chỗ cho khách mời',
          'Video Highlight Recap cảm xúc (Cinematic 2-4 phút)',
          'Video hậu trường (Behind The Scenes)',
        ],
      },
    ],
  },
  {
    id: 'grand_opening',
    title: 'Lễ Khai trương & Ra mắt',
    tag: 'Opening',
    image: '/portfolio/Event/img-7.jpg',
    description: 'Khai trương showroom/cửa hàng mới, Ra mắt sản phẩm mới, Khánh thành nhà máy/dự án',
    questions: [
      {
        id: 'openingType',
        label: 'Loại hình buổi lễ',
        type: 'select',
        options: [
          'Khai trương Cửa hàng / Showroom / Chi nhánh mới',
          'Lễ Ra mắt Sản phẩm / Dịch vụ công nghệ mới',
          'Khánh thành Nhà máy / Khu công nghiệp / Tòa nhà',
          'Họp báo báo chí (Press Conference)',
        ],
      },
      {
        id: 'keyMoments',
        label: 'Nghi thức trọng tâm cần tập trung ghi hình',
        type: 'checkbox',
        options: [
          'Nghi thức Cắt băng khánh thành',
          'Nghi thức Bấm nút kích hoạt (Launch Activation)',
          'Múa Lân Sư Rồng khai xuân / Rước tài lộc',
          'Trải nghiệm sản phẩm đầu tiên của khách VIP',
        ],
      },
      {
        id: 'mediaOutput',
        label: 'Định dạng sản phẩm truyền thông cần bàn giao',
        type: 'checkbox',
        options: [
          'Bộ ảnh chất lượng cao làm tư liệu PR báo chí',
          'Video ngắn định dạng dọc (9:16) cho TikTok/Reels',
          'Video tổng quan sự kiện (16:9 4K)',
          'Hình ảnh không gian kiến trúc cửa hàng/nhà máy',
        ],
      },
    ],
  },
  {
    id: 'teambuilding_trip',
    title: 'Teambuilding & Company Trip',
    tag: 'Teambuilding',
    image: '/portfolio/Event/img-8.jpg',
    description: 'Dã ngoại gắn kết nhân viên, Ngày hội thể thao nội bộ, Du lịch nghỉ dưỡng công ty',
    questions: [
      {
        id: 'destination',
        label: 'Địa điểm tổ chức',
        type: 'select',
        options: [
          'Bãi biển (Phú Quốc, Nha Trang, Đà Nẵng, Vũng Tàu...)',
          'Rừng núi / Dã ngoại (Đà Lạt, Sapa, Ba Vì...)',
          'Khu du lịch sinh thái / Resort ven đô',
          'Sân vận động / Nhà thi đấu thể thao',
        ],
      },
      {
        id: 'tripDuration',
        label: 'Thời gian chuyến đi',
        type: 'radio',
        options: ['1 Ngày', '2 Ngày 1 Đêm', '3 Ngày 2 Đêm', 'Trên 3 Ngày'],
      },
      {
        id: 'keyActivities',
        label: 'Hoạt động chính cần quay chụp',
        type: 'checkbox',
        options: [
          'Trò chơi Teambuilding bãi biển / ngoài trời',
          'Tiệc Lửa trại / Gala Dinner ngoài trời',
          'Flycam xếp chữ logo công ty từ trên cao',
          'Phỏng vấn cảm xúc & thông điệp gắn kết ban lãnh đạo',
        ],
      },
    ],
  },
  {
    id: 'restaurant_fnb',
    title: 'Nhà hàng, Quán Cafe & F&B',
    tag: 'F&B Food',
    image: '/portfolio/Food_Drink/img-1.jpg',
    description: 'Chụp thực đơn món ăn/đồ uống, Concept ẩm thực, Không gian quán cafe, nhà hàng, quầy bar',
    questions: [
      {
        id: 'usagePurpose',
        label: 'Mục đích sử dụng hình ảnh / video',
        type: 'checkbox',
        options: [
          'Làm Menu / Bảng điện tử hiển thị tại quán',
          'Đăng tải mạng xã hội (Fanpage, Instagram, Website)',
          'Chạy quảng cáo Facebook / TikTok Ads',
          'Hình ảnh chuẩn app giao hàng (GrabFood, ShopeeFood)',
        ],
      },
      {
        id: 'itemCount',
        label: 'Số lượng món ăn / đồ uống cần quay chụp',
        type: 'radio',
        options: ['Dưới 10 món', '10 - 25 món', '25 - 50 món', 'Toàn bộ thực đơn'],
      },
      {
        id: 'styleMood',
        label: 'Phong cách hình ảnh mong muốn (Mood & Tone)',
        type: 'select',
        options: [
          'Tươi sáng, tự nhiên & sạch sẽ (Bright & Fresh)',
          'Sang trọng, trầm ấm & nghệ thuật (Dark & Moody)',
          'Mộc mạc, truyền thống (Rustic & Vintage)',
          'Trẻ trung, bắt mắt & năng động (Vibrant)',
        ],
      },
      {
        id: 'supportNeeds',
        label: 'Hỗ trợ dịch vụ đi kèm',
        type: 'checkbox',
        options: [
          'Cần BigBee chuẩn bị Food Stylist & Đạo cụ Decor',
          'Nhà hàng tự chuẩn bị nguyên liệu & đầu bếp setup món',
          'Chụp thêm không gian kiến trúc quán & nhân viên',
          'Quay video ngắn quy trình pha chế (Bartender/Chef Reel)',
        ],
      },
    ],
  },
  {
    id: 'fashion_beauty',
    title: 'Thời trang, Lookbook & Mỹ phẩm',
    tag: 'Fashion',
    image: '/portfolio/Product/img-1.jpg',
    description: 'Bộ sưu tập thời trang theo mùa, Lookbook look & feel, Mỹ phẩm, Skincare & Phụ kiện',
    questions: [
      {
        id: 'industryCategory',
        label: 'Ngành hàng sản phẩm',
        type: 'select',
        options: [
          'Thời trang Nữ / Đầm thiết kế',
          'Thời trang Nam / Công sở / Vest',
          'Thời trang Đường phố / Streetwear',
          'Mỹ phẩm / Skincare / Chăm sóc sắc đẹp',
          'Giày dép / Túi xách / Phụ kiện thời trang',
          'Trang sức cao cấp / Đồng hồ',
        ],
      },
      {
        id: 'shootingStyle',
        label: 'Hình thức & Phong cách chụp',
        type: 'checkbox',
        options: [
          'Chụp Lookbook Studio với phông màu / Set Design',
          'Chụp ngoại cảnh Street Style / Kiến trúc',
          'Chụp nghệ thuật Flatlay (sắp đặt phụ kiện tĩnh)',
          'Quay Video Lookbook / Fashion Film ngắn',
        ],
      },
      {
        id: 'talentNeed',
        label: 'Yêu cầu nhân sự người mẫu & Makeup',
        type: 'radio',
        options: [
          'Thương hiệu đã có sẵn Model, Makeup & Stylist',
          'Cần BigBee hỗ trợ trọn gói (Casting Model, Makeup Artist & Stylist)',
          'Chỉ cần Model (Tự chuẩn bị makeup & trang phục)',
        ],
      },
      {
        id: 'skuCount',
        label: 'Số lượng mẫu thiết kế (Outfits/SKU)',
        type: 'radio',
        options: ['Dưới 10 mẫu', '10 - 20 mẫu', '20 - 40 mẫu', 'Trên 40 mẫu'],
      },
    ],
  },
  {
    id: 'ecommerce_product',
    title: 'Sản phẩm Thương mại Điện tử',
    tag: 'E-commerce',
    image: '/portfolio/Product/img-3.jpg',
    description: 'Chụp sản phẩm bán hàng sàn TMĐT (Shopee, Lazada, Amazon), Đồ gia dụng, Công nghệ',
    questions: [
      {
        id: 'productType',
        label: 'Loại sản phẩm',
        type: 'select',
        options: [
          'Đồ công nghệ / Thiết bị điện tử',
          'Đồ gia dụng nhà bếp / Tiện ích gia đình',
          'Thực phẩm đóng gói / Đồ uống đóng chai',
          'Sản phẩm mẹ & bé / Đồ chơi',
          'Thiết bị y tế / Thực phẩm chức năng',
        ],
      },
      {
        id: 'photoStyle',
        label: 'Phong cách chụp & Nội dung bàn giao',
        type: 'checkbox',
        options: [
          'Chụp nền trắng / Trong suốt chuẩn sàn TMĐT (Packshot)',
          'Chụp bối cảnh thực tế (Lifestyle Context) thể hiện công năng',
          'Quay video Stop-motion hoặc video 360 độ',
          'Video đập hộp (Unboxing) & Hướng dẫn sử dụng nhanh',
        ],
      },
      {
        id: 'skuQuantity',
        label: 'Số lượng sản phẩm (SKU) cần thực hiện',
        type: 'radio',
        options: ['Dưới 5 sản phẩm', '5 - 15 sản phẩm', '15 - 30 sản phẩm', 'Trên 30 sản phẩm'],
      },
      {
        id: 'logistics',
        label: 'Phương thức giao nhận sản phẩm',
        type: 'radio',
        options: [
          'Gửi sản phẩm đến Studio của BigBee Media',
          'BigBee mang thiết bị và đèn đến trực tiếp kho/văn phòng khách hàng',
        ],
      },
    ],
  },
  {
    id: 'corporate_architecture',
    title: 'Video Doanh nghiệp & Kiến trúc',
    tag: 'Production',
    image: '/portfolio/Event/img-12.jpg',
    description: 'Phim giới thiệu công ty (Brand Story), Quy trình sản xuất nhà xưởng, Kiến trúc & Bất động sản',
    questions: [
      {
        id: 'coreContent',
        label: 'Nội dung trọng tâm của dự án',
        type: 'select',
        options: [
          'Phim tự giới thiệu doanh nghiệp (Corporate Brand Video)',
          'Quay quy trình sản xuất / Nhà máy / Khu công nghiệp',
          'Quay chụp kiến trúc nội thất / Căn hộ mẫu / Bất động sản',
          'Phim tư liệu khánh thành / Dự án tiêu biểu',
        ],
      },
      {
        id: 'techRequirements',
        label: 'Kỹ thuật & Yêu cầu sản xuất',
        type: 'checkbox',
        options: [
          'Bay Flycam chuyên nghiệp độ phân giải cao (4K/6K)',
          'Phỏng vấn Ban lãnh đạo / Chuyên gia',
          'Thu âm lồng tiếng (Voice-over) chuyên nghiệp (Việt/Anh)',
          'Dựng đồ họa 2D/3D Motion Graphic minh họa số liệu',
        ],
      },
      {
        id: 'videoDuration',
        label: 'Thời lượng video mong muốn',
        type: 'radio',
        options: [
          'Video ngắn giới thiệu nhanh (1 - 2 phút)',
          'Phim giới thiệu chuẩn doanh nghiệp (3 - 5 phút)',
          'Phim tài liệu / Phóng sự chuyên sâu (5 - 10 phút)',
        ],
      },
    ],
  },
  {
    id: 'personal_portrait',
    title: 'Chân dung Doanh nhân & Cá nhân',
    tag: 'Portrait',
    image: '/portfolio/Portrait/img-1.jpg',
    description: 'Bộ ảnh Profile lãnh đạo, Doanh nhân, Diễn giả, Avatar truyền thông, Nghệ thuật cá nhân',
    questions: [
      {
        id: 'portraitGoal',
        label: 'Mục đích sử dụng bộ ảnh',
        type: 'checkbox',
        options: [
          'Ảnh đại diện truyền thông & Diễn giả sự kiện',
          'Xây dựng thương hiệu cá nhân trên LinkedIn / Facebook',
          'Ảnh bìa sách / Tạp chí / Báo chí phỏng vấn',
          'Bộ ảnh kỷ niệm sinh nhật / Nghệ thuật cá nhân',
        ],
      },
      {
        id: 'personalityStyle',
        label: 'Phong cách định vị mong muốn',
        type: 'select',
        options: [
          'Doanh nhân bản lĩnh & Đẳng cấp (Executive Leader)',
          'Thân thiện, gần gũi & Truyền cảm hứng (Friendly & Inspiring)',
          'Nghệ thuật, thời trang & Cá tính (Editorial / Creative)',
          'Tối giản, tự nhiên chuẩn phương Tây (Clean & Minimalist)',
        ],
      },
      {
        id: 'locationPreference',
        label: 'Không gian chụp mong muốn',
        type: 'radio',
        options: [
          'Studio chuyên nghiệp của BigBee Media',
          'Văn phòng làm việc riêng của khách hàng',
          'Không gian quán Cafe / Khách sạn sang trọng',
          'Ngoại cảnh tự nhiên',
        ],
      },
      {
        id: 'addServices',
        label: 'Dịch vụ hỗ trợ đi kèm',
        type: 'checkbox',
        options: [
          'Chuyên viên Makeup & Làm tóc chuyên nghiệp tại chỗ',
          'Stylist tư vấn và chuẩn bị trang phục theo concept',
          'In ấn album / Ảnh để bàn chất lượng cao',
        ],
      },
    ],
  },
];

export default function BriefPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [dynamicThumbnails, setDynamicThumbnails] = useState<Record<string, string>>({});

  // Sync category from URL (e.g. /brief/sport_marathon or /brief?category=sport_marathon)
  useEffect(() => {
    if (!router.isReady) return;
    const categoryParam = (router.query.category as string) || '';
    if (categoryParam && PROJECT_CATEGORIES.some((c) => c.id === categoryParam)) {
      setSelectedCategory(categoryParam);
      setCurrentStep(2);
    }
  }, [router.isReady, router.query.category]);

  useEffect(() => {
    // Fetch categories from API to update thumbnails dynamically
    fetch('/api/portfolio/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const thumbMap: Record<string, string> = {};
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
          data.data.forEach((cat: any) => {
            if (cat.thumbnail?.url) {
              thumbMap[cat.slug] = `${apiUrl}${cat.thumbnail.url}`;
            }
          });
          setDynamicThumbnails(thumbMap);
        }
      })
      .catch((err) => console.warn('Failed to load dynamic portfolio thumbnails:', err));
  }, []);

  // Form states
  const [specificAnswers, setSpecificAnswers] = useState<Record<string, any>>({});
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>({});
  const [executionTime, setExecutionTime] = useState('');
  const [budget, setBudget] = useState('');
  const [additionalRequests, setAdditionalRequests] = useState('');
  const [brandName, setBrandName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [socialLink, setSocialLink] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentCategoryData = PROJECT_CATEGORIES.find((c) => c.id === selectedCategory) || PROJECT_CATEGORIES[0];

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentStep(2);
    router.push(`/brief/${categoryId}`, undefined, { shallow: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStep1 = () => {
    setSelectedCategory('');
    setCurrentStep(1);
    router.push('/brief', undefined, { shallow: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckboxChange = (questionId: string, option: string) => {
    const currentList: string[] = specificAnswers[questionId] || [];
    if (currentList.includes(option)) {
      setSpecificAnswers({
        ...specificAnswers,
        [questionId]: currentList.filter((item) => item !== option),
      });
    } else {
      setSpecificAnswers({
        ...specificAnswers,
        [questionId]: [...currentList, option],
      });
    }
  };

  const handleNextStep = () => {
    setErrorMessage('');
    if (currentStep === 1 && !selectedCategory) {
      setErrorMessage('Vui lòng chọn một thể loại dự án');
      return;
    }
    if (currentStep === 3) {
      if (!executionTime) {
        setErrorMessage('Vui lòng chọn thời gian triển khai dự kiến');
        return;
      }
      if (!budget) {
        setErrorMessage('Vui lòng chọn mức ngân sách dự kiến');
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setErrorMessage('');
    if (currentStep === 2) {
      handleBackToStep1();
    } else {
      setCurrentStep((prev) => Math.max(1, prev - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!brandName.trim()) {
      setErrorMessage('Vui lòng nhập tên thương hiệu / dự án / cá nhân');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Vui lòng nhập số điện thoại liên hệ');
      return;
    }

    setIsSubmitting(true);

    const resolvedSpecificAnswers: Record<string, any> = { ...specificAnswers };
    Object.keys(resolvedSpecificAnswers).forEach((key) => {
      if (resolvedSpecificAnswers[key] === 'Khác') {
        resolvedSpecificAnswers[key] = customAnswers[key]
          ? `Khác: ${customAnswers[key]}`
          : 'Khác';
      }
    });

    const payload = {
      category: currentCategoryData.title,
      brandName,
      contactName,
      phone,
      email,
      socialLink,
      serviceType: currentCategoryData.tag,
      specificAnswers: resolvedSpecificAnswers,
      executionTime,
      budget,
      additionalRequests,
    };

    try {
      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorMessage(result.message || 'Có lỗi xảy ra khi gửi brief. Vui lòng thử lại!');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Mô tả Dự án của bạn | Pre-Photoshoot Project Brief | BigBee Media</title>
        <meta
          name="description"
          content="Khởi tạo dự án truyền thông & nhiếp ảnh chuyên nghiệp cùng BigBee Media."
        />
      </Head>

      <Header color="color-black" />
      <div className={styles.briefContainer}>
        <div className={styles.bgDecor1} />
        <div className={styles.bgDecor2} />

        <div className={styles.wrapper}>
          {!isSuccess ? (
            <>
              {/* Active Category Header (Step 2+) */}
              {currentStep > 1 && (
                <div className={styles.categoryActiveHeader}>
                  <div className={styles.categoryActiveInfo}>
                    <div className={styles.categoryIconBadge}>
                      {CategoryIcons[currentCategoryData.id]}
                    </div>
                    <div>
                      <div className={styles.categorySubtitle}>THỂ LOẠI DỰ ÁN ĐANG CHỌN</div>
                      <h1 className={styles.categoryActiveTitle}>{currentCategoryData.title}</h1>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.changeCategoryBtn}
                    onClick={handleBackToStep1}
                  >
                    ← Đổi thể loại dự án
                  </button>
                </div>
              )}

              {/* Error Alert */}
              {errorMessage && (
                <div
                  style={{
                    background: '#fef2f2',
                    border: '1px solid #f87171',
                    color: '#b91c1c',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    marginBottom: '24px',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* Form Container */}
              <div className={styles.formCard}>
                {/* STEP 1: CHỌN THỂ LOẠI DỰ ÁN (5 CARDS PER ROW, 2 ROWS = 10 CARDS) */}
                {currentStep === 1 && (
                  <div>
                    <div className={styles.sectionTitle}>
                      Chọn dự án bạn muốn BIGBEE thực hiện
                    </div>
                    <div className={styles.sectionSubtitle}>
                      Chọn một danh mục phù hợp nhất để hiển thị bảng câu hỏi chi tiết tương ứng.
                    </div>

                    <div className={styles.categoryGrid}>
                      {PROJECT_CATEGORIES.map((cat) => (
                        <div
                          key={cat.id}
                          className={`${styles.categoryCard} ${
                            selectedCategory === cat.id ? styles.selected : ''
                          }`}
                          onClick={() => handleSelectCategory(cat.id)}
                        >
                          {/* Card Thumbnail Image */}
                          <img
                            src={dynamicThumbnails[cat.id] || cat.image}
                            alt={cat.title}
                            className={styles.cardThumbnail}
                          />

                          <div className={styles.cardHeaderRow}>
                            <div className={styles.cardIconWrapper}>
                              {CategoryIcons[cat.id]}
                            </div>
                            <div className={styles.cardTitle}>{cat.title}</div>
                          </div>

                          <div className={styles.cardDesc}>{cat.description}</div>
                          <div className={styles.cardStartLink}>
                            <span>Bắt đầu</span>
                            <span className={styles.arrowIcon}>→</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: BỘ CÂU HỎI MÔ TẢ CHI TIẾT THEO THỂ LOẠI */}
                {currentStep === 2 && (
                  <div className={styles.formContentBox}>
                    <div className={styles.sectionTitle}>
                      Mô tả chi tiết: {currentCategoryData.title}
                    </div>
                    <div className={styles.sectionSubtitle}>
                      Các thông tin này giúp ekip BigBee chuẩn bị thiết bị, nhân sự và giải pháp chính xác nhất.
                    </div>

                    {currentCategoryData.questions.map((q, qIndex) => (
                      <div key={q.id} className={styles.formGroup}>
                        <label>
                          {qIndex + 1}. {q.label}
                        </label>

                        {q.type === 'select' && (
                          <>
                            <select
                              value={specificAnswers[q.id] || ''}
                              onChange={(e) =>
                                setSpecificAnswers({ ...specificAnswers, [q.id]: e.target.value })
                              }
                            >
                              <option value="">-- Vui lòng chọn một phương án --</option>
                              {q.options.map((opt, i) => (
                                <option key={i} value={opt}>
                                  {opt}
                                </option>
                              ))}
                              {!q.options.some((opt) => opt.toLowerCase().includes('khác')) && (
                                <option value="Khác">Khác (Tự nhập chi tiết)</option>
                              )}
                            </select>
                            {specificAnswers[q.id] === 'Khác' && (
                              <input
                                type="text"
                                placeholder="Nhập chi tiết loại hình của bạn..."
                                value={customAnswers[q.id] || ''}
                                onChange={(e) =>
                                  setCustomAnswers({ ...customAnswers, [q.id]: e.target.value })
                                }
                                style={{ marginTop: '12px' }}
                              />
                            )}
                          </>
                        )}

                        {q.type === 'radio' && (
                          <div className={styles.optionsGrid}>
                            {q.options.map((opt, i) => {
                              const isChecked = specificAnswers[q.id] === opt;
                              return (
                                <div
                                  key={i}
                                  className={`${styles.optionCard} ${isChecked ? styles.active : ''}`}
                                  onClick={() =>
                                    setSpecificAnswers({ ...specificAnswers, [q.id]: opt })
                                  }
                                >
                                  <span>{isChecked ? '◉' : '○'}</span>
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {q.type === 'checkbox' && (
                          <div className={styles.optionsGrid}>
                            {q.options.map((opt, i) => {
                              const checkedList: string[] = specificAnswers[q.id] || [];
                              const isChecked = checkedList.includes(opt);
                              return (
                                <div
                                  key={i}
                                  className={`${styles.optionCard} ${isChecked ? styles.active : ''}`}
                                  onClick={() => handleCheckboxChange(q.id, opt)}
                                >
                                  <span>{isChecked ? '☑' : '☐'}</span>
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}

                    <div className={styles.buttonGroup}>
                      <button className={styles.prevBtn} onClick={handlePrevStep}>
                        ← Quay lại
                      </button>
                      <button className={styles.nextBtn} onClick={handleNextStep}>
                        Tiếp tục: Kế hoạch & Ngân sách →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: THỜI GIAN, NGÂN SÁCH & YÊU CẦU KHÁC */}
                {currentStep === 3 && (
                  <div className={styles.formContentBox}>
                    <div className={styles.sectionTitle}>
                      Thời gian, Ngân sách & Mong muốn khác
                    </div>
                    <div className={styles.sectionSubtitle}>
                      Hãy cho BigBee biết lộ trình dự kiến và các mong muốn đặc biệt của bạn.
                    </div>

                    {/* Thời gian triển khai */}
                    <div className={styles.formGroup}>
                      <label>
                        Thời gian triển khai dự kiến <span className={styles.required}>*</span>
                      </label>
                      <div className={styles.optionsGrid}>
                        {[
                          'Càng sớm càng tốt (Trong 1-3 ngày)',
                          'Trong tuần này',
                          'Trong 2 - 4 tuần tới',
                          'Tháng sau',
                          'Đang lên kế hoạch trước',
                        ].map((timeOption, idx) => (
                          <div
                            key={idx}
                            className={`${styles.optionCard} ${
                              executionTime === timeOption ? styles.active : ''
                            }`}
                            onClick={() => setExecutionTime(timeOption)}
                          >
                            <span>{executionTime === timeOption ? '◉' : '○'}</span>
                            <span>{timeOption}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ngân sách dự kiến */}
                    <div className={styles.formGroup}>
                      <label>
                        Mức ngân sách dự kiến cho dự án <span className={styles.required}>*</span>
                      </label>
                      <div className={styles.optionsGrid}>
                        {[
                          'Dưới 10 Triệu VNĐ',
                          '10 - 25 Triệu VNĐ',
                          '25 - 50 Triệu VNĐ',
                          '50 - 100 Triệu VNĐ',
                          'Trên 100 Triệu VNĐ',
                          'Cần BigBee tư vấn gói phù hợp',
                        ].map((budgetOption, idx) => (
                          <div
                            key={idx}
                            className={`${styles.optionCard} ${
                              budget === budgetOption ? styles.active : ''
                            }`}
                            onClick={() => setBudget(budgetOption)}
                          >
                            <span>{budget === budgetOption ? '◉' : '○'}</span>
                            <span>{budgetOption}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mong muốn / Yêu cầu khác */}
                    <div className={styles.formGroup}>
                      <label>Mong muốn / Yêu cầu khác & Link tài liệu tham khảo</label>
                      <textarea
                        placeholder="Mô tả chi tiết ý tưởng, phong cách, câu chuyện của bạn hoặc dán link Google Drive / Pinterest / Moodboard tham khảo..."
                        value={additionalRequests}
                        onChange={(e) => setAdditionalRequests(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className={styles.buttonGroup}>
                      <button className={styles.prevBtn} onClick={handlePrevStep}>
                        ← Quay lại
                      </button>
                      <button className={styles.nextBtn} onClick={handleNextStep}>
                        Tiếp tục: Thông tin liên hệ →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: THÔNG TIN LIÊN HỆ */}
                {currentStep === 4 && (
                  <form onSubmit={handleSubmit} className={styles.formContentBox}>
                    <div className={styles.sectionTitle}>
                      Thông tin liên hệ của bạn
                    </div>
                    <div className={styles.sectionSubtitle}>
                      BigBee Media sẽ bảo mật thông tin và cử chuyên viên tư vấn liên hệ phản hồi trong 2-4 giờ.
                    </div>

                    <div className={styles.twoCols}>
                      <div className={styles.formGroup}>
                        <label>
                          Tên thương hiệu / Cá nhân / Dự án <span className={styles.required}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: Techcombank Marathon, Nhà hàng SunShine..."
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Người đại diện liên hệ</label>
                        <input
                          type="text"
                          placeholder="Ví dụ: Anh Hoàng / Chị Mai"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.twoCols}>
                      <div className={styles.formGroup}>
                        <label>
                          Số điện thoại (Zalo) <span className={styles.required}>*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Ví dụ: 0987 654 321"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Địa chỉ Email</label>
                        <input
                          type="email"
                          placeholder="Ví dụ: contact@yourbrand.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Website / Fanpage / Instagram (nếu có)</label>
                      <input
                        type="url"
                        placeholder="https://facebook.com/... hoặc https://yourbrand.vn"
                        value={socialLink}
                        onChange={(e) => setSocialLink(e.target.value)}
                      />
                    </div>

                    <div className={styles.buttonGroup}>
                      <button type="button" className={styles.prevBtn} onClick={handlePrevStep}>
                        ← Quay lại
                      </button>
                      <button type="submit" className={styles.nextBtn} disabled={isSubmitting}>
                        {isSubmitting ? '⏳ Đang gửi brief...' : '🚀 Gửi Pre-Photoshoot Brief'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </>
          ) : (
            /* SUCCESS CONFIRMATION VIEW */
            <div className={`${styles.formContentBox} ${styles.successCard}`}>
              <div className={styles.successIcon}>✓</div>
              <h2>Gửi Pre-Photoshoot Brief Thành Công!</h2>
              <p>
                Cảm ơn bạn đã tin tưởng <strong>BigBee Media</strong>. Chúng tôi đã nhận được toàn bộ thông tin chi tiết về dự án của bạn.
              </p>

              <div className={styles.slaBadge}>
                ⏱️ Ekip BigBee Media sẽ nghiên cứu brief và liên hệ tư vấn lại trong vòng <strong>2 - 4 giờ làm việc</strong>.
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/" className={styles.nextBtn} style={{ textDecoration: 'none' }}>
                  Quay về Trang chủ
                </Link>
                <a
                  href="https://www.facebook.com/thebigbeemedia"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.prevBtn}
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  Nhắn tin qua Fanpage BigBee
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
