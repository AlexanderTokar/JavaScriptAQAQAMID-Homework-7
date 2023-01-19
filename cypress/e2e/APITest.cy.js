describe('API tests', () => {
    it('Should create new user', () => {
        cy.request({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/user/createWithArray',
            body: [
                {
                    id: 101,
                    username: 'Ivan',
                    firstName: 'Ivan',
                    lastName: 'Ivanov',
                    email: 'IvanIvanov@mail.ru',
                    password: '12345',
                    phone: '9991111111',
                    userStatus: 0,
                },
            ],
        }).then(response => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
        });
    });

    it('Should check user by username - positive', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/Ivan',
        }).then(response => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
        });
    });

    it('Should check user by username - negative', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/Petr',
            failOnStatusCode: false,
        }).then(({ status }) => {
            cy.log(status);
            expect(status).to.eq(404);
        });
    });

    it('Should update user data', () => {
        cy.request({
            method: 'PUT',
            url: 'https://petstore.swagger.io/v2/user/Ivan',
            body: {
                id: 101,
                username: 'Ivan',
                firstName: 'Ivan Ivanovich',
                lastName: 'Ivanov',
                email: 'IvanIvanov@mail.ru',
                password: '12345',
                phone: '9000000000',
                userStatus: 0,
            },
        }).then(response => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
        });
    });

    it('Should check user by username after updating user data', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/Ivan',
        }).then(response => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
        });
    });

    it('Should delete user by username', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://petstore.swagger.io/v2/user/Ivan',
        }).then(({ status }) => {
            cy.log(status);
            expect(status).to.eq(200);
        });
    });

    it('Should check user by username after deleting profile', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/Ivan',
            failOnStatusCode: false,
        }).then(({ status }) => {
            cy.log(status);
            expect(status).to.eq(404);
        });
    });
});
