module QuizzLogin exposing (main)

import Html exposing (Html, text, div, input)
import Html.Attributes exposing (class)

main : Html msg
main =
  div [ class "login"] [text "Enter your token : ", input [] [] ]