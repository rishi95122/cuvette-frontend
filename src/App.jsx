import { Toaster } from "react-hot-toast";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/navbar/Navbar";
import Layout from "./components/layout/Layout";
import Addjob from "./pages/Addjob";
import Home from "./pages/Home";
import YourJobs from "./pages/YourJobs";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  const routes = [
    { path: "/signup", element: <Signup />, layout: false },
    { path: "/login", element: <Login />, layout: false },
    {
      path: "/addjob",
      element: user ? <Addjob /> : <Navigate to="/login" />,
      layout: true,
    },
    { path: "/", element: <Home />, layout: true },
    { path: "/jobs", element: <YourJobs />, layout: true },
  ];

  return (
    <>
      <Navbar />
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.layout ? <Layout>{route.element}</Layout> : route.element
            }
          />
        ))}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
