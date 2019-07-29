import Page from '../components/Page'
import Layout from '../components/Layout'
import Stack from '../components/Stack'
import Cross from '../components/svg/cross';
import { mockStackImages } from '../lib/constants';

import "../styles/styles.scss"

export default class Porfolio extends Page {

  static slug = 'home'

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <Layout { ...this.props }>
        <div className="project-close-btn">
          <a href="/">
            <Cross />
          </a>
        </div>
        <div className="flex-container flex-bottom flex-col project-pg">
          <div className="full pad rel topspc">
            <div className="project-container">
              {
                mockStackImages.map( img => (
                  <div className="project-image">
                    {
                      img.activeVideoSrc
                        ? <video src={ img.activeVideoSrc } autoPlay loop muted />
                        : <img src={ img.activeSrc } />
                    }
                  </div>
                ))
              }
            </div>
          </div>
          <div className="bottom pad">
            <div className="col-4">
              <span className="uppercase">318 W 47th street</span>
            </div>
            <div className="col-4">
              <p>318 West 47 is a new build low-rise in Manhattan’s midtown west.  This boutique residence has 5 units including a ground floor unit with a backyard and personal garage, gracious balconies for all.</p>
            </div>
            <div className="col-4"></div>
            <div className="col-4">
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
