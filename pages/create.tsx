import { Badge, Input, Button } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import axios from 'axios'
import { useStore } from '@/store/store'
import { useRouter } from 'next/router'
import Head from './components/common/Head'
type Option = {
    value: string;
}

export default function Create() {

    const [title, setTitle] = useState("")
    const [options, setOptions] = useState<Option[]>([{ value: "" }])
    const accessToken = useStore((state) => state.accessToken)
    const router = useRouter()

    const createPoll = () => {
        axios.post("/api/poll", { title, options: options.map(opt => opt.value) },
            {
                headers: { "Authorization": `Bearer ${accessToken}` }
            }
        )
            .then((res) => {
                router.push(`/poll/results/${res.data.id}`)
            })
    }

    useEffect(() => {
        console.log(options)
    }, [options])

    return (
        <>
            <Head title="Create Poll | Flashpoll" />
            <div className="bg-dark min-h-screen text-white">
                <Navbar />
                <div className="px-5 flex flex-col gap-8 max-w-screen-lg mx-auto">
                    <div className="flex flex-col gap-2">
                        <Badge
                            fontSize={13}
                            bgColor="yellow.200"
                            color="black"
                            width="fit-content"
                            padding="1"
                        >
                            POLL TITLE
                        </Badge>

                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="The topic of your poll"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        {options.map((option, index) => <Option
                            key={index}
                            option={option}
                            setOptions={setOptions}
                            index={index}
                        />)}
                    </div>
                    <Button onClick={createPoll} colorScheme='yellow'>Create Poll</Button>
                </div>
            </div>
        </>
    )
}

type OptionProps = {
    option: Option,
    setOptions: Dispatch<SetStateAction<Option[]>>,
    index: number,
}

function Option({ option, setOptions, index }: OptionProps) {

    const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOptions(prev => (
            prev.map((prevOption, prevOptionIndex) => {
                if (prevOptionIndex === index) {
                    return { value: e.target.value }
                } else {
                    return prevOption
                }
            })
        ))
    }

    const addOptions = (addAfterIndex: number) => {
        setOptions(prevOptions => {
            return [
                ...prevOptions.slice(0, addAfterIndex + 1),
                { value: "" },
                ...prevOptions.slice(addAfterIndex + 1)
            ]
        })
    }

    const removeOption = (optionIndex: number) => {
        setOptions(prevOptions => {
            return prevOptions.filter((prevOption, index) => optionIndex !== index)
        })
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <Badge
                    fontSize={13}
                    bgColor="yellow.200"
                    color="black"
                    width="fit-content"
                >
                    POLL OPTION {index + 1}
                </Badge>

                <AddIcon
                    onClick={() => addOptions(index)}
                    className="cursor-pointer my-auto"
                    fontSize={12}
                />
                {index !== 0 &&
                    <CloseIcon
                        onClick={() => removeOption(index)}
                        className="cursor-pointer my-auto"
                        fontSize={10}
                    />
                }
            </div>

            <Input
                value={option.value}
                onChange={handleOptionChange}
            />

        </div>
    )
}