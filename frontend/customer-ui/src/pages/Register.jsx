import AuthLayout from "../layouts/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {
  return (
    <AuthLayout>

      <div className="w-full max-w-md">

        <RegisterForm />

      </div>

    </AuthLayout>
  );
}