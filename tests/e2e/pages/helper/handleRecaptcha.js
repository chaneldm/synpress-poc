/**
 * Because we have a fallback between v3 and v2 recaptchas, we have two
 * 'reCAPTCHA' iframes on the page. We need to find the one for v2
 * (the one that contains the #recaptcha-anchor element) to confirm
 * the captcha.
 */
export const handleRecaptcha = requestAlias => status => {
  if (status == 406) {
    cy.get('iframe[src*=recaptcha]').each(iframe => {
      cy.wrap(iframe)
        .its('0.contentDocument.body')
        .should('not.be.undefined')
        .and('not.be.empty')
        .then(cy.wrap)
        .then(body => {
          const anchor = body.find('#recaptcha-anchor');
          if (anchor.length) {
            cy.wrap(anchor).should('be.visible').click();
            cy.wait(requestAlias)
              .its('response.statusCode')
              .should('be.oneOf', [406, 401, 200]);
          }
        });
    });
  }
};
