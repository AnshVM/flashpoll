import { Input, Button } from '@chakra-ui/react';

export default function Signup() {
    return (
        <div className="bg-dark h-screen text-white flex flex-col justify-center">
            <h1 className="w-auto mx-auto text-3xl font-bold">Flashpoll⚡</h1>
            <div className="w-96 h-2/5 mx-auto p-6 flex flex-col gap-4">
                <Input placeholder="Email"></Input>
                <Input placeholder="Password"></Input>
                <Button colorScheme='yellow'>Sign in with email</Button>
                <Button colorScheme="blue">Sign in with Google</Button>
            </div>
        </div>
    )
}