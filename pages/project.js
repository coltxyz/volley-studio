import Page from '../components/Page'
import Layout from '../components/Layout'
import Stack from '../components/Stack'

import "../styles/styles.scss"

const stackImages = [
  {
    src: '/static/demo-images/02_Tribune_white.jpg',
    activeSrc: '/static/demo-images/02_Tribune.jpg',
    cta: 'Read about the Tribune Project',
    id: '1'
  },
  {
    src: '/static/demo-images/04_TheShed_white.jpg',
    activeSrc: '/static/demo-images/04_TheShed.jpg',
    cta: 'Read about the Shed Project',
    id: '2'
  },
  {
    src: '/static/demo-images/03_Couch_white.jpg',
    activeSrc: '/static/demo-images/03_Couch.jpg',
    cta: 'See our Rendering Work',
    id: '3'
  }
]

export default class Porfolio extends Page {

  static slug = 'home'

  constructor() {
    super()
    this.state = {}
  }


  render() {
    return (
      <Layout { ...this.props }>
        <div className="flex-container flex-bottom flex-col project-pg">
          <span className="uppercase project-title">318 W 47th street</span>
          <div className="full pad">
            <Stack
              position={['center', 'center']}
              images={ stackImages }
            />
          </div>
          <div className="bottom pad">
            <p>318 West 47 is a new build low-rise in Manhattan’s midtown west.  This boutique residence has 5 units including a ground floor unit with a backyard and personal garage, gracious balconies for all.</p>
          </div>
        </div>
      </Layout>
    )
  }
}
