import classname from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Arrow from '../components/svg/arrow';

const TIME_INTERVAL = 100;

export default class HomeHero extends React.Component {

  constructor() {
    super()
    this.state = {
      currentImageIndex: 3
    }
  }

  render() {
    const props = this.props;
    const currentImg = {
      imageColor: '/static/demo-images/03_couch.jpg'
    }
    return (
      <div
        id={ props.id }
        className={ classname("home-hero module module-lg", {
          'module--active': props.isActiveFrame
        })}
        data-frameid={ props.frameId }
        data-frametype={ props.frameType }
      >
        <div>
          <img className="logo" src="/static/logo-lg.png" />
          <h2>
            { props.blurb }
          </h2>
        </div>
        <div className="margin-copy mono">
          <p>view our latest projects</p>
        </div>
      </div>
    )
  }
}
