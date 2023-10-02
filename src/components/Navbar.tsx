import { useStore } from '../store/store';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const setAccessToken = useStore(state => state.setAccessToken)
    const setRefreshToken = useStore(state => state.setRefreshToken)
    const accessToken = useStore(state => state.accessToken)
    const nav = useNavigate();

    const handleLogout = () => {
        setAccessToken("")
        setRefreshToken("")
        axios.post('/api/logout', {})
            .then(() => {
                nav('/login')
            })
    }


    return (
        <div className="flex flex-row justify-between px-5 py-5">
            <Link to="/">
                <h1 className="text-3xl font-bold text-white">Flashpoll⚡</h1>
            </Link>

            {accessToken && (
                <Button onClick={handleLogout} textColor='yellow' _hover={{}} colorScheme='yellow' bgColor="transparent" borderColor="yellow.400" border="1px">Logout</Button>
            )}

            {!accessToken && (
                <Link to="/login">
                    <Button textColor='yellow' _hover={{}} colorScheme='yellow' bgColor="transparent" borderColor="yellow.400" border="1px">Login</Button>
                </Link>
            )}

        </div>
    )
}