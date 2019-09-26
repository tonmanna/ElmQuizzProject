module SimpleQuizz exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)

initQuizzModel = 
  {  question = "XXXXXX"
    , answer = "YYYYYY"
    , checked = False
  }

type MessageEnum = TRUE | FALSE


viewQuizz model =
  div [] [ Html.text model.answer ] 

view model =
    let 
      message = if model.checked then FALSE else TRUE
      textMessage =
            if model.checked then
                "BBBBBB"
            else
                "AAAAAA"
    in
    div []
        [ div []
            [ h1 [ onClick message, Html.Attributes.style "cursor" "pointer" ] [ Html.text textMessage ] ]
        , div []
            [ viewQuizz model ]
        ]

update msg model =
    case msg of
        TRUE ->
          { model | checked = True}
        FALSE ->
          { model | checked = False}

main =
    Browser.sandbox
        { init = initQuizzModel
        , view = view
        , update = update
        }