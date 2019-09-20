import Cross from './svg/cross';
import MediaPlayer from './media-player';

export default class ProjectDetail extends React.Component {

  constructor(props) {
    super()
    this.state = {
      activeImageIndex: 0
    }
  }

  onThumbnailClick = (index) => {
    this.setState({
      activeImageIndex: index
    })
  }

  render() {
    const projectImages = this.props.data.media;
    const activeImage = projectImages[this.state.activeImageIndex]
    return (
      <div className="project-detail">
        <div className="project-detail__inner">
          <div className="project-detail__main-photo">
            <MediaPlayer
              image={ activeImage }
              width="100%"
              className="main-photo"
              activeClassName="main-photo--active"
              inactiveClassName="main-photo--inactive"
            />
          </div>
          <div className="project-detail__side-panel">
            <div className="project-detail__side-panel__thumbnails">
              {
                projectImages.map( (image, i) => (
                  <MediaPlayer
                    key={ image.id }
                    onClick={ () => this.onThumbnailClick(i) }
                    className="thumbnail"
                    activeClassName="thumbnail--active"
                    inactiveClassName="thumbnail--inactive"
                    image={ image }
                  />
                ))
              }
            </div>
            <div className="project-detail__side-panel__description">
              <p>
                { this.props.data.description }
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
