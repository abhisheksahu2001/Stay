import React from 'react'
import Container from '../Container'
import { TbBeach , TbMountain , TbPool } from 'react-icons/tb'
import { GiWindmill , GiIsland , GiBoatFishing , GiCastle, GiForestCamp , GiCactus , GiCaveEntrance  } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { FaSkiing } from 'react-icons/fa'
import { BsSnow } from 'react-icons/bs'
import { CategoryBox } from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        disc: 'This property is close to the beach'
    },
    {
        label: 'Villa',
        icon: MdOutlineVilla,
        disc: 'This property is close to the MdOutlineVilla'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        disc: 'This property is close to the Country Side'
    },
    {
        label: 'Pools',
        icon: TbPool,
        disc: 'This property is close has a pool'
    },
    {
        label: 'Island',
        icon: GiIsland,
        disc: 'This property is close to the Island'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        disc: 'This property is close to the Lake'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        disc: 'This property has skiing Activities'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        disc: 'This property is close to Castle'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        disc: 'This property has camping activities'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        disc: 'This property has camping activities'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        disc: 'This property is near cave'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        disc: 'This property is in the desert'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        disc: 'This property is close to the Windmill'
    }
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    if(!isMainPage){
        return null; 
    }
  return (
    <Container>
        <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto' >
            {categories.map((item)=>(
                <CategoryBox key={item.label} label={item.label} disc = {item.disc} icon={item.icon} selected={category === item.label} />
            ))   }
        </div>
    </Container>
  )
}

export default Categories