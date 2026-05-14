import { expect } from 'chai';
import * as path from 'path';
import * as sinon from 'sinon';
import { EventEmitter } from 'events';
import { startRepl } from '../src/repl/BellRepl';
import * as run from '../src/interpreter/run';

describe('Bell REPL', () => {
  let rlMock: any;
  let events: EventEmitter;
  let logs: string[];

  beforeEach(() => {
    events = new EventEmitter();
    rlMock = {
      prompt: sinon.stub(),
      setPrompt: sinon.stub(),
      pause: sinon.stub(),
      resume: sinon.stub(),
      close: sinon.stub(),
      on: sinon.stub().callsFake((event: string, handler: (...args: any[]) => void) => {
        events.on(event, handler);
        return rlMock;
      }),
    };
    logs = [];
    sinon.stub(console, 'log').callsFake((...args: any[]) => logs.push(args.join(' ')));
  });

  afterEach(() => {
    sinon.restore();
  });

  it('logs a welcome message on start', async () => {
    await startRepl(rlMock);
    expect(logs[0]).to.include('Bell');
  });

  it('shows initial prompt on start', async () => {
    await startRepl(rlMock);
    expect(rlMock.prompt.called).to.be.true;
  });

  it('prints help text on "help" command', async () => {
    await startRepl(rlMock);
    events.emit('line', 'help');
    expect(logs.some(l => l.includes('Bell REPL'))).to.be.true;
  });

  it('calls rl.prompt() again after "help"', async () => {
    await startRepl(rlMock);
    rlMock.prompt.resetHistory();
    events.emit('line', 'help');
    expect(rlMock.prompt.calledOnce).to.be.true;
  });

  it('logs "State cleared." on "clear" command', async () => {
    await startRepl(rlMock);
    events.emit('line', 'clear');
    expect(logs.some(l => l.includes('State cleared'))).to.be.true;
  });

  it('calls process.exit(0) on "exit" command', async () => {
    const exitStub = sinon.stub(process, 'exit');
    await startRepl(rlMock);
    events.emit('line', 'exit');
    expect(exitStub.calledWith(0 as any)).to.be.true;
  });

  it('calls process.exit(0) on "quit" command', async () => {
    const exitStub = sinon.stub(process, 'exit');
    await startRepl(rlMock);
    events.emit('line', 'quit');
    expect(exitStub.calledWith(0 as any)).to.be.true;
  });

  it('calls process.exit(0) on readline close event', async () => {
    const exitStub = sinon.stub(process, 'exit');
    await startRepl(rlMock);
    events.emit('close');
    expect(exitStub.calledWith(0 as any)).to.be.true;
  });

  it('buffers multi-line input until open braces are closed', async () => {
    const fakeVisitor = { resetRequestConfig: sinon.stub() };
    const runStub = sinon.stub(run, 'runSource').resolves(fakeVisitor as any);
    await startRepl(rlMock);

    events.emit('line', 'headers {');
    expect(runStub.called).to.be.false; // incomplete — waiting for }

    events.emit('line', '  Accept: "application/json"');
    expect(runStub.called).to.be.false; // still incomplete

    events.emit('line', '}');
    // runSource is called synchronously before its await resolves
    expect(runStub.calledOnce).to.be.true;
  });

  it('executes complete Bell input via runSource', async () => {
    const fakeVisitor = { resetRequestConfig: sinon.stub() };
    const runStub = sinon.stub(run, 'runSource').resolves(fakeVisitor as any);
    await startRepl(rlMock);

    events.emit('line', 'x = "hello"');
    expect(runStub.calledOnce).to.be.true;
    expect(runStub.firstCall.args[0]).to.equal('x = "hello"');
  });

  it('sets continuation prompt while accumulating multi-line input', async () => {
    sinon.stub(run, 'runSource').resolves({ resetRequestConfig: sinon.stub() } as any);
    await startRepl(rlMock);

    rlMock.setPrompt.resetHistory();
    events.emit('line', 'body {');
    expect(rlMock.setPrompt.calledWith('... ')).to.be.true;
  });

  it('resets prompt to "bell> " after execution', async () => {
    const fakeVisitor = { resetRequestConfig: sinon.stub() };
    sinon.stub(run, 'runSource').resolves(fakeVisitor as any);
    await startRepl(rlMock);

    events.emit('line', 'x = "hello"');
    await new Promise(resolve => setImmediate(resolve)); // drain microtasks
    expect(rlMock.setPrompt.calledWith('bell> ')).to.be.true;
    expect(rlMock.resume.called).to.be.true;
  });

  it('logs error message when Bell code throws', async () => {
    sinon.stub(run, 'runSource').rejects(new Error('runtime failure'));
    const errors: string[] = [];
    sinon.stub(console, 'error').callsFake((...args: any[]) => errors.push(args.join(' ')));
    await startRepl(rlMock);

    events.emit('line', 'bad code');
    await new Promise(resolve => setImmediate(resolve));
    expect(errors.some(e => e.includes('runtime failure'))).to.be.true;
  });
});
