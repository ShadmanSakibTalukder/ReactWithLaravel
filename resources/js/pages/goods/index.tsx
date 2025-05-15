
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect, useState } from 'react';
import { Interface } from 'readline';
import { CirclePlusIcon } from 'lucide-react';
import { Eye } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Goods',
        href: '/goods',
    },
];

interface Goods {

    id: number;
    name: string;
    description: string;
    price: number;
    featured_image: string;
    created_at:string;

}

export default function Index({...props}: {Goods:[]}) {

    const {goods} = props;


    const {flash} =usePage<{flash?: {success?: string; error?: string}}>().props;
    const flashMessage = flash?.success || flash?.error;
    const [ showAlert, setShowAlert ] = useState( flashMessage ? true : false );

    useEffect (() => {
        if (flashMessage){
           const timer = setTimeout(() => setShowAlert(false), 3000);

           return () => clearTimeout(timer);
        }

    },  [flashMessage])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Goods" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                
                { showAlert && flashMessage && (
                <Alert variant={'default'} className={`${flash?.success ? 'bg-green-400' : 'bg-red-800'} ml-auto max-w-md text-white`}>

                        <AlertDescription className='text-white'>{flash?.success ? 'Success!' : 'Error!'} {''} {flashMessage}</AlertDescription>

                </Alert>
            )}
                <div className="ml-auto">
                <Link className='flex-items-center bg-indigo-600 px-4 py-2 rounded-lg text-white text-md cursor-pointer hover:opacity-90' as='button' href={route('goods.create')}> <CirclePlusIcon className='me-2'/> Add Goods</Link>
                </div>
                <div className='overflow-hidden rounded-lg border bg-white shadow-sm'>
                <table className='w-full table-auto'>
                    <thead>
                        <tr className='bg-grey-700 text-gray-800'>
                            <th className='p-4 border'>#</th>
                            <th className='p-4 border'>Name</th>
                            <th className='p-4 border'>Description</th>
                            <th className='p-4 border'>Price</th>
                            <th className='p-4 border'>Featured Image</th>
                            <th className='p-4 border'>Created Date</th>
                            <th className='p-4 border'>Action</th>       
                        </tr>
                    </thead>

                    <tbody>
                        { goods.map((goods: Goods,index:number) => )}
                        <tr key={goods.id}>
                            <td className='px-4 py-2 text-center border'>{index +1 }</td>
                            <td className='px-4 py-2 text-center border'>{goods.name}</td>
                            <td className='px-4 py-2 text-center border'>{goods.description}</td>
                            <td className='px-4 py-2 text-center border'>{goods.price}</td>
                            <td className='px-4 py-2 text-center border'><img src={goods.featured_image} alt ={goods.name} className="h-16 w-16 object-cover"/></td>
                            <td className='px-4 py-2 text-center border'>{goods.created_at}</td>
                            <td className='px-4 py-2 text-center border'>
                                <Link as ="button" className="cursor-pointer ms-2  rounded-lg bg-sky-600 p-1 text-white hover:opacity-90" href={route('goods.show', goods.id)}> <Eye size={18}/>{''}</Link>

                                <Link as ="button" className="cursor-pointer ms-2  rounded-lg bg-blue-600 p-1 text-white hover:opacity-90" href={route('goods.show', goods.id)}> <Eye size={18}/>{''}</Link>

                                <Link as ="button" className="cursor-pointer ms-2  rounded-lg bg-red-600 p-1 text-white hover:opacity-90" href={route('goods.show', goods.id)}> <Eye size={18}/>{''}</Link>
                            </td>
                        </tr>
                    </tbody>

                </table>
                </div>
            </div>
        </AppLayout>
    )
}
