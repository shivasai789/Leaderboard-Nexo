import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: ''
    });

    const [registerDetails, setRegisterDetails] = useState({
        firstName: '',
        lastName: '',
        email: '', 
        username: '', 
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const [homeUsers,setHomeUsers] = useState([])

    const [dailyUsers,setDailyUsers] = useState([])

    const [weeklyUsers,setWeeklyUsers] = useState([])

    const [monthlyUsers,setMonthlyUsers] = useState([])

    const [leaderboardSelectedTab,setLeaderboardTab] = useState('your-daily-history')

    const [selectedUsername, setSelectedUsername] = useState(null);

    const [historyData, setHistoryData] = useState([]);

    const value = {
        loginDetails,
        setLoginDetails,
        registerDetails,
        setRegisterDetails,
        isLoading,
        setIsLoading,
        homeUsers,
        setHomeUsers,
        dailyUsers,
        setDailyUsers,
        weeklyUsers,
        setWeeklyUsers,
        monthlyUsers,
        setMonthlyUsers,
        leaderboardSelectedTab,
        setLeaderboardTab,
        selectedUsername,
        setSelectedUsername,
        historyData,
        setHistoryData
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Auth context
export const useContextApi = () => {
    return useContext(AuthContext);
};
