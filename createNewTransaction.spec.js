const { Chance } = require("chance")
const text = chance.paragraph({ sentences: 1 })
const text2 = chance.sentence({ words: 3 })

describe ("Testing Cypress realworld app", ()=> {
    
    it("Create new transaction", function(){
        cy.intercept('GET','http://localhost:3001/notifications').as('notifiLoad')

        cy.login('Tavares_Barrows', 's3cret')
        cy.wait('@notifiLoad', {timeout: 10000})
        
        cy.get('[data-test="sidenav"]')
            .should('include.text', 'Tavares_Barrows')
            .and('be.visible')
        
        cy.get('[data-test="nav-top-new-transaction"]').click()
        cy.get('[data-test="user-list-search-input"]').type('Edgar Johns')
        cy.get('[data-test="user-list-item-t45AiwidW"]').click()
        cy.get('#amount').type('5')
        cy.get('#transaction-create-description-input').type(text)
        cy.get('[data-test="transaction-create-submit-payment"]').click()
        
        cy.get('.MuiBox-root-80').should('include.text', 'Paid')
        cy.get('.MuiBox-root-80').should('include.text', '$5')
        cy.get('.MuiBox-root-80').should('include.text', 'for')
        cy.get('.MuiBox-root-80').should('include.text', text)
        cy.get('.MuiAlert-message')
            .should('include.text', 'Transaction Submitted!')
            .and('be.visible')
        
        cy.contains('Home').click()
        cy.contains(text).click( {force: true}) 
        
        cy.get('[data-test="transaction-description"]').should('include.text', text)
        cy.get('.MuiGrid-grid-xs-12').should('include.text', 'Arely Kertzmann')
        cy.get('.MuiGrid-grid-xs-12').should('include.text', '$5')
        cy.get('.MuiGrid-grid-xs-12').should('include.text', 'Edgar Johns')

        cy.get('.MuiIconButton-label .MuiSvgIcon-root').last().click()
        cy.get('.MuiGrid-root .MuiGrid-spacing-xs-2 .MuiGrid-align-items-xs-center').should('include.text', '1')
        cy.get('[placeholder="Write a comment..."]').type(text2).type('{enter}')
        cy.get ('[data-test="comments-list"]').should('include.text',text2)
        cy.get('[data-test="nav-top-notifications-count"]').click()
        cy.get('[data-test="notification-list-item-xKYxr-m2NG"]').should('include.text','Arely Kertzmann commented on a transaction.')
        cy.get('[data-test="notification-list-item-GgA5SdjMMk"]').should('include.text','Arely Kertzmann liked a transaction.')
    })
})