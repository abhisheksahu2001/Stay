'use client'
import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../Inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'
import useLoginModal from '@/app/hooks/useLoginModal'

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: {
        errors,
    } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })
    const toggle = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen()
    }, [loginModal, registerModal])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data).then((res) => {
            toast.success(res.data)
            registerModal.onClose();
        }).catch((err) => {
            console.log(err)
            toast.error('Something went wrong');
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const body = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome to Airbnb' subTile='Create an account!' />
            <Input id="email" label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id="name" label='Name' disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" label='Password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    )
    const footer = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button outline label='Continue with google' icon={FcGoogle} onClick={() => { signIn('google') }} />
            <div className='text-neutral-500  justify-center  flex items-center text-center mt-4 font-light '>
                <div className=''>Already have account ? </div>
                <div onClick={toggle} className=' text-neutral-800 cursor-pointer hover:underline ml-2 '>Log in</div>
            </div>
        </div>
    )
    return (
        <Modal disabled={isLoading} body={body} footer={footer} isOpen={registerModal.isOpen}
            title="Register" actionLabel='Continue' onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} />
    )
}

export default RegisterModal