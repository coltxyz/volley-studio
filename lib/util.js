import imageUrlBuilder from '@sanity/image-url';
import sanity from './sanity';

export const urlFor = image => {
  if (!image || !image.asset) {
    return ''
  }
  const builder = imageUrlBuilder(sanity);
  return builder.image(image.asset).width(800).url();
}

export const ControlSettingsForFrameType = {
  homeHero: {
    logo: false,
    downArrow: true,
    upArrow: false,
    inspect: false,
    text: false,
    close: false,
    projectNav: false,
    projectSelect: false
  },
  portfolioItem: {
    logo: true,
    downArrow: true,
    upArrow: true,
    inspect: true,
    text: true,
    close: false,
    projectNav: false,
    projectSelect: false
  },
  informational: {
    logo: true,
    downArrow: true,
    upArrow: true,
    inspect: false,
    text: false,
    close: false,
    projectNav: false,
    projectSelect: false
  },
  projectDetail: {
    logo: true,
    downArrow: false,
    upArrow: false,
    inspect: false,
    close: true,
    projectNav: true,
    projectSelect: true
  },
  fin: {
    logo: true,
    downArrow: false,
    upArrow: true,
    inspect: false,
    close: false,
    projectNav: false,
    projectSelect: false
  },
  null: {
    inspect: false,
    text: false,
    close: false,
    projectNav: false,
    projectSelect: false
  }
}

export const processSanityPortfolioItem = rawItem => {
  const {images, videos, title, year, featured, description, _id} = rawItem;
  const media = (images || []).concat(videos || []).map(item => ({
    src: item.imageMono,
    activeSrc: item.imageColor,
    videoSrc: item.videoMono,
    activeVideoSrc: item.videoColor,
    id: item._key
  }));
  return {
    title,
    description,
    year,
    featured,
    media,
    id: _id
  }
}

export const processTeamImages = rawItem => {
  return {
    id: rawItem._id,
    src: rawItem.photo,
    activeSrc: rawItem.photo
  }
}
