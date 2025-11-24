import getSession from '@/lib/getSession';
import SidebarDashboard from './_components/sidebar'
import { redirect } from 'next/navigation';

const DashboardLayout = async ({ children, }: { children: React.ReactNode }) => {
    const session = await getSession();

    if (!session) {
      redirect('/login');
    }
  
    return (
        <>
            <SidebarDashboard >
            {children}
            </SidebarDashboard>
        </>
    )
}

export default DashboardLayout