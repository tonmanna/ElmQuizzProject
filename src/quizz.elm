module Hello2 exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)

initQuizzModel : { question : String, answer : String , checked : Bool}
initQuizzModel = 
  {  question = "XXXXXX"
    , answer = "YYYYYY"
    , checked = False
  }

-- START:msg
type Msg
    = TRUE
    | FALSE
-- END:msg

viewQuizz : { question : String, answer: String, checked : Bool } -> Html Msg
viewQuizz model =
  div [] [ Html.text model.answer ] 

view : { question : String , answer: String, checked : Bool } -> Html Msg
view model =
    let 
      msg = if model.checked then FALSE else TRUE
      textMessage =
            if model.checked then
                "BBBBBB"
            else
                "AAAAAA"
    in
    div []
        [ div []
            [ h1 [ onClick msg, Html.Attributes.style "cursor" "pointer" ] [ Html.text textMessage ] ]
        , div []
            [ viewQuizz model ]
        ]

update : 
    Msg -> { question : String , answer: String, checked : Bool } -> { question : String , answer: String, checked : Bool }
update msg model =
    case msg of
        TRUE ->
          { model | checked = True}
        FALSE ->
          { model | checked = False}


main : Program () { question : String , answer: String, checked : Bool } Msg
main =
    Browser.sandbox
        { init = initQuizzModel
        , view = view
        , update = update
        }