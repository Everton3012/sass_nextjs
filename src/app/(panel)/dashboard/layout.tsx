import SidebarDashboard from './_components/sidebar'

const DashboardLayout = ({ children, }: { children: React.ReactNode }) => {
    return (
        <>
            <SidebarDashboard >
            {children}
            </SidebarDashboard>
        </>
    )
}

export default DashboardLayout