import { useState } from 'react'
import { useSettings } from '../hooks/useSettings'

const Settings = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [theme, setTheme] = useState('')
    const [deletePassword, setDeletePassword] = useState('')
    const {settings, deleteAccount, error, isLoading, successMessage} = useSettings()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert("Passwords do not match!")
            return
        }
        await settings(email, password, nickname, theme)
    }

    const handleDeleteAccount = async (e) => {
        e.preventDefault()
        if (!window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
            return
        }
        await deleteAccount(deletePassword)
    }

    return (
        <div className="bg-light1 flex h-full justify-center items-center w-[1000px]">
            <form onSubmit={handleSubmit} className="w-full max-w-3xl p-6 bg-light3 rounded-lg shadow-2xl">
                <h3 className="text-xl font-bold mb-4 text-dark1">Settings</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-dark1 mb-2">Email:</label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-light1"
                        />
                    </div>
                    <div>
                        <label className="block text-dark1 mb-2">Nickname:</label>
                        <input
                            type="text"
                            onChange={(e) => setNickname(e.target.value)}
                            value={nickname}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-light1"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-dark1 mb-2">Password:</label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-light1"
                        />
                    </div>
                    <div>
                        <label className="block text-dark1 mb-2">Confirm Password:</label>
                        <input
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            className="w-full p-2 border border-gray-300 rounded-md bg-light1"
                        />
                    </div>
                </div>

                <label className="block text-dark1 mb-2">Color Theme:</label>
                <select
                    onChange={(e) => setTheme(e.target.value)}
                    value={theme}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-light1"
                >
                    <option value="Parchment" selected>Parchment</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Pink">Pink</option>
                </select>

                <button disabled={isLoading} className="w-full mt-4 bg-button hover:bg-buttonhover text-light1 p-2 rounded-md">Update Account</button>
                
                {successMessage && <div className="bg-dark1 text-light1 text-center rounded-md p-4 mt-4">{successMessage}</div>}
                {error && <div className="bg-dark1 text-light1 text-center rounded-md p-4 mt-4">❌❌❌ {error} ❌❌❌</div>}

                <hr className="my-8 border-t border-dark1" />
                <h4 className="text-lg font-bold mt-8 text-dark1">Delete Account</h4>
                <p className="text-sm text-dark1 mb-2">This action is irreversible. Please enter your password to confirm.</p>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setDeletePassword(e.target.value)}
                    value={deletePassword}
                    className="w-full p-2 rounded-md mb-4 bg-light1"
                />
                <button onClick={handleDeleteAccount} className="w-full bg-button hover:bg-buttonhover text-light1 p-2 rounded-md">Delete Account</button>
            </form>
        </div>
    )
}

export default Settings