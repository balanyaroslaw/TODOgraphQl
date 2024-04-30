import { UserController } from "../controllers/userController";
export class UserResolver
{
    private controller:UserController = new UserController();

    public userResolver = {
        Mutation:
        {
            inputSignUp:(_:any, arg:any)=>this.controller.SignUp(arg),
            inputLogIn:(_:any, arg:any)=>this.controller.LogIn(arg),
        },
        Query: 
        {
            getUser:(_:any, arg:any)=>this.controller.getUser(arg)
        },
    }
}