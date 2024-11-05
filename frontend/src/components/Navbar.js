import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Login from '../components/Login'

const Navbar = () => {
    
    const { user } = useAuthContext()

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleToggleMenu = (open) => {
        setIsMenuOpen(open)
    }

    const { logout } = useLogout()
    const handleClick = () => {
        logout()
        handleToggleMenu(false)
    }

    return (
        <header className="bg-dark1 text-light1 shadow-xl fixed w-full top-0 z-10">
            <div className="container mx-auto flex justify-between items-center py-2 px-6">
                <Link to="/" className="text-2xl font-bold hover:text-light1hover" onClick={() => handleToggleMenu(false)}>
                    Budget Buddy
                </Link>
                <div className="hidden md:flex md:items-center space-x-4">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="hover:text-light1hover transition-colors duration-200 text-light1">
                                Dashboard
                            </Link>
                            <Link to="/transactions" className="hover:text-light1hover transition-colors duration-200 text-light1">
                                Transactions
                            </Link>
                            <Link to="/budget" className="hover:text-light1hover transition-colors duration-200 text-light1">
                                Budget
                            </Link>
                            <Link to="/settings" className="hover:text-light1hover transition-colors duration-200 text-light1">
                                Settings
                            </Link>
                            <button
                                onClick={handleClick}
                                className="bg-button text-light1 hover:bg-buttonhover hover:text-dark1 font-semibold py-1 px-4 rounded transition-colors duration-200"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Login />
                            <Link to="/register" className="hover:text-light1hover transition-colors duration-200 text-light1">
                                No account? Register!
                            </Link>
                        </>
                    )}
                </div>
                {/* Hamburger Menu */}
                <button 
                    className="md:hidden p-2 rounded focus:outline-none"
                    onClick={() => handleToggleMenu(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <XMarkIcon className="w-6 h-6 text-light1" />
                    ) : (
                        <Bars3Icon className="w-6 h-6 text-light1" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-dark1">
                    <nav className="flex flex-col space-y-2 py-2">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="block hover:text-gray-300 transition-colors duration-200 text-light1 text-center" onClick={() => handleToggleMenu(false)}>
                                    Dashboard
                                </Link>
                                <Link to="/transactions" className="block hover:text-gray-300 transition-colors duration-200 text-light1 text-center" onClick={() => handleToggleMenu(false)}>
                                    Transactions
                                </Link>
                                <Link to="/budget" className="block hover:text-gray-300 transition-colors duration-200 text-light1 text-center" onClick={() => handleToggleMenu(false)}>
                                    Budget
                                </Link>
                                <Link to="/settings" className="block hover:text-gray-300 transition-colors duration-200 text-light1 text-center" onClick={() => handleToggleMenu(false)}>
                                    Settings
                                </Link>
                                <button
                                    onClick={handleClick}
                                    className="bg-button text-light1 hover:bg-buttonhover hover:text-dark1 font-semibold py-1 px-4 rounded transition-colors duration-200"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Login />
                                <Link to="/register" className="block hover:text-gray-300 transition-colors duration-200 text-light1 text-center">
                                    No account? Register!
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Navbar