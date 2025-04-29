import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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
                <table className='w-full table-auto'>
                    <thead>
                        <tr className='bg-grey-700 text-white'>
                            <th className='p-4 border'>#</th>
                            <th className='p-4 border'>Name</th>
                            <th className='p-4 border'>Description</th>
                            <th className='p-4 border'>Price</th>
                            <th className='p-4 border'>Product Image</th>
                            <th className='p-4 border'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </AppLayout>
    );
}
