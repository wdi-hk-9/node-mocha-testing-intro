var should    = require("chai").should();
var expect    = require("chai").expect;
var supertest = require("supertest");

var api = supertest("http://localhost:3000")

// API TEST SUITE
describe("Candies", function(done){

  // TESTING GET /CANDIES
  describe("GET /candies", function(){

    it("should return a 200 response", function(){
      api.get("/candies")
      .set("Accept", "application/json")
      .expect(200, done)
    })

    it("should return an array", function(done){
      api.get("/candies")
      .set("Accept", "application/json")
      .end(function(error, response){
        expect(response.body).to.be.an('array');
        done()
      })
    })

    it("should return an object that have 'id', 'name' and 'color'", function(done){
      api.get("/candies")
      .set("Accept", "application/json")
      .end(function(error, response){
        var firstCandy = response.body[0];
        expect(firstCandy).to.have.all.keys('id', 'name', 'color');

        // expect().to.have.property('id');
        // expect(response.body[0]).to.have.property('name');
        // expect(response.body[0]).to.have.property('color');
        // expect(response.body[0]).not.to.have.property('fer');
        done()
      })
    })

    it("should return only 4 elements in the array", function(done){
      api.get("/candies")
      .set("Accept", "application/json")
      .end(function(error, response){
        expect(response.body.length).to.be.equal(4);
        done()
      })
    })
  })

  describe("POST /candies", function(){
    before(function(done){
      api.post("/candies")
      .set("Accept", "application/json")
      .send({
        "id": 5,
        "name": "Lollipop",
        "color": "Red"
      }).end(done)
    })

    it("should add a candy object to the collection candies and return it", function(done){
      api.get("/candies")
      .set("Accept", "application/json")
      .end(function(error, response){
        expect(response.body.length).to.equal(5);
        done()
      })
    })
  })

  describe("GET /candies/:id", function(){
    it("should return an object with the right fields", function(done){
      api.get("/candies/1")
      .set("Accept", "application/json")
      .end(function(error, response){
        expect(response.body).to.have.all.keys('id', 'name', 'color');
        done()
      })
    })
  })

  describe("DELETE /candies/:id", function(){
    it("should delete an object and return message", function(done){
      api.delete("/candies/1")
      .set("Accept", "application/json")
      .end(function(error, response){
        expect(response.body['message']).to.equal('deleted');
        done()
      })
    })
  })

  describe("PUT /candies/:id", function(){
    before(function(done){
      api.put("/candies/2/edit")
      .set("Accept", "application/json")
      .send({
        id:  2,
        name:  "NEW_NAME",
        color: "NEW_COLOR"
      }).end(done)
    })

    it("should update an object", function(done){
      api.get("/candies/2")
      .set("Accept", "application/json")
      .end(function(error, response){
        expect(response.body['name']).to.equal('NEW_NAME');
        expect(response.body['color']).to.equal('NEW_COLOR');
        done()
      })
    })
  })
})
