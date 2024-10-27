
import { Link } from 'react-router-dom'; 
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const onLogout = () => {
        localStorage.removeItem('token')
        navigate(0)
    }

    return (
        <nav className="bg-gray-800 md:fixed md:top-0 md:left-0 p-3 w-full z-50">
            <div className="container mx-auto flex-row justify-center text-center md:flex md:justify-between items-center">
                <div className="text-white text-lg font-semibold xs:mb-4 md:mb-0">
                    Leaderboard System
                </div>
                <div className="space-x-4">
                    <Link to="/" className="text-white hover:text-gray-400">
                        Home
                    </Link>
                    <Link to="/leaderboard" className="text-white hover:text-gray-400">
                        Leaderboard
                    </Link>
                    <Link to="/login" className="text-white hover:text-gray-400">
                        Login
                    </Link>
                    <Link to="/register" className="text-white hover:text-gray-400">
                        Register
                    </Link>
                    {token && (<Button type="button" className='button text-white bg-slate-500 xs:mt-3 md:mt-0' onClick={onLogout}>Logout</Button>)}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
