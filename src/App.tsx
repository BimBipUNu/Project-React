import { useEffect } from "react";
import RouteConfig from "./RouteConfig";
import { useDispatch } from "react-redux";
import { restoreSession } from "./slices/user/user.slice";
import type { AppDispatch } from "./slices";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Kiểm tra token khi app load
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <>
      <RouteConfig />
    </>
  );
}

export default App;
