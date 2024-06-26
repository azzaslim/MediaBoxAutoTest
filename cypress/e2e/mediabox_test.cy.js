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
  
  it('changing the project name and looking for the change in the solr search', () => {    
    cy.login(indepsUrls[server])

    //acess menu project
    cy.get('#menu_2 > .menu-link > .menu-text').click()
    //acess project
    cy.get('#MI000334 > :nth-child(3) > .a2').click()

    //acess edit projet form
    cy.contains(' Modify this project').click()

    const num = Date.now()
    const n = num.toString()

    //change project name
    cy.get('#nomProjet').clear().type(`MPM TEST - Project ${n}`)

    //save prj
    cy.get(':nth-child(25) > .col-12 > .btn-primary').click()

    //validation toastr - success
    cy.get('.toast-message').contains('has successfully been updated')

    //serch project
    cy.get('#sidebarsearch > .input-group > #keywords').clear().type(`MPM TEST - Project ${n}`)
    cy.log('Waiting for 20 seconds to ensure the project update is propagated to Hangfire. If this fails, it may be due to insufficient time for Hangfire to complete its process.');
    cy.wait(20000)
    cy.get('#sidebarsearch > .input-group > .input-group-append').click()

    cy.get('.datatable-row > :nth-child(3) > a').contains('MI000334')
    cy.wait(2000)
  })

  it('enter setup and see if “react” works', () => {
    cy.login(indepsUrls[server])
    cy.contains('Setup').click()
    cy.get('#liglobalparams > .nav-link').click()
    cy.get('#row_field_mediabox_name > .text-right').should('exist')
    cy.wait(2000)
  })
  
  it('download tracker', () => {
    cy.login(indepsUrls[server])
    cy.get('#link_tracker_menu > .menu-text').click()
    cy.get('[id^="btn_export_tracker_"]:first').click()
    cy.log('Waiting for the file download. Operation may fail as the 35-second timeout was not sufficient for the file to be downloaded.');
    cy.wait(35000)

    const downloadsFolder = Cypress.config('downloadsFolder')

    cy.task('filesInDownload', downloadsFolder).then(files => {
      const trackerFile = files.find(file => file.startsWith('Tracker'))
      expect(trackerFile).to.not.be.undefined
    })
  })
//only = just turn this
  //it.only('test', () => {
   // cy.login(indepsUrls[server])
    //console.log()
  //})


  ////////////////////////////////////////////Widget management

  //Update Widget
  it.only('update widget', ()=>{
   cy.login(indepsUrls[server]);
   cy.get('#widg_20240626_163625_241VHVSKY > .card > .card-header >.card-toolbar > #currentProjectsNb ').click();
   cy.get('#formModifWidget > .form-body > :nth-child(1) > .col-9 > .form-control').clear();

   cy.get('#formModifWidget > .form-body > :nth-child(1) > .col-9 > .form-control').type('azza');
   cy.get('#formModifWidget > .form-body > .col-12 > .btn-primary').click();


});

//view more
it('view  widget details ', ()=>{
  cy.login(indepsUrls[server]);
  cy.get('#widg_20240626_163625_241VHVSKY > .card > .card-header > .card-toolbar')
  .find('a').eq(1) 
  .find('.fa-arrow-right') 
  .click();
 //cy.get('.card-toolbar > #fas fa-arrow-right icon-xm text-white').click();
 cy.wait(35000);

});


//Delete a widget
it('delete widget', ()=>{
  cy.login(indepsUrls[server]);
  cy.get('#widg_20240626_171129_300WNH3IP > .card > .card-header > .card-toolbar > [data-content="Delete widget"] > .ki').click();
  cy.get('#sColors > .yellow-lemon').click();
  cy.get('#AddWidgetS > .col-12 > #saveS').click();


});


//  Add Widget 
  it('add Widget', () => {
    cy.login(indepsUrls[server]);
    cy.get('[data-target="#AddSmallForm"] > .flaticon2-plus').click();
    
    // Attendre que l'élément soit cliquable et ajouter un message de log
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
})