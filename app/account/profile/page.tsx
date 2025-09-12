"use client";

import { userProfile } from "@/lib/data/account";
import { useAuth } from "@/lib/providers/auth-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { logout } = useAuth();
  const router = useRouter();
  const signOunt = () => {
    const loggedOut = logout();
    if (loggedOut && loggedOut != undefined) {
      router.push("/");
    }
  }
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="col-span-1 flex flex-col items-center text-center space-y-4">

        <Image
          src={userProfile.avatar}
          alt={userProfile.name}
          className="w-32 h-32 rounded-full shadow-lg"
        />

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{userProfile.name}</h2>
        <p className="text-gray-600 dark:text-gray-300">{userProfile.email}</p>
      </div>

      <div className="col-span-2 space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">About Me</h3>
        <p className="text-gray-700 dark:text-gray-300">{userProfile.bio}</p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h3>
        <button className="primary-gradient text-white px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg">
          Edit Profile
        </button>
        <button onClick={() => signOunt()} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg ml-2">
          Log Out
        </button>
      </div>
    </div>
  );
}
