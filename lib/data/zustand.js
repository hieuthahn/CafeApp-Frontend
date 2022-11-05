import create from "zustand"

const useBearStore = create((set) => ({
    modalLogin: false,
    toggleModalLogin: () => set((state) => ({ modalLogin: !state.modalLogin })),
    modalReview: false,
    toggleModalReview: () =>
        set((state) => ({ modalReview: !state.modalReview })),
}))

export default useBearStore
