defmodule WebapiWeb.UserController do
  use WebapiWeb, :controller
def index(conn, _params) do
    users = [
      %{name: "Joe",
        email: "joe@example.com",
        password: "topsecret",
        stooge: "moe"},
      %{name: "Anne",
        email: "anne@example.com",
        password: "guessme",
        stooge: "larry"},
      %{name: "Franklin",
        email: "franklin@example.com",
        password: "guessme",
        stooge: "curly"},
    ]
    json conn, users
end

def show(conn, %{"id" => id}) do
    user = Repo.get(WebapiWeb.User, String.to_integer(id))
    json conn, user
end

end