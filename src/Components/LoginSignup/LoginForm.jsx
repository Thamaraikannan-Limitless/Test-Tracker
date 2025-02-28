import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useLoginAuthStore from "../../Store/useLoginAuthStore";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, error: loginError, isLoading } = useLoginAuthStore();

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/dashboard");
    }
  };

  const handleResetClick = () => {
    navigate("/reset-password");
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  return (
    <>
      {loginError && (
        <p className="text-red-500 flex gap-2 items-center justify-center py-2 rounded text-sm mb-3 border">
          <IoWarningOutline className="text-md text-red-500" />
          {loginError}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-7">
        <div className="flex items-center border border-white p-3 rounded-lg focus-within:border-green-500">
          <FaUser className="text-gray-400 mx-2" />
          <input
            type="email"
            placeholder="email"
            className="bg-transparent w-full outline-none text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="flex items-center border border-white p-3 rounded-lg focus-within:border-green-500 relative">
          <FaLock className="text-gray-400 mx-2" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="bg-transparent w-full outline-none text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button
            type="button"
            className="absolute right-3 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>

        <button
          type="submit"
          className={`w-full bg-gradient-to-r from-[#71BF44] to-[#034C41] text-white py-2 rounded-lg ${
            !isFormValid || isLoading
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Logging in..." : "LOGIN"}
        </button>
      </form>

      <p className="mt-4 text-[#D1D2D4] text-sm">
        Forgot password?
        <button
          onClick={handleResetClick}
          className="text-[#71BF44]  font-bold cursor-pointer ml-2"
        >
          Reset
        </button>
      </p>

      <p className="mt-2 text-[#D1D2D4] text-sm">
        Don't have an account?
        <button
          onClick={handleRegisterClick}
          className="text-[#71BF44]  font-bold ml-2 cursor-pointer"
        >
          Register
        </button>
      </p>
    </>
  );
};

export default LoginForm;
