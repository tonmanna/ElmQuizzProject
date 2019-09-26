module QuizzLogin exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)

main : Html msg
main =
  div [] [
    h1 [ class "jumbotron-heading" ] [text "ITOPPLUS Lab."]
    , div []
      [ p [class "lead text-nuted"] [
        text "This exam will start after submitting a token. Then the timer will countdown, the duration depends on jobs candidate."
      , div [] [text "\"Strong growth together.\""] ]]
    , div [ class "login"] [
        text "Enter your token : ", input [] [] 
        , input [ class "btn btn-info", style "margin-left" "5px", type_ "button", value "submit"] [] ]
  ]