import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const register = async (email, password, nickname, theme) => {
        setIsLoading(true)
        setError(null)

        switch (theme) {
            case 'Parchment':
                theme = 'theme-parchment';
                break;
            case 'Blue':
                theme = 'theme-blue';
                break;
            case 'Green':
                theme= 'theme-green';
                break;
            case 'Pink':
                theme = 'theme-pink';
                break;
            default:
                theme = 'theme-parchment';
        }

        const response = await fetch('/user/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, nickname, theme})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
    }

    return { register, isLoading, error }
}