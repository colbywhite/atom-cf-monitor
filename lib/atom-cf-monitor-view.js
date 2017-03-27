/** @babel */
/** @jsx etch.dom */

const etch = require('etch')

export default class AtomCfMonitorView {

  constructor(serializedState) {
    this.uri = serializedState.uri;
    this.stackName = 'Hello World';
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

  render() {
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
        <atom-panel>
          <h2>Events</h2>
          <table>
            <tr>
              <th>Timestamp</th>
              <th>Resource Type</th>
              <th>Logical ID</th>
              <th>Status</th>
              <th>Status Reason</th>
            </tr>
            <tr>
              <td>2017-03-01T20:21:30.00</td>
              <td>AWS::CloudFormation::Stack</td>
              <td>why82-prod</td>
              <td className='inline-block highlight-warning'>UPDATE_IN_PROGRESS</td>
              <td>Resource creation Initiated</td>
            </tr>
            <tr>
              <td>2017-03-01T20:22:30.00</td>
              <td>AWS::IAM::AccessKey</td>
              <td>CiKey</td>
              <td className='inline-block highlight-success'>CREATE_COMPLETE</td>
              <td></td>
            </tr>
          </table>
        </atom-panel>
      </div>
    )
  }

}
