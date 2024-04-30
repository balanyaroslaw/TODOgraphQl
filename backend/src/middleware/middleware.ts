import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql';
export class Middleware
{
    public CheckAuthentication(context:any):string | jwt.JwtPayload| undefined
    {
        if(context)
        {
            const authHeader:String = context
            const token = authHeader.split('Bearer')[0]
            if(token)
            {
                try {
                    const user = jwt.verify(token, "SOMESTRING")
                    if(user)
                    {
                        return user
                    }
                } catch (error) {
                    throw new GraphQLError('You are not authorized to perform this action.', {
                        extensions: {
                          code: 'UNAUTHORIZED',
                        },
                      });
                }
            }
            else
            {
                throw new GraphQLError('Token Error', {
                    extensions: {
                      code: 'UNAUTHORIZED',
                    },
                  });
            }    
        }
    }
}