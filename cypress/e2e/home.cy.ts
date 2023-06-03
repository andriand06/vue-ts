// https://on.cypress.io/api

describe('Home View Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('visits the app root url', () => {
    cy.getByData('toggle-btn').contains('Toggle Hello World').click()
    cy.contains('h1', 'Hello!')
    cy.contains('h1', 'Bonjour!')
    cy.contains('button', 'Counter')
  })
  it('show correct component when click any button in Example Application Practice', () => {
    cy.getByData('counter-btn').click()
    cy.contains('button', 'Increment')

    cy.getByData('crud-btn').click()
    cy.contains('button', 'Create')

    cy.getByData('converter-btn').click()
    cy.get(':nth-child(4) > .ant-form-item-label > label').contains('Fahrenheit')

    cy.getByData('flight-btn').click()
    cy.contains('button', 'Book')
  })
})
