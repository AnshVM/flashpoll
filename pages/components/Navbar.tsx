import { Button } from '@chakra-ui/react';

export default function Navbar() {
    return (
        <div className="flex flex-row justify-between px-5 py-5">
            <div>
                <h1 className="text-xl font-bold text-white">Flashpoll⚡</h1>
            </div>
            <Button textColor='yellow' _hover={{}} colorScheme='yellow' bgColor="transparent" borderColor="yellow.400" border="1px">Logout</Button>
        </div>
    )
}