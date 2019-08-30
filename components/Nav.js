import Draggable from 'react-draggable';

const Nav = props => {
  const triggerScroll = id => e => {
    e.preventDefault();
    props.onScrollRequest({ id: id });
  }
  return (
    <div>
      <Draggable
        axis="y"
        position={{ y: props.scrollBarPosition, x: 0 }}
        onDrag={ props.onScrollbarDrag }
      >
        <div className="nav-trackbar" />
      </Draggable>
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
