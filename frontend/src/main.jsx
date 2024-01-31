import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import TopicPage from "./pages/TopicPage";
import PlayingPage from "./pages/PlayingPage";
import "react-toastify/dist/ReactToastify.css";
import AdminTopicList from "./pages/AdminTopicList";
import CreateNewTopic from "./pages/CreateNewTopic";
import EditTopicPage from "./pages/EditTopicPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/topic/:topicName",
    element: <TopicPage />,
  },
  {
    path: "/topic/:topicName/playing",
    element: <PlayingPage />,
  },
  {
    path: "/admin/topic-management",
    element: <AdminTopicList />,
  },
  {
    path: "/admin/topic-management/create",
    element: <CreateNewTopic />,
  },
  {
    path: "/admin/topic-management/edit/:topicName",
    element: <EditTopicPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
