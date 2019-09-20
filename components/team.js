import { processTeamImages } from '../lib/util';
import Stack from './stack';

class Team extends React.Component {

  constructor(props) {
    super()
    this.state = {
      isAnimating: false,
      activeTeamMemberIndex: props.content.length - 1
    }
  }

  onStackItemChange = ({ isAnimating, currentTargetId }) => {
    let activeTeamMemberIndex = this.state.activeTeamMemberIndex;
    if (currentTargetId) {
      activeTeamMemberIndex = this.props.content.findIndex(
        el => el._id === currentTargetId
      )
    }
    this.setState({
      isAnimating,
      activeTeamMemberIndex
    })
  }

  render() {
    const props = this.props;
    const teamMemberName = props.content[ this.state.activeTeamMemberIndex ].name;
    const teamMemberBio = props.content[ this.state.activeTeamMemberIndex ].bio;
    return (
      <Stack
        className="team-stack bg-gray"
        isActiveFrame={ props.activeFrameId  === props.frameId }
        imgWidth={ 250 }
        defaultHeight={ 470 }
        images={ props.content.map( processTeamImages ) }
        frameType="informational"
        frameId={ props.frameId }
        marginCopy="team"
        onChange={ this.onStackItemChange }
      >
        <div className="team-stack__content">
          <p>
            <strong>{ teamMemberName }</strong> { teamMemberBio }
          </p>
        </div>
      </Stack>
    );
  }
}

export default Team
