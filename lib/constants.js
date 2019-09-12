export const PropsForType = {
  homeHero: {
    logo: false,
    downArrow: true,
    upArrow: false,
    inspect: false,
    text: false,
    close: false,
    scrollCopy: true
  },
  portfolioItem: {
    logo: true,
    downArrow: true,
    upArrow: true,
    inspect: true,
    text: true,
    close: false,
    scrollCopy: false
  },
  informational: {
    logo: true,
    downArrow: true,
    upArrow: true,
    inspect: false,
    text: false,
    close: false,
    scrollCopy: false
  },
  projectDetail: {
    logo: true,
    downArrow: false,
    upArrow: false,
    inspect: false,
    close: true,
    scrollCopy: false
  },
  fin: {
    logo: true,
    downArrow: false,
    upArrow: true,
    inspect: false,
    close: false,
    scrollCopy: false
  },
  null: {
    inspect: false,
    text: false,
    close: false
  }
}

export const mockStackImages = [
  {
    src: '/static/demo-images/02_Tribune_white.jpg',
    activeSrc: '/static/demo-images/02_Tribune.jpg',
    id: '1'
  },
  {
    src: '/static/demo-images/04_TheShed_white.jpg',
    activeSrc: '/static/demo-images/04_TheShed.jpg',
    id: '2'
  },
  {
    src: '/static/demo-images/03_Couch_white.jpg',
    activeSrc: '/static/demo-images/03_Couch.jpg',
    id: '3'
  },
  {
    videoSrc: 'https://volley-dev.s3.amazonaws.com/TerracelivingVignette_WonW.mp4',
    activeVideoSrc: 'https://volley-dev.s3.amazonaws.com/TerracelivingVignette.mp4',
    id: '4'
  }
];

export const tribuneImages = [
  {
    src: '/static/demo-images/tribune/1.jpg',
    activeSrc: '/static/demo-images/tribune/1.jpg',
    id: '5'
  },
  {
    src: '/static/demo-images/tribune/2.jpg',
    activeSrc: '/static/demo-images/tribune/2.jpg',
    id: '6'
  },
  {
    src: '/static/demo-images/tribune/3.jpg',
    activeSrc: '/static/demo-images/tribune/3.jpg',
    id: '7'
  },
  {
    src: '/static/demo-images/tribune/4.jpg',
    activeSrc: '/static/demo-images/tribune/4.jpg',
    id: '8'
  },
];

export const schermerhornImages = [
  {
    src: '/static/demo-images/70schermerhorn/1.jpg',
    activeSrc: '/static/demo-images/70schermerhorn/1.jpg',
    id: '9'
  },
  {
    src: '/static/demo-images/70schermerhorn/2.jpg',
    activeSrc: '/static/demo-images/70schermerhorn/2.jpg',
    id: '10'
  },
  {
    src: '/static/demo-images/70schermerhorn/3.jpg',
    activeSrc: '/static/demo-images/70schermerhorn/3.jpg',
    id: '11'
  },
  {
    src: '/static/demo-images/70schermerhorn/4.jpg',
    activeSrc: '/static/demo-images/70schermerhorn/4.jpg',
    id: '12'
  },
  {
    src: '/static/demo-images/70schermerhorn/5.jpg',
    activeSrc: '/static/demo-images/70schermerhorn/5.jpg',
    id: '13'
  },
  {
    src: '/static/demo-images/70schermerhorn/7.jpg',
    activeSrc: '/static/demo-images/70schermerhorn/7.jpg',
    id: '14'
  }
]
