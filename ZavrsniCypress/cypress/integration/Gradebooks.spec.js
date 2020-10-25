/// <reference types="cypress"/>
const Locators = require("../fixtures/Locators.json")


describe("Testovi za Gradebooks",()=>{

    let correctEmail = "test9@gmail.com"
    let correctPassword ="12345678"
    let gradebook = "Duck71"
    let studentFirstName = "Petar"
    let studentLastName = "Petrovic"
    let editTitle = "5"
    let comment = "Hello!"

beforeEach("Login user",()=>{
    cy.login(correctEmail, correctPassword)
    cy.url().should("contains","/gradebooks")

})

it("Filter",()=>{
    cy.get(Locators.Gradebooks.Filter).type(gradebook)
    cy.get(Locators.Gradebooks.Search).contains("Search").click()
    cy.get(".table").contains("Duck71").should("be.visible").and("contain","Duck71")
})

it("Add student on other user's gradebook",()=>{
    cy.get(Locators.Gradebooks.Filter).type(gradebook)
    cy.get(Locators.Gradebooks.Search).contains("Search").click()
    cy.get(".table").contains("Duck71").click()
    cy.get(Locators.Gradebooks.AddStudent).contains("Add Student").click()
    cy.get(Locators.Gradebooks.StudentFirstName).type(studentFirstName)
    cy.get(Locators.Gradebooks.StudentLastName).type(studentLastName)
    cy.get(Locators.Gradebooks.Submit).eq(1).click()
    cy.get(".alert").should("contain","Message: Unauthorized user!")
   
})

it("Edit other user's gradebook",()=>{
    cy.get(Locators.Gradebooks.Filter).type(gradebook)
    cy.get(Locators.Gradebooks.Search).contains("Search").click()
    cy.get(".table").contains("Duck71").click()
    cy.wait(2000)
    cy.get(Locators.Gradebooks.EditGradebook).contains("Edit Gradebook").click()
    cy.get(Locators.Gradebooks.Title).type(editTitle)
    cy.get(Locators.Gradebooks.Submit).contains("Submit").click()
    cy.url().should("contain","/gradebooks")
    cy.get(Locators.Gradebooks.Filter).type(gradebook)
    cy.get(Locators.Gradebooks.Search).contains("Search").click()
    cy.get(".table").contains("Duck71").click()
    cy.get(Locators.Gradebooks.NewTitle).should("be.visible")
    cy.get(".alert").should("contain","Message: Unauthorized user!")
    
   

})


it("Add comment",()=>{
    cy.get(Locators.Gradebooks.Filter).type(gradebook)
    cy.get(Locators.Gradebooks.Search).contains("Search").click()
    cy.get(".table").contains("Duck71").click()
    cy.get(Locators.Gradebooks.Comments).type(comment)
    cy.get(Locators.Gradebooks.Submit).contains("Submit Comment").click()
    cy.get(Locators.Gradebooks.AllComments).should("be.visible").and("contain","Hello")
    
})

it("Delete comment",()=>{
    cy.get(Locators.Gradebooks.Filter).type(gradebook)
    cy.get(Locators.Gradebooks.Search).contains("Search").click()
    cy.get(".table").contains("Duck71").click()
    cy.get(Locators.Gradebooks.AllComments).contains("Delete").click()
    cy.get(Locators.Gradebooks.AllComments).should("not.be.visible")
    
})





it("Paginacija",()=>{
    cy.get(Locators.Gradebooks.Next).contains("Next").click()
    cy.expect('.table').to.have.length.of.at.most(10)
    cy.get(Locators.Gradebooks.Previous).contains("Next").click()
    cy.expect('.table').to.have.length.of.at.most(10)
})


















})