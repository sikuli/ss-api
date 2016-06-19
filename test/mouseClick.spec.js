const expect = require('chai').expect;
const desktop = require('./helpers/desktop');
const mouseEvents = require('../lib/mouseEvents');

describe('mouse click events', function describe() {
  this.timeout(10000);

  before((done) => {
    desktop.start().then(() => done()).catch((e) => done(e));
  });

  after(() => {
    desktop.quit();
  });

  it('left clicks on a button named by its location.', (done) => {
    desktop.listen().then((result) => {
      if (result.ready) {
        mouseEvents.click(436, 285);
        return desktop.listen();
      }
      throw new Error('Desktop window is not ready');
    })
    .then((result) => {
      expect(result).to.deep.equal({ type: 'mouseClick', id: 'btn-1' });
      done();
    })
    .catch((e) => done(e));
  });
});
