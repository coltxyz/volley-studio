import React from 'react';

const svg = `
<svg viewBox="0 0 58 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="9.03571" cy="15.9644" r="8.03571" stroke="#494949" stroke-width="2"/>
<circle cx="36.1431" cy="15.9644" r="8.03571" stroke="#494949" stroke-width="2"/>
<line x1="17.0004" y1="15" x2="28.0004" y2="15.004" stroke="#494949" stroke-width="2"/>
<path d="M43.5361 12.6787L51.3397 5.69657L56.2683 5.69657" stroke="#494949" stroke-width="2"/>
<path d="M14.7861 9.59863L20.1254 4.67006L25.054 4.67006" stroke="#494949" stroke-width="2"/>
</svg>
`;

export default props => (
  <span dangerouslySetInnerHTML={{ __html: svg }} />
)
