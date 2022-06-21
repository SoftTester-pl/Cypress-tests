const { Chance } = require("chance")
const firstName = chance.first()
const lastName = chance.last()
const userName = chance.name()
const bankName = chance.company()
const bankRoutingNO = chance.ssn({ ssnNine: true, dashes: false })
const accountNO = chance.natural({min: 0, max: 999999999999})

describe ('Testing Cypress Realworld App', ()=>{
    
    it('User sign-up and Login', function(){
        cy.intercept('POST', 'http://localhost:3001/users').as('userLoad')
        cy.intercept('POST', 'http://localhost:3001/graphql').as('graphLoad')

        cy.get('[data-test="signup"]').click()
        cy.get('#firstName').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('#username').type(userName)
        cy.get('#password').type('s3cr3t')
        cy.get('#confirmPassword').type('s3cr3t')
        cy.get('.MuiButton-label').click()
    
        cy.wait('@userLoad')
        cy.get('#username').type(userName)
        cy.get('#password').type('s3cr3t')
        cy.get('[data-test="signin-submit"]').click()
       
        cy.get('[data-test="user-onboarding-dialog-title"]')
            .should('include.text','Get Started with Real World App')
            .and('be.visible')
        cy.get('.MuiBox-root')
            .should('include.text','Real World App requires a Bank Account to perform transactions.','Click Next to begin setup of your Bank Account.')
            .and('be.visible')
        
        cy.get('[data-test="user-onboarding-next"]').click()
        cy.get('#bankaccount-bankName-input').type(bankName)
        cy.get('#bankaccount-routingNumber-input').type(bankRoutingNO)
        cy.get('#bankaccount-accountNumber-input').type(accountNO)
        cy.get('[data-test="bankaccount-submit"]').click()
        cy.wait('@graphLoad')
        
        cy.get('.MuiBox-root')
            .should('include.text',"You're all set!","We're excited to have you aboard the Real World App!")
            .and('be.visible')
        
        cy.get('[data-test="user-onboarding-next"]').click()
        cy.get('[data-test="sidenav-user-settings"]').click()
        
        cy.get('#user-settings-firstName-input').should('have.value',firstName)
        cy.get('#user-settings-lastName-input').should('have.value',lastName)
        
        cy.contains('Bank Accounts').click()
        cy.get('[data-test="bankaccount-list"]').should('have.text',bankName + ' Delete')

    })
})