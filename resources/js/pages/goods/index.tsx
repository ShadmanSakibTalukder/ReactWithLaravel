import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Goods',
        href: '/goods',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Goods" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
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
    );
}
