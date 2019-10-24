import { get } from 'dotty';
import SanityMuxPlayer from 'sanity-mux-player';
import { urlFor } from '../lib/util';

class MediaPlayer extends React.Component {

  constructor() {
    super()
    this.state = {
      isReady: false
    }
  }

  componentDidMount() {
    this.setState({
      isReady: true
    })
  }

  render() {
    if (!this.state.isReady) {
      return <div />
    }
    const {
      image,
      width,
      className,
      activeClassName,
      inactiveClassName,
      onClick
    } = this.props;
    return (
      image.videoColor ? (
        <div className={ className } onClick={ onClick }>
          <SanityMuxPlayer
            assetDocument={get(image, 'videoColor.asset')}
            autoload={true}
            autoplay={true}
            className={ activeClassName }
            loop={true}
            muted={true}
            showControls={false}
            style={{ maxWidth: width }}
            width={ width }
          />
          <SanityMuxPlayer
            assetDocument={get(image, 'videoMono.asset') || get(image, 'videoColor.asset')}
            autoload={true}
            autoplay={true}
            className={ inactiveClassName }
            loop={true}
            muted={true}
            showControls={false}
            style={{ maxWidth: width }}
            width={ width }
          />
        </div>
      ) : (
        <div className={ className } onClick={ onClick }>
          <img
            key={ get(image,'imageColor._id') || 'xyz456'}
            className={ activeClassName }
            src={ urlFor(image.imageColor) }
            style={{ maxWidth: width }}
          />
          <img
            key={ get(image,'imageMono._id') || 'abc123'}
            className={ inactiveClassName }
            src={ urlFor(image.imageMono) || urlFor(image.imageColor) }
            style={{ maxWidth: width }}
          />
        </div>
      )
    )
  }
}

export default MediaPlayer;
