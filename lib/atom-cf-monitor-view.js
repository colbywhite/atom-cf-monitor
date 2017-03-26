/** @babel */
/** @jsx etch.dom */

const etch = require('etch')

export default class AtomCfMonitorView {

  constructor(serializedState) {
    this.uri = serializedState.uri;
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
        The AtomCfMonitor package is Alive!
      </div>
    )
  }

}
