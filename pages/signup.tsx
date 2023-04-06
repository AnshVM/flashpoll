import { Input, Button } from '@chakra-ui/react';
import axios from 'axios';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { InputGroup, InputRightElement } from '@chakra-ui/react';

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

    const handleSignup = (e: MouseEvent<HTMLButtonElement>) => {
        axios.post('/api/signup', request)
            .then((res) => {
                console.log(res)
            })
    }

    return (
        <div className="bg-dark h-screen text-white flex flex-col justify-center">
            <h1 className="w-auto mx-auto text-3xl font-bold">Flashpoll⚡</h1>
            <div className="w-96 h-2/5 mx-auto p-6 flex flex-col gap-4">
                <Input onChange={(e) => setRequest((prev) => ({ ...prev, username: e.target.value }))} id="username" placeholder="Username"></Input>
                <Input onChange={(e) => setRequest((prev) => ({ ...prev, email: e.target.value }))} id="email" placeholder="Email"></Input>

                <PasswordInput setRequest={setRequest} />

                <Button onClick={handleSignup} colorScheme='yellow'>Create Account</Button>
            </div>
        </div>
    )
}

function PasswordInput(props:{setRequest:Dispatch<SetStateAction<SignupRequest>>}) {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <InputGroup size='md'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                onChange={(e) => props.setRequest((prev) => ({...prev,password:e.target.value}))}
            />
            <InputRightElement width='4.5rem'>
                <Button variant='outline' colorScheme='black' h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    )

}