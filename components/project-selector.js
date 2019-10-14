import classname from 'classNames';

class projectSelect extends React.Component {

  constructor() {
    super();
    this.state = {
      isMenuOpen: false
    }
  }

  toggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    })
  }

  hide = () => {
    this.setState({
      isMenuOpen: false
    })
  }

  render() {
    const {items, activeItem, onChange} = this.props;
    if (!items || !activeItem) {
      return <span />
    }
    const menuItems = items.filter( item => item.id !== activeItem.id )
    return (
      <div
        className={ classname("project-selector", {
          visible: this.state.isMenuOpen
        })}
        onMouseLeave={ this.hide }
      >
        <span className="project-selector__selected" onClick={ this.toggleMenu }>
          { activeItem.title }
        </span>
        <div className="project-selector__menu">
          {
            menuItems.map( item => (
              <div className="project-selector__menu-item">
                { item.title }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default projectSelect
