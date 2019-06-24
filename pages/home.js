import Page from '../components/Page'
import Layout from '../components/Layout'
import Stack from '../components/Stack';

import "../styles/styles.scss"

export default class Home extends Page {

  static slug = 'home'

  constructor() {
    super();
    this.state = {
      ctaText: ''
    }
  }

  onStackItemTouch = (stackItem={}) => {
    this.setState({
      ctaText: stackItem.cta
    })
  }

  render() {
    return (
      <Layout { ...this.props }>
        <div className="content-main">
          <h1 className="home-copy">
            We are an industry-leading architectural visualization and creative studio specializing in the crafting of stunning imagery that evokes the best possibilities of our clients’ designs.
            <br/>
            <p className="home-copy-cta">
              <a href="/portfolio">
                { this.state.ctaText }
              </a>
            </p>
          </h1>
          <Stack
            key="home"
            onTouch={ this.onStackItemTouch }
            images={[
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
            ]}
          />
        </div>
      </Layout>
    )
  }
}
