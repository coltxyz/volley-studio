import React from 'react';

const svg = `
<svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="0.707107" y1="1.29289" x2="11.7071" y2="12.2929" stroke="#353535" stroke-width="2"/>
<line x1="10.2929" y1="12.2929" x2="21.2929" y2="1.29289" stroke="#353535" stroke-width="2"/>
</svg>
`;

export default props => (
  <span dangerouslySetInnerHTML={{ __html: svg }} />
)
