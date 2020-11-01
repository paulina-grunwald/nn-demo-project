describe('start app', () => {
    it('the app starts correctly', () => {
        cy.visit('/')
    })
})

describe('New post form test', () => {
    it('Can fill the form', () => {
        const user = cy
        cy.visit('/')
            .get('.PostEditor__title')
            .type('This is message')
            .get('.PostEditor__title')
            .type('this is super cool post')
            .get('.PostEditor')
            .submit()
    })
})
