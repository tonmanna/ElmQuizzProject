defmodule WebapiWeb.PageController do
  use WebapiWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
