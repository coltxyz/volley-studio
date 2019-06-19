import Page from '../components/Page'
import Layout from '../components/Layout'
import Stack from '../components/Stack';

import "../styles/styles.scss"

export default class Home extends Page {

  static slug = 'home'

  render() {
    return (
      <Layout { ...this.props }>
        <h1 className="home-copy">
          We are an industry-leading architectural visualization and creative studio specializing in the crafting of stunning imagery that evokes the best possibilities of our clients’ designs.
        </h1>
        <Stack
          images={[
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
            }
          ]}
        />
      </Layout>
    )
  }
}
