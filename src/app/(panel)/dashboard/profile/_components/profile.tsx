"use client";
import { useState } from 'react';
import { useProfileForm } from './profile_form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import imgTest from '../../../../../../public/foto1.png';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProfileContent = () => {

    const [selectedHours, setSelectedHours] = useState<string[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const form = useProfileForm();

    function generateTimeSlot(): string[] {
        const hours: string[] = [];

        for (let i = 8; i <= 23; i++) {
            for (let j = 0; j < 2; j++) {
                const hour = i.toString().padStart(2, '0');
                const minute = (j * 30).toString().padStart(2, '0');
                hours.push(`${hour}:${minute}`);
            }
        }

        return hours;
    }

    const hours = generateTimeSlot();

    const handleHourClick = (hour: string) => {
        setSelectedHours((prev) => prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour].sort());
    };

    const timeZones = Intl.supportedValuesOf('timeZone').filter(zone => zone.includes('America/Sao_Paulo') || zone.includes('America/Fortaleza') || zone.includes('America/Recife') || zone.includes('America/Bahia') || zone.includes('America/Belem') || zone.includes('America/Manaus') || zone.includes('America/Cuiaba') || zone.includes('America/Boa_Vista') || zone.includes('America/Rio_Branco'));

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
                                <div className='space-y-2'>
                                    <Label className='font-semibold'>
                                        Configurar hórarios da clínica
                                    </Label>

                                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant={"outline"} className='w-full justify-between'>
                                                Clique aqui para selecionar hórarios
                                                <ArrowRight className='w-5 h-5' />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Configurar hórarios da clínica
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Aqui você pode configurar os hórarios de funcionamento da clínica.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <section className='py-4'>
                                                <p className='text-sm text-muted-foreground mb-2'>
                                                    Clique nos horários abaixo para marcar ou desmarcar
                                                </p>

                                                <div className='grid grid-cols-5 gap-2'>
                                                    {hours.map((hour) => (
                                                        <Button key={hour} variant={"outline"} className={cn('h-10', selectedHours.includes(hour) && 'border-2 border-emerald-500 text-primary')}
                                                            onClick={() => handleHourClick(hour)}
                                                        >
                                                            {hour}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </section>
                                            <Button onClick={() => setDialogOpen(false)} className='w-full'>
                                                Fechar
                                            </Button>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <FormField
                                    control={form.control}
                                    name={"timeZone"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Selecione o fuso horário</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={"Selecione seu fuso horário"} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {timeZones.map((zone) => (
                                                            <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type={'submit'} className={"w-full bg-emerald-500 hover:bg-emerald-700 cursor-pointer"}>
                                    Salvar alterações
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    )
}

export default ProfileContent