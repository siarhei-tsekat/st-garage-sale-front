import { BallTriangle } from "react-loader-spinner";

const Loader = ({text}: {text?:string}) => {
  return (
    <div className="flex justify-center items-center w-full h-[450px]">
      <div className="flex flex-col items-center gap-1">
        <BallTriangle height={100} width={100} radius={5} color="#FFCCFF" ariaLabel="ball-triangle-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        <p className="text-slate-800">{text ? text : "Please wait...."}</p>
      </div>
    </div>
  );
};

export default Loader;
