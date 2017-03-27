'use babel';

import AtomCfMonitorView from '../lib/atom-cf-monitor-view';

describe('AtomCfMonitorView', () => {
  const URI = 'uri'
  const view = new AtomCfMonitorView({uri: URI})

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
});
