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
    logo: true,
    inspect: false,
    text: false,
    close: false,
    projectNav: false,
    projectSelect: false
  }
}

export const processTeamImages = rawItem => {
  return {
    _key: rawItem._id,
    imageMono: rawItem.photo,
    imageColor: rawItem.photo
  }
}
