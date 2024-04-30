import { SchemaManager } from "@apollo/server/dist/esm/utils/schemaManager";

export class UserSchema
{
    public userSchema:string =`

    type User {
      id:ID
      username:String
      email:String
      password:String
      token:String
    }
  
    type Query {
        getUser(email:String): [User]
    }

    type Mutation{
        inputSignUp(username:String, email:String, password:String): [User],
        inputLogIn(email:String, password:String): User,
    }
  `;
}