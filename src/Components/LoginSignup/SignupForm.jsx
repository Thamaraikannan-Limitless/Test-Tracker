import { useState, useEffect } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useSignupAuthStore from "../../Store/useSignupAuthStore";
import PropType from "prop-types";
import { IoWarningOutline } from "react-icons/io5";

const SignupForm = ({ setIsLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const {
    signup,
    error: signupError,
    success,
    successMessage,
    isLoading,
    resetState,
  } = useSignupAuthStore();

  // useEffect to reset the store state when the component mounts
  useEffect(() => {
    resetState();
    return () => resetState();
  }, [resetState]);

  useEffect(() => {
    if (confirmPassword && password.trim() !== confirmPassword.trim()) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  }, [confirmPassword, password]);

  useEffect(() => {
    if (email) {
      if (!email.includes("@") || !email.includes(".com")) {
        setEmailError("Invalid email format. Example: user@example.com");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    const allFieldsFilled = name && email && password && confirmPassword;
    const passwordsMatch = password.trim() === confirmPassword.trim();
    const emailIsValid = email.includes("@") && email.includes(".com");

    if (allFieldsFilled && passwordsMatch && emailIsValid) {
      setIsFormValid(true);
      setShowTooltip(false);
    } else {
      setIsFormValid(false);
    }
  }, [name, email, password, confirmPassword]);

  const clearFormFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isFormValid) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000); // Tooltip hides after 3 seconds
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setConfirmPasswordError("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError("");
    }

    await signup(name, email, password, confirmPassword, clearFormFields);
  };

  // Add an effect to clear errors when the user starts typing
  useEffect(() => {
    if (name || email || password || confirmPassword) {
      // If the user starts typing anything, clear the signupError
      resetState();
    }
  }, [name, email, password, confirmPassword, resetState]);

  return (
    <div>
      {success && (
        <p className="text-green-500 text-sm mb-3">
          {successMessage} Redirecting to login...
        </p>
      )}
      {signupError && (
        <p className="text-red-500 flex gap-2 items-center justify-center py-2 rounded text-sm mb-3 border">
          <IoWarningOutline className="text-md text-red-500" />
          {signupError}
        </p>
      )}
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center border border-white p-3 rounded-lg focus-within:border-green-500">
          <FaUser className="text-gray-400 mx-2" />
          <input
            type="text"
            placeholder="Username"
            className="bg-transparent w-full outline-none text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex items-center border border-white p-3 rounded-lg focus-within:border-green-500">
          <FaEnvelope className="text-gray-400 mx-2" />
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent w-full outline-none text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

        <div className="flex items-center border border-white p-3 rounded-lg focus-within:border-green-500 relative">
          <FaLock className="text-gray-400 mx-2" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="bg-transparent w-full outline-none text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        {passwordError && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}

        <div className="flex items-center border border-white p-3 rounded-lg focus-within:border-green-500 relative">
          <FaLock className="text-gray-400 mx-2" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="bg-transparent w-full outline-none text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 text-gray-400"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        {confirmPasswordError && (
          <p className="text-red-500 text-sm">{confirmPasswordError}</p>
        )}

        <div className="relative">
          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-[#71BF44] to-[#034C41] text-white py-2 rounded-lg relative ${
              !isFormValid || isLoading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={!isFormValid || isLoading}
            onMouseEnter={() => {
              if (!isFormValid) setShowTooltip(true);
            }}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {isLoading ? "SIGNING UP..." : "SIGN UP"}
          </button>
          {showTooltip && !isFormValid && (
            <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 shadow-md">
              Please fill all fields correctly
            </div>
          )}
        </div>
      </form>

      <p className="mt-4 text-[#a9a9a9] text-sm">
        Already have an account?
        <button
          onClick={() => {
            resetState(); // Clear errors when switching to login
            setIsLogin(true);
          }}
          className="text-[#71BF44] underline font-bold cursor-pointer"
        >
          Login
        </button>
      </p>
    </div>
  );
};

SignupForm.propTypes = {
  setIsLogin: PropType.func.isRequired,
};

export default SignupForm;
