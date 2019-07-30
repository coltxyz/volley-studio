import React from 'react';

const svg = `
<svg width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<line y1="6.5" x2="29" y2="6.5" stroke="black"/>
<line x1="28.7" y1="6.4" x2="20.7" y2="0.4" stroke="black"/>
<path d="M20.75 12.5L24.75 9.5L28.75 6.5" stroke="black"/>
</svg>
`;

export default props => (
  <span dangerouslySetInnerHTML={{ __html: svg }} />
)
