'use babel';

import AtomCfMonitor from '../lib/atom-cf-monitor';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('AtomCfMonitor', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('atom-cf-monitor');
  });

  describe('when the atom-cf-monitor:show event is triggered', () => {
    it('shows the Monitor view', () => {
      expect(workspaceElement.querySelector('.atom-cf-monitor')).not.toExist();
      atom.commands.dispatch(workspaceElement, 'atom-cf-monitor:show');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        const root = workspaceElement.querySelector('.atom-cf-monitor');
        expect(root).toExist();
        expect(root.querySelector('#events-table')).toExist();
        expect(root.querySelector('#events-panel')).toExist();
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.atom-cf-monitor')).not.toExist();
      atom.commands.dispatch(workspaceElement, 'atom-cf-monitor:show');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        const root = workspaceElement.querySelector('.atom-cf-monitor');
        expect(root).toExist();
        expect(root.querySelector('#events-table')).toExist();
        expect(root.querySelector('#events-panel')).toExist();
      });
    });
  });
});
