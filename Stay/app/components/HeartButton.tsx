'use-client'
import React, { useEffect } from 'react'
import { SafeUser } from '../types/Index';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavorite from '../hooks/useFavorite';

interface HeartButtonProps {
    listingId: string;
    currentUser: SafeUser | null;
}


export const HeartButton: React.FC<HeartButtonProps> = ({
    listingId, currentUser
}) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId, currentUser
    });
    useEffect(() => {

        console.log(hasFavorited)
    }, [hasFavorited])
    return (
        <div
            onClick={toggleFavorite}
            className='relative 
    hover:opacity-80 
    transition cursor-pointer ' >
            <AiOutlineHeart size={20} className='
            fill-white absolute -top-[2px] -right-[2px]
        ' />
            <AiFillHeart size={20} className={`absolute -top-[2px] -right-[2px] ${hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'} `} />
        </div>
    )
}
