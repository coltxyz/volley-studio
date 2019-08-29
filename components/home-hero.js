import classname from 'classNames';
import { mockStackImages } from '../lib/constants';
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

  componentDidMount() {
    // setInterval(() => {
    //   const randIndex = Math.floor(Math.random() * mockStackImages.length );
    //   this.setState({
    //     currentImageIndex: randIndex
    //   })
    // }, TIME_INTERVAL)
  }

  render() {
    const props = this.props;
    const currentImg = mockStackImages[this.state.currentImageIndex];
    return (
      <div
        className={ classname("home-title module module-lg", {
          'module--active': props.isActiveFrame
        })}
        data-frameid={ props.frameId }
        data-frametype={ props.frameType }
      >
        <div className="home-title__inner__left">
          <img className="logo" src="/static/logo-lg.png" />
          <h2>
            We are a 3D visualization studio specializing in the creation of photorealistic animations, still imagery, and VR content
          </h2>
        </div>
        <div className="home-title__inner__right">
          {
            currentImg.activeSrc
              ? <img src={ currentImg.activeSrc } />
              : <video autoPlay loop muted src={ currentImg.activeVideoSrc } />
          }
        </div>
        <div className="home-title__content">
          <Arrow />
        </div>
      </div>
    )
  }
}
