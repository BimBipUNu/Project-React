import "./homepage.scss";
import Navbar from "../../components/common/Navbar/Navbar";
import banner from "../../assets/banner.png";
import gym from "../../assets/gym.png";
import yoga from "../../assets/yoga.png";
import zumba from "../../assets/zumba.png";
import Footer from "../../components/common/footer/Footer";

export default function Homepage() {
  return (
    <div className="nav xl:w-auto md:w-[834px] w-[375px] flex flex-col">
      {/* header */}
      <div className="header flex-1">
        <Navbar />
        {/* banner */}
        <div className="relative">
          <div>
            <img
              src={banner}
              alt="banner"
              className="xl:w-[1440px] md:w-[834px] w-[375px] h-[745px] object-fill flex justify-center"
            />
            <div className="xl:w-[576px] md:w-[576px] w-[375px] h-[156px] absolute top-[295px] xl:left-[425px] md:left-[112px] left-0 flex flex-col justify-center text-center">
              <p className="font-bold text-[50px] text-white">
                Welcome to Our Gym
              </p>
              <p className="text-white text-[30px]">
                Transform Your Body, Transform Your Life
              </p>
              <button className=" w-[194px] h-[44px] mx-auto mt-[25px] pt-[8px] pb-[8px] pl-[8px] pr-[8px] radius-[16px] rounded-[8px] bg-blue-500 text-white">
                Bắt đầu ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col justify-center items-center">
        <p className="font-bold text-[28px] md:text-[32px] xl:text-[35px] text-center mt-[64px]">
          Các lớp học phổ biến
        </p>

        <div className="CardBox xl:w-[1248px] md:w-[736px] w-[343px] grid md:grid-cols-3 gap-8 mt-[48px] mb-[64px]">
          {/* GYM */}
          <div className="Card shadow-gray-200 shadow-xl rounded-xl overflow-hidden bg-white">
            <img
              className="w-full h-[192px] object-cover"
              src={gym}
              alt="imgGym"
            />
            <div className="p-[24px]">
              <p className="font-bold text-[24px] mb-[8.5px]">Gym</p>
              <p className="mb-[16px] text-[18px] text-gray-500">
                Tập luyện với các thiết bị hiện đại
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white w-[100px] h-[40px] rounded-[8px]">
                Đặt lịch
              </button>
            </div>
          </div>

          {/* YOGA */}
          <div className="Card shadow-gray-200 shadow-xl rounded-xl overflow-hidden bg-white">
            <img
              className="w-full h-[192px] object-cover"
              src={yoga}
              alt="imgYoga"
            />
            <div className="p-[24px]">
              <p className="font-bold text-[24px] mb-[8.5px]">Yoga</p>
              <p className="mb-[16px] text-[18px] text-gray-500">
                Thư giãn và cân bằng tâm trí
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white w-[100px] h-[40px] rounded-[8px]">
                Đặt lịch
              </button>
            </div>
          </div>

          {/* ZUMBA */}
          <div className="Card shadow-gray-200 shadow-xl rounded-xl overflow-hidden bg-white">
            <img
              className="w-full h-[192px] object-cover"
              src={zumba}
              alt="imgZumba"
            />
            <div className="p-[24px]">
              <p className="font-bold text-[24px] mb-[8.5px]">Zumba</p>
              <p className="mb-[16px] text-[18px] text-gray-500">
                Đốt cháy calories với những điệu nhảy sôi động
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white w-[100px] h-[40px] rounded-[8px]">
                Đặt lịch
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
