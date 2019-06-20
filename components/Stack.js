import { DraggableCore } from 'react-draggable';

const StackImage = props => (
  <div
    data-img-id={ props.id }
    className={ `stack__image ${ props.isActive ? 'stack__image--active' : '' }` }
    style={ props.style }
  >
    <div className="stack__image__inner">
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
      currentTargetId: null
    };
    this.target = null;
    this.imageLocations = null;
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

    this.imageLocations = this.props.images.reduce((acc, item, i) => {
      acc[item.id] = { x:20*i + midX, y: -20*i + midY};
      return acc;
    }, {});
  }

  broadcastTouch(id) {
    if (this.props.onTouch) {
      this.props.onTouch( this.props.images.find( img => img.id === id ))
    }
    this.setState({
      currentTargetId: id
    });
  }

  setTarget = (e, data) => {
    e.stopPropagation();
    this.target = e.target;
    const id = e.target.dataset.imgId;
    this.imageStack.splice(this.imageStack.indexOf(id), 1);
    this.imageStack.push(id);
    this.broadcastTouch(id);
  }

  unsetTarget = (e, data) => {
    e.stopPropagation();
    this.broadcastTouch(null);
    this.target = null;
  }

  getTransform({ id }) {
    if (!this.imageLocations) {
      return;
    }
    const { x, y } = this.imageLocations[id];
    return `translate(${ x }px, ${ y }px)`;
  }

  reshuffle = () => {
    this.unsetTarget();
    this.initializeStack();
    this.forceUpdate();
  }

  handleDrag = (e, data) => {
    e.stopPropagation();
    const id = this.target.dataset.imgId;
    if ( !this.imageLocations || !id) {
      return;
    }

    const { x, y } = this.imageLocations[id];
    this.imageLocations[id] = {
      x: x + data.deltaX,
      y: y + data.deltaY
    };

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
