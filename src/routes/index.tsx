
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Brands from "@/pages/Brands";
import BrandDetails from "@/pages/BrandDetails";
import Topics from "@/pages/Topics";
import Content from "@/pages/Content";
import Schedule from "@/pages/Schedule";
import Chat from "@/pages/Chat";
import FileManager from "@/pages/FileManager";
import Crm from "@/pages/Crm";
import Users from "@/pages/Users";
import NotFound from "@/pages/NotFound";
import AccountType from "@/pages/AccountType";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/brands",
    element: <Brands />,
  },
  {
    path: "/brands/:brandId",
    element: <BrandDetails />,
  },
  {
    path: "/topics",
    element: <Topics />,
  },
  {
    path: "/content",
    element: <Content />,
  },
  {
    path: "/schedule",
    element: <Schedule />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/file-manager",
    element: <FileManager />,
  },
  {
    path: "/crm",
    element: <Crm />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/account-type",
    element: <AccountType />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
