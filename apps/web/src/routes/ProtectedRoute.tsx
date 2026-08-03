import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";

import SplashPage from "@/pages/SplashPage";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props) {
  const {
    initialized,
    isAuthenticated,
  } = useAppSelector(
    (state) => state.auth
  );

  if (!initialized) {
    return <SplashPage />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <>{children}</>;
}