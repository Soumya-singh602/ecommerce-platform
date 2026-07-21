import MainLayout from "../layouts/MainLayout";
import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-16 px-4">

        <RegisterForm />

      </div>
    </MainLayout>
  );
}