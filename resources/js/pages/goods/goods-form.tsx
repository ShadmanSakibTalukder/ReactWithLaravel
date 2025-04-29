import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import { Button } from '@/components/ui/button';
import { log } from 'console';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Goods',
        href: ('/goods.create'),
    },
];

export default function GoodsForm() {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        featured_image: null as File | null,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('goods.store'),{
            onSuccess: () => console.log('Form Submitted'),
        }  )
        console.log('data'.data);
    }

    


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Goods" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <div className='ml-auto'>
                <Link href={route('goods.index')} className='w-fit bg-emerald-600 px-4 py-2 rounded-lg text-white text-md cursor-pointer hover:opacity-90' as='button'>Back To Goods</Link>
                </div>
            
            <Card>
                <CardHeader>
                    <CardTitle> Create Goods</CardTitle>
                </CardHeader>

                <CardContent>

                <form onSubmit ={submit} className="flex flex-col gap-4" autoComplete='off'>

                    <div className='grid gap-6'>

                            <div className='grid gap-2'>
                                <Label htmlFor='name'>Goods Name</Label>
                                <Input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                id='name'
                                name='name'
                                type='text'
                                placeholder='Goods Name'
                                autoFocus
                                tabIndex={1}
                                />
                            </div>

                            <div className='grid gap-2'>
                                <Label htmlFor='description'>Description</Label>

                                < CustomTextarea 
                                value={data.name}
                                onChange={(e) => setData('description', e.target.value)}
                                id='description'
                                name='description'
                                placeholder='Goods Description'
                                rows={3}
                                tabIndex={2}/>
                            </div>

                            <div className='grid gap-2'>
                                <Label htmlFor='price'>Goods Price</Label>
                                <Input
                                value={data.name}
                                onChange={(e) => setData('price', e.target.value)}
                                id='price'
                                name='price'
                                type='text'
                                placeholder='Goods Price'
                                autoFocus
                                tabIndex={3}
                                />
                            </div>

                            <div className='grid gap-2'>
                                <Label htmlFor='featured_image'>Featured Image</Label>
                                <Input
                                id='featured_image'
                                name='featured_image'
                                type='File'
                                autoFocus
                                tabIndex={4}
                                />
                            </div>
                            <Button type="submit" className="mt-4 w-fit cursor-pointer" tabIndex={4}>
                               Save Image
                    </Button>


                    </div>

                </form>


                </CardContent>    

            </Card>


            </div>
        </AppLayout>
    );
}
