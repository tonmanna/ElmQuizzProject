port module SimpleQuizz exposing (..)

import Browser
import Html exposing (Html, a, code, div, h1, input, label, p, pre, span, text, textarea)
import Html.Attributes exposing (attribute, class, for, hidden, href, id, placeholder, rows, style, type_)
import Html.Events exposing (onClick, onInput)
import List exposing (..)


type alias QuestionListModel =
    { questions : List Question, currentQuestion : Int, hiddenQuestion : Bool, version : String }


type alias Question =
    { no : Int, title : String, answer : String, mermaid : String, code : String, markdown : String }


type Message
    = LetPlay
    | ClickNext
    | ClickBack
    | GetFromJS String
    | SetToJS
    | ChangeAnswer String


initialModel : QuestionListModel
initialModel =
    { questions =
        [ { no = 1
          , title = "หลังจากรันโค้ดต่อไปนี้ สิ่งใดจะพิมพ์ไปบน console ?"
          , answer = ""
          , mermaid = """
    graph LR
    A-- This is the text ---B
        """
          , code = """
    var x = 5;
    const foo = {
        x: 100,
        getX() {
            return this.x;
        }
    };
    const bar = {
        x: 20
    };
    bar.getX = foo.getX;
    console.log(bar.getX());
        """
          , markdown = """
# SQL Exam
Data example 
**Sales Table**
| id | name | extension_number| leader_id | join_date | resign_date | SEX |
|--|--|--|--|--|--|--|--|
| 1 | Prayut | 1001 | Null | 2018-09-19 | 0000-00-00 | M |
| 2 | Pravit | 1002 | 1 | 2017-09-19 | 0000-00-00 | M |
| 3 | Prakorn | 1003 | 1 | 2018-05-01 | 0000-00-00 | M |
| 4 | Prathan | 1004 | Null | 2016-01-09 | 0000-00-00 | M |
| 5 | Prapan | 1005 | 4 | 2016-09-19 | 2019-09-20 | M |
| 6 | Pratavit | 1006 | 4 | 2015-03-19 | 0000-00-00 | M | 
| 7 | Pratawan | 1007 | Null | 2017-02-19 | 0000-00-00 | F |
| 8 | Padthai | 1008 | 7 | 2015-05-22 | 0000-00-00 | F |
| 9 | Patcharee | 1009 | 7 | 2017-12-15 | 0000-00-00 | F |
        """
          }
        , { no = 2
          , title = "หลังจากรันโค้ดต่อไปนี้ ข้อความใดจะพิมพ์บน console ?"
          , answer = ""
          , mermaid = """ """
          , code = """
    const basket = {
        apple: 2,
        banana: 4,
        orange: 6,
        strawberry: 8
    }
    for (const fruit in basket) {
        console.log(fruit);
    }
        """
          , markdown = """
# Lists

Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
        """
          }
        , { no = 3
          , title = "ผลลัพธ์ของ 10 % 5 คืออะไร ?"
          , answer = ""
          , mermaid = """ """
          , code = """
    var result =  10 % 5;
        """
          , markdown = """
## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
        """
          }
        , { no = 4
          , title = "ค่าของ x คืออะไร ?"
          , answer = ""
          , mermaid = """ """
          , code = """
    let x = 1 + "2";
        """
          , markdown = """
### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::
        """
          }
        , { no = 5
          , title = "คำสั่งใดมีผลทำให้ตัวแปร result เป็นตัวพิมพ์เล็กทั้งหมด ?"
          , answer = ""
          , mermaid = """ """
          , code = """
    let result = 'Hello World';
        """
          , markdown = """ """
          }
        , { no = 6
          , title = "คำสั่งที่ใช้สำหรับการขึ้นบรรทัดใหม่ในสตริง?"
          , answer = ""
          , mermaid = """ """
          , code = """ """
          , markdown = """ """
          }
        , { no = 7
          , title = "หลังจากรันโค้ดต่อไปนี้ ข้อความใดจะพิมพ์บน console ?"
          , answer = ""
          , mermaid = """ """
          , code = """
    const fruits = ["apple", "banana", "strawberry"];
    fruits
        .map((fruit) => "amazing " + fruit)
        .forEach((fruit) => {
            console.log(fruit);
        })
        """
          , markdown = """ """
          }
        , { no = 8
          , title = "หลังจากรันโค้ดต่อไปนี้ ข้อความใดจะพิมพ์บน console ?"
          , answer = ""
          , mermaid = """ """
          , code = """
    const fruits = ["apple", "banana", "strawberry"];
    fruits
        .filter((fruit) => fruit.length > 5)
        .forEach((fruit) => {
            console.log(fruit);
        })
        """
          , markdown = """ """
          }
        , { no = 9
          , title = "คำสั่งใด ทำให้สามารถพิมพ์ชื่อและนามสกุลไปที่ console ได้ ?"
          , answer = ""
          , mermaid = """ """
          , code = """
    let person = {
        firstName: "Worawut",
        lastName: "Boonton",
        fullName: function() {
            return this.firstName + " " + this.lastName;
        }
    };
        """
          , markdown = """ """
          }
        , { no = 10
          , title = "จงอธิบายการทำงานของโค้ดด้านล่าง"
          , answer = ""
          , mermaid = """ """
          , code = """
    function asyncJob() {
        console.log("Fetching");
        await fetchUserData(); // `fetchUserData` returns an instace of Promise
        console.log("Fetched");
    }
    asyncJob();
        """
          , markdown = """ """
          }
        , { no = 10
          , title = "ค่าของ x และ y คืออะไร?"
          , answer = ""
          , mermaid = """ """
          , code = """
    let x,y = 36;
        """
          , markdown = """ """
          }
        ]
    , currentQuestion = 0
    , hiddenQuestion = True
    , version = "0.0"
    }


init : String -> ( QuestionListModel, Cmd Message )
init flags =
    ( { initialModel | version = flags }, code_heighlight initialModel )


initQuestion : Question
initQuestion =
    { no = 0, title = "FINISH", answer = "", mermaid = "", code = "", markdown = "" }


subscriptions : QuestionListModel -> Sub Message
subscriptions model =
    from_js GetFromJS


port from_js : (String -> msg) -> Sub msg


port code_heighlight : QuestionListModel -> Cmd msg


port submit_answer : Question -> Cmd msg


viewQuestion : Question -> Html Message
viewQuestion question =
    div []
        [ div [ class "mb-3" ]
            [ label [ for "address" ]
                [ text (String.fromInt question.no ++ ". " ++ question.title) ]
            , div [ id ("mermaid" ++ String.fromInt question.no) ] []
            , div [ id ("markdown" ++ String.fromInt question.no) ] []
            , pre [] [ code [ id ("code" ++ String.fromInt question.no), class "language-javascript" ] [] ]
            , textarea [ class "form-control", placeholder "Please enter answer here", rows 5, onInput ChangeAnswer ]
                [ text question.answer ]
            ]
        ]


viewNextBackQuestion : QuestionListModel -> Html Message
viewNextBackQuestion model =
    div [ class "row" ]
        [ span [ class "btn btn-warning", onClick ClickBack, style "margin-left" "5px" ] [ text "Back" ]
        , span [ class "btn btn-info", onClick ClickNext, style "margin-left" "5px" ] [ text "Next" ]
        ]


view : QuestionListModel -> Html Message
view model =
    let
        currentQuestions =
            List.filter (\x -> x.no == model.currentQuestion) model.questions

        currentQuestion =
            case List.head currentQuestions of
                Just val ->
                    val

                Nothing ->
                    initQuestion

        notShowQuestion =
            model.hiddenQuestion || (currentQuestion.title == "FINISH")

        showFinishBadge =
            currentQuestion.title == "FINISH" && not (model.currentQuestion == 0)
    in
    div []
        [ div [ class "container", hidden (not model.hiddenQuestion) ]
            [ h1 [ class "display-12" ]
                [ text "The exam center for candidate." ]
            , p []
                [ text "“You can’t stop the future. You can’t rewind the past.The only way to learn the secret s to press play.”" ]
            , p []
                [ label [ class "badge badge-secondary" ] [ text ("Version:" ++ model.version) ] ]
            , p []
                [ span [ class "btn btn-primary btn-lg", onClick LetPlay ]
                    [ text "Let's Play »" ]
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
            ]
        , div [ class "container", hidden notShowQuestion ] [ viewQuestion currentQuestion ]
        , div [ class "container", hidden notShowQuestion ] [ viewNextBackQuestion model ]
        , div [ class "container", hidden (not showFinishBadge) ]
            [ h1 [ class "display-12" ]
                [ text currentQuestion.title ]
            , p []
                [ text "“You can’t stop the future. You can’t rewind the past.The only way to learn the secret s to press play.”" ]
            , p []
                [ span [ class "btn btn-primary btn-lg" ]
                    [ text "Submit exam answer" ]
                , span [ class "btn btn-warning btn-lg", style "margin-left" "5px", onClick LetPlay ]
                    [ text " Back " ]
                ]
            ]
        ]


update : Message -> QuestionListModel -> ( QuestionListModel, Cmd Message )
update msg model =
    case msg of
        ClickNext ->
            ( { model | currentQuestion = model.currentQuestion + 1 }, code_heighlight { model | currentQuestion = model.currentQuestion + 1 } )

        ClickBack ->
            if model.currentQuestion > 1 then
                ( { model | currentQuestion = model.currentQuestion - 1 }, code_heighlight { model | currentQuestion = model.currentQuestion - 1 } )

            else
                ( { model | hiddenQuestion = True }, Cmd.none )

        LetPlay ->
            ( { model | currentQuestion = 1, hiddenQuestion = False }, code_heighlight { model | currentQuestion = 1 } )

        GetFromJS value ->
            ( { model | version = value }, Cmd.none )

        SetToJS ->
            ( model, code_heighlight model )

        ChangeAnswer content ->
            ( model, submit_answer (updateModel model content) )



-- TODO: updateModel After Change Answer


updateModel model content =
    case List.head (List.filter (\x -> x.no == model.currentQuestion) model.questions) of
        Just val ->
            { val | answer = content }

        Nothing ->
            initQuestion


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
