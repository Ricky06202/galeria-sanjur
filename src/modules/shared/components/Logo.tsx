import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Link from 'next/link';

export const Logo = () => {
    return (
        <Link href={'/'} className='cursor-pointer hover:underline hover:text-blue-500'>
           <AddHomeWorkIcon /> 
        </Link>
    );
}
