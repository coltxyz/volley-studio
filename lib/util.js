import imageUrlBuilder from '@sanity/image-url'
import sanity from './sanity'


export const getBucketedWindowWidth = () => {
  return Math.floor(window.innerWidth / 200) * 200
}

export const getBucketedWindowHeight = () => {
  return Math.floor(window.innerHeight / 200) * 200
}

export const urlFor = image => {
  if (!image || !image.asset) {
    return ''
  }
  const builder = imageUrlBuilder(sanity)
  return builder.image(image.asset).width(getBucketedWindowWidth()).url()
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
    text: false,
    close: true,
    projectNav: true,
    projectSelect: true
  },
  fin: {
    logo: false,
    downArrow: false,
    upArrow: true,
    inspect: false,
    text: false,
    close: false,
    projectNav: false,
    projectSelect: false
  },
  null: {
    logo: true,
    downArrow: true,
    upArrow: true,
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

export const getDocumentImages = () => {
  const images = []
  for (var i = 0; i < document.images.length; i++) {
    images.push(document.images[i]);
  }
  return images;
}

export const checkOnInterval = ({ifCond, then, every}) => {
  function loop() {
    window.setTimeout(() => {
      if (ifCond()) {
        window.setTimeout(then, every);
      } else {
        loop()
      }
    }, every)
  }
  loop();
}

export const PORTFOLIO_ITEM_LIST_TYPE = 'portfolio-item-list'
export const TEAM_MEMBER_LIST_TYPE = 'team-member-list'
export const TRANSITION_ENTERING = 'transition--entering'
export const TRANSITION_EXITING = 'transition--exiting'
export const TRANSITION_INTERVAL_ENTER = 1000
export const TRANSITION_INTERVAL_EXIT = 1000
export const DISTANCE_THRESHOLD = 150;
export const SCROLL_UPDATE_INTERVAL = 100;
