import Navbar from "../../components/common/Navbar/Navbar";
import banner from "../../assets/banner.png";
import gym from "../../assets/gym.png";
import yoga from "../../assets/yoga.png";
import zumba from "../../assets/zumba.png";
export default function Homepage() {
  return (
    <div>
      <div className="nav xl:w-auto md:w-[834px] w-[375px] h-[900px]">
        {/* header */}
        <div className="header">
          <Navbar />
          {/* banner */}
          <div>
            <img
              src={banner}
              alt="banner"
              className="xl:w-[1440px] md:w-[834px] w-[375px] h-[745px] object-fill flex justify-center"
            />
            <div className="xl:w-[576px] md:w-[576px] w-[375px] h-[156px] absolute top-[295px] left-[425px] flex flex-col justify-center text-center">
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

        {/* Main */}
        <div className="main flex flex-col justify-center items-center">
          <p className="font-bold text-[35px] text-center mt-[64px]">
            Các lớp học phổ biến
          </p>
          <div className="CardBox flex xl:w-[1248px] md:w-[736px] w-[343px] h-[745px]  grid xl:grid-cols-3 grid-cols-1 gap-0 mt-[48px] mb-64px">
            <div className="Card shadow-gray-200 shadow-2xl xl:w-[395px] md:w-[224px] md:h-[404] w-[343px] h-[380px]">
              <img
                className="xl:w-[370px] md:w-[224px] md:h-[186px] w-[343px] h-[192px] mx-auto object-fill"
                src={gym}
                alt="imgGym"
              />
              <div className="m-[24px]">
                <p className="font-bold text-[24px] mb-[8.5px]">Gym</p>
                <p className="mb-[16px] text-[18px] text-gray-500">
                  Tập luyện với các thiết bị hiện đại
                </p>
                <button className="bg-blue-500 text-white w-[100px] h-[40px] pt-[8px] pr-[16px] pb-[8px] rounded-[8px]">
                  Đặt lịch
                </button>
              </div>
            </div>
            <div className="Card shadow-gray-200 shadow-2xl xl:w-[395px] md:w-[224px] md:h-[404] w-[343px] h-[380px]">
              <img
                className="xl:w-[370px] md:w-[224px] md:h-[186px] w-[343px] h-[192px] mx-auto object-fill"
                src={yoga}
                alt="imgYoga"
              />
              <div className="m-[24px]">
                <p className="font-bold text-[24px] mb-[8.5px]">Yoga</p>
                <p className="mb-[16px] text-[18px] text-gray-500">
                  Thư giãn và cân bằng tâm trí
                </p>
                <button className="bg-blue-500 text-white w-[100px] h-[40px] pt-[8px] pr-[16px] pb-[8px] rounded-[8px]">
                  Đặt lịch
                </button>
              </div>
            </div>
            <div className="Card shadow-gray-200 shadow-2xl xl:w-[395px] md:w-[224px] md:h-[404] w-[343px] h-[380px]">
              <img
                className="xl:w-[370px] md:w-[224px] md:h-[186px] w-[343px] h-[192px] mx-auto object-fill"
                src={zumba}
                alt="imgZumba"
              />
              <div className="m-[24px]">
                <p className="font-bold text-[24px] mb-[8.5px]">Zumba</p>
                <p className="mb-[16px] text-[18px] text-gray-500">
                  Đốt cháy calories với những điệu nhảy sôi động
                </p>
                <button className="bg-blue-500 text-white w-[100px] h-[40px] pt-[8px] pr-[16px] pb-[8px] rounded-[8px]">
                  Đặt lịch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
