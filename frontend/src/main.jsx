import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ContactUS from "./pages/Contact Us/ContactUS.jsx";
import Game from "./pages/Game/Game.jsx";

import Layout from "./Layout.jsx";
import UserLoginRegister from './pages/home/UserLoginRegister.jsx';
import UserForgotPasswordDialog from "./components/UserLoginRegisterCompo/UserForgotPasswordDialog.jsx";
import UserLogin from "./components/UserLoginRegisterCompo/UserLogin.jsx";
import UserResetPassword from "./components/UserLoginRegisterCompo/UserResetPassword.jsx";
import Home from "./pages/home/Home.jsx";
import Battery from "./pages/Afterlogin/Battery.jsx";
import Engine from "./pages/Afterlogin/Engine.jsx";
import Fule from "./pages/Afterlogin/Fule.jsx";
import Aidiy from "./pages/Afterlogin/Aidiy.jsx";
import OgMain from "../../frontend/src/components/diy/OgMain.jsx"
import About from "./pages/About/About.jsx";
import Industry from "./pages/Industry/Industry.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<App />} />
      <Route path="UserLoginRegister" element={<UserLoginRegister />} />
      <Route path="UserForgotPasswordDialog" element={<UserForgotPasswordDialog />} />
      <Route path="UserLogin" element={<UserLogin />} />
      <Route path="/UserResetPassword/:token" element={<UserResetPassword />} />
      <Route path="Engine" element={<Engine />} />
      <Route path="Battery" element={<Battery />} /> 
      <Route path="Fule" element={<Fule />} />       
      <Route path="Aidiy" element={<Aidiy />} />
      <Route path="Home" element={<Home />} />      
      <Route path="OgMain" element={<OgMain/>}/>
      <Route path="ContactUS" element={<ContactUS/>}/>
      <Route path="About" element={<About/>}/>
      <Route path="Industry" element={<Industry/>}/>
      <Route path="Game" element={<Game/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="bottom-right" />
  </React.StrictMode>
);
