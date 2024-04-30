import { SchemaManager } from "@apollo/server/dist/esm/utils/schemaManager";

export class Schema
{
    public todoSchema:string =`

    type Todo {
      id:Int,
      status:String,
      text:String
    }

    input UserInput {
      id:ID
      username:String
      email:String
      password:String
      token:String
    }
  
    type Query {
        getAllTodos(contextValue:UserInput): [Todo],
        getTodoById(id:Int, contextValue:UserInput): [Todo],
        postTodo(text:String, contextValue:UserInput): Todo,
        deleteTodo(id:Int, contextValue:UserInput): Todo,
        updateTextTodo(text:String, id:Int, contextValue:UserInput):Todo,
        updateStatusTodo(text:String, id:Int, contextValue:UserInput):Todo,
        findTodo(contextValue:UserInput, text:String):Todo
    }
  `;
}