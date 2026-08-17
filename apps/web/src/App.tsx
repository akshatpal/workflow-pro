import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes";

import useAuth from "./hooks/useAuth";
import { useSocket } from "./hooks/useSocket";
import { useNotificationSocket } from "./hooks/useNotificationSocket.tsx";

import SplashPage from "./pages/SplashPage";

export default function App() {
  const {
    isLoading,
  } = useAuth();

  useSocket();
  useNotificationSocket();

  if (isLoading) {
    return <SplashPage />;
  }

  return (
    <>
      <Toaster />

      <AppRoutes />
    </>
  );
}