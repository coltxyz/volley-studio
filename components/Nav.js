import { withRouter } from 'next/router'

const ActiveLink = withRouter(({ href, router, children }) => {
  const handleClick = e => {
    e.preventDefault()
    router.push(href)
  }
  return (
    <a
      href={href}
      onClick={handleClick}
      className={ router.pathname === href ? 'active' : '' }
    >
      {children}
    </a>
  );
})

const Nav = props => (
  <div>
    <nav>
      <ActiveLink href="/portfolio">
        Portfolio
      </ActiveLink>
      <ActiveLink href="/about">
        About
      </ActiveLink>
      <ActiveLink href="/contact">
        Contact
      </ActiveLink>
    </nav>
  </div>
);

export default Nav;
