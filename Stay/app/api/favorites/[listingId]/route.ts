import  getCurrentUser  from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server'

import {prisma} from '../../_base'


interface IParams {
    listingId:string;
}

export async function POST(
    request:Request,
    { params } : { params:IParams }
){
    const user = await getCurrentUser();
    if(!user){
        return NextResponse.error();
    }
    const { listingId } = params;

    if(!listingId || typeof listingId !== 'string' ){
        throw new Error('Invalid Id')

    }
    let favoriteIds = [ ...(user.favoriteIds || [])]
    favoriteIds.push(listingId);
    const UpdateUser = await prisma.user.update({
        where: {
            id:user.id
        },
        data:{
            favoriteIds
        }
    });
    return NextResponse.json(UpdateUser);





}   

export async function DELETE(
    request:Request,
    { params }: { params:IParams } 
){
    const user = await getCurrentUser();
    if(!user){
        return NextResponse.error();
    }
    const { listingId } = params;

    if(!listingId || typeof listingId !== 'string' ){
        throw new Error('Invalid Id')

    }
    let favoriteIds = [ ...(user.favoriteIds || [])]
    favoriteIds = favoriteIds.filter((id) => id !== listingId )
    const UpdateUser = await prisma.user.update({
        where:{
            id:user.id,
        },
        data:{
            favoriteIds
        }
    })
    console.log(UpdateUser)
    return NextResponse.json(UpdateUser)
}