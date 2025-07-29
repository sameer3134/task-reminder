import MainPage from "@/components/todo/main";
import Login from "./login/page";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore=await cookies()
  const token = cookieStore.get("token")?.value;
  console.log("m", token,"m");

  return <>{token ? <MainPage /> : <Login />}</>;
}
