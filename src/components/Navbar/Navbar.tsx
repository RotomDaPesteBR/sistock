import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/">Sim</Link>
        </li>
        <li>
          <Link href="/">Sim</Link>
        </li>
        <li>
          <button type="button" onClick={() => signOut()}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
