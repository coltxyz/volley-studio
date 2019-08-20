import Link from 'next/link'
import Head from 'next/head'
import Nav from './Nav.js';
import Footer from './Footer.js';

const social_img_url = '';
const title = '';
const description = '';
const ga_id = ''

export default class Layout extends React.Component {

  static defaultProps = {
    noLogo: true,
    srollPos: 0
  }

  constructor() {
    super();
    this.state = {
      isNavOpen: false
    }
  }

  toggleNav = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  render () {
    return (
      <div>
        <Head>
          <script async src={ `https://www.googletagmanager.com/gtag/js?id=${ ga_id }` }></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
                function gtag(){
                  dataLayer.push(arguments);
                }
                gtag('js', new Date());
                gtag('config', '${ ga_id }');
            `
          }}/>

          <meta name="description" content={ description } />
          <meta itemprop="name" content={ title } />
          <meta itemprop="description" content={ description } />
          <meta itemprop="image" content={ social_img_url } />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="" />
          <meta name="twitter:title" content={ title } />
          <meta name="twitter:description" content={ description } />
          <meta name="twitter:image:src" content={ social_img_url } />
          <meta property="og:title" content={ title } />
          <meta property="og:image" content={ social_img_url } />
          <meta property="og:description" content={ description } />
          <meta property="og:site_name" content={ title } />
          <meta property="og:url" content="https://fey-arts.com" />

          <title>{ title }</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

        </Head>
        <div id="main" className={ this.state.isNavOpen ? 'nav--open' : ''}>
          <Nav { ...this.props } />
          <div className="logo" style={{ opacity: this.props.noLogo ? 0 : 1 }}>
            <Link href="/"><a>VOLLEY STUDIO</a></Link>
          </div>
          { this.props.children }
        </div>
      </div>
    )
  }
}
