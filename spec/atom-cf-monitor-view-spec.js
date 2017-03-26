'use babel';

import AtomCfMonitorView from '../lib/atom-cf-monitor-view';

describe('AtomCfMonitorView', () => {
  it('has one valid test', () => {
    const URI = 'uri'
    const view = new AtomCfMonitorView({uri: URI})
    expect(view.getURI()).toBe(URI);
  });
});
