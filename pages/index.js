import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2> Hello, <b>{session?.user?.email}</b></h2>
        <div className="flex bg-grey-300 gap-1 text-black">
          <img
            src={session?.user?.image}
            alt="user image"
            className="w-8 h-8 rounded-full inline-block ml-2 overflow-hidden"
          />
          <span className="px-2">
          {session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
