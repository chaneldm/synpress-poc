import Page from '../page';
import Header from './header';
import Terms from './terms';
import Onboard from './onboard';
import Login from './login';

export default class HomePage extends Page {
  constructor() {
    super();
    this.header = new Header();
    this.terms = new Terms();
    this.onboard = new Onboard();
    this.login = new Login();
  }

  visit() {
    cy.visit('/');
  }

  loginToAccount() {
    this.login.login();
  }

  //terms modal
  acceptTermsAndConditions() {
    const termsModal = this.terms.getTermsModal();
    termsModal.scrollTo('bottom');
    const acceptTermsButton = this.terms.getAcceptTermsButton();
    acceptTermsButton.click();
  }

  connectBrowserWallet() {
    const connectWalletButton = this.header.getConnectWalletBtn();
    connectWalletButton.click();
    const onboardBrowserWalletButton = this.onboard.getBrowserWalletBtn();
    onboardBrowserWalletButton.click();
  }

  waitUntilLoggedIn() {
    cy.waitUntil(() => {
      const walletAddress = this.header.getWalletAddress();
      return walletAddress.should('exist');
    });
  }
}
