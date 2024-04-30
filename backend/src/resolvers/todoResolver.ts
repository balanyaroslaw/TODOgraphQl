import { TodoController } from "../controllers/todoController"
import { Middleware } from "../middleware/middleware";
export class Resolver
{
    private middelware:Middleware = new Middleware
    private controller:TodoController = new TodoController();

    public todoResolver = {
        Query: 
        {
            getAllTodos: (_:any, __:any, contexValue:any)=>this.controller.getAllTodos(contexValue),
            getTodoById: (_:any, id:number, contexValue:any)=>this.controller.getTodoById(id, contexValue),
            postTodo: (_:any, text:string, contexValue:any)=>this.controller.postTodo(text, contexValue),
            deleteTodo: (_:any, id:number, contexValue:any) => this.controller.deleteTodoById(id, contexValue),
            updateTextTodo:(_:any, arg:any, contexValue:any)=>this.controller.updateTextTodoById(arg, contexValue),
            updateStatusTodo:(_:any, arg:any, contexValue:any)=>this.controller.updateStatusTodoById(arg, contexValue),
            findTodo:(_:any, arg:any, contexValue:any)=>this.controller.findTodo(contexValue, arg)
        },
    }
}