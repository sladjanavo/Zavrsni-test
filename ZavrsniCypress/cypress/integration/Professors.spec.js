/// <reference types = "cypress"/>
const Locators = require("../fixtures/Locators.json")

describe("Testovi za stranicu Profesori",()=>{


    let correctEmail = "test9@gmail.com"
    let correctPassword = "12345678"
    let profFirstName = "Sladjana9"
    let profLastName = "Vojnovic9"
    let profImage1 = "https://i.stack.imgur.com/ILTQq.png"
    let profImage2 = "https://w7.pngwing.com/pngs/338/339/png-transparent-homer-simpson-homer-simpson-bart-simpson-marge-simpson-lisa-simpson-television-show-simpsons-television-heroes-simpsons-movie-thumbnail.png"
    let profImage3 = "https://www.online-image-editor.com/styles/2019/images/power_girl.png"
    let invalidImageFormat = "https://w0.pngwave.com/png/252/880/hedgehog-cartoon-illustration-cartoon-hedgehog-png-clip-art.pn"
    let filter = "sla"
    let profFirstName2 = "Sheldon"
    let profLastName2 = "Cooper"


    beforeEach("Login user",()=>{
        cy.login(correctEmail, correctPassword)
        cy.url().should("contains","/gradebooks")
        cy.get(Locators.Professors.Professorsbtn).eq(3).click()
        
    })



    it("View list of all professors",()=>{
        
        cy.get(Locators.Professors.AllProfessors).eq(0).click()
        cy.get(Locators.Professors.Title).should("be.visible").and("have.text","All Professors Page")
    })
   
    it("Create professor without image",()=>{
        cy.get(Locators.Professors.CreateProfessors).eq(1).click()
        cy.get(Locators.Professors.FirstName).type(profFirstName)
        cy.get(Locators.Professors.LastName).type(profLastName)
        cy.get(Locators.Professors.Submit).eq(1).click()
        cy.get(".alert").should("contain","Message: The given data was invalid.")
        cy.url().should("contains","/create-professor")
    })

    it("Create professor without first name",()=>{
        cy.get(Locators.Professors.CreateProfessors).eq(1).click()
        cy.get(Locators.Professors.LastName).type(profLastName)
        cy.get(Locators.Professors.AddImage).eq(0).click()
        cy.get(Locators.Professors.ImageUrl).type(profImage1)
        cy.get(Locators.Professors.Submit).eq(4).click()
        cy.get(Locators.Professors.FirstName).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
        cy.url().should("contains","/create-professor")
        
    })

    it("Move image down, up and remove",()=>{
        cy.get(Locators.Professors.CreateProfessors).eq(1).click()
        cy.get(Locators.Professors.FirstName).type(profFirstName)
        cy.get(Locators.Professors.LastName).type(profLastName)
        cy.get(Locators.Professors.AddImage).eq(0).click()
        cy.get(Locators.Professors.ImageUrl).type(profImage1)
        cy.get(Locators.Professors.AddImage).eq(0).click()
        cy.get(Locators.Professors.ImageUrl).eq(1).type(profImage2)
        cy.get(Locators.Professors.AddImage).eq(0).click()
        cy.get(Locators.Professors.ImageUrl).eq(2).type(profImage3)
        cy.get(Locators.Professors.MoveDown).eq(3).click()
        cy.get(Locators.Professors.MoveUp).eq(5).click()
        cy.get(Locators.Professors.RemoveImage).eq(4).click()
        cy.get(Locators.Professors.Submit).eq(7).click()
        cy.url().should("contain","/all-professors")
        cy.get(Locators.Professors.Title).should("be.visible").and("have.text","All Professors Page")
    })

    it("Create professor with invalid image format",()=>{
        cy.get(Locators.Professors.CreateProfessors).eq(1).click()
        cy.get(Locators.Professors.FirstName).type(profFirstName)
        cy.get(Locators.Professors.LastName).type(profLastName)
        cy.get(Locators.Professors.AddImage).eq(0).click()
        cy.get(Locators.Professors.ImageUrl).type(invalidImageFormat)
        cy.get(Locators.Professors.Submit).eq(4).click()
        cy.url().should("contain","/all-professors")
    })

    it("Create professor successfully",()=>{
        cy.get(Locators.Professors.CreateProfessors).eq(1).click()
        cy.get(Locators.Professors.FirstName).type(profFirstName2)
        cy.get(Locators.Professors.LastName).type(profLastName2)
        cy.get(Locators.Professors.AddImage).eq(0).click()
        cy.get(Locators.Professors.ImageUrl).type(profImage3)
        cy.get(Locators.Professors.Submit).eq(4).click()
        cy.url().should("contain","/all-professors")
    })

    it("Search in filter",()=>{
        cy.get(Locators.Professors.AllProfessors).eq(0).click()
        cy.get(Locators.Professors.Filter).type(filter)
        cy.get(".table").should("be.visible")
        
    })























})