'use babel';

CFMonitorUri = 'atom://cf-monitor'
import { CompositeDisposable } from 'atom';
import AtomCfMonitorView from './atom-cf-monitor-view';

export default {
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.workspace.addOpener(filePath => {
      if(filePath == CFMonitorUri) {
        return new AtomCfMonitorView({uri: CFMonitorUri});
      }
    }));
    // Register command that shows the window
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-cf-monitor:show': () => {
        atom.workspace.open(CFMonitorUri);
      }
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
  }
};
