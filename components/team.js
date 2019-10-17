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
      <div
        className="module bg-gray"
        data-frametype="informational"
        data-frameid={ props.frameId }
      >
        <div className="about-pg__inner">
          <div className="about-pg__inner__left">
            <Stack
              className="team-stack"
              isActiveFrame={ props.activeFrameId  === props.frameId }
              imgWidth={ 250 }
              defaultHeight={ 470 }
              images={ props.content.map( processTeamImages ).reverse() }
              marginCopy="team"
              onChange={ this.onStackItemChange }
            />
          </div>
          <div className="about-pg__inner__right team-bio">
            <p>
              <strong>{ teamMemberName }</strong> { teamMemberBio }
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Team
