
/// <reference types="Cypress" />
const Locators = require("../fixtures/Locators.json")
import faker from 'faker'

describe("Testovi za register",()=>{

    const email = faker.internet.email();
       
     let correctEmail = "test9@gmail.com"
     let correctPassword = "12345678"
     let correctPassConfirm = "12345678"
     let firstName = "Sladjana9"
     let lastName = "Vojnovic9"
     let incorrectEmail = "test9gmail.com"
     let incorrectPassword = "123456"
     let incorrectpasswordConfirm = "aaaaaaaa"
     
    beforeEach("visit register page",()=>{
        cy.visit("/")
        cy.get(Locators.Headers.Register).eq(1).click()
        cy.url().should("contains","/register")
    })

    it("Register with valid data",()=>{

        
        cy.get(Locators.Register.FirstName).type(firstName)
        cy.get(Locators.Register.LastName).type(lastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConfirm).type(correctPassConfirm)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Checkbox).click()
        cy.get(Locators.Register.Submit).click()
        cy.wait(2000)
        cy.url().should("contains","/gradebooks")
        cy.get(Locators.Gradebooks.BigTitle).should("be.visible")
       
  
})

it("Register with invalid email",()=>{
        cy.get(Locators.Register.FirstName).type(firstName)
        cy.get(Locators.Register.LastName).type(lastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConfirm).type(correctPassConfirm)
        cy.get(Locators.Register.Email).type(incorrectEmail)
        cy.get(Locators.Register.Checkbox).click()
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Email).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please include an '@' in the email address. 'test9gmail.com' is missing an '@'.")
        })
})

it("Register without email",()=>{
    cy.get(Locators.Register.FirstName).type(firstName)
    cy.get(Locators.Register.LastName).type(lastName)
    cy.get(Locators.Register.Password).type(correctPassword)
    cy.get(Locators.Register.PasswordConfirm).type(correctPassConfirm)
    cy.get(Locators.Register.Checkbox).click()
    cy.get(Locators.Register.Submit).click()
    cy.get(Locators.Register.Email).then(($input)=>{
        expect($input[0].validationMessage).to.eq("Please fill out this field.")
    })
    cy.url().should("contains","/register")

})

it("Register with incorrect password",()=>{
    cy.get(Locators.Register.FirstName).type(firstName)
    cy.get(Locators.Register.LastName).type(lastName)
    cy.get(Locators.Register.Password).type(incorrectPassword)
    cy.get(Locators.Register.PasswordConfirm).type(correctPassConfirm)
    cy.get(Locators.Register.Email).type(correctEmail)
    cy.get(Locators.Register.Checkbox).click()
    cy.get(Locators.Register.Submit).click()
    cy.get(Locators.Register.Password).then(($input)=>{
        expect($input[0].validationMessage).to.eq("Please match the requested format.")
    })
})

it("Register with incorrect password confirmation",()=>{
    
    cy.get(Locators.Register.FirstName).type(firstName)
    cy.get(Locators.Register.LastName).type(lastName)
    cy.get(Locators.Register.Password).type(correctPassword)
    cy.get(Locators.Register.PasswordConfirm).type(incorrectpasswordConfirm)
    cy.get(Locators.Register.Email).type(correctEmail)
    cy.get(Locators.Register.Checkbox).click()
    cy.get(Locators.Register.Submit).click()
    cy.on("window:alert",(txt)=>{
        expect(txt).to.contains("Your passwords doesn`t match, try again, please");
    })
    cy.url().should("contains","/register")

    
})






































})