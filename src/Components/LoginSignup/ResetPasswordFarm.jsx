import { useState } from "react";
import { IoMail } from "react-icons/io5";
import PropType from "prop-types"
const ResetPasswordForm = ({ setResetPassword }) => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setResetPassword(false);
      setSuccess(false);
    }, 3000);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#71BF44] to-[#034C41]">
        Reset Password
      </h2>

      {success && (
        <p className="text-green-500 text-sm mb-3 ">
          Password reset link sent! Check your email.
        </p>
      )}

      <form onSubmit={handleReset} className="space-y-7">
        <div className="flex items-center border border-white p-3 rounded-lg">
          <IoMail className="text-gray-400 mx-2 text-2xl" />
          {/* <FaRegEnvelope />
          <MdEmail /> */}
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-transparent w-full outline-none text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#71BF44] to-[#034C41] cursor-pointer text-white py-2 rounded-lg"
        >
          Send Reset Link
        </button>
      </form>

      {/* Back to Login Link */}
      <p className="mt-4 text-[#71BF44] text-sm">
        <button
          onClick={() => setResetPassword(false)}
          className="text-[#71BF44] underline cursor-pointer"
        >
          Back to Login
        </button>
      </p>
    </>
  );
};

ResetPasswordForm.propTypes = {
  setResetPassword: PropType.func.isRequired,
};

export default ResetPasswordForm;
