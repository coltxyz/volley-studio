import { DraggableCore } from 'react-draggable';
import classnames from 'classnames';
import ReactDOM from 'react-dom';

import ArrowRight from './svg/arrow-right';

const maxMagnitude = (a, b) => Math.abs(a) > Math.abs(b) ? a : b;

const UNIT = 30;
const ANIMATION_TIME = 200;

export default class Stack extends React.Component {

  static defaultProps = {
    imgWidth: 800,
    defaultHeight: 600,
    isVisible: true,
    isExpanded: false,
    isActiveFrame: false
  }

  constructor({ images }) {
    super();
    this.state = {
      isReady: false,
      currentTargetId: null,
      isResize: false,
      isAnimating: false
    };
    this.target = null;
    this.imageTransforms = null;
    this.imageStack = images.map( image => (image.id) );
  }

  componentDidMount() {
    this.computeTransforms()
    this.setState({
      isReady: true
    });
  }

  computeTransforms() {
    this.imageTransforms = this.imageStack.reduce((acc, imgId, i) => {
      acc[imgId] = { x:UNIT*i , y: -UNIT*i , s: 1};
      return acc;
    }, {});
  }

  onMouseEnter = () => {
    this.setState({
      currentTargetId: this.imageStack[this.imageStack.length - 1]
    });
  }

  onMouseLeave = () => {
    this.setState({
      currentTargetId: null
    });
  }

  onStackClick = () => {
    this.imageStack.unshift(this.imageStack.pop())
    this.computeTransforms();
    this.setState({
      currentTargetId: this.imageStack[this.imageStack.length - 1],
      isAnimating: true
    });
    window.setTimeout(() => {
      this.setState({
        isAnimating: false
      })
    }, ANIMATION_TIME)
  }

  getTransform({ id, isActiveFrame }) {
    if (!this.imageTransforms) {
      return;
    }
    const { x, y, s } = this.imageTransforms[id];
    return `translate(${ x }px, ${ y }px) scale(${ s })`;
  }

  onDetailClick = (e) => {
    e.preventDefault();
    this.props.onDetailClick && this.props.onDetailClick();
  }

  render() {
    return (
      <div
        id={ this.props.id }
        data-frametype={ this.props.frameType }
        data-frameid={ this.props.frameId }
        className={classnames(
          "module stack-wrapper",
          this.props.className,
          {
            'stack--expanded': this.props.isExpanded,
            'module--active': this.props.isActiveFrame
          }
        )}
      >
        <div
          ref="stackContainerRef"
          className="stack"
          style={{
            width: this.props.imgWidth + (this.imageStack.length - 1) * UNIT,
            height: this.props.defaultHeight
          }}
        >
          {
            this.props.images.map( image => (
              <div
                onMouseEnter={ this.onMouseEnter }
                onMouseLeave={ this.onMouseLeave }
                onClick={ this.onStackClick }
                key={ image.id }
                className={ `stack__image ${ image.id === this.state.currentTargetId ? 'stack__image--active' : '' }` }
                style={{
                  transform: this.getTransform({
                    id: image.id,
                    isActiveFrame: this.props.isActiveFrame
                  }),
                  zIndex: this.imageStack.indexOf(image.id) + 10
                }}
              >
                {
                  image.videoSrc ? (
                    <div className="stack__image__inner">
                      <video
                        className="stack-img-active"
                        src={ image.activeVideoSrc }
                        style={{ maxWidth: this.props.imgWidth }}
                        muted loop
                      />
                      <video
                        className="stack-img-default"
                        src={ image.videoSrc }
                        style={{ maxWidth: this.props.imgWidth }}
                        muted loop
                      />
                    </div>
                  ) : (
                    <div className="stack__image__inner">
                      <img
                        className="stack-img-active"
                        src={ image.activeSrc }
                        style={{ maxWidth: this.props.imgWidth }}
                      />
                      <img
                        className="stack-img-default"
                        src={ image.src }
                        style={{ maxWidth: this.props.imgWidth }}
                      />
                    </div>
                  )
                }
              </div>
            ))
          }
          { this.props.children }
        </div>
      </div>
    )
  }

}
