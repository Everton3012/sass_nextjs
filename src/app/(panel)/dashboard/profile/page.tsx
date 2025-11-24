import { getUserData } from "./_data-access/get-info-user";
import getSession from "@/lib/getSession";

const Profile = async () => {

  const session = await getSession();

  const user = await getUserData({ userId: session?.user?.id! });
  

  return (
    <div>{user?.name}</div>
  )
}

export default Profile;