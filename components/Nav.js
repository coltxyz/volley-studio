import Link from 'next/link';

const Nav = props => (
  <div>
    <nav>
      <Link href="/portfolio">Portfolio</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  </div>
);

export default Nav;
