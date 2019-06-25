import { DraggableCore } from 'react-draggable';

const maxMagnitude = (a, b) => Math.abs(a) > Math.abs(b) ? a : b;

const StackImage = props => (
  <div
    data-img-id={ props.id }
    className={ `stack__image ${ props.isActive ? 'stack__image--active' : '' }` }
    style={ props.style }
  >
    <div className="stack__image__inner">
      <div
        className="stack__image__resize"
        data-img-id={ props.id }
        data-img-resize={ true }
      ></div>
      <img
        className="stack-img-active"
        src={ props.activeSrc }
        style={{ height: props.height }}
      />
      <img
        className="stack-img-default"
        src={ props.src }
        style={{ height: props.height }}
      />
    </div>
  </div>
)

export default class Stack extends React.Component {

  static defaultProps = {
    imgHeight: 500,
    isVisible: true,
    position: ['bottom', 'left']
  }

  constructor({ images }) {
    super();
    this.state = {
      isReady: false,
      currentTargetId: null,
      isResize: false
    };
    this.target = null;
    this.imageTransforms = null;
    this.imageStack = images.map( image => (image.id) );
  }

  componentDidMount() {
    window.addEventListener('resize', this.initializeStack)
    this.initializeStack()
    this.setState({
      isReady: true
    });
  }

  initializeStack = () => {
    const containerHeight = this.refs.stackContainerRef.clientHeight
    const containerWidth = this.refs.stackContainerRef.clientWidth
    const imgHeight = this.props.imgHeight;
    const imgWidth = this.refs.stackContainerRef.lastChild.clientWidth;

    let initY, initX
    switch (this.props.position[0]) {
      case 'center':
        initY = (containerHeight - imgHeight) / 2
        break;
      case 'bottom':
        initY = containerHeight - imgHeight
        break;
      case 'top':
      default:
        initY = 0
        break;
    }
    switch (this.props.position[1]) {
      case 'center':
        initX = (containerWidth - imgWidth) / 2
        break;
      case 'right':
        initX = containerWidth = imgWidth
        break;
      case 'left':
      default:
        initX = 0
        break;
    }

    this.imageTransforms = this.props.images.reduce((acc, item, i) => {
      acc[item.id] = { x:30*i + initX, y: -30*i + initY, s: 1};
      return acc;
    }, {});
  }

  broadcastTouch(id=null, isResize=false) {
    if (this.props.onTouch) {
      this.props.onTouch( this.props.images.find( img => img.id === id ))
    }
    this.setState({
      currentTargetId: id,
      isResize
    });
  }

  setTarget = (e, data) => {
    e.stopPropagation();
    const id = e.target.dataset.imgId;
    const isResize = e.target.dataset.imgResize;
    if (id) {
      this.target = e.target.closest('.stack__image');
      this.imageStack.splice(this.imageStack.indexOf(id), 1);
      this.imageStack.push(id);
      this.broadcastTouch(id, isResize);
    }
  }

  unsetTarget = (e, data) => {
    e.stopPropagation();
    this.broadcastTouch(null);
    this.target = null;
  }

  getTransform({ id }) {
    if (!this.imageTransforms) {
      return;
    }
    const { x, y, s } = this.imageTransforms[id];
    return `translate(${ x }px, ${ y }px) scale(${ s })`;
  }

  reshuffle = () => {
    this.unsetTarget();
    this.initializeStack();
    this.forceUpdate();
  }

  handleDrag = (e, data) => {
    e.stopPropagation();
    const id = this.target.dataset.imgId;
    const targetClassName = e.target.className;
    if ( !this.imageTransforms || !id ) {
      return;
    }

    let {x, y, s} = this.imageTransforms[id];
    if (this.state.isResize) {
      const targetSize = this.target.getBoundingClientRect().width;
      const scale = s + maxMagnitude(data.deltaX, -1 * data.deltaY) / targetSize;
      this.imageTransforms[id] = {
        x,
        y,
        s: scale
      };
    } else {
      this.imageTransforms[id] = {
        s,
        x: x + data.deltaX,
        y: y + data.deltaY
      };
    }

    this.target.setAttribute('style', `
      transform: ${ this.getTransform({ id }) };
      z-index: ${ this.imageStack.indexOf(id) + 10 };
    `);
  }

  render() {
    return (
      <DraggableCore
        onDrag={ this.handleDrag }
        onMouseDown={ this.setTarget }
        onMouseUp={ this.unsetTarget }
      >
        <div className={`stack ${ this.props.className || '' }`} ref="stackContainerRef">
          <div className="stack-reset-button" onClick={ this.reshuffle } hidden={ !this.props.cta }>
            { this.props.cta }
          </div>
          {
            this.props.images.map( image => (
              <StackImage
                key={ image.id }
                id={ image.id }
                isActive={ image.id === this.state.currentTargetId }
                activeSrc={ image.activeSrc }
                src={ image.src }
                height={ this.props.imgHeight }
                style={{
                  transform: this.getTransform({ id: image.id }),
                  zIndex: this.imageStack.indexOf(image.id) + 10,
                  opacity: (this.state.isReady && this.props.isVisible) ? 1 : 0
                }}
              />
            ))
          }
        </div>
      </DraggableCore>
    )
  }

}
