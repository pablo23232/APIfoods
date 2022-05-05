const request = require("supertest");

const app = require("../App");

describe("Testing el get", () => {
    test("get /todos", () =>{
        return request(app)
          .get("/todos")
          .expect(200)
    });
});

describe("Testing el post", () => {
    test("post /todos", () =>{
        return request(app)
          .post("/todos")
          .send({
            id: 1,
            name: "prueba"
           })
           .expect(201)
    });
    test("post /todos", () =>{
        return request(app)
          .post("/todos")
          .send({
            id: 1,
            name: "prueba"
           })
           .expect(409)
    });
    test("post /todos", () =>{
        return request(app)
          .post("/todos")
          .send({
            name: "prueba"
           })
           .expect(400)
    });
    test("post /todos", () =>{
      return request(app)
        .post("/todos")
        .send({
          id:"2",
          name: "prueba"
         })
         .expect(400)
  });
});

describe("Testing el put", () => {
    test("put /todos/:id", () =>{
        return request(app)
          .put(`/todos/1`)
          .send({
            id: 1,
            name: "prueba2"
           })
           .expect(200)
    });
    test("put /todos/:id", () =>{
      return request(app)
        .put("/todos/")
        .send({
          id: 1,
          name: "prueba2"
         })
         .expect(404)
  });
    test("put /todos/:id", () =>{
        return request(app)
          .put("/todos/1")
          .send({
            name: "prueba2"
           })
           .expect(400)
    });
});

describe("Testing el delete", () => {
    test("delete /todos/:id", () =>{
        return request(app)
          .delete(`/todos/7`)
          .expect(404)
    });
    test("post /todos", () =>{
      return request(app)
        .post("/todos")
        .send({
          id: 7,
          name: "prueba"
         })
         .expect(201)
  });
    test("delete /todos/:id", () =>{
      return request(app)
        .delete(`/todos/7`)
        .expect(200)
  });
    test("delete /todos/", () =>{
      return request(app)
        .delete(`/todos/`)
        .expect(404)
  });
});

describe("Testing el get by id", () => {
    test("get /todos/:id", () =>{
        return request(app)
          .get("/todos/5")
          .expect(404)
    });
    test("post /todos", () =>{
      return request(app)
        .post("/todos")
        .send({
          id: 5,
          name: "prueba"
         })
         .expect(201)
  });
    test("get /todos/:id", () =>{
      return request(app)
        .get("/todos/5")
        .expect(200)
  });
});
