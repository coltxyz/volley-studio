const SelectClients = (props) => {
  return (
    <div
      className="flex-container module bg-gray"
      data-frametype="informational"
      data-frameid={ props.frameId }
    >
      <div>
        <div className="col-6"></div>
        <div className="col-6">
          <p className="uppercase bold">
            Select Clients
          </p>
        </div>
      </div>
      <div>
        <div className="col-6"></div>
        <div className="col-3-2 select-clients-column">
          {
            props.content.selectClients.map( ({clientName, url}) => (
              <div>{ clientName }</div>
            ))
          }
        </div>
        <div className="col-6"></div>
      </div>
    </div>
  )
}

export default SelectClients
