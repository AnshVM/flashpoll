import NextHead from "next/head"

export default function Head(props:{title:string}) {
    const { title } = props
    return (
        <NextHead>
            <title>{title}</title>
            <meta name="description" content="Voting app. Simple.Fast.Secure" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/flashpoll.ico" />
        </NextHead>
    )
}