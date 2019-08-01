import { DraggableCore } from 'react-draggable';
import classnames from 'classnames';

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

  getTransform({ id, isExpanded }) {
    if (!this.imageTransforms) {
      return;
    }
    const { x, y, s } = this.imageTransforms[id];
    return `translate(${ x }px, ${ y }px) scale(${ s })`;
  }

  onDetailClick(e) {
    e.preventDefault();
    this.props.onDetailClick && this.props.onDetailClick();
  }

  render() {
    return (
      <div
        data-frameid={ this.props.frameId }
        className={classnames("stack-wrapper", {
        'stack--expanded': this.props.isExpanded
        })}
      >
        <div
          ref="stackContainerRef"
          className={classnames('stack', this.props.className)}
          style={{
            width: this.props.imgWidth + (this.imageStack.length - 1) * UNIT,
            height: this.props.defaultHeight,
            transform: `scale(${this.props.isExpanded ? '1.3' : '1'})`,
            opacity: this.props.isExpanded ? '0' : '1'
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
                    id: image.id
                  }),
                  zIndex: this.imageStack.indexOf(image.id) + 10,
                  opacity: (this.state.isReady && this.props.isVisible) ? 1 : 0
                }}
              >
                {
                  image.videoSrc ? (
                    <div className="stack__image__inner">
                      <video
                        className="stack-img-active"
                        src={ image.activeVideoSrc }
                        style={{ width: this.props.imgWidth }}
                        muted autoPlay loop
                      />
                      <video
                        className="stack-img-default"
                        src={ image.videoSrc }
                        style={{ width: this.props.imgWidth }}
                        muted autoPlay loop
                      />
                    </div>
                  ) : (
                    <div className="stack__image__inner">
                      <img
                        className="stack-img-active"
                        src={ image.activeSrc }
                        style={{ width: this.props.imgWidth }}
                      />
                      <img
                        className="stack-img-default"
                        src={ image.src }
                        style={{ width: this.props.imgWidth }}
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
