import { ReadableStatusPipe } from './readable-status.pipe';

describe('ReadableStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new ReadableStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
