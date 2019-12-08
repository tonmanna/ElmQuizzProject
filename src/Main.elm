port module Main exposing (..)

import Browser
import Html exposing (Html, a, code, div, form, h1, h3, img, input, label, p, pre, span, text, textarea)
import Html.Attributes exposing (attribute, class, for, hidden, href, id, placeholder, rows, src, style, type_, value)
import Html.Events exposing (onClick, onInput, onSubmit)
import Http exposing (..)
import Json.Decode exposing (Decoder, Error, at, bool, int, list, nullable, string, succeed)
import Json.Decode.Pipeline exposing (optional, required)
import Json.Encode as Encode
import List exposing (..)
import Random


type alias QuestionListModel =
    { questions : List Question, questionNumber : Int, hiddenQuestion : Bool, candidateID : String, errorMessage : String }


type alias Question =
    { no : Int, title : String, answer : String, mermaid : String, code : String, markdown : Maybe String }


type Msg
    = LetPlay
    | ClickNext Question
    | ClickBack Question
    | ClickSubmit
    | GetFromJS String
    | InputAnswer String
    | SetToJS
    | SubmitAnswer (Result Http.Error String)
    | GetQuestions (Result Http.Error (List Question))


initQuestion : Question
initQuestion =
    { no = 0, title = "FINISH", answer = "", mermaid = "", code = "", markdown = Just "" }


initialCmd : Cmd Msg
initialCmd =
    Http.get
        { url = "http://localhost:4000/api/v1/getAllQuestion"
        , expect = Http.expectJson GetQuestions (list questionDecoder)
        }


submitCmd : Cmd Msg
submitCmd =
    Http.post
        { url = "http://localhost:4000/api/v1/submitAnswer"
        , body = Http.emptyBody
        , expect = Http.expectJson SubmitAnswer string
        }


questionDecoder : Decoder Question
questionDecoder =
    succeed Question
        |> required "no" int
        |> required "title" string
        |> required "answer" string
        |> required "mermaid" string
        |> required "code" string
        |> required "markdown" (nullable string)


errorToString : Http.Error -> String
errorToString error =
    case error of
        BadUrl url ->
            "The URL " ++ url ++ " was invalid"

        Timeout ->
            "Unable to reach the server, try again"

        NetworkError ->
            "Unable to reach the server, check your network connection"

        BadStatus 500 ->
            "The server had a problem, try again later"

        BadStatus 400 ->
            "Verify your information and try again"

        BadStatus _ ->
            "Unknown error"

        BadBody errorMessage ->
            errorMessage


initialModel : QuestionListModel
initialModel =
    { questions = []
    , questionNumber = 0
    , hiddenQuestion = True
    , candidateID = ""
    , errorMessage = ""
    }


init : String -> ( QuestionListModel, Cmd Msg )
init flags =
    ( initialModel, Cmd.batch [ code_heighlight initialModel, initialCmd ] )


subscriptions : QuestionListModel -> Sub Msg
subscriptions model =
    from_js GetFromJS


port from_js : (String -> message) -> Sub message


port code_heighlight : QuestionListModel -> Cmd message


port change_answer : QuestionListModel -> Cmd message


port submit_answer : QuestionListModel -> Cmd message


port getQuestionFromGraphQL : (Json.Decode.Value -> msg) -> Sub msg


viewStartBadge : QuestionListModel -> Html Msg
viewStartBadge model =
    div []
        [ h1 [ class "display-12" ]
            [ text "The exam center for candidate." ]
        , p []
            [ text "“You can’t stop the future. You can’t rewind the past.The only way to learn the secret s to press play.”" ]
        , p []
            [ label [ class "badge badge-secondary" ] [ text "Candidate ID : ", input [ style "padding-left" "5px", type_ "text", value model.candidateID, placeholder "Enter your ID here." ] [] ] ]
        , p []
            [ span [ class "btn btn-primary btn-lg", onClick LetPlay ]
                [ text "Let's Play »" ]
            ]
        ]


viewFinishBadge : Question -> Bool -> String -> Html Msg
viewFinishBadge question showFinishBadge errorMessage =
    div [ class "container", hidden (not showFinishBadge) ]
        [ h1 [ class "display-12" ] [ text question.title ]
        , h3 [] [ text errorMessage ]
        , p []
            [ text "“You can’t stop the future. You can’t rewind the past.The only way to learn the secret s to press play.”" ]
        , p []
            [ span [ class "btn btn-primary btn-lg", type_ "button", onClick ClickSubmit ]
                [ text "Submit exam answer" ]
            , span [ class "btn btn-warning btn-lg", type_ "button", style "margin-left" "5px", onClick LetPlay ]
                [ text " Back " ]
            ]
        ]


viewDownloadLink : Html Msg
viewDownloadLink =
    div []
        [ p [ class "text-bold-load" ] [ text "Download Programmer" ]
        , p []
            [ text "Exam JS TDD:"
            , a [ href "https://github.com/iTopPlus/ExamJSTDD" ] [ text "Exam JS TDD" ]
            ]
        , p [ class "text-bold-load" ] [ text "Download" ]
        , p []
            [ text "ClosePackage Lab:"
            , a [ href "/assets/exam/ClosePackage_Q2.xlsx" ] [ text "Excel Test Exam I(Close Job)" ]
            ]
        , p []
            [ text "Test Website Lab:"
            , a [ href "/assets/exam/Test_Website.xlsx" ] [ text "Excel Test Exam II (Test_Website Job)" ]
            ]
        , p []
            [ text "Example for Full Stack Developer."
            , div []
                [ img [ src "/assets/exam/Puneet.svg" ] []
                ]
            ]
        ]


viewQuestion : Question -> Bool -> Html Msg
viewQuestion question notShowQuestion =
    div []
        [ div [ class "mb-3" ]
            [ label [ for "address" ]
                [ text (String.fromInt question.no ++ ". " ++ question.title) ]
            , div [ id ("mermaid" ++ String.fromInt question.no) ] []
            , div [ id ("markdown" ++ String.fromInt question.no) ] []
            , pre [] [ code [ id ("code" ++ String.fromInt question.no), class "language-javascript" ] [] ]
            , input [ type_ "text", class "form-control", placeholder "Please enter answer here", rows 5, onInput InputAnswer, value question.answer ] []
            ]
        , div [ class "container", hidden notShowQuestion ] [ viewNextBack question ]
        ]


viewNextBack : Question -> Html Msg
viewNextBack question =
    div [ class "row" ]
        [ input [ class "btn btn-warning", onClick (ClickBack question), style "margin-left" "5px", type_ "submit", value "Back" ] []
        , input [ class "btn btn-info", onClick (ClickNext question), style "margin-left" "5px", type_ "submit", value "Next" ] []
        ]


view : QuestionListModel -> Html Msg
view model =
    let
        currentQuestions =
            List.filter (\x -> x.no == model.questionNumber) model.questions

        currentQuestion =
            case List.head currentQuestions of
                Just val ->
                    val

                Nothing ->
                    initQuestion

        notShowQuestion =
            model.hiddenQuestion || (currentQuestion.title == "FINISH")

        showFinishBadge =
            currentQuestion.title == "FINISH" && not (model.questionNumber == 0)
    in
    div []
        [ div [ class "container", hidden (not model.hiddenQuestion) ]
            [ viewStartBadge model
            , viewDownloadLink
            ]
        , div [ class "container", hidden notShowQuestion ] [ viewQuestion currentQuestion notShowQuestion ]
        , viewFinishBadge currentQuestion showFinishBadge model.errorMessage
        ]


update : Msg -> QuestionListModel -> ( QuestionListModel, Cmd Msg )
update message model =
    case message of
        ClickNext currentQuestion ->
            let
                currentModel =
                    { model | questionNumber = model.questionNumber + 1 }
            in
            ( currentModel, code_heighlight currentModel )

        ClickBack currentQuestion ->
            let
                currentModel =
                    { model | questionNumber = model.questionNumber - 1 }

                resultModel =
                    if model.questionNumber > 1 then
                        ( currentModel, code_heighlight currentModel )

                    else
                        ( { currentModel | hiddenQuestion = True }, Cmd.none )
            in
            resultModel

        LetPlay ->
            let
                currentModel =
                    { model | questionNumber = 1, hiddenQuestion = False }

                resultModel =
                    ( currentModel, code_heighlight currentModel )
            in
            resultModel

        InputAnswer answer ->
            let
                currentModel =
                    updateAnswer answer model
            in
            ( currentModel, change_answer currentModel )

        GetFromJS value ->
            ( { model | candidateID = value }, Cmd.none )

        SetToJS ->
            ( model, code_heighlight model )

        ClickSubmit ->
            ( model, Cmd.batch [ submit_answer model, submitCmd ] )

        GetQuestions (Ok questions) ->
            case questions of
                first :: rest ->
                    ( { model | questions = questions }, Cmd.none )

                [] ->
                    ( model, Cmd.none )

        GetQuestions (Err httpError) ->
            ( { model | errorMessage = errorToString httpError }, Cmd.none )

        SubmitAnswer (Ok questions) ->
            ( model, Cmd.none )

        SubmitAnswer (Err httpError) ->
            ( model, Cmd.none )


updateAnswer : String -> QuestionListModel -> QuestionListModel
updateAnswer answer model =
    let
        toggle index question =
            if index == model.questionNumber - 1 then
                { question | answer = answer }

            else
                question
    in
    { model | questions = List.indexedMap toggle model.questions }


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
