export class Query
{
    public selectAllQuery = "SELECT * FROM todos.todo_table WHERE user_id=?";
    public selectByIdQuery = "SELECT * FROM todos.todo_table WHERE id=? AND user_id=?";
    public insertTodoQuery = "INSERT INTO todos.todo_table (status, text,user_id) VALUES (?,?,?)";
    public deleteTodoQuery = "DELETE FROM todos.todo_table WHERE id=? AND user_id=?"
    public updateStatusQuery = "UPDATE todos.todo_table SET status=? WHERE id=? AND user_id=?"
    public updateTextQuery = "UPDATE todos.todo_table SET text=? WHERE id=? AND user_id=?"

    public findTodoQuery = "SELECT * FROM todos.todo_table WHERE user_id=? AND text LIKE '%?%'"

    public findUserByEmail = "SELECT * FROM todos.user_table WHERE email=?"
    public signUpUser = "INSERT INTO todos.user_table (username, email, password, token) VALUES (?,?,?,?)"
    public attatchToken = "UPDATE todos.user_table SET token=? WHERE email=?"
}