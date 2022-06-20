const { Chance } = require("chance")
const bankName = chance.company()
const bankRoutingNO = chance.ssn({ ssnNine: true, dashes: false })
const accountNO = chance.natural({min: 0, max: 999999999999})

describe ('Testing Cypress realworld app', ()=>{

    it('Create new bank account', function (){
        cy.intercept('GET','http://localhost:3001/notifications').as('notifiLoad')
       
        cy.login('Tavares_Barrows', 's3cret')
        cy.wait('@notifiLoad', {timeout:10000})
        cy.get('[data-test="sidenav-bankaccounts"]').click()
        cy.get('[href="/bankaccounts/new"]').focus().click({force: true})
        cy.get('#bankaccount-bankName-input').type(bankName)
        cy.get('#bankaccount-routingNumber-input').type(bankRoutingNO)
        cy.get('#bankaccount-accountNumber-input').type(accountNO)
        cy.get('[data-test="bankaccount-submit"]').click()

        cy.get('.makeStyles-container-20')
        .should('include.text',bankName)
        .and('be.visible')

        cy.get('[data-test="bankaccount-delete"]').last().click()
        cy.reload()
        cy.get('.MuiGrid-grid-xs-12').should('include.text',bankName +' (Deleted)')

    })
})