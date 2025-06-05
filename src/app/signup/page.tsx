import { SignupForm } from "@/components/signup-form";
import Link from "next/link";
import { privacyPolicyUrl, termsOfServiceUrl } from "@/lib/const";

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-6">
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
          href={termsOfServiceUrl}
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href={privacyPolicyUrl}
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
  );
}
