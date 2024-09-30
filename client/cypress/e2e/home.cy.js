describe('Home Page Tests', () => {
  //Check homepage
  it('Checks to see if the homepage has the required images', () => {
    cy.visit('http://localhost:5173/')
    
    cy.get('[data-test="bgimg"]').should('exist')
    cy.get('[data-test="peopleimg"]').should('exist')
  })

  it('Checks to see if the navbar has the required categories',()=>{
    cy.visit('http://localhost:5173/')

    cy.get('[data-test="navbar"]').within(()=>{
      cy.get('div').then($divs=>{
        const signup = $divs.toArray().some(div=>div.innerText.includes('Signup'))
        const login = $divs.toArray().some(div=>div.innerText.includes('Login'))
        const logout = $divs.toArray().some(div=>div.innerText.includes('Logout'))
        expect((signup&&login)||logout).to.be.true
      })
    })
  })
})

