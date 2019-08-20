import Arrow from '../components/svg/arrow';

export default props => (
  <div className="home-title module module-lg scroll-snap" data-nologo={ true }>
    <div className="home-title__inner">
      <img src="/static/logo-lg.png"/>
      <h2>
        We are a 3D visualization studio specializing in the creation of photorealistic animations, still imagery, and VR content
      </h2>
    </div>
    <div className="home-title__content">
      <Arrow />
    </div>
  </div>
)
