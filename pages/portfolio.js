import Page from '../components/Page'
import Layout from '../components/Layout'
import Stack from '../components/Stack';

import "../styles/styles.scss"

export default class Home extends Page {

  static slug = 'home'

  render() {
    return (
      <Layout { ...this.props }>
        Porfolio
      </Layout>
    )
  }
}
