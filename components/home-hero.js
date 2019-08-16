import Arrow from '../components/svg/arrow';

export default props => (
  <div className="home-title module scroll-snap" data-nologo={ true }>
    <div className="home-title__inner">
      <img src="/static/logo-lg.png"/>
      <h2>
      A studio for designing visual narratives
      through computer-generated imagery.
      </h2>
    </div>
    <div className="home-title__content">
      <Arrow />
    </div>
  </div>
)
