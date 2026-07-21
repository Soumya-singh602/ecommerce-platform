import MainLayout from "../layouts/MainLayout";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-16 px-4">

        <LoginForm />

      </div>
    </MainLayout>
  );
}