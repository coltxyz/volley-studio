import Stack from './stack';

const Team = props => (
  <Stack
    className="team-stack bg-gray"
    isActiveFrame={ props.activeFrameId  === props.frameId }
    imgWidth={ 250 }
    defaultHeight={ 470 }
    images={ props.images }
    frameType="informational"
    frameId={ props.frameId }
    marginCopy="team"
  >
    <div className="team-stack__content">
      <p>
        <strong>Michael Klausmeier</strong> is the Creative Director and founder of Volley. He created the studio in 2008, after graduating from Princeton University. With over a decade of professional experience in CG visualization, Michael has collaborated closely with architects and designers to translate their concepts into visual media.
      </p>
    </div>
  </Stack>
)

export default Team
