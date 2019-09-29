module SimpleQuizz exposing (main)

import Browser
import Html exposing (Html, div, text, label, input, textarea, span, h1, p, a)
import Html.Attributes exposing (attribute, class, placeholder, type_, for, rows, style, href, hidden)
import Html.Events exposing (onClick)

import List exposing (..)

type alias Question = {  no: Int, title: String, answer: String, mermaid: String, code: String }
initQuestion: Question
initQuestion = { no = 0, title = "FINISH", answer = "", mermaid = "", code="" }


type alias Model =  { questions : List Question, currentQuestion: Int, hiddenQuestion: Bool}
initQuizModel: Model
initQuizModel = 
  { questions = 
    [ { no = 1, title = "The example uses a WHERE clause to show the only person team leader.", answer = "111", mermaid = "", code = "" }
    , { no = 2, title = "The example uses a WHERE clause to show the only person team leader.", answer = "222 ", mermaid = "", code = "" }
    ]
    , currentQuestion = 1
    , hiddenQuestion = True
  }

type Message = LetPlay | ClickNext | ClickBack

viewQuestion : Question -> Html Message
viewQuestion question =
    div []
        [ div [ class "mb-3" ]
            [ label [ for "address" ]
                [ text (String.fromInt question.no ++ ". " ++ question.title) ]
            , textarea  [ class "form-control", placeholder "Please enter SQL here", rows 5 ]
                [text question.answer]
            , div [ class "invalid-feedback" ]
                [ text "Please enter your valid SQL." ]
            ]
        ]

viewNextBackQuestion : Model -> Html Message
viewNextBackQuestion model =
    div [ class "row"] 
        [ span [ class "btn btn-info", onClick ClickNext] [text "Next"]
        , span [ class "btn btn-warning", onClick ClickBack, style "margin-left" "5px"] [text "Back"]
        ]

view: Model -> Html Message
view model = 
    let 
      currentQuestions = List.filter (\x -> x.no == model.currentQuestion) model.questions
      currentQuestion = case (List.head currentQuestions) of
        Nothing -> initQuestion
        Just val -> val
    in
    div []
        [ div [ class "container", hidden (not model.hiddenQuestion) ]
            [ h1 [ class "display-12" ]
                [ text "The exam center for candidate." ]
            , p []
                [ text "“You can’t stop the future. You can’t rewind the past.The only way to learn the secret s to press play.”" ]
            , p []
                [ span [ class "btn btn-primary btn-lg", onClick LetPlay ]
                    [ text "Let's Play »" ]
                ]
            ]
          , div [ class "container", hidden (model.hiddenQuestion || (currentQuestion.title == "FINISH")) ] [viewQuestion currentQuestion]
          , div [ class "container", hidden (model.hiddenQuestion || (currentQuestion.title == "FINISH")) ] [viewNextBackQuestion model]
          , div [ class "container", hidden (not (currentQuestion.title == "FINISH")) ]
            [ h1 [ class "display-12" ]
                [ text currentQuestion.title ]
            , p []
                [ text "“You can’t stop the future. You can’t rewind the past.The only way to learn the secret s to press play.”" ]
            , p []
                [ span [ class "btn btn-primary btn-lg", onClick LetPlay ]
                    [ text "Submit exam awnser" ]
                ]    
            ]
        ]
        
update : Message -> Model -> Model
update msg model =
    case msg of
        ClickNext ->          
          { model | currentQuestion = model.currentQuestion + 1 }
        ClickBack ->
          if model.currentQuestion > 1 then
            { model | currentQuestion = model.currentQuestion - 1 }
          else
            { model | hiddenQuestion = True }
        LetPlay ->
          { model | hiddenQuestion = False }

main =
    Browser.sandbox
        { init = initQuizModel
        , view = view
        , update = update
        }