import { Input, Button } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { InputGroup, InputRightElement, Alert, AlertIcon} from '@chakra-ui/react';

type SignupRequest = {
    username: string,
    email: string,
    password: string
}

export default function Signup() {

    const [request, setRequest] = useState<SignupRequest>({
        username: "",
        email: "",
        password: ""
    })

    const [error, setError] = useState("")
    const [errorField, setErrorField] = useState("")

    const handleSignup = (e: MouseEvent<HTMLButtonElement>) => {

        if (!isValidEmail(request.email)) {
            setError("Invalid email address")
            setErrorField("email")
            return
        }

        setError("")
        setErrorField("")

        axios.post('/api/signup', request)
            .then(() => {
            })
            .catch((err:AxiosError<{error:string}>) => {
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

    const setField = (field:string, value:string) => {
        setErrorField("")
        setRequest((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="bg-dark h-screen text-white flex flex-col justify-center">
            <h1 className="w-auto mx-auto text-3xl font-bold">Flashpoll⚡</h1>
            <div className="w-96 h-2/5 mx-auto p-6 flex flex-col gap-4">
                <Input
                    isInvalid={errorField==="username"}
                    onChange={(e) => setField("username",e.target.value)}
                    id="username"
                    placeholder="Username"
                    errorBorderColor='red.300'
                >
                </Input>

                <Input
                    isInvalid={errorField==="email"}
                    onChange={(e) => setField("email",e.target.value)}
                    id="email"
                    placeholder="Email"
                    errorBorderColor='red.300'
                >
                </Input>

                <PasswordInput setRequest={setRequest} />

                {error && (
                    <Error err={error}/>
                )}

                <Button onClick={handleSignup} colorScheme='yellow'>Create Account</Button>
            </div>
        </div>
    )
}

function Error(props:{err:string}) {
    return(
        <div className='bg-red-500 bg-opacity-10 border-red-500 text-center border p-2 radius rounded-lg text-white'>
           {props.err} 
        </div>
    )
}

function PasswordInput(props: { setRequest: Dispatch<SetStateAction<SignupRequest>> }) {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <InputGroup size='md'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                onChange={(e) => props.setRequest((prev) => ({ ...prev, password: e.target.value }))}
            />
            <InputRightElement width='4.5rem'>
                <Button variant='outline' colorScheme='black' h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    )

}

function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}