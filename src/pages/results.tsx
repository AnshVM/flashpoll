import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useStore } from "../store/store";
import QRCode from "react-qr-code";
import { Link, useParams } from "react-router-dom";

type Option = {
    name: string;
    votes: number;
    id: number;
    votesPercent: number;
}

type Poll = {
    title: string;
    options: Option[];
    totalVotes: number;
    userVote: Option;
}

type WSPollUpdate = {
    id: number;
    options: Option[];
    totalVotes: number;
}

export default function Poll() {
    const { pollID } = useParams()

    const accessToken = useStore((store) => store.accessToken)

    const [poll, setPoll] = useState<Poll>()

    useEffect(() => {
        if (!pollID || !accessToken) return
        axios.get(`/api/poll/${pollID}`, { headers: { "Authorization": `Bearer ${accessToken}` } })
            .then((res) => {
                let data: Poll = res.data
                data.options = data.options.sort((a, b) => b.votes - a.votes)
                setPoll(res.data)
            })
            .catch((err) => {
                console.log(err)
            })


    }, [pollID,accessToken])

    useEffect(() => {

        if (!pollID) return

        if (window.WebSocket) {
            const conn = new WebSocket(`wss://flashpoll-backend.anshmalik.me/api/ws/${pollID}`);
            conn.onopen = () => {
            }
            conn.onclose = () => {
            }
            conn.onmessage = (e: MessageEvent) => {
                const data: WSPollUpdate = JSON.parse(e.data)
                setPoll((prev) => {
                    if (!prev) return undefined
                    return { ...prev, totalVotes: data.totalVotes, options: data.options }
                })
            }
        }
    }, [pollID])

    return (
        <>
            <div className="bg-dark min-h-screen text-white">
                <Navbar />
                {poll && (
                    <div className="pl-5 max-w-3xl mt-10 mx-10 lg:mx-auto">
                        <h1 className="text-5xl font-bold">{poll.title}</h1>
                        <div className="mt-4">
                            <p className="opacity-80 font-semibold">For vote submission navigate to:</p>
                            <Link className="opacity-50" to={`${window.location.origin}/poll/${pollID}`}>{`${window.location.origin}/poll/${pollID}`}</Link>
                        </div>
                        <div className="flex flex-row gap-5 mt-5">
                            <div className="flex flex-col gap-3 flex-grow">
                                {poll.options.map(option => (
                                    <PollOption key={option.id} option={option}></PollOption>
                                ))}
                            </div>
                            <div className="">
                                <div className="mb-5">
                                    <h4 className="text-slate-200 font-semibold text-md">Votes</h4>
                                    <p className="font-bold text-xl">{poll.totalVotes}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-slate-300 font-semibold text-sm">Share</h4>
                                    <QRCode size={150} bgColor="#001D3D" fgColor="#FFC300" value={window.location.href} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )

}


function PollOption(props: { option: Option }) {
    return (
        <div className="border border-slate-600 rounded-lg px-3 py-3 flex flex-col gap-2">
            <h4 className="text-white text-2xl font-bold">{props.option.name}</h4>
            <div className="flex flex-row">
                <div className="bg-darkYellow h-1 mt-2 rounded-s-2xl" style={{ width: props.option.votesPercent + "%" }}></div>
                <div className="bg-darkYellow h-1 mt-2 rounded-e-2xl opacity-30" style={{ width: 100 - props.option.votesPercent + "%" }}></div>
            </div>
            <p className="text-white font-semibold">{props.option.votes} Votes</p>
        </div>
    )
}
