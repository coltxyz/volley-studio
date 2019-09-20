import { get } from 'dotty';
import SanityMuxPlayer from 'sanity-mux-player';
import { urlFor } from '../lib/util';

const MediaPlayer = ({
  image,
  width,
  className,
  activeClassName,
  inactiveClassName,
  onClick
}) =>
  image.activeVideoSrc ? (
    <div className={ className } onClick={ onClick }>
      <SanityMuxPlayer
        assetDocument={get(image, 'activeVideoSrc.asset')}
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
        assetDocument={get(image, 'videoSrc.asset') || get(image, 'activeVideoSrc.asset')}
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
        className={ activeClassName }
        src={ urlFor(image.activeSrc) }
        style={{ maxWidth: width }}
      />
      <img
        className={ inactiveClassName }
        src={ urlFor(image.src) || urlFor(image.activeSrc) }
        style={{ maxWidth: width }}
      />
    </div>
  )

export default MediaPlayer;
