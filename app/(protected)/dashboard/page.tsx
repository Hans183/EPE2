import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return (
      <div className="container mx-auto my-10">
        <h1 className="text-center text-3xl font-semibold mb-4">
              Lista de Tareas
        </h1>
      <LogoutButton />
    </div>
  );
}
