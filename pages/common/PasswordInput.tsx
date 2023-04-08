import { useState, Dispatch, SetStateAction } from 'react'
import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react'
import { SignupRequest, LoginRequest } from '../types'


export default function PasswordInput<T extends {password:string}>(props: {setRequest:Dispatch<SetStateAction<T>>}) {
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
