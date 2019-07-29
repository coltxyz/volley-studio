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
      className={ router.pathname === href ? '' : '' }
    >
      {children}
    </a>
  );
})

const Nav = props => (
  <div>
    <nav>
      <ActiveLink href="/">
        Portfolio
      </ActiveLink>
      <ActiveLink href="/">
        About
      </ActiveLink>
      <ActiveLink href="/">
        Contact
      </ActiveLink>
    </nav>
  </div>
);

export default Nav;
