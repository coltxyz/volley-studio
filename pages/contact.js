import Page from '../components/Page'
import Layout from '../components/Layout'

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
        <div className="flex-container contact-pg">

          <div className="contact-card">
            <div className="contact-card__bg-1" />
            <div className="contact-card__bg-2" />
            <div className="contact-card__header">
              <img src="/static/logo-black.png"/>
              <div className="info">
                <p style={{ marginBottom: '0.4rem'}}>
                  <strong>hello@volleystudio.us</strong>
                </p>
                <p>
                  45 Main Street, Suite 516<br/>
                  Brooklyn, NY 11201<br/>
                  info@volleystudio.us<br/>
                  718.801.8890<br/>
                </p>
              </div>
            </div>
            <div className="contact-card__body">
              <textarea placeholder="drop us a line"/>
            </div>
            <div className="contact-card__footer">
              <input placeholder="your email"/>
              <button>
                Submit
              </button>
            </div>
          </div>

        </div>
      </Layout>
    )
  }
}
