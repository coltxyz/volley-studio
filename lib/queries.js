export const portfolioQuery = `*[_type == 'portfolio-item']{
  _id,
  title,
  year,
  month,
  slug,
  description,
  images[] {
    imageColor { asset ->{...}},
    imageMono { asset ->{...}},
    videoColor{ asset ->{...}},
    videoMono{ asset ->{...}},
    type,
    title,
    _key
  }
}`;

export const teamQuery = `*[_type == 'team-member'] | order(order desc)`

export const aboutQuery = `*[_type == 'about-pages']`
