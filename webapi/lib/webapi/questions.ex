defmodule Webapi.Questions do
  use Ecto.Schema
  import Ecto.Changeset

  schema "questions" do
    field :answer, :string
    field :code, :string
    field :markdown, :string
    field :mermaid, :string
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(questions, attrs) do
    questions
    |> cast(attrs, [:title, :answer, :mermaid, :code, :markdown])
    |> validate_required([:title, :answer, :mermaid, :code, :markdown])
  end
end
