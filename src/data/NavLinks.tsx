import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { useSession } from "next-auth/react";

const navItems = [
    { label: "Profisionais", href: "#profissionais" },
];

interface NavLinksProps {
    isOpen?: () => void;
}

export const NavLinks = ({ isOpen }: NavLinksProps) => {
    const { data: session, status } = useSession();

    return (
        <>
            {navItems.map((item) => (
                <Button onClick={isOpen} key={item.href} variant="link" asChild className="bg-transparent hover:bg-transparent text-black shadow-none">
                    <Link href={item.href} className={"text-base"}>
                        {item.label}</Link>
                </Button>
            ))}
            {status === 'loading' ? (<></>) : session ? (
                <Link href={"/dashboard"} className="flex items-center justify-center gap-2 bg-zinc-900 text-white px-5 py-1 rounded-md">
                    Painel da Clinica
                </Link>
            ) : (
                <Button asChild className="flex items-center justify-center gap-2">
                    <Link href={"/login"}><LogIn />
                    Portal da clinica</Link>
                </Button>
            )}
        </>
    );
};