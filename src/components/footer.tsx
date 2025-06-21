"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Facebook, PhoneCall } from "lucide-react";
import Link from "next/link";

export default function Footer() {
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
    phone: "0917340716",
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };
  const fadeInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <footer className="bg-gray-800 text-white p-6 text-center">
      <div>
        <section className="py-8 bg-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                    <div className="block text-start">
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
                    <div className="block text-start">
                      <h3 className="text-xl font-semibold mb-2">
                        Giờ Làm Việc
                      </h3>
                      <p className="text-gray-300">
                        Hàng ngày: {spaInfo.openHours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-pink-600 p-3 rounded-full mr-4">
                      <PhoneCall className="w-6 h-6" />
                    </div>
                    <div className="block text-start">
                      <h3 className="text-xl font-semibold mb-2">Liên Hệ</h3>
                      <p className="text-gray-300">
                        Điện thoại: {spaInfo.phone}
                      </p>
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
      </div>
      <p>&copy; 2025 Nhu Thi Beauty. All rights reserved.</p>
      <p>Tỏa sáng vẻ đẹp tự nhiên – Nâng niu từng khoảnh khắc</p>
    </footer>
  );
}
