import { auth } from "@/auth";
import { Button } from "@/components/ui/Button";
import Form from "next/form";
import { redirect } from "next/navigation";
import logout from "../_logout/logoutAction";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  return (
    <div>
      <span>Pagina de Dashboard</span>
      <Form action={logout}>
        <Button>Sair</Button>
      </Form>
    </div>
  );
}
