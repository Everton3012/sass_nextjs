import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

const navItems = [
    { label: "Profisionais", href: "#profissionais" },
];

interface NavLinksProps {
    isOpen?: () => void;
}

const session = false;

export const NavLinks = ({ isOpen }: NavLinksProps) => (
    <>
        {navItems.map((item) => (
            <Button onClick={isOpen} key={item.href} variant="link" asChild className="bg-transparent hover:bg-transparent text-black shadow-none">
                <Link href={item.href} className={"text-base"}>
                    {item.label}</Link>
            </Button>
        ))}
        {session ? (
            <Link href={"/dashboard"} className="flex items-center justify-center gap-2">
                Painel da Clinica
            </Link>
        ) : (
            <Button  className="flex items-center justify-center gap-2">
                <LogIn/>
                Portal da clinica
            </Button>
        )}
    </>
);