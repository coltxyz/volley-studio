import React from 'react'
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'

import sanity from '../lib/sanity'
import sanityClient from '../lib/sanity'
const imageBuilder = imageUrlBuilder(sanityClient)

const portfolio = `* | [_type == 'portfolio-item']`;
const about =  `* | [_type == 'about-pages']`;

export default class Page extends React.Component {

  static async getInitialProps() {
    const allContent = await sanity.fetch('*');
    return {
      portfolio: allContent.filter( item => item._type === 'portfolio-item'),
      about: allContent.filter( item => item._type === 'about-pages'),
      team: allContent.filter( item => item._type === 'team-member')
    }
  }

  getImageUrl(source) {
    try {
      return imageBuilder.image(source).width(800).url();
    } catch (e) {
      return;
    }
  }

  imageBuilder() {
    return imageBuilder;
  }

  render() {
    return <div />
  }
}
