import { useRouter } from 'next/navigation';
import  useLoginModal  from '@/app/hooks/useLoginModal';
import React from 'react'
import axios  from 'axios'
import { Toast, toast } from 'react-hot-toast'
import { useCallback  , useMemo  } from 'react'
import { SafeUser } from '../types/Index'

interface IUserFavorite {
    listingId:string,
    currentUser?:SafeUser | null,
}

const useFavorite = ({listingId , currentUser} : IUserFavorite ) =>{
    const  router = useRouter()
    const loginModal = useLoginModal();
    const hasFavorited = useMemo(()=>{
        console.log(currentUser?.favoriteIds)
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    },[currentUser , listingId])

    const toggleFavorite = useCallback(async(e:React.MouseEvent<HTMLDivElement>)=>{
        console.log(hasFavorited)
        e.stopPropagation();
        if(!currentUser){
            return loginModal.onOpen();
        }
        try {
            let request 
            if(hasFavorited){
                request = () => axios.delete(`/api/favorites/${listingId}`)
            }else{
                request = () => axios.post(`/api/favorites/${listingId}`);
            }
            await request();
            router.refresh();
            toast.success('Success')
            
        }catch (error){
                toast.error('Something went wrong')
            }
    }
    ,[currentUser , listingId , hasFavorited , loginModal , router])


    return {
        hasFavorited ,toggleFavorite
    }
}
export default useFavorite