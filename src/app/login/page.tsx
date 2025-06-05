import { LoginForm } from "@/components/login-form"
import Logo from "@/components/logo"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-primary text-primary-foreground hidden lg:block flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center py-8">
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="mx-auto lg:hidden">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
