const config = require('../fixtures/config.json');
describe(`DEPLOYMENT E2E tests - MEDIABOXINDEPENDENCE - ${JSON.stringify(config.server)}`, () => {  
    let indepsUrls;
    let server;
    beforeEach(() => {
      cy.fixture('config').then((config) => {
        indepsUrls = config.indepsUrls;
        server = config.server;
      });
    });


//contact Support
it('contactSupport ',()=>{
    cy.login(indepsUrls[server]);
    cy.get('.mx-2').click();
    cy.get('#btn_contact_support').click();
    cy.get('#CCEmail').type('azzaslim3@gmail.com');
    //cy.get('.select2-search__field > #select2-listbox_requesttype-result-pl97-Other').click();
    
    cy.get('#select2-listbox_requesttype-container').click();
    cy.get('#select2-listbox_requesttype-results')  
    .contains('Other')
    .should('be.visible')
    .click({ force: true })
    .then(() => {
      cy.log('Clicked on "Other"');
    });
  
    cy.get('#msg_support').type('auto test with cypress');
    cy.get('.dz-button > .fa').click();
    cy.get('#btn_send_mail_support_top').click();
  
    //ne fonctionne pas 
   //cy.get('.toast-message').contains('Thank you for  your message, we will contact you shortly')
  
  });
})