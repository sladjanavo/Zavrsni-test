
/// <reference types="Cypress" />
const Locators = require("../fixtures/Locators.json")

describe("Testovi za My Gradebook",()=>{

    let correctEmail = "test9@gmail.com"
    let correctPassword = "12345678"
    let studentFirstName = "Donald"
    let studentLastName = "Dakic"
    let imageUrl = "https://pngimg.com/uploads/girls/girls_PNG6491.png"
    let secondTitle = "1"
    let comment = "Pozdrav Dacho!"

    beforeEach("Login user",()=>{
        cy.login(correctEmail, correctPassword)
        cy.url().should("contains","/gradebooks")
        cy.get(Locators.MyGradebook.MyGradebookbtn).eq(1).click()
        cy.wait(2000)
    
    })

it("Add Student",()=>{
    cy.get(Locators.MyGradebook.AddStudent).eq(0).click()
    cy.get(Locators.MyGradebook.StudentFirstName).type(studentFirstName)
    cy.get(Locators.MyGradebook.StudentLastName).type(studentLastName)
    cy.get(Locators.MyGradebook.AddImage).eq(0).click()
    cy.get(Locators.MyGradebook.ImageUrl).eq(2).type(imageUrl)
    cy.get(Locators.MyGradebook.Submit).eq(4).click()
    cy.get("td").should("be.visible").and("contain","Donald Dakic")


})


it("Add Student without first name",()=>{
    cy.get(Locators.MyGradebook.AddStudent).eq(0).click()
    cy.get(Locators.MyGradebook.StudentLastName).type(studentLastName)
    cy.get(Locators.MyGradebook.AddImage).eq(0).click()
    cy.get(Locators.MyGradebook.ImageUrl).eq(2).type(imageUrl)
    cy.get(Locators.MyGradebook.Submit).eq(4).click()
    cy.url().should("contain","/add-student")

})

it("Add Student without image",()=>{
    cy.get(Locators.MyGradebook.AddStudent).eq(0).click()
    cy.get(Locators.MyGradebook.StudentFirstName).type(studentFirstName)
    cy.get(Locators.MyGradebook.StudentLastName).type(studentLastName)
    cy.get(Locators.MyGradebook.Submit).eq(1).click()
    cy.url().should("contain","/single-gradebook")
    cy.get("td").should("be.visible").and("contain","Donald Dakic")

})

it("Edit My Gradebook, change title",()=>{
    cy.get(Locators.MyGradebook.AddStudent).eq(2).click()
    cy.get(Locators.MyGradebook.Title).type(secondTitle)
    cy.get(Locators.MyGradebook.Submit).click()
    cy.url().should("contain","/gradebooks")
    cy.get(Locators.MyGradebook.MyGradebookbtn).eq(1).click()
    cy.wait(2000)
    cy.get(Locators.MyGradebook.NewTitle).should("be.visible").and("contain","Teester1")
    

   

})

it("Add comment",()=>{
    cy.get(Locators.MyGradebook.Comments).type(comment)
    cy.get(Locators.MyGradebook.Submit).contains("Submit Comment").click()
    cy.get(Locators.MyGradebook.MyGradebookbtn).eq(0).click()
    cy.wait(2000)
    cy.get(Locators.MyGradebook.MyGradebookbtn).eq(1).click()
    cy.get(Locators.MyGradebook.AllComments).should("be.visible")
    cy.url().should("contain","/my-gradebook")
})

















})