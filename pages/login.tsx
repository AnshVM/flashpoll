import { Input, Button } from '@chakra-ui/react';
import { KeyboardEventHandler, useEffect, useState } from 'react';
import { LoginRequest } from '../types';
import axios, { Axios, AxiosError } from 'axios';
import Error from './components/common/Error';
import PasswordInput from './components/common/PasswordInput';
import { useRouter } from 'next/router';
import { useStore } from '@/store/store';
import Link from 'next/link';

export default function Signup() {
    
    const [request,setRequest] = useState<LoginRequest>({
        email:"",
        password:""
    })
    const [error,setError] = useState("")
    const router = useRouter()
    const setAccessToken = useStore(state => state.setAccessToken)
    const setRefreshToken = useStore(state => state.setRefreshToken)

    const handleLogin = () => {
        axios.post('/api/login',request)
        .then((res) => {
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken); 
            router.push('/')
        })
        .catch((err:AxiosError<{error:string}>) => {
            switch(err.response?.data.error){
                case 'InvalidCredentials':
                    setError("Invalid email or password")
                    break
                default:
                    setError("Unkown Error")
            }
        })
    }

    const setField = (field:string,value:string) => {
        setRequest((prev) => ({...prev,[field]:value}))
    }

    const handleKeyUp:KeyboardEventHandler<HTMLDivElement> = (e) => {
        if(e.key === 'Enter'){
            handleLogin()
        }
    }

    return (
        <div onKeyUp={handleKeyUp}  className="bg-dark h-screen text-white flex flex-col justify-center">
            <h1 className="w-auto mx-auto text-3xl font-bold">Flashpoll⚡</h1>
            <div className="w-96 h-2/5 mx-auto p-6 flex flex-col gap-4">
                <Input onChange={(e) => setField("email",e.target.value)} placeholder="Email"></Input>
                <PasswordInput setRequest={setRequest} />

                {error && (
                    <Error err={error} />
                )}

                <Button onClick={handleLogin} colorScheme='yellow'>Sign in with email</Button>
                <Link href='/signup'><p className="text-center opacity-60 underline">Don't have an account?</p></Link>
            </div>
        </div>
    )
}