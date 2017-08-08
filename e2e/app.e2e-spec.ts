import { AlexislargaiolliPage } from './app.po';

describe('alexislargaiolli App', () => {
  let page: AlexislargaiolliPage;

  beforeEach(() => {
    page = new AlexislargaiolliPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
