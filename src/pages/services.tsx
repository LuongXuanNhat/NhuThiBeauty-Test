"use client";

import React, { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  getMetadataByPath,
  useDynamicMetadata,
} from "@/hooks/useDynamicMetadata";
import {
  CarouselFirst,
  CarouselServiceNail,
  CarouselServiceEyelash,
  CarouselServiceHeadWashing,
  CarouselServiceAcneTreatment,
} from "@/utils/carousel/item";
import Carousel from "@/components/carousel/carousel";
import { Users, X, ZoomIn, ZoomOut, Move } from "lucide-react";
import { Metadata } from "next";

// Service Popup Component
interface ServicePopupProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServicePopup: React.FC<ServicePopupProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imageTransform, setImageTransform] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0,
    imageX: 0,
    imageY: 0,
  });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  if (!service) return null;

  // Service details data
  const serviceDetails = {
    nail: {
      title: "Dịch vụ Nail Chuyên Nghiệp",
      price: "200.000 - 800.000 VNĐ",
      description:
        "Chúng tôi cung cấp dịch vụ nail chuyên nghiệp với các kỹ thuật hiện đại, sử dụng sản phẩm tốt từ các thương hiệu nổi tiếng. Đội ngũ thợ nail có kinh nghiệm sẽ mang đến cho bạn bộ móng tay hoàn hảo.",
      features: [
        "Sơn gel cao cấp",
        "Nail art sáng tạo",
        "Chăm sóc da tay",
        "Bảo hành 2 tuần",
      ],
      duration: "60-90 phút",
    },
    eyelash: {
      title: "Nối Mi Tự Nhiên",
      price: "300.000 - 1.200.000 VNĐ",
      description:
        "Dịch vụ nối mi chuyên nghiệp giúp bạn có được đôi mắt quyến rũ và tự nhiên. Sử dụng mi cao cấp từ Hàn Quốc, kỹ thuật nối 1:1 hoặc volume tùy theo nhu cầu.",
      features: [
        "Mi tự nhiên Hàn Quốc",
        "Kỹ thuật Volume/Classic",
        "Bảo hành 3 tuần",
        "Tư vấn kiểu dáng phù hợp",
      ],
      duration: "120-180 phút",
    },
    head_washing: {
      title: "Gội Đầu Thư Giãn",
      price: "150.000 - 400.000 VNĐ",
      description:
        "Trải nghiệm dịch vụ gội đầu thư giãn với tinh dầu thiên nhiên, massage da đầu chuyên sâu giúp giảm stress và nuôi dưỡng tóc khỏe mạnh.",
      features: [
        "Massage da đầu chuyên sâu",
        "Tinh dầu thiên nhiên",
        "Không gian yên tĩnh",
        "Chăm sóc tóc toàn diện",
      ],
      duration: "45-60 phút",
    },
    acne_treatment: {
      title: "Trị Mụn Chuyên Sâu",
      price: "400.000 - 1.000.000 VNĐ",
      description:
        "Liệu trình trị mụn chuyên sâu với công nghệ hiện đại, sản phẩm y khoa. Đội ngũ chuyên viên da liễu sẽ tư vấn và chăm sóc phù hợp với từng loại da.",
      features: [
        "Tư vấn chuyên sâu",
        "Công nghệ IPL/LED",
        "Sản phẩm y khoa",
        "Theo dõi sau liệu trình",
      ],
      duration: "90-120 phút",
    },
    peel: {
      title: "Peel Da Tái Sinh",
      price: "500.000 - 1.500.000 VNĐ",
      description:
        "Dịch vụ peel da chuyên nghiệp giúp tái sinh làn da, mờ thâm nám, se khít lỗ chân lông. Sử dụng acid tự nhiên phù hợp với nhiều loại da.",
      features: [
        "Peel acid tự nhiên",
        "Tái sinh da hiệu quả",
        "Phù hợp mọi loại da",
        "Chăm sóc sau peel",
      ],
      duration: "60-90 phút",
    },
    hair_removal: {
      title: "Triệt Lông Vĩnh Viễn",
      price: "200.000 - 2.000.000 VNĐ",
      description:
        "Công nghệ triệt lông IPL và Diode Laser hiện đại và hiệu quả. Phù hợp cho mọi vùng trên cơ thể với tỷ lệ triệt lông cao.",
      features: [
        "Công nghệ IPL/Diode Laser",
        "Hiệu quả nhanh",
        "Phù hợp mọi vùng",
        "Bảo hành dài hạn",
      ],
      duration: "30-120 phút",
    },
  };

  const currentService =
    serviceDetails[service.key as keyof typeof serviceDetails] ||
    serviceDetails.nail;

  const handleImageZoom = (e: React.MouseEvent) => {
    if (!imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Tính toán vị trí tương đối so với center của container
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const offsetX = x - centerX;
    const offsetY = y - centerY;

    if (!isZoomed) {
      // Zoom in tại vị trí click
      const newScale = 2.5;
      const newX = -offsetX * (newScale - 1);
      const newY = -offsetY * (newScale - 1);

      setImageTransform({
        x: newX,
        y: newY,
        scale: newScale,
      });
      setIsZoomed(true);
    } else {
      // Zoom out về center
      setImageTransform({
        x: 0,
        y: 0,
        scale: 1,
      });
      setIsZoomed(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isZoomed) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX,
        y: e.clientY,
        imageX: imageTransform.x,
        imageY: imageTransform.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && isZoomed) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      setImageTransform((prev) => ({
        ...prev,
        x: dragStart.imageX + deltaX,
        y: dragStart.imageY + deltaY,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetZoom = () => {
    setImageTransform({
      x: 0,
      y: 0,
      scale: 1,
    });
    setIsZoomed(false);
    setIsDragging(false);
  };

  // Reset zoom when changing images
  const handleImageChange = (index: number) => {
    setSelectedImageIndex(index);
    resetZoom();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-pink-50 to-rose-50">
              <h2 className="text-2xl font-bold text-gray-800">
                {currentService.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/80 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row h-[calc(90vh-100px)]">
              {/* Left Content */}
              <div className="lg:w-1/2 p-6 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-pink-600 mb-2">
                      Giá dịch vụ
                    </h3>
                    <p className="text-2xl font-bold text-gray-800">
                      {currentService.price}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-pink-600 mb-2">
                      Mô tả dịch vụ
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {currentService.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-pink-600 mb-2">
                      Thời gian thực hiện
                    </h3>
                    <p className="text-gray-700">{currentService.duration}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-pink-600 mb-2">
                      Điểm nổi bật
                    </h3>
                    <ul className="space-y-2">
                      {currentService.features.map(
                        (feature: any, index: any) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-700"
                          >
                            <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-xl font-semibold shadow-lg"
                  >
                    Đặt lịch ngay
                  </motion.button>
                </div>
              </div>

              {/* Right Media Section */}
              <div className="lg:w-1/2 flex">
                {/* Thumbnail Sidebar */}
                <div className="w-[15%] bg-gray-50 p-2 overflow-y-auto">
                  <div className="space-y-2">
                    {service.images.map((image, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
                          selectedImageIndex === index
                            ? "border-pink-400"
                            : "border-transparent"
                        }`}
                        onClick={() => handleImageChange(index)}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          width={60}
                          height={60}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Main Image */}
                <div className="flex-1 relative bg-gray-100 overflow-hidden">
                  <div
                    ref={imageContainerRef}
                    className="relative w-full h-full select-none"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{
                      cursor: isZoomed
                        ? isDragging
                          ? "grabbing"
                          : "grab"
                        : "zoom-in",
                    }}
                  >
                    <Image
                      src={service.images[selectedImageIndex]}
                      alt={`Service image ${selectedImageIndex + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 pointer-events-none"
                      style={{
                        transform: `scale(${imageTransform.scale}) translate(${
                          imageTransform.x / imageTransform.scale
                        }px, ${imageTransform.y / imageTransform.scale}px)`,
                        transformOrigin: "center center",
                      }}
                      onClick={handleImageZoom}
                      draggable={false}
                    />
                  </div>

                  {/* Zoom Controls */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleImageZoom}
                      className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg"
                    >
                      {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                    </motion.button>
                    {isZoomed && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-2 bg-white/90 rounded-full shadow-lg"
                      >
                        <Move size={20} className="text-gray-600" />
                      </motion.div>
                    )}
                    {isZoomed && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={resetZoom}
                        className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg text-gray-600"
                        title="Reset zoom"
                      >
                        <X size={20} />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ServiceItem {
  key: string;
  images: StaticImageData[];
  title: string;
  description: string;
  useCount: number;
}

export const metadata: Metadata = getMetadataByPath("/services");

export default function Service({ isActive = true }: { isActive?: boolean }) {
  console.log(isActive);
  if (isActive) useDynamicMetadata();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const listServices: ServiceItem[] = [
    {
      key: "nail",
      images: CarouselServiceNail,
      title: "Nail",
      description: "Dịch vụ nail chuyên nghiệp với nhiều kiểu dáng hiện đại",
      useCount: 123,
    },
    {
      key: "eyelash",
      images: CarouselServiceEyelash,
      title: "Nối mi",
      description: "Nối mi tự nhiên, quyến rũ với kỹ thuật Hàn Quốc",
      useCount: 23,
    },
    {
      key: "head_washing",
      images: CarouselServiceHeadWashing,
      title: "Gội đầu",
      description: "Gội đầu thư giãn với tinh dầu thiên nhiên",
      useCount: 1289,
    },
    {
      key: "acne_treatment",
      images: CarouselServiceAcneTreatment,
      title: "Trị mụn",
      description: "Loại bỏ mụn chuyên sâu với công nghệ hiện đại",
      useCount: 1223,
    },
    {
      key: "peel",
      images: CarouselServiceHeadWashing,
      title: "Peel da",
      description: "Peel da tái sinh, làm mờ thâm nám hiệu quả",
      useCount: 12,
    },
    {
      key: "hair_removal",
      images: CarouselServiceHeadWashing,
      title: "Triệt lông",
      description: "Triệt lông vĩnh viễn hiệu quả có bảo trì",
      useCount: 1289,
    },
  ];

  const handleServiceClick = (service: ServiceItem) => {
    setSelectedService(service);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="bg-gradient-to-b from-pink-50 via-white to-rose-50">
      <div className="container mx-auto py-16 px-4" id="dich-vu">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"
            >
              Dịch vụ của chúng tôi
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              Trải nghiệm các dịch vụ spa & beauty cao cấp với đội ngũ chuyên
              gia hàng đầu
            </motion.p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listServices.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Service Image */}
                <div className="relative overflow-hidden">
                  <Carousel images={service.images} height={280} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-pink-600 font-semibold text-sm">
                      HOT
                    </span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Usage Count */}
                  <div className="flex items-center text-gray-500 text-sm mb-6">
                    <div className="flex items-center bg-pink-50 rounded-full px-3 py-1">
                      <Users size={16} className="mr-2 text-pink-500" />
                      <span className="font-medium">
                        {service.useCount.toLocaleString()} lượt sử dụng
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleServiceClick(service)}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Xem chi tiết
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Service Popup */}
      <ServicePopup
        service={selectedService}
        isOpen={isPopupOpen}
        onClose={closePopup}
      />
    </div>
  );
}
