const request = require('supertest')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
//made the mistake 
const app = require('../app')
const server = app.listen("8080", () => {
    console.log('listening at port 8080')
})

const Todo = require('../models/todo')

let mongoServer 

beforeAll(async() => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(),{ useNewUrlParser: true, useUnifiedTopology: true } )
})

afterAll(async() => {
   await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

// afterAll((done) => done()) // which code is run first 

const item  = new Todo({title: "title1",description: "wwwww", completed:true, created_at: "2024-01-13"})
item.save()

const item3  = new Todo({title: "title3", description: "wwwww", completed:true, created_at: "2024-01-13"})
item3.save()

const item5  = new Todo({title: "title5", description: "aaa", completed:true, created_at: "2024-01-13"})
item5.save()





//Install MongoDB Memory Server Jest and Supertest.
// Write unit tests for each of your API endpoints. Your tests should cover both successful cases and edge cases such as invalid inputs or todo item not found.
// Run your tests and make sure all of them pass.
describe("It will test the todo routes", () => {
    
    test("It should create a new todo item", async () => { 
      
      const response = await request(app).post("/todos").send({title: "title1", description: "wwwww", completed:"true", created_at: "2024-01-11"})

      expect(response.statusCode).toBe(200)
      expect(response.body.title).toEqual("title1")
      expect(response.body.completed).toEqual(true)
    })

    test("It should show the todo items", async () => {
        const item1 = Todo.create({title: "title1",description: "wwwww", completed:"true", created_at: "2024-01-11"})
        const item2  = Todo.create({title: "title2",description: "wwwww", completed:"true", created_at: "2024-01-11"})
        const item3  = Todo.create({title: "title3",description: "wwwww", completed:"true", created_at: "2024-01-11"})
     
        const response =await request(app).get('/todos')
        expect(response.statusCode).toBe(200)
    
    })

    test('it should update the todo item', async() => {
        // const item = new Todo({title: "title1", completed:"true", created_at: "2024-01-11"})
        // item.save()

    
        const response = await request(app).put(`/todos/${item3._id}`).send({title: "title2", description: "aaaaa",completed:false,  created_at:"2024-01-13"})
        expect(response.statusCode).toBe(200)
        expect(response.body.completed).toEqual(false)

    })

    test('It should show a specific item', async() => {
        //const item  = Todo.create({title: "title1",description: "wwwww", completed:true, created_at: "2024-01-13"})
        const response = await request(app).get(`/todos/${item._id}`)
        // expect(response.statusCode).toBe(200)
        expect(response.body.completed).toEqual(true)
        expect(response.body.title).toEqual("title1")
       
    })

    test("it should delete a item", async() => {
       


        const response = await request(app).delete(`/todos/${item5._id}`)

        // expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('item deleted')
    })

})



