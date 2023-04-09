import {create} from 'zustand'

type State = {
    accessToken: string,
    refreshToken: string,
    setAccessToken: (t:string) => void,
    setRefreshToken: (t:string) => void
}

export const useStore = create<State>((set) => ({
    accessToken:"",
    refreshToken:"",
    setAccessToken: (accessToken:string) => set(() => ({accessToken})),
    setRefreshToken: (refreshToken:string) => set(() => ({refreshToken}))
}))
