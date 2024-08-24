describe('White paper UI Testing spec', () => {
  it('throws validation errors when email is not populated', () => {
    cy.visit('https://www.kurtosys.com/')

    cy.screenshot('Homepage')

    // Click on the specific element to open the dropdown
    cy.get('#kurtosys-toggle-control-4693 .kurtosys-toggle__label-icon.kurtosys-toggle-icon-position-left').click({ force: true })

    // Navigate to the Insights drop down

    cy.get('.kurtosys-toggle__label-text').contains('Insights').click({ force: true })

    // Click on the "White Papers & eBooks" option within the drop down
    cy.get('.elementor-icon-list-text').contains('White Papers & eBooks').click({ force: true })

    // Wait for the page to load and verify that the url is correct
    cy.url().should('include', '/white-papers')

    // Take a screenshot
    cy.screenshot('White papers page')

    // Click on the "UTITS White Paper" link
    cy.get('a[href="https://www.kurtosys.com/white-papers/eu-rule-change-bolsters-need-for-fast-localized-fund-website-platforms-2/"]').click({ force: true })

    // Wait for the page to load
    cy.url().should('include', '/eu-rule-change-bolsters-need-for-fast-localized-fund-website-platforms-2')

    cy.screenshot('UTITS White Paper page')

    // Accept cookies to have a full view to the page
    cy.get('#onetrust-accept-btn-handler').click({ force: true })

    // Switch to the iframe context
    cy.getIframeBody('iframe.optanon-category-C0002').within(() => {
    
    // Entering first name
    cy.get('#18882_231669pi_18882_231669').type('John')

    // Entering last name
    cy.get('#18882_231671pi_18882_231671').type('Smith')

    // Entering company
    cy.get('#18882_231675pi_18882_231675').type('Kurtosys Company')

    // Entering industry
    cy.get('#18882_231677pi_18882_231677').type('Technology')

    // Click the "Send me a copy" button without entering an email address
    cy.get('input[type="submit"][value="Send me a copy"]').click({ force: true })
  })

  // Wait for the validation message to appear
  cy.get('input:invalid').then(($invalidInputs) => {
    if ($invalidInputs.length > 0) {
      // Take a screenshot of the validation message
      cy.screenshot('send-me-a-copy-validation-error')
    }
  })
     // Verify the validation error message
     cy.getIframeBody('iframe.optanon-category-C0002').within(() => {
      cy.get('p.error.no-label').should('contain.text', 'This field is required')
    })

  // Capture and log all the text that pops up (this helps when troubleshooting)
  cy.get('body').then(($body) => {
    const text = $body.text()
    cy.log(text)
   })
  })
})