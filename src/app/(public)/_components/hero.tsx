import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorImg from "../../../../public/doctor-hero.png";

export function Hero() {
    return (
        <section className="bg-white">
            <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8">
                <main className="flex items-center justify-center">
                    <article className="flex-[2] space-y-8 max-w-2xl flex flex-col justify-center">
                        <h1 className="text-4xl lg:text-5xl font-bold max-w-2xl">Encontre os melhores profissioniais em um único local!</h1>
                        <p className="text-base md:text-lg text-gray-600">
                            nós somos uma plataforma para profissionais de saúde com foco em agilizar o atendimento de forma simplificada e organizada.
                        </p>
                        <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer w-fit px-6 font-semibold">
                            encontre uma clinica
                        </Button>
                    </article>
                    <div className="hidden lg:block">
                        <Image src={doctorImg} alt="Foto ilutrativa profissonal da saude" width={340} height={400} className="object-contain"priority quality={100}/>
                    
                    </div>
                </main>
            </div>
        </section>
    )
}