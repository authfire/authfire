import { SignupForm } from "../../components/signup-form";
import Logo from "../../components/logo"; // Adjust path if needed
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left Column (Hero) */}
      <div className="bg-primary text-primary-foreground hidden lg:block flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center py-8">
          {/* Optional: Add content here later, e.g., a quote or image */}
        </div>
      </div>

      {/* Right Column (Form) */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="mx-auto lg:hidden">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs"> {/* This div now wraps the form and its text */}
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <SignupForm /> {/* Assuming SignupForm itself doesn't have excessive vertical spacing */}
            {/* The existing p tags need to be part of this inner div */}
            <p className="px-8 py-4 text-center text-sm text-muted-foreground"> {/* Added py-4 for spacing */}
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
