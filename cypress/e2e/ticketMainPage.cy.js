const movie = require('../fixtures/bookingData.json');
const seats = require('../fixtures/seats.json');
const days = require('../fixtures/days.json');

describe('Main page', () => {
    it.skip('Should open main page', async () => {
        cy.visit(movie.address);
        cy.get(movie.header).contains('Идём');
        cy.get(days[0].day).should('be.visible');
    });
});

describe('Movie tickets tests', () => {
    let randomDay;
    let randomSeat;

    beforeEach(() => {
        randomDay = [Math.floor(Math.random() * days.length)];
        cy.visit(movie.address);
        cy.get(days[randomDay].day).click();
        cy.get(movie.film).first().contains('23:45').click();
    });

    it('First test (should book one ticket) - positive', async () => {
        cy.get(seats[0].seat).click();
        cy.get(movie.accept, { timeout: 10000 }).click();
        cy.contains('Вы выбрали билеты:').should('be.visible');
    });

    it.skip('Second test (should book two tickets) - positive', async () => {
        cy.get(seats[2].seat).click();
        cy.get(seats[3].seat).click();
        cy.get(movie.accept, { timeout: 10000 }).click();
        cy.contains('Вы выбрали билеты:').should('be.visible');
    });

    it.skip('Third test (should not book ticket chosen twice) - negative', async () => {
        cy.get(seats[4].seat).click();
        cy.get(seats[4].seat).click();
        cy.get(movie.accept).should('be.visible');
    });

    it.skip('Fourth test (should not select non active time) - negative', async () => {
        cy.visit(movie.address);
        cy.get(days[0].day).click();
        cy.get(movie.filmNonActive).should('be.visible');
    });
});
