'use client'
import React, { useCallback, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../Inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const toggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const { register, handleSubmit, formState: {
        errors,
    } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            if (callback?.ok) {
                toast.success('Logged In');
                router.refresh();
                loginModal.onClose();
                setIsLoading(false);
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        })
    }

    const body = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome back' subTile='Login to your account!' />
            <Input id="email" label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" label='Password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    )
    const footer = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button outline label='Continue with google' icon={FcGoogle} onClick={() => { signIn('google') }} />
            <div className='text-neutral-500  justify-center  flex items-center text-center mt-4 font-light '>
                <div className=''>First time using Airbnb ?</div>
                <div onClick={toggle} className=' text-neutral-800 cursor-pointer hover:underline ml-2 '>Create a account</div>
            </div>
        </div>
    )
    return (
        <Modal disabled={isLoading} body={body} footer={footer} isOpen={loginModal.isOpen}
            title="Login" actionLabel='Continue' onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} />
    )
}

export default LoginModal