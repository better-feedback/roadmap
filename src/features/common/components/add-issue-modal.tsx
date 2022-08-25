import FormInput from "./form-input"


import { AiOutlineClose } from "react-icons/ai"
import { useState } from "react";
import Button from "./button";

import { useWalletSignedInAccountQuery } from "../hooks/useWalletQueries";

import { useUser } from '@auth0/nextjs-auth0'

import { useAccount } from 'wagmi'
import axios from "axios";

type AddIssueModalProps = {
    setIsModalOpen: (value: boolean) => void
}

const AddIssueModal = ({ setIsModalOpen }: AddIssueModalProps) => {
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("")
    const walletId = useWalletSignedInAccountQuery()
    const { user, error, isLoading } = useUser();
    const { address } = useAccount()
    const [isSubmitLoading, setIsLoading] = useState(false)


    const getWalletId = () => {
        const walletChain = localStorage.getItem("wallet-chain")

        let connectedWalletId;

        if (walletChain === "near") {
            connectedWalletId = walletId
        } else if (walletChain === "polygon") {
            connectedWalletId = address
        } else {
            connectedWalletId = "Unknown"
        }

        return connectedWalletId
    }

    const submitIssue = async () => {
        if (title.length === 0 || value.length == 0 || isSubmitLoading) return
        setIsLoading(true);
        try {
            let isGithubAuth = user != undefined
            let userId = user ? user?.sub : getWalletId()

            const result = await axios.post("/api/issues/addIssue", {
                userId,
                title,
                body: value, isGithubAuth
            }) as any

            const url = await result?.data?.message?.html_url

            window.open(url, "_blank")
            setIsLoading(false);
            setIsModalOpen(false)
        } catch (e) {
            setIsLoading(false);

            console.log(e)
        }

    }

    return <div onClick={() => setIsModalOpen(false)} className="w-screen h-screen bg-black/50 top-0 left-0 absolute z-10 flex items-center justify-center">
        <div onClick={(e) => {
            e.stopPropagation()
        }} className="rounded-md p-4 bg-white dark:bg-zinc-900 flex flex-col dark:text-white w-[90vw] h-[80vh] lg:w-[50vw] ">
            <div className="flex items-center justify-between">

                <span className="font-bold mb-4">Add Issue</span>
                <AiOutlineClose className="text-[1.5rem] cursor-pointer" onClick={() => setIsModalOpen(false)} />
            </div>
            <FormInput onChange={(e) => setTitle(e.target?.value)} placeholder="Issue Title" />

            <textarea className="mt-4 resize-none h-[70%] bg-gray-200 dark:bg-zinc-700 px-4 py-2 rounded-md  mb-4" placeholder="Drop your suggestions here. After submitting, tag the issue with >open< and >feature< to mirror it on this page for voting and funding" onChange={(e) => setValue(e.target.value)} />

            <Button onClick={submitIssue} disabled={title.length === 0 || value.length == 0} >
                {isSubmitLoading ? "Loading..." : "Submit"}
            </Button>
        </div>
    </div>
}


export default AddIssueModal
