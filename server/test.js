const operations = require('./index.js');
const assert = require('assert');

it('Id получен верно(Id должен быть числом)', () => {
    assert.equal(operations.validateId(1), true);
});

it('Id получен не верно(Id должен быть числом)', () => {
    assert.equal(operations.validateId('id:3'), false);
});

it('API получил на входе данные в формате JSON', () => {
    assert.equal(operations.validateJSON({"id":'9'}), true);
});

it('API получил на входе данные не в формате JSON(API принимает данные только в json)', () => {
    assert.equal(operations.validateJSON('id:9'), false);
});