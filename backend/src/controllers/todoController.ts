import { error } from "console";
import { Connection } from "../SQL/Connection";
import { Query } from "../SQL/Queries";
import { response } from "express";
import { promises } from "dns";
interface Schema
{
    id?:number,
    status:string,
    text:string
}

export class TodoController
{
    private connection:Connection = new Connection();
    private queries:Query = new Query();

    public getAllTodos(contexValue:any):Promise<Schema[]>
    {
        return new Promise((resolve, reject) => {
            this.connection.createConnection.query(this.queries.selectAllQuery,[contexValue.auth.id],(error:Error|null, response:any)=>
            {
                if (error) return reject(error);
                return resolve(response)
            })
        }) 
    }

    public getTodoById(arg:any, contexValue:any):Promise<Schema[]>
    {
        return new Promise((resolve, reject) => {
            this.connection.createConnection.query(this.queries.selectByIdQuery,[arg.id, contexValue.auth.id],(error:Error|null, response:any)=>
            {
                if (error) return reject(error);
                return resolve(response)
            })
        }) 
    }

    public postTodo(arg:any, contexValue:any):Promise<Schema>
    {
        const initialStatusState:String = "not done"
        return new Promise((resolve, reject) => {
            this.connection.createConnection.query(this.queries.insertTodoQuery,[initialStatusState,arg.text, contexValue.auth.id],(error:Error|null, response:any)=>
            {
                if (error) return reject(error);
                return resolve(response)
            })
        }) 
    }

    public updateStatusTodoById(arg:any, contexValue:any):Promise<void>
    {
        return new Promise((resolve, reject) => {
            this.connection.createConnection.query(this.queries.updateStatusQuery,[arg.status, arg.id, contexValue.auth.id],(error:Error|null, response:any)=>
            {
                if (error) return reject(error);
                return resolve(response)
            })
        }) 
    }

    public updateTextTodoById(arg:any, contexValue:any):Promise<void>
    {
        return new Promise((resolve, reject) => {
            this.connection.createConnection.query(this.queries.updateTextQuery,[arg.text, arg.id, contexValue.auth.id],(error:Error|null, response:any)=>
            {
                if (error) return reject(error);
                return resolve(response)
            })
        }) 
    }

    public deleteTodoById(arg:any, contexValue:any):Promise<void>
    {
        return new Promise((resolve, reject) => {
            this.connection.createConnection.query(this.queries.deleteTodoQuery,[arg.id, contexValue.auth.id],(error:Error|null, response:any)=>
            {
                if (error) return reject(error);
                return resolve(response)
            })
        }) 
    }

    public findTodo(arg:any, contexValue:any):Promise<void>
    {
        return new Promise((resolve, reject) => {
            this.connection.createConnection.query(this.queries.findTodoQuery,[contexValue.auth.id, arg.text],(error:Error|null, response:any)=>
            {
                if (error) return reject(error);
                return resolve(response)
            })
        }) 
    }

}