import classname from 'classnames';
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
        id={ props.id }
        className={ classname("home-hero module module-lg", {
          'module--active': props.isActiveFrame
        })}
        data-frameid={ props.frameId }
        data-frametype={ props.frameType }
      >
        <div className="home-hero__inner__left">
          <img className="logo" src="/static/logo-lg.png" />
          <h2>
            { props.blurb }
          </h2>
        </div>
        <div className="home-hero__inner__right">
          {
            currentImg.activeSrc
              ? <img src={ currentImg.activeSrc } />
              : <video autoPlay loop muted src={ currentImg.activeVideoSrc } />
          }
        </div>
        <div className="margin-copy mono">
          <p>view our latest projects</p>
        </div>
      </div>
    )
  }
}
