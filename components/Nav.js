const Nav = props => {
  const triggerScroll = id => e => {
    e.preventDefault();
    props.onScrollRequest({ id: id });
  }
  return (
    <div>
      <div
        style={{ top: `${ props.scrollPercentage }%` }}
        className="nav-trackbar"
      />
      <nav>
        <a
          href="#portfolio"
          onClick={ triggerScroll('portfolio') }
        >
          Portfolio
        </a>
        <a
          href="#about"
          onClick={ triggerScroll('about') }
        >
          About
        </a>
        <a
          href="#contact"
          onClick={ triggerScroll('contact') }
        >
          Contact
        </a>
      </nav>
    </div>
  )
};

export default Nav;
