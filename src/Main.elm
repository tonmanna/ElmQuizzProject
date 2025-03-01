port module Main exposing (..)

import Browser
import Html exposing (Html, a, code, div, h1, h3, h4, img, input, label, p, pre, span, text)
import Html.Attributes exposing ( class, for, hidden, href, id, placeholder, rows, src, style, type_, value, disabled)
import Html.Events exposing (onClick, onInput)
import Http exposing (..)
import Json.Decode exposing (Decoder, int, list, string, succeed, bool)
import Json.Encode as Encode
import Json.Decode.Pipeline exposing ( required)
import List exposing (..)
import Html exposing (textarea)
import String exposing (..)

type alias QuestionListModel =
    { questions : List Question, questionNumber : Int, hiddenQuestion : Bool, candidateID : String, errorMessage : String, complete: Bool, startDate: String }


type alias Question =
    { no : Int, title : String, answer : String, language : String, mermaid : String, code : String, markdown : String, script: String, codeQuestion: Bool }


type Msg
    = LetPlay
    | LetPlayTester
    | ChangeCandidateId String
    | ClickNext Question
    | ClickBack Question
    | ClickSubmit
    | GetFromJS String
    | SetFromMonaco String
    | SetDateFromJS String
    | InputAnswer String
    | SetToJS
    | SubmitAnswer (Result Http.Error String)
    | GetQuestions (Result Http.Error (List Question))
    | GetQuestionsTester (Result Http.Error (List Question))
    | BackToBegining


initQuestion : Question
initQuestion =
    { no = 0, title = "FINISH", answer = "", mermaid = "", code = "", language = "javascript", markdown = "", script = "" , codeQuestion = False}

newPostEncoder : QuestionListModel -> Encode.Value
newPostEncoder model =
    Encode.object
        [ ( "candidateID", Encode.string model.candidateID )
        , ( "questionNumber", Encode.int model.questionNumber )
        , ( "answer", Encode.list Encode.string (List.map .answer model.questions) )
        , ( "code", Encode.list Encode.string (List.map .code model.questions) )
        , ( "language", Encode.list Encode.string (List.map .language model.questions) )
        , ( "mermaid", Encode.list Encode.string (List.map .mermaid model.questions) )        
        , ( "markdown", Encode.list (Encode.string) (List.map .markdown model.questions) )
        , ( "title", Encode.list (Encode.string) (List.map .title model.questions) )
        , ( "script", Encode.list (Encode.string) (List.map .script model.questions) )
        , ( "startDate", Encode.string model.startDate )
        ]

submitCmd :  QuestionListModel -> (Cmd Msg)
submitCmd model =
    Http.post
        { url = "https://exam.itopplus.com/submitAnswer"
        , body = Http.jsonBody  <| (newPostEncoder model)
        , expect = Http.expectJson SubmitAnswer string
        }

fetchQuestionTesterCmd : Cmd Msg
fetchQuestionTesterCmd = 
    Http.get
        { url = "https://exam.itopplus.com/getQuizTester"
        , expect = Http.expectJson GetQuestionsTester (list questionDecoder)
        }
-- https://elmquiz.herokuapp.com/getQuiz
fetchQuestionCmd : Cmd Msg
fetchQuestionCmd =
    Http.get
        { url = "https://exam.itopplus.com/getQuiz"
        , expect = Http.expectJson GetQuestions (list questionDecoder)
        }

questionDecoder : Decoder Question
questionDecoder =
    succeed Question
        |> required "no" int
        |> required "title" string
        |> required "answer" string
        |> required "language" string
        |> required "mermaid" string
        |> required "code" string
        |> required "markdown" string
        |> required "script" string
        |> required "codeQuestion" bool


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
    , complete = False
    , startDate = ""
    }


init : String -> ( QuestionListModel, Cmd Msg )
init _ =
    ( initialModel, Cmd.batch [] )


subscriptions : QuestionListModel -> Sub Msg
subscriptions _ =
    Sub.batch [ from_monaco SetFromMonaco, from_js GetFromJS, from_date SetDateFromJS]

port from_js : (String -> message) -> Sub message
port from_monaco : (String -> message) -> Sub message
port from_date : (String -> message) -> Sub message

port code_heighlight : QuestionListModel -> Cmd message

port change_answer : QuestionListModel -> Cmd message


port submit_answer : QuestionListModel -> Cmd message


port init_monaco : QuestionListModel -> Cmd message

port monaco_get_text : QuestionListModel -> Cmd message

port getQuestionFromGraphQL : (Json.Decode.Value -> msg) -> Sub msg


viewStartBadge : QuestionListModel -> Html Msg
viewStartBadge model =
    div []
        [ h1 [ class "display-12" ]
            [ text "The exam center for candidate." ]
        , p []
            [ text "“You can’t stop the future. You can’t rewind the past.The only way to learn the secret s to press play.”" ]
        , p []
            [ label [ class "badge badge-secondary" ] [ text "Candidate Name : ", input [ style "padding-left" "5px", type_ "text", value model.candidateID, placeholder "Enter your ID here.",onInput ChangeCandidateId ] [] ] ]
        , p []
            [ span [ class "btn btn-primary btn-lg", onClick LetPlay ]
                [ text "Developer »" ]
            ]
        , p []
            [ span [ class "btn btn-primary btn-lg", onClick LetPlayTester ]
                [ text "Tester »" ]
            ]

        ]


viewFinishBadge : Question -> Bool -> Bool -> String -> Html Msg
viewFinishBadge question showFinishBadge hideSubmitButton errorMessage  =
    div [ class "container", hidden (not showFinishBadge) ]
        [ h1 [ class "display-12" ] [ text question.title ]
        , h3 [] [ text errorMessage ]
        , p []
            [ text "“You can’t stop the future. You can’t rewind the past.The only way to learn the secret s to press play.”" ]
        , p [ hidden (hideSubmitButton)]
            [ span [ class "btn btn-primary btn-lg", type_ "button", onClick ClickSubmit ]
                [ text "Submit exam answer" ]
            , span [ class "btn btn-warning btn-lg", type_ "button", style "margin-left" "5px", onClick BackToBegining ]
                [ text " Re-check " ]
            ]
        , p [ hidden (not hideSubmitButton)][
            h4 [] [ text "Thank you for your participation." ]
            ]
        ]
        


viewDownloadLink : Html Msg
viewDownloadLink =
    div []
        [ p [ class "text-bold-load" ] [ text "Download Programmer" ]
        , p []
            [ text "Exam JS TDD (Junior Developer):"
            , a [ href "https://github.com/iTopPlus/ExamJSTDD" ] [ text "Exam JS TDD" ]
            ]
        , p [ class "text-bold-load" ] [ text "Download" ]
        , p []
            [ text "ClosePackage Lab (Resource for Data Sci):"
            , a [ href "./" ] [ text "Excel Test Exam I(Close Job)" ]
            ]
        , p []
            [ text "Test Website Lab (Resource for Data Sci):"
            , a [ href "./" ] [ text "Excel Test Exam II (Test_Website Job)" ]
            ]
        , p [ class "text-bold-load" ]
            [ text "Exam question (Full Stack Developer):"
            , div [] []
            ]
        ]


viewQuestion : Question -> Bool -> Html Msg
viewQuestion question notShowQuestion =
    div []        
        [  
            div [ hidden notShowQuestion, style "position" "fixed", style "right" "0" , style "top" "0", style "margin-right" "20px" ] [ viewNextBack question ],
            div [ class "mb-3" ]
        
            [ label [ for "address" ]
                [ text (String.fromInt question.no ++ ". " ++ question.title) ]
            , div [ id ("mermaid" ++ String.fromInt question.no) ] []
            , pre [] [ code [ id ("code" ++ String.fromInt question.no), class "language-javascript" ] [] ]
            , div [ id ("markdown" ++ String.fromInt question.no) ] []
            , div [ class "container", hidden notShowQuestion ] [ viewNextBack question ]
            , div [ style "height" "30px"] []
            , textarea [ hidden (question.codeQuestion) , class "form-control", placeholder "Please explain solution here.", rows 5, onInput InputAnswer, value question.answer ] []
            , p [ hidden (not question.codeQuestion) ,style "padding-top" "20px"] [ Html.text "Script :", div [ id ("container" ++ String.fromInt question.no), style "height" "400px" ] []]
            ]
            
        ]

viewNextBack : Question -> Html Msg
viewNextBack question =
    div [ class "row" ]
        [
            if question.no == 1 then
                input [ class "btn btn-default", style "margin-left" "5px", type_ "submit", value "Back", disabled (question.no == 1) ] []
            else 
                input [ class "btn btn-warning", onClick (ClickBack question), style "margin-left" "5px", type_ "submit", value "Back" ] []
            , input [  class "btn btn-info", onClick (ClickNext question), style "margin-left" "5px", type_ "submit", value "Next" ] []
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
        
        hideSubmitButton =
            model.complete == True
    in
    div []
        [ div [ class "container", hidden (not model.hiddenQuestion) ]
            [ viewStartBadge model
            , viewDownloadLink
            ]
        , div [ class "container", hidden notShowQuestion ] [ viewQuestion currentQuestion notShowQuestion ]
        , viewFinishBadge currentQuestion showFinishBadge hideSubmitButton model.errorMessage
        ]


update : Msg -> QuestionListModel -> ( QuestionListModel, Cmd Msg )
update message model =
    case message of
        ChangeCandidateId candidateID ->
            ( { model | candidateID = candidateID }, Cmd.none )
        
        ClickNext _ ->
            let
                currentModel =
                    { model | questionNumber = model.questionNumber + 1 }
            in
            ( currentModel,Cmd.batch [ monaco_get_text currentModel, code_heighlight currentModel, init_monaco currentModel]  )

        ClickBack _ ->
            let
                currentModel =
                    { model | questionNumber = model.questionNumber - 1 }

                resultModel =
                    if model.questionNumber > 1 then
                        ( currentModel, Cmd.batch [code_heighlight currentModel, init_monaco currentModel] )

                    else
                        ( { currentModel | hiddenQuestion = True }, Cmd.none )
            in
            resultModel

        BackToBegining ->
            ( { model | questionNumber = 1, hiddenQuestion = False }, Cmd.none )
        LetPlay ->
            let
                currentModel =
                    { model | hiddenQuestion = False }

                resultModel =
                    ( currentModel, fetchQuestionCmd )
            in
            resultModel
        LetPlayTester ->
            let currentModel =
                    { model | hiddenQuestion = False  }

                resultModel =
                    ( currentModel, fetchQuestionTesterCmd )
            in
            resultModel            
        SetDateFromJS date ->
            ( { model | startDate = date }, Cmd.none )
        InputAnswer answer ->
            let
                currentModel =
                    updateAnswer answer model
            in
            ( currentModel, change_answer currentModel )

        GetFromJS value ->
            ( { model | candidateID = value }, Cmd.none )

        SetFromMonaco value ->
            let currentModel =
                    updateScript value model
            in
            (currentModel, Cmd.none )

        SetToJS ->
            ( model, code_heighlight model )

        ClickSubmit ->
            ( {model | complete = True }, Cmd.batch [ submit_answer model, submitCmd model ] )

        GetQuestions (Ok questions) ->
            case questions of
                _ :: _ ->
                 let currentModel = { model | questions = questions , questionNumber = 1 }
                 in
                 ( { model | questions = questions , questionNumber = 1 },  Cmd.batch [code_heighlight currentModel, init_monaco currentModel])

                [] ->
                    ( model, Cmd.none )

        GetQuestionsTester (Ok questions) ->
            case questions of
                _ :: _ ->
                 let currentModel = { model | questions = questions , questionNumber = 1 }
                 in
                 ( { model | questions = questions , questionNumber = 1 },  Cmd.batch [code_heighlight currentModel, init_monaco currentModel])

                [] ->
                    ( model, Cmd.none )

        GetQuestions (Err httpError) ->
            ( { model | errorMessage = errorToString httpError }, Cmd.none )

        SubmitAnswer (Ok _) ->
            ( model, Cmd.none )

        SubmitAnswer (Err _) ->
            ( model, Cmd.none )

        GetQuestionsTester (Err httpError) ->
            ( { model | errorMessage = errorToString httpError }, Cmd.none )

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

updateScript : String -> QuestionListModel -> QuestionListModel
updateScript script model =
    let
        toggle index question =
            if index == model.questionNumber - 1 then
                { question | script = script }

            else
                question
    in
    { model | questions = List.indexedMap toggle model.questions }


main : Program String QuestionListModel Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
