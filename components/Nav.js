const Nav = props => {
  const triggerScroll = id => e => {
    e.preventDefault();
    props.onScrollRequest({ id: id });
  }
  return (
    <div>
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
