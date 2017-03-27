/** @babel */
/** @jsx etch.dom */

const etch = require('etch')

export default class AtomCfMonitorView {

  constructor(serializedState) {
    this.uri = serializedState.uri;
    this.stackName = 'Hello World';
    this.events = [{
        StackId: "arn:aws:cloudformation:us-west-2:153011574665:stack/why82-prod/9a74b820-8d66-11e6-9591-50a686be738e",
        EventId: "d797a8c0-8d66-11e6-8349-50a686fc37d2",
        ResourceStatus: "UPDATE_COMPLETE",
        ResourceType: "AWS::CloudFormation::Stack",
        Timestamp: "2016-10-08T14:52:32.419Z",
        StackName: "why82-prod",
        PhysicalResourceId: "arn:aws:cloudformation:us-west-2:153011574665:stack/why82-prod/9a74b820-8d66-11e6-9591-50a686be738e",
        LogicalResourceId: "why82-prod"
      },{
        StackId: "arn:aws:cloudformation:us-west-2:153011574665:stack/why82-prod/9a74b820-8d66-11e6-9591-50a686be738e",
        EventId: "CiUser-CREATE_COMPLETE-2016-10-08T14:52:25.702Z",
        ResourceStatus: "CREATE_IN_PROGRESS",
        ResourceType: "AWS::IAM::User",
        Timestamp: "2016-10-08T14:52:25.702Z",
        StackName: "why82-prod",
        ResourceProperties: {
          Policies:[{
            PolicyName:"why82-cipolicy",
            PolicyDocument:{
              Statement:[{
                Action:"s3:PutObject",
                Resource:["arn:aws:s3:::www.why82.com/*"],
                Effect:"Allow"
              }]
            }
          }]
        },
        PhysicalResourceId: "why82-prod-CiUser-MZJVNUC3D387",
        LogicalResourceId: "CiUser"
    }]
    etch.initialize(this);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {}

  update() {}

  getTitle() {
    return 'CloudFormation Monitor'
  }

  getURI () {
    return this.uri
  }

  statusCSS(status) {
    if (!status) {
      return '';
    } else if (status.match(/COMPLETE$/)) {
      return 'highlight-success'
    } else if (status.match(/FAIL/) || status.match(/ROLLBACK/)) {
      return 'highlight-error'
    } else {
      return 'highlight-warning'
    }
  }

  renderEvent(event) {
    const status_css = this.statusCSS(event.ResourceStatus);
    return (
      <tr>
        <td>{event.Timestamp}</td>
        <td>{event.ResourceType}</td>
        <td>{event.LogicalResourceId}</td>
        <td className={'inline-block '+status_css}>{event.ResourceStatus}</td>
        <td>{event.ResourceStatusReason ? event.ResourceStatusReason : ''}</td>
      </tr>
    )
  }

  render() {
    var event_rows = this.events.map(this.renderEvent.bind(this));

    return (
      <div className='atom-cf-monitor'>
        <h1>{this.getTitle()}</h1>
        <dl>
          <dt>Stack Name:</dt>
          <dd className='text-info'>{this.stackName}</dd>
          <dt>Last Status:</dt>
          <dd className='inline-block highlight-warning'>UPDATE_IN_PROGRESS</dd>
        </dl>
        <hr />
        <atom-panel id='events-panel'>
          <h2>Events</h2>
          <table id='events-table'>
            <tr>
              <th>Timestamp</th>
              <th>Resource Type</th>
              <th>Logical ID</th>
              <th>Status</th>
              <th>Status Reason</th>
            </tr>
            {event_rows}
          </table>
        </atom-panel>
      </div>
    )
  }

}
