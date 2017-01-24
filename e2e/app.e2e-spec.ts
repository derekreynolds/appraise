import { AppraisePage } from './app.po';

describe('appraise App', function() {
  let page: AppraisePage;

  beforeEach(() => {
    page = new AppraisePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
