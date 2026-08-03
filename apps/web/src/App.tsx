import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes";

import useAuth from "./hooks/useAuth";

import SplashPage from "./pages/SplashPage";

export default function App() {
  const {
    isLoading,
  } = useAuth();

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