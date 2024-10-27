import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

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
        <header className="bg-secondary-bg text-primary-text">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <Link to="/" className="text-2xl font-bold hover:text-gray-300" onClick={() => handleToggleMenu(false)}>
                    Budget Buddy
                </Link>
                <div className="hidden md:flex md:items-center space-x-4">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="hover:text-gray-300 transition-colors duration-200 text-primary-text">
                                Dashboard
                            </Link>
                            <Link to="/transactions" className="hover:text-gray-300 transition-colors duration-200 text-primary-text">
                                Transactions
                            </Link>
                            <Link to="/budget" className="hover:text-gray-300 transition-colors duration-200 text-primary-text">
                                Budget
                            </Link>
                            <Link to="/settings" className="hover:text-gray-300 transition-colors duration-200 text-primary-text">
                                Settings
                            </Link>
                            <button
                                onClick={handleClick}
                                className="bg-highlight hover:bg-accent text-primary-text font-semibold py-1 px-4 rounded transition-colors duration-200"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-gray-300 transition-colors duration-200 text-primary-text">
                                Login
                            </Link>
                            <Link to="/register" className="hover:text-gray-300 transition-colors duration-200 text-primary-text">
                                Register
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
                        <XMarkIcon className="w-6 h-6 text-primary-text" />
                    ) : (
                        <Bars3Icon className="w-6 h-6 text-primary-text" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-primary-bg">
                    <nav className="flex flex-col space-y-2 py-2">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="block hover:text-gray-300 transition-colors duration-200 text-primary-text text-center" onClick={() => handleToggleMenu(false)}>
                                    Dashboard
                                </Link>
                                <Link to="/transactions" className="block hover:text-gray-300 transition-colors duration-200 text-primary-text text-center" onClick={() => handleToggleMenu(false)}>
                                    Transactions
                                </Link>
                                <Link to="/budget" className="block hover:text-gray-300 transition-colors duration-200 text-primary-text text-center" onClick={() => handleToggleMenu(false)}>
                                    Budget
                                </Link>
                                <Link to="/settings" className="block hover:text-gray-300 transition-colors duration-200 text-primary-text text-center" onClick={() => handleToggleMenu(false)}>
                                    Settings
                                </Link>
                                <button
                                    onClick={handleClick}
                                    className="bg-highlight hover:bg-accent text-primary-text font-semibold py-1 px-4 rounded transition-colors duration-200"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block hover:text-gray-300 transition-colors duration-200 text-primary-text text-center">
                                    Login
                                </Link>
                                <Link to="/register" className="block hover:text-gray-300 transition-colors duration-200 text-primary-text text-center">
                                    Register
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