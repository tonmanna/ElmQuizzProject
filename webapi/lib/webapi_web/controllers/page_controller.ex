defmodule WebapiWeb.PageController do
  use WebapiWeb, :controller

  def index(conn, _params) do
    count = Webapi.Repo.aggregate(Webapi.User, :count, :id)
    conn
    |> assign(:count, count)
    |> render("index.html")
  end
end
