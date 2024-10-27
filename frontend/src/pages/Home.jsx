import { IoPersonOutline } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useContextApi } from "@/context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import Navbar from "@/components/Navbar";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";

function Home() {
    
    const {homeUsers,setHomeUsers,isLoading,setIsLoading} = useContextApi()
    const token = localStorage.getItem('token')

    const fetchUsers = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("https://leaderboard-nexo.onrender.com/api/user/v1/get-users");
            const data = response.data.data
            setHomeUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        finally{
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchUsers();

    }, [setHomeUsers]);

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

    const onClickClaimPoints = async (username) => {
        try {
            setIsLoading(true)
            const response = await axios.patch("https://leaderboard-nexo.onrender.com/api/user/v1/claim-points",{username});
            fetchUsers();
            notifySuccess(`Points claimed successfully for ${response.data.data.username}`)
            console.log(response);
        } catch (error) {
            console.error('Error fetching users:', error);
            notifyFailure(error.response.data.message)
        }
        finally{
            setIsLoading(false)
        }
    }

    if(token === null){
        return <Navigate to="/login"/>
    }


  return (
    <>
    <Navbar/>
    <div className="constainer px-3 min-h-screen md:px-10 py-4 bg-gray-900 w-full flex flex-col justify-center items-center text-white">
      <div className="flex justify-center items-center bg-slate-500 w-full p-4 md:mt-16">
        <IoPersonOutline size="25" />
        <h1 className="ml-3 text-2xl font-bold">Friends</h1>
      </div>
      <Table className="bg-slate-200 text-black">
        <TableHeader className="bg-slate-300 hover:bg-slate-300">
          <TableRow>
            <TableHead className="text-center">S.No.</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {homeUsers.map((eachItem, index) => (
                    <TableRow key={eachItem._id} className="cursor-pointer" onClick={() => onClickClaimPoints(eachItem.username)}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{eachItem.username}</TableCell>
                    <TableCell className="text-center">{eachItem.Points}</TableCell>
                </TableRow>
                ))}
        </TableBody>
      </Table>
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
      {isLoading && (
        <Loading/>
      )}
    </div>
    </>
  );
}

export default Home;
