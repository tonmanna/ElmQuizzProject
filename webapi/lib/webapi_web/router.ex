defmodule WebapiWeb.Router do
  use WebapiWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug CORSPlug, origin: ["http://localhost:4000", "http://localhost:1234"]    
    plug :accepts, ["json"]
  end

  scope "/", WebapiWeb do
    pipe_through :browser
    get "/", PageController, :index
  end

  scope "/api/v1", WebapiWeb do
      pipe_through :api
      get "/getAllQuestion", QuestionController, :getAllQuestion
      post "/submitAnswer", QuestionController, :submitAnswer 
  end
  
  # Other scopes may use custom stacks.
  # scope "/api", WebapiWeb do
  #   pipe_through :api
  # end
end
