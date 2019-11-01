import classnames from 'classnames';
import Draggable from 'react-draggable';
import Sun from './svg/sun';
import Moon from './svg/moon';
import {
  THEME_DARK,
  THEME_LIGHT
} from '../lib/util';

class Nav extends React.Component {

  constructor() {
    super();
    this.state = {
      isDragging: false
    }
  }

  triggerScroll = id => e => {
    e.preventDefault();
    this.props.onScrollNavRequest({ id: id });
  }

  onDrag = (e, data) => {
    this.props.onScrollbarDrag(e, data);
  }

  onStart = () => {
    this.setState({
      isDragging: true
    })
  }

  onStop = () => {
    this.setState({
      isDragging: false
    })
  }

  render() {
    return (
      <div>
        <Draggable
          axis="y"
          position={{ y: this.props.scrollBarPosition, x: 0 }}
          onDrag={ this.onDrag }
          onStop={ this.onStop }
          onStart={ this.onStart }
        >
          <div className={ classnames("nav-trackbar", {
            'nav-trackbar--dragging': this.state.isDragging
          })} />
        </Draggable>
        <nav>
          <a
            href="#portfolio"
            onClick={ this.triggerScroll('portfolio') }
          >
            Portfolio
          </a>
          <a
            href="#about"
            onClick={ this.triggerScroll('about') }
          >
            About
          </a>
          <a
            href="#contact"
            onClick={ this.triggerScroll('contact') }
          >
            Contact
          </a>
          <div
            className="theme-toggle"
            onClick={ this.props.onToggleTheme }
          >
            {
              this.props.theme === THEME_LIGHT
                ? <Moon color="var(--black-ln)" />
                : <Sun color="var(--black-ln)" />
            }
          </div>
        </nav>
      </div>
    )
  }
}

export default Nav;
