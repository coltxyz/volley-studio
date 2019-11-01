import classname from 'classnames';
import VolleyLogo from './svg/volley-logo';

export default props => (
  <div
    id={ props.id }
    className={classname("flex-container module bg-white", {
      'module--active': props.activeFrameId === props.frameId
    })}
    data-frameid={ props.frameId }
    data-frametype="fin"
  >
    <div className="margin-copy mono">
      <p>contact</p>
    </div>
    <div className="contact-card">
      <div className="contact-card__bg-1" />
      <div className="contact-card__bg-2" />
      <div className="contact-card__bg-0">
        <div className="contact-card__header">
          <div className="logo">
            <VolleyLogo color="var(--black-ln)" />
          </div>
          <div className="info">
            <p>
              <strong>{ props.content.contactEmail }</strong>
            </p>
            <p>
              { props.content.contactAddress1 }<br/>
              { props.content.contactAddress2 }<br/>
              { props.content.contactPhone }<br/>
            </p>
          </div>
        </div>
        <div className="contact-card__body">
          <textarea placeholder={ props.content.contactPrompt }/>
        </div>
        <div className="contact-card__footer">
          <input placeholder="your email"/>
          <button>
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
)
