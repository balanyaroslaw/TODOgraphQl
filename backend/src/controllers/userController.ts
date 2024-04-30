import { Connection } from "../SQL/Connection";
import { Query } from "../SQL/Queries";
import { response } from "express";
import { promises } from "dns";
import { json } from "stream/consumers";
import { IpcSocketConnectOpts } from "net";
import jwt from 'jsonwebtoken'
import bcrypt, { genSalt } from 'bcrypt'
import { GraphQLError } from 'graphql';
export interface IUser
{
    id:number,
    username:string,
    email:string,
    password:string,
    token?:string
}
export class UserController
{
    private connection:Connection = new Connection();
    private queries:Query = new Query();

    public SignUp(arg:any):Promise<IUser>
    {
       return new Promise((resolve, reject) => {

            this.connection.createConnection.query(this.queries.findUserByEmail,[arg.email],async(error:Error|null, response:any)=>
            {
                if(error) return reject(error)
                let user:Array<IUser> = JSON.parse(JSON.stringify(response))
                if(!user.length)
                {
                    const token:string = jwt.sign({id:arg.id, username: arg.username, email:arg.email}, "SOMESTRING",{expiresIn:"15h"});
                    const password = await bcrypt.hash(arg.password, 10)
                    console.log([arg.username, arg.email, password, token])
                    this.connection.createConnection.query(this.queries.signUpUser,[arg.username, arg.email, password, token],(error:Error|null, response:any)=>
                    {
                        if(error) return reject(error)
                        return resolve(response)
                    })
                }
                else
                {
                    reject(new GraphQLError("It's error is already exist"))
                }
            })
        })
    }

    public LogIn(arg:any):Promise<IUser>
    {
       return new Promise((resolve, reject) => {

            this.connection.createConnection.query(this.queries.findUserByEmail,[arg.email],(error:Error|null, response:any)=>
            {
                if(error) return reject(error)
                let user:Array<IUser> = JSON.parse(JSON.stringify(response))
                if(user.length)
                {
                    return bcrypt.compare(arg.password, user[0].password, (err, res)=>{
                        if(res)
                        {
                            const token:string = jwt.sign({id:user[0].id, username:user[0].username,email:user[0].email}, "SOMESTRING",{expiresIn:"15h"});
                            this.connection.createConnection.query(this.queries.attatchToken,[token, user[0].email],(error:Error|null, response:any)=>
                            {
                                if(error) return reject(error)
                                return resolve(user[0])
                            })
                        }
                        else
                        {
                            reject(new GraphQLError("Password or email is wrong"))
                        }
                      });
                }
                else
                {
                    reject(new GraphQLError("This email doesnt exist"))
                }
            })
        })
    }

    public getUser(arg:any):Promise<IUser>
    {
        return new Promise((resolve, reject) => {

            this.connection.createConnection.query(this.queries.findUserByEmail,[arg.email],(error:Error|null, response:any)=>
            {
                if(error) return reject(error)
                return resolve(response)
            })
        })
    }
}