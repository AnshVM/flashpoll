import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Button } from '@chakra-ui/react'
import { LinkIcon } from "@chakra-ui/icons";
import { useStore } from "@/store/store";

type Option = {
    name: string;
    votes: number;
}

type Poll = {
    title: string;
    options: Option[];
}

export default function Poll() {
    const router = useRouter()
    const { pollID } = router.query

    const accessToken = useStore((store) => store.accessToken)


    const [poll, setPoll] = useState<Poll>()

    useEffect(() => {
        console.log(`${process.env.NEXT_PUBLIC_API}/poll/${pollID}`)
        axios.get(`${process.env.NEXT_PUBLIC_API}/poll/${pollID}`)
            .then((res) => {
                setPoll(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [pollID])

    useEffect(() => {
        if(accessToken === "") {
            router.push('/login')
        }
    },[accessToken])

    return (
        <div className="bg-dark min-h-screen">
            <Navbar />
            <div className="flex flex-row gap-10 justify-center">
                <div className="px-5">
                    <h1 className="font-bold text-white text-4xl">{poll && poll.title}</h1>
                    <p className="mt-1 text-white text-lg opacity-50">Ends 21 Jan, 2022 4:00pm</p>
                    <div className="mt-10 flex flex-col gap-5">
                        {poll && poll.options && poll.options.map((option) => (
                            <div className="border border-slate-600 rounded-lg px-3 w-full py-3 flex flex-col gap-2">
                                <h4 className="text-white text-lg">{option.name}</h4>
                                <div className="flex flex-row">
                                    <div className="bg-darkYellow h-1 mt-2 rounded-s-2xl" style={{ width: "50%" }}></div>
                                    <div className="bg-darkYellow h-1 mt-2 rounded-e-2xl opacity-30" style={{ width: "50%" }}></div>
                                </div>
                                <p className="text-white opacity-50">28 votes</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <Button className="mt-28" size="lg" colorScheme="yellow">Submit Vote</Button>
                    <div className="ml-1">
                        <p className="text-white opacity-50 mt-5 font-semibold">Votes</p>
                        <p className="text-white font-bold text-2xl">79</p>
                        <p className="text-green-600 cursor-pointer"><LinkIcon marginEnd={2} color="green"/>Copy Link</p>
                    </div>
                </div>
            </div>
        </div>
    )

}

