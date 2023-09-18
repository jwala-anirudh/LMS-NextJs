import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />

      <p>This is a protected page</p>
    </div>
  );
}
