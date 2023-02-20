import Page from '../page';

import { handleRecaptcha } from '../helper/handleRecaptcha';

export default class Login extends Page {
  login() {
    cy.visit('/account/login');
    cy.intercept('POST', '**/auth2*').as('authenticateCredentials');
    cy.get('[data-test-id="emailInput2"]')
      .click()
      .type('chanel.donahoe@immutable.com');
    cy.get('[data-test-id="passwordInput2" ]')
      .click()
      .type('wyhtyhstyh7587689');
    cy.get('[data-test-id="loginButton"]').click({ force: true });
    cy.wait('@authenticateCredentials')
      .its('response.statusCode')
      .should('be.oneOf', [200])
      .then(handleRecaptcha('@authenticateCredentials'));
  }
}
