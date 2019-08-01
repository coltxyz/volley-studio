import Cross from './svg/cross';

import { mockStackImages } from '../lib/constants.js';

export default props => (
  <div
    className="project-detail"
  >
    <span
      className="project-detail__close"
      onClick={ props.onCloseClick }
    >
      <Cross />
    </span>

    <div className="logo">
      <a href="/"><a>VOLLEY STUDIO</a></a>
    </div>

    <div className="project-detail__inner">
      <div className="project-detail__inner__images">
        <div className="scroll-hider">
          <div>
            {
              mockStackImages.map( image => (
                image.activeVideoSrc
                  ? <video autoPlay muted loop src={ image.activeVideoSrc } />
                  : <img src={ image.activeSrc } />
              ))
            }
          </div>
        </div>
      </div>
      <div className="project-detail__inner__content">
        <p className="uppercase">
          318 W 47TH ST
        </p>
        <p>
          318 West 47 is a new build low-rise in Manhattan’s midtown west.  This boutique residence has 5 units including a ground floor unit with a backyard and personal garage, gracious balconies for all.
        </p>
        <div className="project-buttons">
          <button className="action-button">
            Previous
          </button>
          <button className="action-button">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
);
