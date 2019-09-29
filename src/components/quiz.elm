port module SimpleQuizz exposing (..)

import Browser
import Html exposing (Html, div, text, label, input, textarea, span, h1, p, a)
import Html.Attributes exposing (attribute, class, placeholder, type_, for, rows, style, href, hidden, id)
import Html.Events exposing (onClick)


import List exposing (..)


type alias QuestionListModel = { questions : List Question, currentQuestion: Int, hiddenQuestion: Bool, version: String}
type alias Question = {  no: Int, title: String, answer: String, mermaid: String, code: String }
type Message = LetPlay | ClickNext | ClickBack | FromJS String | SendToJS

initialModel : QuestionListModel
initialModel ={ 
    questions = 
    [ { no = 1, title = "The example uses a WHERE clause to show the only person team leader.", answer = "111", mermaid = "", code = "" }
    , { no = 2, title = "The example uses a WHERE clause to show the only person team leader.", answer = "222 ", mermaid = "", code = "" }
    ]
    , currentQuestion = 1
    , hiddenQuestion = True
    , version = "0.0"
  }

init: String -> (QuestionListModel, Cmd Message)
init flags = (initialModel, Cmd.none)

initQuestion: Question
initQuestion = { no = 0, title = "FINISH", answer = "", mermaid = "", code="" }

subscriptions : QuestionListModel -> Sub Message
subscriptions model = subFromJS FromJS
port subFromJS : (String -> msg) -> Sub msg
port sendToJS : String -> Cmd msg

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
            , div [ class "mermaid", id "mermaidChart0" ] [text ""]
            ]
        ]

viewNextBackQuestion : QuestionListModel -> Html Message
viewNextBackQuestion model =
    div [ class "row"] 
        [ span [ class "btn btn-info", onClick ClickNext] [text "Next"]
        , span [ class "btn btn-warning", onClick ClickBack, style "margin-left" "5px"] [text "Back"]
        ]

view: QuestionListModel -> Html Message
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
                [ label [ class "badge badge-secondary"] [ text ("Version:" ++ model.version)]]
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
                [ span [ class "btn btn-primary btn-lg", onClick SendToJS ]
                    [ text "Submit exam answer" ]
                ]    
            ]
        ]

update : Message -> QuestionListModel ->(QuestionListModel, Cmd Message)
update msg model =
    case msg of
        ClickNext ->          
          ({ model | currentQuestion = model.currentQuestion + 1 }, Cmd.none)
        ClickBack ->
          if model.currentQuestion > 1 then
            ({ model | currentQuestion = model.currentQuestion - 1 }, Cmd.none)
          else
            ({ model | hiddenQuestion = True }, Cmd.none)
        LetPlay ->
          ({ model | hiddenQuestion = False }, Cmd.none)
        SendToJS ->
          (model , sendToJS "Empty")
        FromJS value ->
          ({ model | version = value }, Cmd.none)



main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }