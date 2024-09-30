describe('Check if the login and signup forms work',()=>{
    it('Checks if the signup form works',()=>{
        cy.visit('http://localhost:5173/signup')

        cy.get('[data-test="signup-form"]').within(()=>{
            //Get the username, password, and email
            cy.get('[data-test="username"]').type('adi')
            cy.get('[data-test="password"]').type('adi')
            cy.get('[data-test="email"]').type('adi')
            //Get the submit button
            cy.get('button')
        })
    })

    it('Checks if the login form works',()=>{
        cy.visit('http://localhost:5173/login')

        cy.get('[data-test="login-form"]').within(()=>{
            //Get the username, password, and email
            cy.get('[data-test="username"]').type('test')
            cy.get('[data-test="password"]').type('pass')
            //Get the submit button
            cy.get('button').click()
        })
    })
})