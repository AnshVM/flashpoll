import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import Error from '../components/common/Error';
import { SignupRequest } from '../types';
import PasswordInput from '../components/common/PasswordInput';
import { Link } from 'react-router-dom';
import { SERVER_BASE_URL } from '../config';

export default function Signup() {

    const [request, setRequest] = useState<SignupRequest>({
        username: "",
        email: "",
        password: ""
    })


    const [error, setError] = useState("")
    const [errorField, setErrorField] = useState("")
    const nav = useNavigate();

    const handleSignup = () => {

        if (!isValidEmail(request.email)) {
            setError("Invalid email address")
            setErrorField("email")
            return
        }

        setError("")
        setErrorField("")

        axios.post(`${SERVER_BASE_URL}/api/signup`, request)
            .then(() => {
                nav('/login')
            })
            .catch((err: AxiosError<{ error: string }>) => {
                switch (err.response?.data.error) {
                    case 'DuplicateEmail':
                        setErrorField("email")
                        setError("Email already in use")
                        break
                    case 'DuplicateUsername':
                        setErrorField("username")
                        setError("Username already in use")
                        break
                    default:
                        setError(err.response?.data.error || "")
                }
            })
    }

    const setField = (field: string, value: string) => {
        setErrorField("")
        setRequest((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <>
            <div className="bg-dark h-screen text-white flex flex-col justify-center">
                <h1 className="w-auto mx-auto text-3xl font-bold">Flashpoll⚡</h1>
                <div className="w-96 h-2/5 mx-auto p-6 flex flex-col gap-4">
                    <Input
                        isInvalid={errorField === "username"}
                        onChange={(e) => setField("username", e.target.value)}
                        id="username"
                        placeholder="Username"
                        errorBorderColor='red.300'
                    >
                    </Input>

                    <Input
                        isInvalid={errorField === "email"}
                        onChange={(e) => setField("email", e.target.value)}
                        id="email"
                        placeholder="Email"
                        errorBorderColor='red.300'
                    >
                    </Input>

                    <PasswordInput setRequest={setRequest} />

                    {error && (
                        <Error err={error} />
                    )}

                    <Button onClick={handleSignup} colorScheme='yellow'>Create Account</Button>

                    <Link to='/login'><p className="text-center opacity-60 underline">Already have an account?</p></Link>

                </div>
            </div>
        </>
    )
}

function isValidEmail(email: string) {
    //chatgipity
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}