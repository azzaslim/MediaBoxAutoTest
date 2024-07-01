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

    //search project
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


  

//profile management
it('profile config',()=>{
  cy.login(indepsUrls[server]);

  cy.get('.mx-2').click();
  cy.get('#btn_display_profile').click();

  //cy.get('.form-body > .form-group > .col-9 > #userAccount > .card-body > #MyFile').click();
cy.get('#MyFile').click({ force: true });
});





})