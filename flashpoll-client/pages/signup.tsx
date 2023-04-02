import { Input, Button } from '@chakra-ui/react';

export default function Signup() {
    return (
        <div className="bg-dark h-screen text-white flex flex-col justify-center">
            <h1 className="w-auto mx-auto text-3xl font-bold">Flashpoll⚡</h1>
            <div className="w-96 h-2/3 mx-auto p-6 flex flex-col gap-4">
                <Input placeholder="First Name"></Input>
                <Input placeholder="Last Name"></Input>
                <Input placeholder="Email"></Input>
                <Input placeholder="Password"></Input>
                <Button colorScheme='yellow'>Create Account</Button>
            </div>
        </div>
    )
}