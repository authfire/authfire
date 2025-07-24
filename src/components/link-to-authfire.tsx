import { appName } from "@/lib/const";
import GitHubButton from "react-github-btn";

export default function LinkToAuthfire() {
  if (appName !== "authFire") {
    return <></>;
  }

  return (
    <div className="row-start-3 flex flex-none gap-[24px] flex-wrap items-center justify-center">
      <GitHubButton href="https://github.com/authfire/authfire" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-size="large" aria-label="Star authfire/authfire on GitHub">Star on GitHub</GitHubButton>
    </div>
  );
}
