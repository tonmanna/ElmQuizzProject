module QuizzLogin exposing (main)

import Browser
import Html exposing (Html, text, div, input)
import Html.Attributes exposing (class)

main =
  div [ class "login"] [text "Enter your token : ", input [] [] ]