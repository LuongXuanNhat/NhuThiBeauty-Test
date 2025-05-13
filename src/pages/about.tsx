import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Users,
  Facebook,
  PhoneCall,
  Award,
  Heart,
  Sparkles,
} from "lucide-react";

// Ảnh placeholder - trong dự án thực tế, hãy thay thế bằng ảnh thật
import spaExterior from "@/assets/images/cua_hang.jpg";
import ownerImage from "@/assets/images/owner.jpg";
import teamImage from "@/assets/images/team.jpg";
import treatmentImage1 from "@/assets/images/treatment1.jpg";
import treatmentImage2 from "@/assets/images/treatment2.jpg";
import { useDynamicMetadata } from "@/hooks/useDynamicMetadata";

export default function About() {
  useDynamicMetadata();
  const spaInfo = {
    name: "Như Thị Beauty",
    address: "130 An Dương, Tây Hồ, Hà Nội",
    openHours: "8:30 AM - 9:30 PM",
    yearsInBusiness: 3,
    staffCount: "3-6",
    owner: {
      name: "Lương Thị Như",
      facebook: "https://www.facebook.com/NhuThiSpa",
    },
    facebook: "https://www.facebook.com/profile.php?id=61566362278724",
    googleMap: "https://maps.app.goo.gl/v5Ac3znWaUf2nZzC9",
    phone: "0xxxxxxxxx", // Thay bằng số điện thoại thật
  };

  // Các giá trị cốt lõi của spa
  const coreValues = [
    {
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      title: "Tận Tâm",
      description:
        "Chúng tôi luôn đặt sự hài lòng và nhu cầu của khách hàng lên hàng đầu.",
    },
    {
      icon: <Award className="w-8 h-8 text-pink-500" />,
      title: "Chuyên Nghiệp",
      description:
        "Đội ngũ nhân viên được đào tạo bài bản với quy trình làm việc chuẩn mực.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-pink-500" />,
      title: "Chất Lượng",
      description:
        "Sử dụng sản phẩm và thiết bị cao cấp đảm bảo hiệu quả tối ưu.",
    },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-pink-900/20 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src={spaExterior}
            alt="Như Thị Beauty Spa"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Như Thị Beauty
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Hành trình làm đẹp chất lượng và uy tín hàng đầu Việt Nam
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Về Chúng Tôi
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Với hơn {spaInfo.yearsInBusiness} năm kinh nghiệm trong lĩnh vực
              làm đẹp, Như Thị Beauty đã trở thành điểm đến tin cậy của hàng
              nghìn khách hàng. Chúng tôi không ngừng nâng cao chất lượng dịch
              vụ, áp dụng công nghệ hiện đại cùng đội ngũ chuyên viên tay nghề
              cao để mang đến những trải nghiệm làm đẹp hoàn hảo.
            </p>
          </motion.div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner & Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Owner */}
            <motion.div
              className="order-2 lg:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInLeft}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Người Sáng Lập
              </h2>
              <h3 className="text-2xl font-semibold mb-4 text-pink-600">
                {spaInfo.owner.name}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Với niềm đam mê và tâm huyết với ngành làm đẹp, Như đã không
                ngừng học hỏi và phát triển để mang đến những dịch vụ làm đẹp
                tốt nhất. Từ một ước mơ nhỏ, Như Thị Beauty đã trở thành địa chỉ
                làm đẹp uy tín được nhiều khách hàng tin tưởng lựa chọn.
              </p>
              <Link
                href={spaInfo.owner.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-pink-600 hover:text-pink-700 transition-colors"
              >
                <Facebook className="w-5 h-5 mr-2" />
                Theo dõi chị Như trên Facebook
              </Link>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInRight}
            >
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <motion.div
                  className="w-full h-full relative"
                  variants={imageVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                >
                  <Image
                    src={ownerImage}
                    alt={spaInfo.owner.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Team */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInLeft}
            >
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <motion.div
                  className="w-full h-full relative"
                  variants={imageVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                >
                  <Image
                    src={teamImage}
                    alt="Đội ngũ chuyên viên Như Thị Beauty"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInRight}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Đội Ngũ Chuyên Viên
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Đội ngũ {spaInfo.staffCount} chuyên viên tại Như Thị Beauty được
                đào tạo bài bản, thường xuyên cập nhật kiến thức và kỹ thuật mới
                nhất trong ngành làm đẹp. Mỗi thành viên đều mang trong mình sự
                nhiệt huyết, tận tâm và kỹ năng chuyên môn cao, sẵn sàng mang
                đến cho khách hàng những trải nghiệm làm đẹp hoàn hảo.
              </p>
              <div className="flex items-center text-gray-700">
                <Users className="w-5 h-5 mr-2 text-pink-600" />
                <span>{spaInfo.staffCount} chuyên viên tay nghề cao</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Không Gian Làm Đẹp
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Như Thị Beauty mang đến không gian làm đẹp hiện đại, tinh tế và
              sang trọng để khách hàng có thể thư giãn và tận hưởng những phút
              giây tuyệt vời.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-md"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
            >
              <motion.div
                className="w-full h-full relative"
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <Image
                  src={treatmentImage1}
                  alt="Không gian Như Thị Beauty 1"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-md"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="w-full h-full relative"
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <Image
                  src={treatmentImage2}
                  alt="Không gian Như Thị Beauty 2"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Info Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInLeft}
            >
              <h2 className="text-3xl font-bold mb-8">Thông Tin Liên Hệ</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-pink-600 p-3 rounded-full mr-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Địa Chỉ</h3>
                    <p className="text-gray-300">{spaInfo.address}</p>
                    <Link
                      href={spaInfo.googleMap}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-pink-300 hover:text-pink-200 transition-colors"
                    >
                      Xem trên Google Maps
                    </Link>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink-600 p-3 rounded-full mr-4">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Giờ Làm Việc</h3>
                    <p className="text-gray-300">
                      Hàng ngày: {spaInfo.openHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink-600 p-3 rounded-full mr-4">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Liên Hệ</h3>
                    <p className="text-gray-300">Điện thoại: {spaInfo.phone}</p>
                    <Link
                      href={spaInfo.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-2 text-pink-300 hover:text-pink-200 transition-colors"
                    >
                      <Facebook className="w-5 h-5 mr-2" />
                      Facebook
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInRight}
            >
              <div className="h-96 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.415305276635!2d105.83624507530173!3d21.05606868060006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab006adf5923%3A0xb5757a9f3f3e5f3b!2zTmjGsCBUaOG7iyBCZWF1dHk!5e0!3m2!1svi!2s!4v1746933862364!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            Trải Nghiệm Dịch Vụ Làm Đẹp Cùng Như Thị Beauty
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            Đặt lịch ngay hôm nay để nhận được những ưu đãi đặc biệt từ chúng
            tôi
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="https://www.facebook.com/messages/t/426405767222004"
              className="inline-block bg-white text-pink-600 font-medium px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Đặt Lịch Ngay
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
