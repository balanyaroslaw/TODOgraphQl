import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware, } from '@apollo/server/express4';
import express,{ Express } from 'express';
import { Schema } from './schema/todoSchema';
import { UserSchema } from './schema/userSchema';
import { Resolver } from './resolvers/todoResolver';
import { UserResolver } from './resolvers/userResolver';
import { TodoController} from "./controllers/todoController"
import { UserController } from './controllers/userController';
import { Middleware } from './middleware/middleware';
class Server{
    private app:Express
    private schema:Schema = new Schema()
    private userSchema:UserSchema = new UserSchema();
    private middelware:Middleware = new Middleware
    private resolver:Resolver = new Resolver();
    private userResolver:UserResolver = new UserResolver();
    private apolloServer:ApolloServer = new ApolloServer({
      typeDefs:this.schema.todoSchema+this.userSchema.userSchema,
      resolvers:{...this.userResolver.userResolver, ...this.resolver.todoResolver}});
    private config():void
    {
      this.app.use(express.json())
    }

    constructor()
    {
      this.app = express()
      this.config()
    }

    public start():void
    {
      (async () => {
        const { url } = await startStandaloneServer(this.apolloServer, {
          context: async ({ req, res }) => ({
            auth: this.middelware.CheckAuthentication(req.headers.authorization),
          }),
          listen: { port: 4000 },
        })
        console.log(`🚀  Server ready at: ${url}`);
      })();
    }
}

let server = new Server()
server.start()