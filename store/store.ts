import { create } from 'zustand'

type State = {
    accessToken: string,
    refreshToken: string,
    setAccessToken: (t: string) => void,
    setRefreshToken: (t: string) => void
}

export const useStore = create<State>((set) => ({
    accessToken: "",
    refreshToken: "",
    setAccessToken: (accessToken: string) => {
        console.log(accessToken)
        set((state) => {
            console.log(state)
            return {...state,accessToken}
        })
    },
    setRefreshToken: (refreshToken: string) => {
        console.log(refreshToken)
        set((state) => {
            console.log(state)
            return {...state,refreshToken}
        })
    } 
}))
