/** @babel */
/** @jsx etch.dom */

const etch = require('etch')
import {Task} from 'atom'

export default class AtomCfMonitorView {

  constructor(serializedState) {
    this.uri = serializedState.uri;
    this.stackName = 'why82-calc-prod';
    this.events = []
    this.taskPath = serializedState.taskPath || './stackMonitorTask.js'
    this.task = null
    this.status = null
    etch.initialize(this);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    if(this.task) {
      this.task.terminate()
    }
  }

  update() {}

  getTitle() {
    return 'CloudFormation Monitor'
  }

  getURI () {
    return this.uri
  }

  start() {
    this.task = Task.once(require.resolve(this.taskPath), this.stackName)
    this.task.on('cf-events-error', function(err) {
      console.error('err', err.error)
    })
    this.task.on('cf-events-found', this.updateEvents.bind(this))
  }

  updateEvents(data) {
    this.events = data.events
    this.status = data.status
    etch.update(this)
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
        <header>
          <h1>{this.getTitle()}</h1>
          <button onclick={() => this.start()} class='btn icon icon-playback-play inline-block-tight'>Start</button>
        </header>
        <section>
          <dl>
            <dt>Stack Name:</dt>
            <dd className='text-info'>{this.stackName}</dd>
            <dt>Last Status:</dt>
            <dd className={'inline-block ' + this.statusCSS(this.status)}>{this.status}</dd>
          </dl>
        </section>
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
