
/// <reference types="Cypress" />
const Locators = require("../fixtures/Locators.json")


describe("Testovi za login",()=>{

    let correctEmail = "test9@gmail.com"
    let correctPassword = "12345678"
    let invalidEmail = "test9gmail.com"
    let incorrectPassword = "aaaaaaaa"

    beforeEach("visit login page",()=>{
        cy.visit("/")
        cy.url().should("contains","/login")
    })

    it("Login with valid data",()=>{

        cy.get(Locators.Login.Email).eq(0).type(correctEmail)
        cy.get(Locators.Login.Password).eq(1).type(correctPassword)
        cy.get(Locators.Login.Submit).click()
        cy.url().should("contains","/gradebooks")
        cy.get(Locators.Gradebooks.BigTitle).should("be.visible")

    })

    it("Login without email",()=>{
        cy.get(Locators.Login.Password).eq(1).type(correctPassword)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Email).eq(0).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
        cy.url().should("contains","/login")
    })

    it("Login with invalid email",()=>{
        cy.get(Locators.Login.Email).eq(0).type(invalidEmail)
        cy.get(Locators.Login.Password).eq(1).type(correctPassword)
        cy.get(Locators.Login.Submit).click()
        cy.url().should("contains","/login")
        cy.get(Locators.Login.Title).should("be.visible").and("have.text", "Please login")
    })

    it("Login with incorrect password",()=>{
        cy.get(Locators.Login.Email).eq(0).type(correctEmail)
        cy.get(Locators.Login.Password).eq(1).type(incorrectPassword)
        cy.get(Locators.Login.Submit).click()
        cy.url().should("contains","/login")
        cy.get(Locators.Login.Title).should("be.visible").and("have.text", "Please login")
    })

    it("Login without password",()=>{
        cy.get(Locators.Login.Email).eq(0).type(correctEmail)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Password).eq(1).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })

    it("Signout",()=>{

    cy.get(Locators.Login.Email).eq(0).type(correctEmail)
    cy.get(Locators.Login.Password).eq(1).type(correctPassword)
    cy.get(Locators.Login.Submit).click()
    cy.url().should("contains","/gradebooks")
    cy.get(Locators.Gradebooks.Signout).eq(2).click()
    cy.url().should("contains","/login")
    })
    
    
    
   





















})
