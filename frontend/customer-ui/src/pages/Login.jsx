import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  return (
    <AuthLayout>

      <div className="w-full max-w-md">

        <LoginForm />

      </div>

    </AuthLayout>
  );
}