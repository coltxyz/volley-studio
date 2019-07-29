import { DraggableCore } from 'react-draggable';
import classnames from 'classnames';
import Arrow from './svg/arrow';

const maxMagnitude = (a, b) => Math.abs(a) > Math.abs(b) ? a : b;

const UNIT = 30;
const ANIMATION_TIME = 200;

const StackImage = props => (
  <div
    data-img-id={ props.id }
    className={ `stack__image ${ props.isActive ? 'stack__image--active' : '' }` }
    style={ props.style }
    onMouseEnter={ props.onMouseEnter }
    onMouseLeave={ props.onMouseLeave }
    onClick={ props.onClick }
  >
    {
      props.videoSrc ? (
        <div className="stack__image__inner">
          <video
            className="stack-img-active"
            src={ props.activeVideoSrc }
            style={{ width: props.width }}
            muted autoPlay loop
          />
          <video
            className="stack-img-default"
            src={ props.videoSrc }
            style={{ width: props.width }}
            muted autoPlay loop
          />
        </div>
      ) : (
        <div className="stack__image__inner">
          <img
            className="stack-img-active"
            src={ props.activeSrc }
            style={{ width: props.width }}
          />
          <img
            className="stack-img-default"
            src={ props.src }
            style={{ width: props.width }}
          />
        </div>
      )
    }
  </div>
)

export default class Stack extends React.Component {

  static defaultProps = {
    imgWidth: 800,
    defaultHeight: 600,
    isVisible: true
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

  getTransform({ id }) {
    if (!this.imageTransforms) {
      return;
    }
    const { x, y, s } = this.imageTransforms[id];
    return `translate(${ x }px, ${ y }px) scale(${ s })`;
  }

  render() {
    return (
      <div className={classnames("stack-wrapper", {
        'stack--expanded': this.state.isExpanded
      })}>
        <div
          ref="stackContainerRef"
          className={classnames('stack', this.props.className)}
          style={{
            width: this.props.imgWidth + (this.imageStack.length - 1) * UNIT,
            height: this.props.defaultHeight
          }}
        >
          {
            this.props.images.map( image => (
              <StackImage
                onMouseEnter={ this.onMouseEnter }
                onMouseLeave={ this.onMouseLeave }
                onClick={ this.onStackClick }
                key={ image.id }
                id={ image.id }
                isActive={ image.id === this.state.currentTargetId }
                activeSrc={ image.activeSrc }
                videoSrc={ image.videoSrc }
                activeVideoSrc={ image.activeVideoSrc }
                src={ image.src }
                width={ this.props.imgWidth}
                style={{
                  transform: this.getTransform({ id: image.id }),
                  zIndex: this.imageStack.indexOf(image.id) + 10,
                  opacity: (this.state.isReady && this.props.isVisible) ? 1 : 0
                }}
              />
            ))
          }
          { this.props.children }
        </div>
      </div>
    )
  }

}
