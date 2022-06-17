
describe ("Testing Cypress realworld app", ()=> {
    
    it("User Login", function(){
        cy.intercept('GET','http://localhost:3001/notifications').as('userLoad')

        cy.login('Tavares_Barrows', 's3cret')
        cy.wait('@userLoad', {timeout: 10000})
        cy.get('[data-test="sidenav"]')
            .should('include.text', 'Tavares_Barrows')
            .and('be.visible')
        cy.contains('My Account').click()
        cy.get('[data-test="user-settings-firstName-input"]').should('have.value', "Arely")
        cy.get('[data-test="user-settings-lastName-input"]').should('have.value', 'Kertzmann')
        cy.get('[data-test="user-settings-email-input"]').should('have.value', 'Aniya_Powlowski36@hotmail.com')
        cy.get('[data-test="user-settings-phoneNumber-input"]').should('have.value', '537-041-4355')
        cy.contains('Bank Accounts').click()
        cy.get('[data-test="bankaccount-list-item-lWfxENA5ZNy"]').should('include.text', "Kshlerin - Ledner Bank")

    })
})