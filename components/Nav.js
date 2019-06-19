import Link from 'next/link';

const Nav = props => (
  <div>
    <nav>
      <Link href="/portfolio">
        <a>Portfolio</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/contact">
        <a>Contact</a>
      </Link>
    </nav>
  </div>
);

export default Nav;
