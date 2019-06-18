import Link from 'next/link'
import Draggable from 'react-draggable';

import Page from '../components/Page'
import Layout from '../components/Layout'

import "../styles/styles.scss"

const DraggableImg = props => (
  <Draggable>
    <div>
      <img src={ props.src } />
    </div>
  </Draggable>
)

export default class Home extends Page {

  static slug = 'home'

  render() {
    return (
      <Layout { ...this.props }>
        <div className="logo">
          <Link href="/">VOLLEY STUDIO</Link>
        </div>

        <h1 className="home-copy">
          We are an industry-leading architectural visualization and creative studio specializing in the crafting of stunning imagery that evokes the best possibilities of our clients’ designs.
        </h1>


        <DraggableImg src="/static/demo-images/02_Tribune_white.jpg" />


      </Layout>
    )
  }
}
