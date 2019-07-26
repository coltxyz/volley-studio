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
  </div>
)

export default class Stack extends React.Component {

  static defaultProps = {
    imgWidth: 800,
    isVisible: true,
    position: ['bottom', 'left']
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
    this.initializeStack()
    this.setState({
      isReady: true
    });
  }

  initializeStack = () => {

    if (this.props.isExpanded) {
      return;
    }

    const containerHeight = this.refs.stackContainerRef.clientHeight
    const containerWidth = this.refs.stackContainerRef.clientWidth
    const imgWidth = this.props.imgWidth;
    const imgHeight = this.refs.stackContainerRef.lastChild.clientHeight;

    switch (this.props.position[0]) {
      case 'center':
        this.initY = (containerHeight - imgHeight) / 2 - (Math.floor(this.props.images.length / 2) * UNIT)
        break;
      case 'bottom':
        this.initY = containerHeight - imgHeight
        break;
      case 'top':
      default:
        this.initY = 0
        break;
    }
    switch (this.props.position[1]) {
      case 'center':
        this.initX = (containerWidth - imgWidth) / 2 - (Math.floor(this.props.images.length / 2) * UNIT)
        break;
      case 'right':
        this.initX = containerWidth - imgWidth
        break;
      case 'left':
      default:
        this.initX = 0
        break;
    }
    this.computeTransforms();
  }

  computeTransforms() {
    this.imageTransforms = this.imageStack.reduce((acc, imgId, i) => {
      acc[imgId] = { x:UNIT*i + this.initX, y: -UNIT*i + this.initY, s: 1};
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
        'stack--expanded': this.props.isExpanded
      })}>
        <div
          ref="stackContainerRef"
          className={classnames('stack', this.props.className)}
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
        </div>
        <div className="stack__content">
          <p className="stack__content__p">
            { this.props.title }<br/>
            <span className="mono">{ this.props.year }</span>
          </p>
          <Arrow hidden />
        </div>
      </div>
    )
  }

}
