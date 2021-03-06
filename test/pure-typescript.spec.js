/**
 * Pure TypeScript
 *
 * Treat typescript as the first class citizen!
 *  
 * for Full Stack TypeScript Developer:
 *  - No more compile
 *  - Zero settings
 *  - Write then Run like JavaScript 
 * 
 * GitHub: https://github.com/zixia/pure-typescript
 * 
 */
'use strict'

const test = require('tape')
const sinon = require('sinon')

const pureTypeScript = require('..')

test('PureTypeScript smoking test', t => {
  t.equal(typeof pureTypeScript, 'function', 'should get pureTypeScript instance of "function"')

  const spy = sinon.spy()
  const mockModule = { _compile: spy }

  t.doesNotThrow(_ => {
    pureTypeScript(mockModule, 'test/tsfile/basic.ts')
  }, 'should compile ok for basic ts file')
  t.ok(spy.calledOnce, 'should call _compile once after load basic.ts')
  t.equal(spy.getCall(0).args[0]
            , '"use strict";\nlet n;\nn = 3;\n//# sourceMappingURL=module.js.map'
            , 'should compile with expected content'
        )
  t.equal(spy.getCall(0).args[1], 'test/tsfile/basic.ts', 'should compile with expected filename')


  spy.reset()
pureTypeScript(mockModule, 'test/tsfile/basic-error.ts')
console.log('###')
console.log(spy.getCall(0).args[0])
console.log('###')
  // t.throws(_ => {
  //   pureTypeScript(mockModule, 'test/tsfile/basic-error.ts')
  // }, 'should throw when compile error')
  // t.ok(!spy.called, 'should not call _compile when load basic-error.ts')

  t.end()
})