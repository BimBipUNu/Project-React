export default function Footer() {
  return (
    <>
      <footer className=" bg-gray-800 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Về chúng tôi */}
          <div>
            <h3 className="text-lg font-bold mb-2">Về chúng tôi</h3>
            <p className="text-sm leading-relaxed">
              Gym Management - Nơi bạn bắt đầu hành trình fitness của mình với
              các trang thiết bị hiện đại và đội ngũ huấn luyện viên chuyên
              nghiệp.
            </p>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-lg font-bold mb-2">Liên hệ</h3>
            <ul className="text-sm space-y-1">
              <li>
                Email:{" "}
                <a href="mailto:contact@gym.com" className="hover:underline">
                  contact@gym.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:1234567890" className="hover:underline">
                  (123) 456-7890
                </a>
              </li>
              <li>Địa chỉ: 123 Đường ABC, Quận XYZ</li>
            </ul>
          </div>

          {/* Theo dõi chúng tôi */}
          <div>
            <h3 className="text-lg font-bold mb-2">Theo dõi chúng tôi</h3>
            <ul className="flex flex-col sm:flex-row sm:space-x-4 space-y-1 sm:space-y-0 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-xs text-gray-400">
          © 2024 Gym Management. All rights reserved.
        </div>
      </footer>
    </>
  );
}
