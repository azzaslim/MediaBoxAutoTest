//ATTENTION! before test modify indep instance for test ("indep1 or indep2 ... indep8 or RELEASE ..." on fixtures > config.json
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




//  Add Widget 
it('add Widget', () => {
    cy.login(indepsUrls[server]);
    cy.get('[data-target="#AddSmallForm"] > .flaticon2-plus').click();
    
    cy.get('#select2-selectWidgetS-container > .select2-selection__placeholder').should('be.visible').click()
      .then(() => {
        cy.log('Clicked on placeholder');
      });
    
    // Attendre que le menu déroulant soit visible et ajouter un message de log
    cy.get('.select2-dropdown')
      .should('be.visible')
      .then(() => {
        cy.log('Dropdown is visible');
      });
    
    // Vérifier que les options du menu déroulant sont présentes et ajouter un message de log
    cy.get('.select2-results__option')
      .should('have.length.greaterThan', 0);
    
    // Cibler l'élément directement en utilisant un sélecteur simplifié
    cy.get('.select2-results__option')
      .contains('Connections')
      .should('be.visible')
      .click({ force: true })
      .then(() => {
        cy.log('Clicked on "Connections"');
      });
      cy.get('#sColors > .yellow-lemon').click();
    cy.get('#AddWidgetS > .col-12 > #saveS').click();
  });

 //Update Widget
 it('update widget', ()=>{
    cy.login(indepsUrls[server]);
    cy.get('#widg_20240626_163625_241VHVSKY > .card > .card-header >.card-toolbar > #currentProjectsNb ').click();
    cy.get('#formModifWidget > .form-body > :nth-child(1) > .col-9 > .form-control').clear();
 
    cy.get('#formModifWidget > .form-body > :nth-child(1) > .col-9 > .form-control').type('azza');
    cy.get('#formModifWidget > .form-body > .col-12 > .btn-primary').click();
    cy.wait(20000)

 
 });
//Delete a widget
//#widg_20240626_162130_2144Y5QKQ 
it('delete widget', ()=>{
    cy.login(indepsUrls[server]);
    cy.get('#widg_20240624_171333_321RIHALE > .card > .card-header > .card-toolbar > [data-content="Delete widget"]').click()
    //cy.get(' > .card > .card-header > .card-toolbar > [data-content="Delete widget"] > .ki').click();
    //cy.get('#sColors > .yellow-lemon').click();
    //cy.get('#AddWidgetS > .col-12 > #saveS').click();
    cy.wait(20000)

  
  });
  //view more
it('view  widget details ', ()=>{
    cy.login(indepsUrls[server]);
    cy.get('#widg_20240626_163625_241VHVSKY > .card > .card-header > .card-toolbar')
    .find('a').eq(1) 
    .find('.fa-arrow-right') 
    .click();
   //cy.get('.card-toolbar > #fas fa-arrow-right icon-xm text-white').click();
  
  });
    });