import SignIn from "../pages/Login/SignIn";
import SignUp from "../pages/Login/SignUp";
import Map from "../pages/Map";

const routes = {
  public: [
    {
      name: "Login",
      path: "/login",
      component: <SignIn />,
    },
    {
      name: "SignUp",
      path: "/signup",
      component: <SignUp />,
    },
  ],
  private: [
    {
      name: "Map",
      path: "/map",
      component: <Map />,
    },
  ],
};

export default routes;
