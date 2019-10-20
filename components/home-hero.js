import classname from 'classnames';

const HomeHero = props => (
  <div
    id={ props.id }
    className={ classname("home-hero module module-lg", {
      'module--active': props.isActiveFrame
    }) }
    data-frameid={ props.frameId }
    data-frametype={ props.frameType }
  >
    <div className="home-hero__copy text-center">
      <img className="logo" src="/logo-lg.png" />
      <h2>
        { props.blurb }
      </h2>
    </div>
    <div
      className="margin-copy mono"
      onClick={ props.onLatestProjectsClick }
    >
      <p>view our latest projects</p>
    </div>
  </div>
)

export default HomeHero;
