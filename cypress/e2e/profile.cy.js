describe('Profile', () => {
  it('shows the profile name', () => {
    cy.intercept('GET', '/users/*').as('getUser')
    cy.intercept('GET', '/users/**/friends').as('getFriends')

    cy.visit('/')
    cy.wait('@getUser')
    cy.wait('@getFriends')

    cy.contains('Juntao Qiu').should('be.visible')
  })
})
