'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    name: 'Accounts',
    href: '/',
  },
  {
    name: 'Transactions',
    href: '/transactions',
  },
];

const Header = () => {
  const currPath = usePathname();

  return (
    <header className="fixed w-full h-20 flex justify-center bg-white z-10 border-b">
      <div className="min-w-[680px] flex gap-2 py-4">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-lg flex justify-center items-center p-2 ${
              currPath === link.href ? 'text-gray-700' : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
