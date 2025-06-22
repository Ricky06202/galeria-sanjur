"use client";
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Link from 'next/link';

export const Logo = () => {
    return (
        <Link href={'/'} className='flex flex-1 items-center gap-4 cursor-pointer hover:text-green-600 group'>
           <AddHomeWorkIcon />
           <h1 className='text-xl font-bold text-gray-800 group-hover:text-green-600'>Medallas Sanjur</h1>
        </Link>
    );
}
