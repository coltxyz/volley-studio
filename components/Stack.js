import classname from 'classnames';
import MediaPlayer from './media-player';

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

  updateState = state => {
    if (this.props.onChange) {
      this.props.onChange(state)
    }
    this.setState(state)
  }

  onStackClick = () => {
    this.imageStack.unshift(this.imageStack.pop())
    const currentTargetId = this.imageStack[this.imageStack.length - 1];
    this.computeTransforms();
    this.updateState({
      currentTargetId,
      isAnimating: true
    })
    window.setTimeout(() => {
      this.updateState({
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
        data-sourceid={ this.props.dataSourceId }
        className={classname(
          "module stack-wrapper",
          this.props.className,
          {
            'stack--expanded': this.props.isExpanded,
            'module--active': this.props.isActiveFrame
          }
        )}
      >
        {
          this.props.marginCopy && (
            <div className="margin-copy mono">
              <p>{ this.props.marginCopy }</p>
            </div>
          )
        }
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
                className={classname('stack__image', {
                  'stack__image--active': this.props.isActiveFrame && image.id === this.imageStack[this.imageStack.length - 1]
                })}
                style={{
                  transform: this.getTransform({
                    id: image.id,
                    isActiveFrame: this.props.isActiveFrame
                  }),
                  zIndex: this.imageStack.indexOf(image.id) + 10
                }}
              >
                <MediaPlayer
                  image={ image }
                  className="stack__image__inner"
                  activeClassName="stack-img-active"
                  inactiveClassName="stack-img-default"
                  width={ this.props.imgWidth }
                />
              </div>
            ))
          }
          { this.props.children }
        </div>
      </div>
    )
  }

}
