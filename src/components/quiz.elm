port module SimpleQuizz exposing (..)

import Browser
import Html exposing (Html, div, text, label, input, textarea, span, h1, p, a, code, pre)
import Html.Attributes exposing (attribute, class, placeholder, type_, for, rows, style, href, hidden, id)
import Html.Events exposing (onClick)


import List exposing (..)


type alias QuestionListModel = { questions : List Question, currentQuestion: Int, hiddenQuestion: Bool, version: String}
type alias Question = {  no: Int, title: String, answer: String, mermaid: String, code: String }
type Message = LetPlay | ClickNext | ClickBack | GetFromJS String | SetToJS

initialModel : QuestionListModel
initialModel = { 
    questions = 
    [ { no = 1, title = "The example uses a WHERE clause to show the only person team leader.", answer = "111"
        , mermaid = 
            """graph TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end """
        , code = """var x = 5;
    const foo = {
        x: 100,
        getX(){
            reeturn this.x;
            }
    }
    const bar = {
        x:20
    }
    bar.getX = foo.getX;
    console.log(bar.getX());""" }
    , { no = 2, title = "The example uses a WHERE clause to show the only person team leader.", answer = "222 "
        , mermaid = 
            """graph TD
    B["fa:fa-twitter for peace "]
    B-->C[fa:fa-ban forbidden]
    B-->D(fa:fa-spinner);
    B-->E(A fa:fa-camera-retro perhaps? );"""
        , code = """const basket = {
        apple: 2,
        banana: 4,
        orange: 6,
        strawberry: 8
    }
    for (const fruit in basket) {
        console.log(fruit);
    }""" }
    ]
    , currentQuestion = 0
    , hiddenQuestion = True
    , version = "0.0"
  }

init: String -> (QuestionListModel, Cmd Message)
init flags = ({initialModel | version = flags }, toJS initialModel)

initQuestion: Question
initQuestion = { no = 0, title = "FINISH", answer = "", mermaid = "", code="" }

subscriptions : QuestionListModel -> Sub Message
subscriptions model = fromJS GetFromJS
port fromJS : (String -> msg) -> Sub msg
port toJS : QuestionListModel -> Cmd msg

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
            , div [ id ("mermaid" ++ String.fromInt question.no) ] []
            , pre [ ] [ code [ id ("code" ++ String.fromInt question.no), class "javascript" ] [ text question.code ] ]
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
      notShowQuestion = (model.hiddenQuestion || (currentQuestion.title == "FINISH"))
      showFinishBadge = (currentQuestion.title == "FINISH" && not (model.currentQuestion == 0) )
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
          , div [ class "container", hidden notShowQuestion] [viewQuestion currentQuestion]
          , div [ class "container", hidden notShowQuestion] [viewNextBackQuestion model]
          , div [ class "container", hidden (not showFinishBadge) ]
            [ h1 [ class "display-12" ]
                [ text currentQuestion.title ]
            , p []
                [ text "“You can’t stop the future. You can’t rewind the past.The only way to learn the secret s to press play.”" ]
            , p []
                [   span [ class "btn btn-primary btn-lg" ]
                    [ text "Submit exam answer" ]
                    ,   span [ class "btn btn-warning btn-lg", style "margin-left" "5px", onClick LetPlay ]
                    [ text " Back " ]
                ]
            ]
        ]

update : Message -> QuestionListModel ->(QuestionListModel, Cmd Message)
update msg model =
    case msg of
        ClickNext ->          
          ({ model | currentQuestion = model.currentQuestion + 1 }, toJS { model | currentQuestion = model.currentQuestion + 1 })
        ClickBack ->
          if model.currentQuestion > 1 then
            ({ model | currentQuestion = model.currentQuestion - 1 }, toJS { model | currentQuestion = model.currentQuestion - 1 })
          else
            ({ model | hiddenQuestion = True }, Cmd.none)
        LetPlay ->
          ({ model | currentQuestion = 1, hiddenQuestion = False }, toJS { model | currentQuestion = 1 })
        GetFromJS value ->
          ({ model | version = value }, Cmd.none)
        SetToJS ->
          (model , toJS model)

main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }