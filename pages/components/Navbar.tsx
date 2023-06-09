import { useStore } from '@/store/store';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { access } from 'fs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState} from 'react';


export default function Navbar() {

    const setAccessToken = useStore(state => state.setAccessToken)
    const setRefreshToken = useStore(state => state.setRefreshToken)
    const router = useRouter()
    const accessToken = useStore(state => state.accessToken)

    const handleLogout = () => {
        setAccessToken("")
        setRefreshToken("")
        axios.post('/api/logout', {})
            .then(() => {
                router.push('/login')
            })
    }

    console.log(accessToken)

    return (
        <div className="flex flex-row justify-between px-5 py-5">
            <Link href="/">
                <h1 className="text-3xl font-bold text-white">Flashpoll⚡</h1>
            </Link>

            {accessToken && (
                <Button onClick={handleLogout} textColor='yellow' _hover={{}} colorScheme='yellow' bgColor="transparent" borderColor="yellow.400" border="1px">Logout</Button>
            )}

            {!accessToken && (
                <Link href="/login">
                    <Button textColor='yellow' _hover={{}} colorScheme='yellow' bgColor="transparent" borderColor="yellow.400" border="1px">Login</Button>
                </Link>
            )}

        </div>
    )
}