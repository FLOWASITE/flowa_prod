
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
import Register from "@/pages/Register";
import Pricing from "@/pages/Pricing";
import Invoices from "@/pages/Invoices";
import ProfileSettings from "@/pages/ProfileSettings";
import SocialConnections from "@/pages/SocialConnections";
import PrivacyPolicyPage from "@/pages/PrivacyPolicy";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/dashboard",
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
    path: "/filemanager",
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
    path: "/register",
    element: <Register />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/invoices",
    element: <Invoices />,
  },
  {
    path: "/profile-settings",
    element: <ProfileSettings />,
  },
  {
    path: "/social-connections",
    element: <SocialConnections />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
