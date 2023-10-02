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
        if (accessToken === "") {
            window.localStorage.removeItem("accessToken")
        }
        else {
            window.localStorage.setItem("accessToken", accessToken)
        }
        set((state) => {
            return { ...state, accessToken }
        })
    },
    setRefreshToken: (refreshToken: string) => {
        if (refreshToken === "") {
            window.localStorage.removeItem("refreshToken")
        }
        else {
            window.localStorage.setItem("refreshToken", refreshToken)
        }
        set((state) => {
            return { ...state, refreshToken }
        })
    }
}))
