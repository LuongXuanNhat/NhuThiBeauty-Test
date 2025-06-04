import React, { useState, useEffect } from "react";
import {
  Heart,
  Sparkles,
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

const ComingSoonPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fixed sparkle positions to avoid hydration mismatch
  const sparklePositions = [
    { top: "10%", left: "15%", delay: 0, size: 16 },
    { top: "20%", left: "85%", delay: 1, size: 14 },
    { top: "35%", left: "5%", delay: 2, size: 18 },
    { top: "45%", left: "90%", delay: 0.5, size: 12 },
    { top: "60%", left: "25%", delay: 1.5, size: 20 },
    { top: "75%", left: "70%", delay: 2.5, size: 16 },
    { top: "85%", left: "40%", delay: 0.8, size: 14 },
    { top: "15%", left: "60%", delay: 1.8, size: 18 },
    { top: "50%", left: "12%", delay: 2.2, size: 15 },
    { top: "70%", left: "88%", delay: 0.3, size: 17 },
    { top: "25%", left: "45%", delay: 1.2, size: 13 },
    { top: "40%", left: "75%", delay: 2.8, size: 19 },
    { top: "80%", left: "20%", delay: 0.7, size: 16 },
    { top: "30%", left: "30%", delay: 1.7, size: 14 },
    { top: "65%", left: "55%", delay: 2.3, size: 18 },
    { top: "90%", left: "65%", delay: 0.4, size: 15 },
    { top: "55%", left: "80%", delay: 1.4, size: 17 },
    { top: "18%", left: "35%", delay: 2.6, size: 13 },
    { top: "72%", left: "10%", delay: 0.9, size: 16 },
    { top: "42%", left: "50%", delay: 1.9, size: 14 },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient]);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-xl opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full blur-xl opacity-50 animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      {/* Sparkle Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {sparklePositions.map((sparkle, i) => (
          <Sparkles
            key={i}
            className="absolute text-pink-300 opacity-20 animate-pulse"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              animationDelay: `${sparkle.delay}s`,
              fontSize: `${sparkle.size}px`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center items-center text-center">
        {/* Logo Section */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pink-400 via-rose-400 to-purple-400 rounded-full mb-6 shadow-2xl">
            <Heart className="w-12 h-12 text-white animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Như Thị Beauty
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            Nơi vẻ đẹp tự nhiên được tôn vinh
          </p>
        </div>

        {/* Coming Soon Message */}
        <div className="mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            Sắp Ra Mắt
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Chúng tôi đang chuẩn bị một không gian làm đẹp hoàn toàn mới với
            những dịch vụ chăm sóc da và làm đẹp tiên tiến nhất. Hãy cùng chờ
            đón những trải nghiệm tốt sắp tới!
          </p>
        </div>

        {/* Countdown Timer */}
        {/* <div className="mb-12 animate-slide-up delay-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <div
                key={unit}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-100 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {value.toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">
                  {unit === "days"
                    ? "Ngày"
                    : unit === "hours"
                    ? "Giờ"
                    : unit === "minutes"
                    ? "Phút"
                    : "Giây"}
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Email Subscription */}
        <div className="mb-12 w-full max-w-md animate-slide-up delay-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Đăng ký nhận thông báo
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/80 backdrop-blur-sm"
            />
            <button
              onClick={handleSubscribe}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Đăng ký
            </button>
          </div>
          {isSubscribed && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg animate-fade-in">
              ✨ Cảm ơn bạn! Chúng tôi sẽ thông báo khi ra mắt.
            </div>
          )}
        </div>

        {/* Services Preview */}
        <div className="mb-12 animate-slide-up delay-400">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Dịch vụ sắp có
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            {[
              {
                title: "Chăm sóc da mặt",
                desc: "Chu đáo, cẩn thận và chuyên sâu với công nghệ hiện đại",
                icon: "✨",
              },
              {
                title: "Làm đẹp tự nhiên",
                desc: "Sử dụng sản phẩm organic cao cấp",
                icon: "🌿",
              },
              {
                title: "Tư vấn cá nhân",
                desc: "Chương trình chăm sóc riêng cho từng khách hàng",
                icon: "💎",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl mb-3">{service.icon}</div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {service.title}
                </h4>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        {/* <div className="mb-8 animate-slide-up delay-500">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Liên hệ với chúng tôi
          </h3>
          <div className="flex flex-wrap justify-center gap-6 text-gray-600">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Phone className="w-4 h-4 text-pink-500" />
              <span className="text-sm">0123 456 789</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Mail className="w-4 h-4 text-pink-500" />
              <span className="text-sm">info@nhuthibeauty.com</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <MapPin className="w-4 h-4 text-pink-500" />
              <span className="text-sm">123 Đường ABC, Quận 1, TP.HCM</span>
            </div>
          </div>
        </div> */}

        {/* Social Media */}
        <div className="animate-slide-up delay-600">
          <div className="flex justify-center gap-4">
            <a
              href="https://instagram.com/nhu_thi_beauty_spa"
              className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transform hover:scale-110 transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61566362278724"
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transform hover:scale-110 transition-all duration-300"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }

        .delay-300 {
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }

        .delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }

        .delay-500 {
          animation-delay: 0.5s;
          animation-fill-mode: both;
        }

        .delay-600 {
          animation-delay: 0.6s;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
};

export default ComingSoonPage;
