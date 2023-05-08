import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "@/store/store";
import { Button } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

type Option = {
    name: string;
    votes: number;
    id: number;
}

type Poll = {
    title: string;
    options: Option[];
    totalVotes: number;
    userVote:Option;
}

export default function PollSubmitPage() {

    const router = useRouter()
    const [poll, setPoll] = useState<Poll>()
    const accessToken = useStore(state => state.accessToken)
    const [selectedOption, setSelectedOption] = useState<number>(-1)

    const { pollID } = router.query

    useEffect(() => {
        if (!pollID) return
        axios.get(`${process.env.NEXT_PUBLIC_API}/poll/${pollID}`, { headers: { "Authorization": `Bearer ${accessToken}` } })
            .then((res:{data:Poll}) => {
                if(res.data.userVote.id !== 0 ) {
                    router.push(`/poll/results/${pollID}`)
                }
                setPoll(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [pollID])

    const handleSubmitVote = () => {
        if(selectedOption === -1) return
        axios.post(
            `${process.env.NEXT_PUBLIC_API}/poll/submit`,
            { optionID: selectedOption },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        ).then(() => {
            router.push(`/poll/results/${pollID}`)
        })
    }

    return (
        <div className="bg-dark min-h-screen">
            <Navbar />
            <div className="text-white mx-auto max-w-3xl px-10 flex flex-col gap-5">
                <h1 className="text-5xl font-bold">{poll?.title}</h1>
                <div className="flex flex-col gap-3 mt-5">
                    {poll?.options.map((option) => {
                        console.log(option.id)
                        console.log(selectedOption)
                        return (
                            <div onClick={() => setSelectedOption(option.id)} key={option.id} className={`cursor-pointer hover:bg-slate-900 transition duration-300`}>
                                <h3 className={`${selectedOption === option.id ? 'border-yellow border-2' : ''} text-2xl font-bold border border-slate-600 rounded-lg py-5 pl-2`}>{option.name}</h3>
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-row justify-between mt-3">
                    <Button onClick={handleSubmitVote} size="lg" colorScheme="yellow">Submit Vote</Button>
                    <Button size="lg" variant="link" _hover={{}} className="hover:text-slate-200">Jump to results <ArrowRightIcon className="mx-2" /></Button>
                </div>
            </div>
        </div>
    )
}