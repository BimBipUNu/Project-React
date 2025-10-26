import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../slices";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

interface ProtectedAdminProps {
  children: ReactNode;
}

export default function ProtectedAdmin({ children }: ProtectedAdminProps) {
  const store = useSelector((store: RootState) => store.user);
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    // Đợi 100ms để restoreSession có thời gian chạy
    const timer = setTimeout(() => {
      hasCheckedRef.current = true;

      // Kiểm tra nếu chưa đăng nhập
      if (!store.isLogin) {
        navigate("/login");
        return;
      }

      // Kiểm tra role
      if (store.data.role === "user") {
        navigate("/");
        return;
      }

      // Cho phép admin
      if (store.data.role === "admin") {
        setIsAuthorized(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [store.isLogin, store.data.role, navigate]);

  // Hiển thị loading khi chưa check
  if (!hasCheckedRef.current || store.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Đang tải...
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}
