import { Button } from "@/components/ui/button";
import Link from "next/link";

const navItems = [
    { label: "Profisionais", href: "#profissionais" },
];

interface NavLinksProps {
    isOpen: () => void;
}

export const NavLinks = ({ isOpen }: NavLinksProps) => (
    <>
        {navItems.map((item) => (
            <Button onClick={isOpen} key={item.href} variant="link" asChild className="bg-transparent hover:bg-transparent text-black shadow-none">
                <Link href={item.href}>
                    {item.label}</Link>
            </Button>
        ))}
    </>
);