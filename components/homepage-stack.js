import arrayShuffle from 'array-shuffle';

import Stack from './Stack';
import ArrowRight from './svg/arrow-right';

export default props => (
  <Stack
    { ...props }
    type="portfolioItem"
    isActiveFrame={ props.activeFrameId == props.frameId }
  />
);
