import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import InputField from "../shared/InputField";
import Spinner from "../shared/Spinner";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { status, error, isLoading, register: registerUser, resetState } = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "onTouched" });

  const onSubmit = async (data: IFormInput) => {
    registerUser(data.username, data.password, data.email);
  };

  useEffect(() => {
    if (status === "succeeded") {
      reset();
      toast.success("User created. Redirecting to login page");
      setTimeout(() => navigate("/login"), 1000);
      resetState();
    } else if (status === "failed") {
      toast.error(error);
    }
  }, [error, status, toast, reset, navigate]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center  bg-gray-800 text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md  bg-slate-700">
        <div className="flex flex-col items-center justify-center space-y-4">
          <FaUserPlus className="text-slate-300 text-5xl" />
          <h1 className="text-slate-300 text-center font-montserrat lg:text-3xl text-2xl font-bold">Register Here</h1>
        </div>
        <hr className="mt-2 mb-5 text-white" />
        <div className="flex flex-col gap-3">
          <InputField label="User Name" required id="username" type="text" message="* User Name is required" placeholder="Enter your username" register={register} errors={errors} />
          <InputField label="Email" required id="email" type="email" message="* Email is required" placeholder="Enter your email" register={register} errors={errors} />
          <InputField label="Password" required id="password" min={6} type="password" message="* Password is required" placeholder="Enter your password" register={register} errors={errors} />
        </div>

        <button disabled={isLoading} className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3" type="submit">
          {isLoading ? (
            <>
              <Spinner /> Loading...
            </>
          ) : (
            <>Register</>
          )}
        </button>

        <p className="text-center text-sm text-slate-300 mt-6">
          Already have an account?
          <Link className="font-semibold underline hover:text-white" to="/login">
            <span> Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
