'use babel';

import AtomCfMonitorView from '../lib/atom-cf-monitor-view';

describe('AtomCfMonitorView', () => {
  const URI = 'uri'
  const MOCK_MONITOR_PATH = '../spec/fixtures/mock-monitor-task.js'
  const view = new AtomCfMonitorView({uri: URI, taskPath: MOCK_MONITOR_PATH})

  describe('.getURI', () => {
    it('returns correct uri', () => {
      expect(view.getURI()).toBe(URI);
    });
  });

  describe('.statusCSS', () => {
    it('returns highlight-warning for IN_PROGRESSes that aren\'t ROLLBACKs', () => {
      const expected = 'highlight-warning';
      expect(view.statusCSS('CREATE_IN_PROGRESS')).toBe(expected);
      expect(view.statusCSS('UPDATE_IN_PROGRESS')).toBe(expected);
      expect(view.statusCSS('DELETE_IN_PROGRESS')).toBe(expected);
      expect(view.statusCSS('REVIEW_IN_PROGRESS')).toBe(expected);
      expect(view.statusCSS('UPDATE_COMPLETE_CLEANUP_IN_PROGRESS')).toBe(expected);
    });
    it('returns highlight-error for ROLLBACKS and FAILUREs', () => {
      const expected = 'highlight-error';
      expect(view.statusCSS('UPDATE_ROLLBACK_IN_PROGRESS')).toBe(expected);
      expect(view.statusCSS('UPDATE_ROLLBACK_FAILED')).toBe(expected);
      expect(view.statusCSS('ROLLBACK_IN_PROGRESS')).toBe(expected);
      expect(view.statusCSS('ROLLBACK_FAILED')).toBe(expected);
      expect(view.statusCSS('DELETE_FAILED')).toBe(expected);
      expect(view.statusCSS('CREATE_FAILED')).toBe(expected);
    });
    it('returns highlight-success for COMPLETEs', () => {
      const expected = 'highlight-success';
      expect(view.statusCSS('UPDATE_ROLLBACK_COMPLETE')).toBe(expected);
      expect(view.statusCSS('UPDATE_COMPLETE')).toBe(expected);
      expect(view.statusCSS('ROLLBACK_COMPLETE')).toBe(expected);
      expect(view.statusCSS('DELETE_COMPLETE')).toBe(expected);
      expect(view.statusCSS('ROLLBACK_COMPLETE')).toBe(expected);
      expect(view.statusCSS('CREATE_COMPLETE')).toBe(expected);
    });
    it('returns empty string for bad statuses', () => {
      const expected = '';
      expect(view.statusCSS(null)).toBe(expected);
      expect(view.statusCSS(undefined)).toBe(expected);
      expect(view.statusCSS()).toBe(expected);
      expect(view.statusCSS(false)).toBe(expected);
    });
  });

  describe('.start', () => {
    it('updates state after running the monitor task', () => {
      spyOn(view, 'updateEvents').andCallThrough()
      view.start();
      waitsFor(() => {
        return view.updateEvents.calls.length > 0
      });

      runs(() => {
        expect(view.updateEvents.calls.length).toBe(1)
        expect(view.events.length).toBe(2)
        expect(view.status).toBe('UPDATE_COMPLETE')
      });
    });
  });
});
