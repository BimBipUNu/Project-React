import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../slices";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface ProtectedAdminProps {
  children: ReactNode;
}

export default function ProtectedAdmin({ children }: ProtectedAdminProps) {
  const store = useSelector((store: RootState) => store.user);
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Kiểm tra nếu chưa đăng nhập
    if (!store.isLogin) {
      navigate("/login");
      return;
    }

    // Kiểm tra role sau khi đã đăng nhập
    if (store.data.role === "user") {
      navigate("/"); // Điều hướng về homepage cho user
      return;
    }

    // Chỉ cho phép admin truy cập
    if (store.data.role === "admin") {
      setIsAuthorized(true);
    }
  }, [store.isLogin, store.data.role, navigate]);

  return isAuthorized ? <>{children}</> : null;
}
