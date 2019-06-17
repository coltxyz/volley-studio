import React from 'react'
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'

import sanity from '../lib/sanity'
import sanityClient from '../lib/sanity'
const imageBuilder = imageUrlBuilder(sanityClient)

const contentQuery = slug => `*[_type == "pages" && slug.current == "${ slug }"] {
  _id,
  title,
  textblocks,
  images
}[0...1]`;
const globalQuery = `*[_type == "global"] {
  _id,
  text,
  title
}`;
const navQuery = `*[_type == "pages"] {
  _id,
  title,
  slug
}`

export default class Page extends React.Component {

  static async getInitialProps() {
    return {}
  }

  getImage(tagName) {
    try {
      const img = this.props.content[0].images.find( img => tagName === img.tag );
      return imageBuilder.image(img.image);
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
