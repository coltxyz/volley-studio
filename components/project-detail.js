import Cross from './svg/cross';

import { mockStackImages } from '../lib/constants.js';

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
    const activeImage = mockStackImages[this.state.activeImageIndex]
    return (
      <div className="project-detail">
        <div className="project-detail__inner">
          <div className="project-detail__main-photo">
            {
              activeImage.activeVideoSrc
                ? <video
                    autoPlay muted loop
                    src={ activeImage.activeVideoSrc }
                  />
                : <img src={ activeImage.activeSrc } />
            }
          </div>
          <div className="project-detail__side-panel">
            <div className="project-detail__side-panel__thumbnails">
              {
                mockStackImages.map( (image, i) => (
                  image.activeVideoSrc
                    ? <video
                        onClick={ () => this.onThumbnailClick(i) }
                        autoPlay muted loop
                        data-index={ i }
                        key={ image.activeVideoSrc }
                        src={ image.activeVideoSrc }
                      />
                    : <img
                        onClick={ () => this.onThumbnailClick(i) }
                        key={ image.activeSrc }
                        src={ image.activeSrc }
                      />
                ))
              }
            </div>
            <div className="project-detail__side-panel__description">
              <p>
                318 West 47 is a new build low-rise in Manhattan’s midtown west.  This boutique residence has 5 units including a ground floor unit with a backyard and personal garage, gracious balconies for all.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
