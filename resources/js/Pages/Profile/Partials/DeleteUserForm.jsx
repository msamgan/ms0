import { useRef, useState } from "react"
import DangerButton from "@/Components/DangerButton"
import InputError from "@/Components/InputError"
import InputLabel from "@/Components/InputLabel"
import Modal from "@/Components/Modal"
import SecondaryButton from "@/Components/SecondaryButton"
import TextInput from "@/Components/TextInput"
import { useForm } from "@inertiajs/react"

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
    const passwordInput = useRef()

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors
    } = useForm({
        password: ""
    })

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true)
    }

    const deleteUser = (e) => {
        e.preventDefault()

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset()
        })
    }

    const closeModal = () => {
        setConfirmingUserDeletion(false)

        reset()
    }

    return (
        <section className={`space-y-6 ${className}`}>
            <header className="flex items-start">
                <div className="flex-shrink-0 bg-red-500 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Delete Account</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and data will be permanently deleted.
                        Before deleting your account, please download any data or information that you wish to
                        retain.
                    </p>
                </div>
            </header>

            <div className="mt-6">
                <DangerButton
                    onClick={confirmUserDeletion}
                    className="bg-red-500 hover:bg-red-600 focus:ring-red-500 shadow-md hover:shadow-lg transition-all duration-200 flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Account
                </DangerButton>
            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <div className="p-6 border-t-4 border-red-500">
                    <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-red-100 rounded-full p-2 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Are you sure you want to delete your account?
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-gray-600 bg-red-50 p-3 rounded-md border border-red-100 mb-4">
                        Once your account is deleted, all of its resources and data will be permanently deleted.
                        This action cannot be undone.
                    </p>

                    <form onSubmit={deleteUser}>
                        <div className="mb-4">
                            <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-medium" />
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                    className="block w-full rounded-none rounded-r-md focus:ring-red-500 focus:border-red-500 transition-all duration-200 border-gray-300"
                                    isFocused
                                    placeholder="Enter your password to confirm"
                                />
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="flex justify-end gap-3">
                            <SecondaryButton
                                onClick={closeModal}
                                className="shadow-sm hover:shadow transition-all duration-200"
                            >
                                Cancel
                            </SecondaryButton>

                            <DangerButton
                                className="bg-red-500 hover:bg-red-600 focus:ring-red-500 shadow-md hover:shadow-lg transition-all duration-200"
                                disabled={processing}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete Account
                            </DangerButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </section>
    )
}
