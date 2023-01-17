describe('Movie tickets tests', () => {
    it('First test - positive', async () => {
        cy.visit('qamid.tmweb.ru');
        cy.get('.page-nav__day').should('have.length', 7);
    });
});
