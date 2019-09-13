import React from 'react'
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'

import sanity from '../lib/sanity'

const portfolioQuery = `*[_type == 'portfolio-item']{
  title,
  year,
  featured,
  description,
  images[] {
    imageColor { asset ->{...}},
    imageMono { asset ->{...}},
    title,
    _key
  },
  videos[] {
    videoColor{ asset ->{...}},
    videoMono{ asset ->{...}},
    title,
    _key
  }
}`;

export default class Page extends React.Component {

  static async getInitialProps() {
    const allContent = await sanity.fetch('*');
    const portfolio = await sanity.fetch(portfolioQuery);
    return {
      portfolio,
      about: allContent.filter( item => item._type === 'about-pages'),
      team: allContent.filter( item => item._type === 'team-member')
    }
  }

  render() {
    return <div />
  }
}
