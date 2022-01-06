import { ReduceTextPipe } from './reduce-text.pipe';

describe('ReduceTextPipe', () => {
  let pipe: ReduceTextPipe;

  beforeEach(() => {
    pipe = new ReduceTextPipe();
  });

  it('should create pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('shold transform correctly', () => {
    const text = 'Helo this is a test to check pipe';
    const newText = pipe.transform(text, 5);

    expect(newText.length).toBe(5);
  });
});
