
describe('Initial Page', () => {
  beforeEach(() => {
    cy.fixture('mockChampions.json')
    .then(champData => {
        cy.intercept('GET', 'http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion.json', {
            statusCode: 200,
            body: champData
        })
    })
    cy.visit('http://localhost:3000/')
  })

  it('Should display all champions on page load', () => {
    cy.get('.card-container')
    .children()
    .should('have.length', 6)
  })

  it('Should be able to click on a card to view more details', () => {

    cy.get('#Amumu').click()
    .get('h2').contains('Amumu')
  })

})

describe('Recommend Form', () => {
  beforeEach(() => {
    cy.fixture('mockChampions.json')
    .then(champData => {
        cy.intercept('GET', 'http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion.json', {
            statusCode: 200,
            body: champData
        })
    })
  })

  it('Should be able to access it from the home page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.recommend-button').click()
    .get('h1').contains('Recommend Me A Champion')
  })

  it('Should get a recommended character after choosing specific options', () => {
    cy.get('#submitButton').click()
    .get('a')
  })

  describe('Sad Path', () => {

    it('Should show appropriate message if fetching data fails', () => {
      cy.intercept({
        method: 'GET',
        url: 'http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion.json'
      },
        {
          statusCode: 500,
          body:''
        });
        cy.visit('http://localhost:3000/')
      cy.get('h1').contains('Error loading champions. Please try refreshing the page')
    })

    it('Should show appropriate message user goes to a URL that doesn\'t exist', () => {
      cy.intercept({
        method: 'GET',
        url: 'http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion.json'
      },
        {
          statusCode: 500,
          body:''
        });
        cy.visit('http://localhost:3000/bruh')
      cy.get('h1').contains('Champion does not exist')
    })

    it('Should show appropriate message if the recommended champion does not exist', () => {
      cy.intercept({
        method: 'GET',
        url: 'http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion.json'
      },
        {
          statusCode: 500,
          body:''
        });
        cy.visit('http://localhost:3000/')
        cy.get('.recommend-button').click()
    
    })

  })

})