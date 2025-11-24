'use client';
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Banknote, CalendarCheck2, ChevronLeft, Folder, List, Settings } from "lucide-react";
import SidebarLink from "./sidebarLink";
import logoImg from "../../../../../public/logo-odonto.png"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

const SidebarDashboard = ({ children }: { children: React.ReactNode }) => {

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex min-h-screen w-full">

            <aside className={clsx("flex flex-col border-r bg-background transition-all p-4 duration-300", { "w-20": isOpen, "w-64": !isOpen, "hidden md:flex md:fixed": true })}>
                <div className="mb-6 mt-4">
                    {!isOpen && (
                        <Image
                            src={logoImg}
                            alt={"Logo do odonto pro"}
                            priority
                            quality={100}
                            style={{ width: 'auto', height: 'auto' }}
                        />
                    )}
                </div>

                <Button className="bg-gray-100 hover:bg-gray-50 text-zinc-900 self-end mb-2" onClick={() => setIsOpen(!isOpen)}>
                    {!isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5 rotate-180" />}
                </Button>

                {isOpen && (
                    <nav className="flex flex-col gap-1 overflow-hidden mt-2">
                        <SidebarLink href={"/dashboard"} icon={<CalendarCheck2 className="w-6 h-6" />} label={"Agendamentos"} pathname={pathname} isopen={isOpen} />
                        <SidebarLink href={"/dashboard/services"} icon={<Folder className="w-6 h-6" />} label={"Serviços"} pathname={pathname} isopen={isOpen} />
                        <SidebarLink href={"/dashboard/profile"} icon={<Settings className="w-6 h-6" />} label={"Perfil"} pathname={pathname} isopen={isOpen} />
                        <SidebarLink href={"/dashboard/plans"} icon={<Banknote className="w-6 h-6" />} label={"Planos"} pathname={pathname} isopen={isOpen} />
                    </nav>
                )}

                <Collapsible open={!isOpen}>
                    <CollapsibleContent>
                        <nav className="flex flex-col gap-1 overflow-hidden">
                            <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                                Painel
                            </span>
                            <SidebarLink href={"/dashboard"} icon={<CalendarCheck2 className="w-6 h-6" />} label={"Agendamentos"} pathname={pathname} isopen={isOpen} />
                            <SidebarLink href={"/dashboard/services"} icon={<Folder className="w-6 h-6" />} label={"Serviços"} pathname={pathname} isopen={isOpen} />
                            <SidebarLink href={"/dashboard/profile"} icon={<Settings className="w-6 h-6" />} label={"Perfil"} pathname={pathname} isopen={isOpen} />
                            <SidebarLink href={"/dashboard/plans"} icon={<Banknote className="w-6 h-6" />} label={"Planos"} pathname={pathname} isopen={isOpen} />

                        </nav>
                    </CollapsibleContent>
                </Collapsible>

            </aside>

            <div className={clsx("flex flex-1 flex-col transition-all duration-300", { "md:ml-20": isOpen, "md:ml-64": !isOpen })}>
                <header className="md:hidden flex items-center justify-between border-b px-2 md:px-6 h-14 z-10 sticky top-0 bg-white">
                    <Sheet>
                        <div className="flex items-center gap-4">
                            <SheetTrigger asChild>
                                <Button variant={"outline"} size={"icon"} className="md:hidden" onClick={() => setIsOpen(false)}>
                                    <List className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <h1 className="text-base md:text-lg font-semibold">
                                Menu OdontoPRO
                            </h1>
                        </div>
                        <SheetContent side="right" className="sm:max-w-xs text-black p-4">
                            <SheetTitle>
                                OdontoPRO
                            </SheetTitle>
                            <SheetDescription>
                                Menu administrativo
                            </SheetDescription>
                            <nav className="grid gap-2 text-base pt-5">
                                <SidebarLink href={"/dashboard"} icon={<CalendarCheck2 className="w-6 h-6" />} label={"Agendamentos"} pathname={pathname} isopen={isOpen} />
                                <SidebarLink href={"/dashboard/services"} icon={<Folder className="w-6 h-6" />} label={"Serviços"} pathname={pathname} isopen={isOpen} />
                                <SidebarLink href={"/dashboard/profile"} icon={<Settings className="w-6 h-6" />} label={"Perfil"} pathname={pathname} isopen={isOpen} />
                                <SidebarLink href={"/dashboard/plans"} icon={<Banknote className="w-6 h-6" />} label={"Planos"} pathname={pathname} isopen={isOpen} />
                            </nav>
                        </SheetContent>
                    </Sheet>

                </header>
                <main className="flex-1 pt-4 px-2 md:p-6">
                    {children}
                </main>
            </div>

        </div>
    )
}

export default SidebarDashboard