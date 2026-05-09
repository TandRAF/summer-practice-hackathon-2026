import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AuthPage } from "../pages/AuthPage/AuthPage";
import { ProtectedRoute } from "./ProtectedRoute/ProtetedRoute";
import { WelcomePage } from "../pages/WelcomePage/WelcomePage";
import { NoFoundPage } from "../pages/NoFoundPage/NoFoundPage";
import { UiKitPage } from "../pages/UiKitPage/UiKitPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { RootRoute } from "./RoorRoute/RootRoute";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage";
import { SportsPage } from "../pages/SportsPage/SportsPage";
import { GroupsPage } from "../pages/GroupsPage/GroupsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <RootRoute /> },
      { path: "register", element: <AuthPage type="register"/> },
      { path: "login", element: <AuthPage type="login"/> },
      { path: "uikit", element: <UiKitPage/> },
      { path: "welcome", element:<WelcomePage/>},
      {
        element: <ProtectedRoute />, 
        children: [
          // { path: "welcome", element:<WelcomePage/>},
          { path: "/profile", element: <ProfilePage/> },
          { path: "/sports", element: <SportsPage /> },
          { path: "/matches", element: <DashboardPage/> },
          { path: "/groups", element: <GroupsPage/> }
        ],
      },
      {
        path: "*",
        element: <NoFoundPage />
      }
    ]
  }
]);