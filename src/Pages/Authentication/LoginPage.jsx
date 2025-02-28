import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLoginAuthStore from "../../Store/useLoginAuthStore";
import logo from "../../assets/limitless-logo.svg";
import LoginForm from "../../Components/LoginSignup/LoginForm";

const LoginPage = () => {
  const { user } = useLoginAuthStore();
  const navigate = useNavigate();

  // Create a dummy function to maintain compatibility with existing components
  const setIsLogin = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="bg-[url(../assets/LoginBG.jpeg)] bg-no-repeat bg-cover overflow-hidden">
      <div className="bg-[rgba(0,0,0,0.7)]">
        <div className="h-screen w-full flex justify-center items-center">
          <div className="max-w-lg p-6 lg:p-12 bg-[rgba(0,0,0,0.4)] shadow-lg text-center border-4 border-green-500 rounded-tl-[100px] rounded-br-[100px]">
            <img
              src={logo}
              alt="Limitless Logo"
              className="w-full mb-10 h-auto"
            />
            <LoginForm setIsLogin={setIsLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
