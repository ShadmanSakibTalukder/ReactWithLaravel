
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Goods',
        href: '/goods',
    },
];

export default function Index() {

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
                <Alert variant={'default'} className={`${flash?.success ? 'bg-green-800' : 'bg-red-800'} ml-auto max-w-min text-white`}>

                        <AlertDescription className='text-white'>{flash?.success ? 'Success!' : 'Error!'} {''} {flashMessage}</AlertDescription>

                </Alert>
            )}
                <div className="ml-auto">
                <Link className='bg-emerald-600 px-4 py-2 rounded-lg text-white text-md cursor-pointer hover:opacity-90' as='button' href={route('goods.create')}> Add Goods</Link>
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
                        <tr>
                            <td className='px-4 py-2 text-center border'></td>
                        </tr>
                    </tbody>

                </table>
                </div>
            </div>
        </AppLayout>
    )
}
