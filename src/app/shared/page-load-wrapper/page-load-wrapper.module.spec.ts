import { PageLoadWrapperModule } from './page-load-wrapper.module';

describe('PageLoadWrapperModule', () => {
  let pageLoadWrapperModule: PageLoadWrapperModule;

  beforeEach(() => {
    pageLoadWrapperModule = new PageLoadWrapperModule();
  });

  it('should create an instance', () => {
    expect(pageLoadWrapperModule).toBeTruthy();
  });
});
