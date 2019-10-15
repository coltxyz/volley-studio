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
        className={ activeClassName }
        src={ urlFor(image.imageColor) }
        style={{ maxWidth: width }}
      />
      <img
        className={ inactiveClassName }
        src={ urlFor(image.imageMono) || urlFor(image.imageColor) }
        style={{ maxWidth: width }}
      />
    </div>
  )

export default MediaPlayer;
