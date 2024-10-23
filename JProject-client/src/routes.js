import { createBrowserRouter } from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import PasswordResetLinkPage from './pages/PasswordResetLink';
import PasswordResetForm from "./pages/PasswordResetForm";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import Lists from "./pages/Lists";
import App from "./App"; 
import About from "./pages/About";
import EmailVerifiedPage from "./pages/EmailVerifiedPage";
//creates the config for router by passing an array of routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/search/:searchQuery", element: <SearchPage /> },
      { path: "/password-reset/:userId/:token", element: <PasswordResetForm /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/password-reset", element: <PasswordResetLinkPage /> },
      { path: "/lists", element: <Lists /> },
      { path: "/about", element: <About /> },
      { path: "/email-verified", element: <EmailVerifiedPage /> },
    ]
  }
]);

export default router;
