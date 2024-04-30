import jwt from 'jsonwebtoken'

export class getDataFromToken
{
    public GetIdFromToken(contextValue:any):string
    {
        const user = jwt.verify(contextValue.split('Bearer')[0], "SOMESTRING");
        return JSON.parse(JSON.stringify(user)).id
    }
}