import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContextApi } from "@/context/AuthContext";
import Loading from "@/pages/Loading";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Register() {
  const { registerDetails, setRegisterDetails,isLoading, setIsLoading } = useContextApi();
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
      const response = await axios.post("https://leaderboard-nexo.onrender.com/api/auth/v1/register",registerDetails,config);
      console.log(response)
      notifySuccess(response.data.message)
    }
    catch(error){
      console.log(error)
      notifyFailure(error.response.data.message)
    }
    finally{
      setIsLoading(false)
    }
  }

  if(token !== null){
    return <Navigate to="/"/>
  }

//   console.log(registerDetails)
  return (
    <div className="container w-full h-screen flex justify-center items-center bg-gray-900">
      <div className="card shadow-lg p-7 max-w-96 w-96 text-center bg-white rounded">
        <h1 className="text-2xl font-medium ">Register</h1>
        <p className="mb-6">Already have an account <Link to="/login" className="hover:underline">
        Login
        </Link></p>
        <form onSubmit={onSubmit}>
        <div className="text-left">
            <Label className="text-sm" htmlFor="firstname">
              First Name
            </Label>
            <Input
              type="text"
              className="rounded mt-2"
              placeholder="enter your firstname"
              id="firstname"
              name="firstname"
              value={registerDetails.firstName}
              onChange={(e) => setRegisterDetails({...registerDetails,firstName: e.target.value})}
            />
          </div>
          <div className="text-left mt-2">
            <Label className="text-sm" htmlFor="lastname">
              Last Name
            </Label>
            <Input
              type="text"
              className="rounded mt-2"
              placeholder="enter your lastname"
              id="lastname"
              name="lastname"
              value={registerDetails.lastName}
              onChange={(e) => setRegisterDetails({...registerDetails,lastName: e.target.value})}
            />
          </div>
        <div className="text-left mt-2">
            <Label className="text-sm" htmlFor="email">
              Email
            </Label>
            <Input
              type="text"
              className="rounded mt-2"
              placeholder="enter your email"
              id="email"
              name="email"
              value={registerDetails.email}
              onChange={(e) => setRegisterDetails({...registerDetails,email: e.target.value})}
            />
          </div>
          <div className="text-left mt-2">
            <Label className="text-sm" htmlFor="username">
              User Name
            </Label>
            <Input
              type="text"
              className="rounded mt-2"
              placeholder="enter your username"
              id="username"
              name="username"
              value={registerDetails.username}
              onChange={(e) => setRegisterDetails({...registerDetails,username: e.target.value})}
            />
          </div>
          <div className="text-left mt-2">
            <Label className="text-sm" htmlFor="password">
              Password
            </Label>
            <Input
              type="password"
              className="rounded mt-2"
              placeholder="enter your password"
              id="password"
              name="password"
              value={registerDetails.password}
              onChange={(e) => setRegisterDetails({...registerDetails,password: e.target.value})}
            />
          </div>
          <Button type="submit" className="mt-6">
            Register
          </Button>
        </form>
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
        transition={Bounce} // This should now work
      >
      </ToastContainer>
        {isLoading && (<Loading/>)}
      </div>
    </div>
  );
}

export default Register;
