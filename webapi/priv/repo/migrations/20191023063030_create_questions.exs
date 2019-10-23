defmodule Webapi.Repo.Migrations.CreateQuestions do
  use Ecto.Migration

  def change do
    create table(:questions) do
      add :title, :string
      add :answer, :string
      add :mermaid, :string
      add :code, :string
      add :markdown, :string

      timestamps()
    end

  end
end
