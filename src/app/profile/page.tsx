// app/profile/page.tsx

import { cookies } from "next/headers";
import Image from "next/image";

export default async function Profile() {
  const cookieStore =await cookies();
  const userCookie = cookieStore.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  if (!user) return <div className="p-4">Not logged in</div>;

  return (
    <div className="p-6 max-w-xl mx-auto shadow rounded-lg mt-10 border">
      <h1 className="text-2xl font-bold mb-4">👋 Welcome, {user.name}</h1>
      <p className="mb-2"><strong>Email:</strong> {user.email}</p>
      <p className="mb-2"><strong>Phone:</strong> {user.phone}</p>
      {user.photo && (
        <Image
          src={user.photo}
          alt="Profile Photo"
          width={320}
          height={320}
          className="w-32 h-32 rounded-full mt-4 object-cover"
        />
      )}
    </div>
  );
}
