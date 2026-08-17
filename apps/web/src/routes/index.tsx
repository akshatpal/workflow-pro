import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";

import ProtectedRoute from "./ProtectedRoute";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailsPage from "@/pages/ProjectDetailsPage";
import BoardsPage from "@/pages/BoardsPage";
import BoardDetailsPage from "@/pages/BoardDetailsPage";
import TaskDetailsPage from "@/pages/TaskDetailsPage";
import NotificationPage from "@/features/notification/pages/NotificationPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={<LoginPage />}
        />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/projects"
          element={<ProjectsPage />}
        />

        <Route
          path="/projects/:id"
          element={<ProjectDetailsPage />}
        />

        <Route
          path="/projects/:projectId/boards"
          element={
            <BoardsPage />
          }
        />

        <Route
          path="/boards/:id"
          element={
            <BoardDetailsPage />
          }
        />

        <Route
          path="/tasks/:id"
          element={
            <TaskDetailsPage />
          }
        />

        <Route
          path="/notifications"
          element={
            <NotificationPage />
          }
        />
      </Route>


      <Route
        path="*"
        element={<h1>404</h1>}
      />
    </Routes>
  );
}