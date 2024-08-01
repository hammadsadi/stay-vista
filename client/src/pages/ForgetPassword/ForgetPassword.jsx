import { useNavigate } from "react-router-dom";
import { toastAlert } from "../../helper/helper";
import useAuth from "../../hooks/useAuth";

const ForgetPassword = () => {
  const { resetPassword, setLoading } = useAuth();
  const navigate = useNavigate();
  // handleSubmitResetForm
  const handleSubmitResetForm = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log(email);
    try {
      await resetPassword(email);
      toastAlert(
        "Reset Link Send Successful! Please Check Your Email",
        "success"
      );
      setLoading(false);
      navigate("/login");
    } catch (error) {
      toastAlert(error.message, "error");
      console.log(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Reset Your Password</h1>
        </div>
        <form
          className=" flex items-center gap-1"
          onSubmit={handleSubmitResetForm}
        >
          <div className=" flex-1">
            <div>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="disabled:cursor-not-allowed bg-rose-500 px-7 w-full rounded-md py-3 text-white"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
