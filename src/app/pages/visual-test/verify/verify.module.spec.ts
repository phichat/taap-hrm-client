import { VerifyModule } from './verify.module';

describe('VerifyModule', () => {
  let verifyModule: VerifyModule;

  beforeEach(() => {
    verifyModule = new VerifyModule();
  });

  it('should create an instance', () => {
    expect(verifyModule).toBeTruthy();
  });
});
