import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useLoginUser } from "../../service/useAuthMutations";
import InputField from "../shared/InputField";
import Spinner from "../shared/Spinner";

interface IFormInput {
  username: string;
  password: string;
}

const LogIn = () => {
  const loginUser = useLoginUser(() => reset());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "onTouched" });

  const loginHandler = async (data: IFormInput) => {
    loginUser.mutate({ username: data.username, password: data.password });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center  bg-gray-800 text-white">
      <form onSubmit={handleSubmit(loginHandler)} className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md bg-slate-700">
        <div className="flex flex-col items-center justify-center space-y-4">
          <AiOutlineLogin className="text-slate-300 text-5xl" />
          <h1 className="text-slate-300 text-center font-montserrat lg:text-3xl text-2xl font-bold">Login Here</h1>
        </div>
        <hr className="mt-2 mb-5 text-white" />
        <div className="flex flex-col gap-3">
          <InputField label="User Name" required id="username" type="text" message="* User Name is required" placeholder="Enter your username" register={register} errors={errors} />

          <InputField label="Password" required id="password" type="password" message="* Password is required" placeholder="Enter your password" register={register} errors={errors} />
        </div>

        <button disabled={loginUser.isPending} className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3" type="submit">
          {loginUser.isPending ? (
            <>
              <Spinner />
              Loading...
            </>
          ) : (
            <>Login</>
          )}
        </button>

        <p className="text-center text-sm text-slate-300 mt-6">
          Don't have an account?
          <Link className="font-semibold underline hover:text-white" to="/register">
            <span> SignUp</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
