const expect = require('chai').expect;
const desktop = require('./helpers/desktop');
const mouseEvents = require('../lib/mouseEvents');

describe('mouse click events', function describe() {
  this.timeout(10000);

  beforeEach((done) => {
    desktop.start().then(() => done()).catch((e) => done(e));
  });

  afterEach(() => {
    desktop.quit();
  });

  it('left clicks on a button by its location.', (done) => {
    desktop.listen()
    .then((result) => {
      if (result.ready) {
        mouseEvents.click(436, 285);
        return desktop.listen();
      }
      throw new Error('Desktop window is not ready');
    })
    .then((result) => {
      expect(result).to.deep.equal({ type: 'leftClick', id: 'btn-1' });
      done();
    })
    .catch((e) => done(e));
  });

  it('right clicks on a button by its location.', (done) => {
    desktop.listen().then((result) => {
      if (result.ready) {
        mouseEvents.rightClick(568, 273);
        return desktop.listen();
      }
      throw new Error('Desktop window is not ready');
    })
    .then((result) => {
      expect(result).to.deep.equal({ type: 'rightClick', id: 'btn-2' });
      done();
    })
    .catch((e) => done(e));
  });

  it('double clicks on a button by its location.', (done) => {
    desktop.listen().then((result) => {
      if (result.ready) {
        mouseEvents.doubleClick(710, 273);
        return desktop.listen();
      }
      throw new Error('Desktop window is not ready');
    })
    .then((result) => {
      expect(result).to.deep.equal({ type: 'doubleClick', id: 'btn-3' });
      done();
    })
    .catch((e) => done(e));
  });
});
