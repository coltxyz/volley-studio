import { get } from 'dotty';
import classname from 'classnames';
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
      onClick,
      isActive
    } = this.props;
    return (
      image.videoColor ? (
        <div
          className={ classname(className, { 'media--active': isActive } ) }
          onClick={ onClick }
        >
          <SanityMuxPlayer
            assetDocument={get(image, 'videoMono.asset') || get(image, 'videoColor.asset')}
            autoload={true}
            autoplay={ this.props.isPlaying &&  Boolean( image.videoMono ) }
            className={ classname('mediaplayer', inactiveClassName, {
              'mock--monotone': !Boolean( image.videoMono )
            }) }
            loop={true}
            muted={true}
            showControls={false}
            style={{ maxWidth: width }}
            width={ width }
          />
          <SanityMuxPlayer
            assetDocument={get(image, 'videoColor.asset')}
            autoload={true}
            autoplay={ this.props.isPlaying }
            className={ classname( 'mediaplayer', activeClassName) }
            loop={true}
            muted={true}
            showControls={false}
            style={{ maxWidth: width, opacity: isActive ? 1 : 0 }}
            width={ width }
          />
        </div>
      ) : (
        <div
          className={ classname(className, { 'media--active': isActive } ) }
          onClick={ onClick }
        >
          <img
            key={ get(image,'imageMono._id') || 'abc123'}
            className={ classname(inactiveClassName, {
              'mock--monotone': !Boolean( image.imageMono )
            }) }
            src={ urlFor(image.imageMono, width) || urlFor(image.imageColor, width) }
            style={{ maxWidth: width }}
          />
          <img
            key={ get(image,'imageColor._id') || 'xyz456'}
            className={ activeClassName }
            src={ urlFor(image.imageColor, width) }
            style={{ maxWidth: width, opacity: isActive ? 1 : 0 }}
          />
        </div>
      )
    )
  }
}

export default MediaPlayer;
