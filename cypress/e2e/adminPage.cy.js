describe('Admin entry tests', () => {
    const admin = require('../fixtures/adminData.json');
    const fields = require('../fixtures/adminFields.json');

    it('Try to login with admin data - positive', () => {
        cy.visit(fields.address);
        cy.get(fields.login).first().type(admin[0].login).click();
        cy.get(fields.login).last().type(admin[0].password).click();
        cy.get(fields.accept).click();
        cy.contains('Управление залами').should('be.visible');
    });

    it('Try to login with admin data - negative', () => {
        cy.visit(fields.address);
        cy.get(fields.login).first().type(admin[1].login).click();
        cy.get(fields.login).last().type(admin[1].password).click();
        cy.get(fields.accept).click();
        cy.contains('Ошибка авторизации!').should('be.visible');
    });
});
