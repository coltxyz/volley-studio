import { DraggableCore } from 'react-draggable';

const DraggableImg = props => (
  <DraggableCore
    onDrag={ props.onDrag }
    onMouseDown={ props.onMouseDown }
    onMouseUp={ props.onMouseUp }
  >
    <div
      onMouseEnter={ props.onMouseEnter }
      className={ `stack__image ${ props.isActive ? 'stack__image--active' : '' }` }
      style={ props.style }
    >
      <div className="stack__image__inner">
        <img className="stack-img-active" src={ props.activeSrc } />
        <img className="stack-img-default" src={ props.src } />
      </div>
    </div>
  </DraggableCore>
)

export default class Stack extends React.Component {

  constructor({ images }) {
    super();
    this.state = {
      isReady: false,
      currentTargetId: null
    };
    this.imageLocations = null;
    this.imageStack = images.map( image => (image.id) );
  }

  componentDidMount() {
    this.createStack();
    this.setState({
      isReady: true
    });
  }

  createStack() {
    // const midX = Math.floor(window.document.body.clientWidth / 9 * 3);
    const midY = Math.floor(window.document.body.clientHeight - 540);
    const midX = 0;

    this.imageLocations = this.props.images.reduce((acc, item, i) => {
      acc[item.id] = { x:20*i + midX, y: -20*i + midY};
      return acc;
    }, {});
  }

  setTarget({e, id}) {
    this.target = e.target;
    this.setState({
      currentTargetId: id
    });
    this.imageStack.splice(this.imageStack.indexOf(id), 1);
    this.imageStack.push(id);
  }

  unsetTarget() {
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
    this.createStack();
    this.forceUpdate();
  }

  handleDrag({ id, data, e }) {
    if (!this.imageLocations  ) {
      return;
    }
    const { x, y } = this.imageLocations[id];
    this.imageLocations[id] = {
      x: x + data.deltaX,
      y: y + data.deltaY
    };
    this.target.setAttribute(
      'style',
      `
        transform: ${ this.getTransform({ id }) };
        z-index: ${ this.imageStack.indexOf(id) + 10 };
      `
    );
  }

  render() {
    return (
      <div className="stack">
        <div className="stack-reset-button" onClick={ this.reshuffle } hidden>
          Reshuffle Stack
        </div>
        {
          this.props.images.map( image => (
            <DraggableImg
              key={ image.id }
              isActive={ image.id === this.state.currentTargetId }
              activeSrc={ image.activeSrc }
              src={ image.src }
              style={{
                transform: this.getTransform({ id: image.id }),
                zIndex: this.imageStack.indexOf(image.id) + 10,
                opacity: this.state.isReady ? 1 : 0
              }}
              onMouseDown={ (e) => this.setTarget({ e, id: image.id }) }
              onMouseUp={ (e) => this.unsetTarget({ e, id: image.id }) }
              onDrag={ (e, data) => this.handleDrag({ e, id: image.id, data }) }
            />
          ))
        }
      </div>
    )
  }

}
