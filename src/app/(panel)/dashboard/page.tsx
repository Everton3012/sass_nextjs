import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

const Dashboard = async () => {

  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div>
        <h1>Página Dashboard</h1>
        <div className="w-full h-[600px] bg-gray-200 mb-10"></div>
        <div className="w-full h-[600px] bg-gray-500 mb-10"></div>
        <div className="w-full h-[600px] bg-gray-200 mb-10"></div>
    </div>
  );
}

export default Dashboard;