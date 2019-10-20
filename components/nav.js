import Draggable from 'react-draggable';
import Sun from './svg/sun';
import Moon from './svg/moon';
import {
  THEME_DARK,
  THEME_LIGHT
} from '../lib/util';

const Nav = props => {
  const triggerScroll = id => e => {
    e.preventDefault();
    props.onScrollNavRequest({ id: id });
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
        <div
          className="theme-toggle"
          onClick={ props.onToggleTheme }
        >
          {
            props.theme === THEME_LIGHT
              ? <Moon color="var(--black-ln)" />
              : <Sun color="var(--black-ln)" />
          }
        </div>
      </nav>
    </div>
  )
};

export default Nav;
