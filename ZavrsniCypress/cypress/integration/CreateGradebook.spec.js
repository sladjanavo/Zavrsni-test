/// <reference types="cypress"/>
const Locators=require("../fixtures/Locators.json")

describe("Testovi za Create Gradebook Page",()=>{

    let correctEmail = "test9@gmail.com"
    let correctPassword = "12345678"
    let title1 = "Duck7"
    
    
    beforeEach("Login user",()=>{
        cy.login(correctEmail, correctPassword)
        cy.url().should("contains","/gradebooks")
         cy.get(Locators.CreateGradebook.CreateGradebookbtn).eq(2).click()
    })

    it("Create Gradebook without professor",()=>{
       cy.get(Locators.CreateGradebook.Title).type(title1)
       cy.get(Locators.CreateGradebook.Submit).click()
       cy.get(".alert").should("contain","Message: The given data was invalid.")
       cy.url().should("contain","/create-gradebook")
        

    })

    it("Create Gradebook without title",()=>{

       
       cy.get(Locators.Professors.Professorsbtn).eq(3).click()
       cy.get('select > option').eq(3).then(element => cy.get('select').select(element.val()))
       cy.get(Locators.CreateGradebook.Submit).click()
       cy.get(".alert").should("contain","Message: The given data was invalid.")
       cy.get(Locators.CreateGradebook.BigTitle).should("be.visible").and("have.text","Create Gradebook Page")      
       
    })

    it("Create gradebook successfully",()=>{
        cy.get(Locators.CreateGradebook.Title).type(title1)
        cy.get('select > option').eq(0).then(element => cy.get('select').select(element.val()))
        cy.get(Locators.CreateGradebook.Submit).click()
        cy.url().should("contain","gradebooks")
        


    })




















})