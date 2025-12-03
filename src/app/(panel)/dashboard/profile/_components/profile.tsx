"use client";
import { useProfileForm } from './profile_form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import imgTest from '../../../../../../public/foto1.png';

const ProfileContent = () => {

    const form = useProfileForm();

    return (
        <div className='mx-auto'>
            <Form {...form}>
                <form action="">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Meu Perfil
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-6'>
                            <div className='flex justify-center'>
                                <div className='bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden'>
                                    <Image alt='foto da clinica' src={imgTest} priority quality={100} objectFit='cover'
                                        fill
                                        className='object-cover' />
                                </div>
                            </div>
                            <div className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name={"name"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Nome completo</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Digite o nome da clínica...' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={"address"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Endereço completo:</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Digite o endereço da clínica...' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={"phone"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Nome completo</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Digite o número de telefone da clínica...' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={"name"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Status da clínica</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value ? 'active' : 'inactive'}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={"Selecione o Status da clinica"} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='active'>ATIVO (clinica aberta)</SelectItem>
                                                        <SelectItem value='inactive'>INATIVO (clinica fechada)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    )
}

export default ProfileContent