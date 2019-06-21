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
      <img className="stack-img-active" src={ props.activeSrc } />
      <img className="stack-img-default" src={ props.src } />
    </div>
  </div>
)

export default class Stack extends React.Component {

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
    this.initializeStack();
    this.setState({
      isReady: true
    });
  }

  initializeStack() {
    // const midX = Math.floor(window.document.body.clientWidth / 9 * 3);
    const midY = Math.floor(window.document.body.clientHeight - 540);
    const midX = 0;

    this.imageTransforms = this.props.images.reduce((acc, item, i) => {
      acc[item.id] = { x:20*i + midX, y: -20*i + midY, s: 1};
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

    console.log(s);

    this.target.setAttribute('style', `
      transform: ${ this.getTransform({ id }) };
      z-index: ${ this.imageStack.indexOf(id) + 10 };
    `);
  }

  render() {
    console.log(this.state);
    return (
      <DraggableCore
        onDrag={ this.handleDrag }
        onMouseDown={ this.setTarget }
        onMouseUp={ this.unsetTarget }
      >
        <div className="stack" ref="stack">
          <div className="stack-reset-button" onClick={ this.reshuffle } hidden>
            Reshuffle Stack
          </div>
          {
            this.props.images.map( image => (
              <StackImage
                key={ image.id }
                id={ image.id }
                isActive={ image.id === this.state.currentTargetId }
                activeSrc={ image.activeSrc }
                src={ image.src }
                style={{
                  transform: this.getTransform({ id: image.id }),
                  zIndex: this.imageStack.indexOf(image.id) + 10,
                  opacity: this.state.isReady ? 1 : 0
                }}
              />
            ))
          }
        </div>
      </DraggableCore>
    )
  }

}
