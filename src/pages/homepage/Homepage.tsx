import "./homepage.scss";
import Navbar from "../../components/common/Navbar/Navbar";
import banner from "../../assets/banner.png";
import Footer from "../../components/common/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../slices";
import { useEffect } from "react";
import { fetchCourse } from "../../slices/course/course.slice";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const userStore = useSelector((store: RootState) => store.user);
  const courseStore = useSelector((state: RootState) => state.course);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCourse());
  }, [dispatch]);

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
                {userStore.isLogin
                  ? `Welcome back, ${userStore.data.fullName}!`
                  : "Welcome to Our Gym"}
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
          {[...courseStore.data]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((course, index) => (
              <div
                key={index}
                className="Card shadow-gray-200 shadow-xl rounded-xl overflow-hidden bg-white"
              >
                <img
                  className="w-full h-[192px] object-cover"
                  src={course.imageUrl}
                  alt="img"
                />
                <div className="p-[24px]">
                  <p className="font-bold text-[24px] mb-[8.5px]">
                    {course.name}
                  </p>
                  <p className="mb-[16px] text-[18px] text-gray-500">
                    {course.description}
                  </p>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white w-[100px] h-[40px] rounded-[8px]"
                    onClick={() => {
                      navigate("booking");
                    }}
                  >
                    Đặt lịch
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
