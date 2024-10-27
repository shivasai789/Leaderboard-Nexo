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
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import Navbar from "@/components/Navbar";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Popup from "reactjs-popup";
import "react-toastify/dist/ReactToastify.css";
import "reactjs-popup/dist/index.css";
import "./index.css";

const tabItems = [
  { id: "your-daily-history", displayText: "Daily" },
  { id: "your-weekly-history", displayText: "Weekly" },
  { id: "your-monthly-history", displayText: "Monthly" },
];

function Leaderboard() {
  const {
    dailyUsers,
    setDailyUsers,
    weeklyUsers,
    setWeeklyUsers,
    monthlyUsers,
    setMonthlyUsers,
    leaderboardSelectedTab,
    setLeaderboardTab,
    isLoading,
    setIsLoading,
    selectedUsername,
    setSelectedUsername,
    historyData,
    setHistoryData,
  } = useContextApi();

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

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const url1 = `https://leaderboard-nexo.onrender.com/api/user/v1/get-users`;
      const url2 = `https://leaderboard-nexo.onrender.com/api/user/v1/${leaderboardSelectedTab}`;

      const response1 = await axios.get(url1);
      const response2 = await axios.get(url2);

      const allUsers = response1.data.data;
      const selectedUsers = response2.data.data;

      const filteredUsers = allUsers.filter((user) =>
        selectedUsers.some((point) => point._id === user.username)
      );

      notifySuccess("Fetched Successfully !")

      const sortedData = filteredUsers.sort((a, b) => b.Points - a.Points);

      if (leaderboardSelectedTab === "your-daily-history") {
        setDailyUsers(sortedData);
      } else if (leaderboardSelectedTab === "your-weekly-history") {
        setWeeklyUsers(sortedData);
      } else if (leaderboardSelectedTab === "your-monthly-history") {
        setMonthlyUsers(sortedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      notifyFailure("Failed to fetch data.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHistory = async (username) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://leaderboard-nexo.onrender.com/api/user/v1/your-history",
        { username }
      );
      console.log(response.data);
      setHistoryData(response.data.data);
    } catch (error) {
      console.error("Error fetching history:", error);
      toast.error("Failed to fetch history.");
    }
    finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    let debounceTimeout;
  
  debounceTimeout = setTimeout(() => {
    fetchData();
  }, 200);
  
  return () => clearTimeout(debounceTimeout);
  }, [leaderboardSelectedTab]);

  const onClickChange = (id) => {
    setLeaderboardTab(id);
  };

  const displayUsers = () => {
    switch (leaderboardSelectedTab) {
      case "your-daily-history":
        return dailyUsers;
      case "your-weekly-history":
        return weeklyUsers;
      case "your-monthly-history":
        return monthlyUsers;
      default:
        return [];
    }
  };

  return (
    <>
      <Navbar />
      <div className="container px-3 min-h-screen py-4 bg-gray-900 w-full flex flex-col justify-center items-center text-white">
        <div className="flex justify-center items-center bg-slate-500 w-full p-4 md:mt-16">
          <IoPersonOutline size="25" />
          <h1 className="ml-3 text-2xl font-bold">Leaderboard</h1>
        </div>
        <div className="bg-slate-200 text-black w-full flex justify-center items-center space-x-5 p-3">
          {tabItems.map((eachItem) => (
            <div key={eachItem.id}>
              <button
                type="button"
                className={`text-white p-2.5 rounded-full outline-0 ${
                  leaderboardSelectedTab === eachItem.id
                    ? "bg-black text-white"
                    : "bg-slate-500"
                }`}
                onClick={() => onClickChange(eachItem.id)}
              >
                {eachItem.displayText}
              </button>
            </div>
          ))}
        </div>
        <Table className="bg-slate-200 text-black">
          <TableHeader className="bg-slate-300 hover:bg-slate-300">
            <TableRow className="py-2">
              {displayUsers()
                .slice(0, 3)
                .map((eachItem) => (
                  // eslint-disable-next-line react/jsx-key
                  <TableHead className="text-center px-0 w-[30%]">
                    <div className="flex-col text-black">
                      <p>{eachItem.username}</p>
                      <p>{eachItem.Points}</p>
                      <p className="text-slate-600 font-bold">{`Price: ₹${eachItem.Points}`}</p>
                    </div>
                  </TableHead>
                ))}
              {/* <TableHead className="text-center">Ranks</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Points</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayUsers().map((eachItem, index) => (
              <Popup
                key={eachItem._id}
                modal
                className="popup-content"
                onClose={() => {
                  setHistoryData([]);
                }}
                trigger={
                  <TableRow
                    className="cursor-pointer"
                    onClick={() => {
                      fetchHistory(eachItem.username);
                    }}
                  >
                    <TableCell className="text-center">
                      <div className="flex justify-center items-center">
                        <IoPersonOutline size="15" className="mr-2" />
                        <div className="text-left">
                          <p>{eachItem.username}</p>
                          <p>{`Rank : ${index + 1}`}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <p className="text-slate-600 font-bold">{`Price: ₹${eachItem.Points}`}</p>
                    </TableCell>
                    <TableCell className="text-center">
                      <p className="text-green-600">{eachItem.Points}</p>
                    </TableCell>
                  </TableRow>
                }
              >
                {(close) => (
                  <div className="rounded-lg bg-white p-3 border-0">
                    <h1 className="text-2xl font-bold mb-3">
                      {eachItem.username}&apos;s History
                    </h1>
                    <ul className="list-none">
                      {historyData.length > 0 ? (
                        historyData.map((item) => (
                          // eslint-disable-next-line react/jsx-key
                          <>
                            <li>
                              <p>{`Date: ${item.date}`}</p>
                              <p>{`Points Awarded: ${item.pointsAwarded}`}</p>
                            </li>
                            <hr className="mt-1 mb-1" />
                          </>
                        ))
                      ) : (
                        <li>
                          <button
                            onClick={() => {
                              setSelectedUsername(eachItem.username);
                              fetchHistory(eachItem.username);
                            }}
                            className="p-1 bg-black text-white rounded"
                          >
                            Load History
                          </button>
                        </li>
                      )}
                      {isLoading && <p>History Loading...</p>}
                    </ul>
                    <button
                      type="button"
                      onClick={() => {
                        close();
                      }}
                      className="trigger-button bg-red-500 mt-3 text-white p-1 rounded"
                    >
                      Close
                    </button>
                  </div>
                )}
              </Popup>
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
        />
        {isLoading && <Loading />}
      </div>
    </>
  );
}

export default Leaderboard;
