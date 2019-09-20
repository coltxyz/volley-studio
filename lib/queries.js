export const portfolioQuery = `*[_type == 'portfolio-item']{
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

export const teamQuery = `*[_type == 'team-member'] | order(order desc)`

export const aboutQuery = `*[_type == 'about-pages']`
