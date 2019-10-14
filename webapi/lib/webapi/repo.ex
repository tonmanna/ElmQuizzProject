defmodule Webapi.Repo do
  use Ecto.Repo,
    otp_app: :webapi,
    adapter: Ecto.Adapters.Postgres
end
