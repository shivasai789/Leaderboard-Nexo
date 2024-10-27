import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContextApi } from "@/context/AuthContext";
import Loading from "@/pages/Loading";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Login() {
  const { loginDetails, setLoginDetails,isLoading, setIsLoading } = useContextApi();
  const token = localStorage.getItem('token')

  const config = {
    headers: {
        "Content-Type": "application/json"
    }
};

const notifySuccess = (message) => {
  toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
};

const notifyFailure = (message) => {
  toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
};

  const onSubmit = async (e) => {
    e.preventDefault()
    try{
      setIsLoading(true)
      const response = await axios.post("https://leaderboard-nexo.onrender.com/api/auth/v1/login",loginDetails,config);
      const data = response.data
      localStorage.setItem('token',data.token)
      notifySuccess("Login Successfull !")
    }
    catch(error){
      console.log(error)
      notifyFailure(error.response.data.message)
    }
    finally{
      setIsLoading(false)
      // clearTimeout(timer)
    }
  }

  if(token !== null){
    return <Navigate to="/"/>
  }

  return (
    <div className="container w-full h-screen flex justify-center items-center bg-gray-900">
      <div className="card shadow-lg p-7 max-w-96 w-96 text-center bg-white rounded">
        <h1 className="text-2xl font-medium">Login</h1>
        <p className="mb-6">Didn&apos;t have an account <Link to="/register" className="hover:underline">
        Register
        </Link></p>
        <form onSubmit={onSubmit}>
          <div className="text-left">
            <Label className="text-sm" htmlFor="username">
              User Name
            </Label>
            <Input
              type="text"
              className="rounded mt-2"
              placeholder="enter your username"
              id="username"
              value={loginDetails.username}
              onChange={(e) => setLoginDetails({...loginDetails,username: e.target.value})}
            />
          </div>
          <div className="text-left mt-6">
            <Label className="text-sm" htmlFor="password">
              Password
            </Label>
            <Input
              type="password"
              className="rounded mt-2"
              placeholder="enter your password"
              id="password"
              value={loginDetails.password}
              onChange={(e) => setLoginDetails({...loginDetails,password: e.target.value})}
            />
          </div>
          <Button type="submit" className="mt-6">
            Login
          </Button>
        </form>
        {isLoading && (<Loading/>)}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce} 
      >
      </ToastContainer>
    </div>
  );
}

export default Login;
