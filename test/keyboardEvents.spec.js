const expect = require('chai').expect;
const desktop = require('./helpers/desktop');
const keyboardEvents = require('../lib/keyboardEvents');
const mouseEvents = require('../lib/mouseEvents');

describe('keyboard events', function describe() {
  this.timeout(20000);

  beforeEach((done) => {
    desktop.start()
    .then(() => desktop.listen(0))
    .then((status) => {
      expect(status.ready).to.equal(true);
      done();
    })
    .catch((e) => done(e));
  });

  afterEach((done) => {
    desktop.quit().then(() => done()).catch((e) => done(e));
  });

  it('presses a single key', (done) => {
    mouseEvents.click(371, 203);
    keyboardEvents.keyPress('right');
    return desktop.listen(2)
    .then((result) => {
      expect(result).to.deep.equal([
        { type: 'leftClick', id: 'input-1' },
        { type: 'keydown', key: 'ArrowRight', id: 'input-1', modifiers: [] }]);
      done();
    })
    .catch((e) => done(e));
  });

  // The order of test cases is significant due to
  // github.com/octalmage/robotjs/issues/219
  it('types the word hello in a textbox by its location', (done) => {
    mouseEvents.click(371, 203);
    keyboardEvents.type('hello');
    return desktop.listen(6)
    .then((result) => {
      expect(result).to.deep.equal([{ type: 'leftClick', id: 'input-1' },
        { type: 'keydown', key: 'h', id: 'input-1', modifiers: [] },
        { type: 'keydown', key: 'e', id: 'input-1', modifiers: [] },
        { type: 'keydown', key: 'l', id: 'input-1', modifiers: [] },
        { type: 'keydown', key: 'l', id: 'input-1', modifiers: [] },
        { type: 'keydown', key: 'o', id: 'input-1', modifiers: [] }]);
      done();
    })
    .catch((e) => done(e));
  });

  it('presses a single key with a modifier', (done) => {
    mouseEvents.click(371, 203);
    keyboardEvents.keyPress('A', ['shift']);
    return desktop.listen(2)
    .then((actual) => {
      const expected = [
        { type: 'leftClick', id: 'input-1' },
        { type: 'keydown', key: 'A', id: 'input-1', modifiers: ['shift'] }
      ];
      expect(actual).to.deep.equal(expected);
      done();
    })
    .catch((e) => done(e));
  });

  it('throws an error when attempting to press multiple keys', (done) => {
    try {
      keyboardEvents.keyPress('AB', ['alt']);
      done(new Error(''));
    }
    catch (e) {
      expect(e).to.be.an('error');
      done();
    }
  });
});
