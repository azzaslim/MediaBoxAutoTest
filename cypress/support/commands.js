// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const config = require('../fixtures/config.json');

Cypress.Commands.add('login', (server) => { 
    cy.visit(`${server}?MBI_datasource=TEST_DEV_FROM_DEMO`)
    cy.get('#MDB_WebUserCode').type('aslim')
    cy.get('#formLogin > :nth-child(8) > .input-icon > .form-control').type('azza*2000')
    cy.get(':nth-child(10) > .btn').click() 
  })