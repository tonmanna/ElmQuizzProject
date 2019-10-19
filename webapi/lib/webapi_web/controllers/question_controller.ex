defmodule WebapiWeb.QuestionController do
  use WebapiWeb,:controller
  def submitAnswer(conn, _params) do 
    users = [
          %{name: "Joe",
            email: "joe@example.com",
            password: "topsecret",
            stooge: "moe"},
          %{name: "Anne",
            email: "anne@example.com",
            password: "guessme",
            stooge: "larry"},
          %{name: "Franklin",
            email: "franklin@example.com",
            password: "guessme",
            stooge: "curly"},
        ]
    json conn, users
  end
  def getAllQuestion(conn, _params) do
      questions = [
        %{ no: 1,
           title: "หลังจากรันโค้ดต่อไปนี้ สิ่งใดจะพิมพ์ไปบน console ?",
           answer: "",
           mermaid: """ 
           """,
           code: """
                var x: 5;
                const foo: {
                    x: 100,
                    getX() {
                        return this.x;
                    }
                };
                const bar: {
                    x: 20
                };
                bar.getX: foo.getX;
                console.log(bar.getX());
          """,
          markdown: """ 
          """},
        %{ no: 2,
           title: "หลังจากรันโค้ดต่อไปนี้ ข้อความใดจะพิมพ์บน console ?",
           answer: "",
           mermaid: """
           """,
           code: """
                const basket: {
                    apple: 2,
                    banana: 4,
                    orange: 6,
                    strawberry: 8
                }
                for (const fruit in basket) {
                    console.log(fruit);
                }
           """,
           markdown: """ 
           """,
          },
        %{ no: 3,
           title: "ผลลัพธ์ของ 10 % 5 คืออะไร ?",
           answer: "",
           mermaid: """
           """,
           code: """
                var result:  10 % 5;
           """,
           markdown: """
           """
          },
        %{ no: 4,
           title: "ค่าของ x คืออะไร ?",
           answer: "",
           mermaid: """
           """,
           code: """
                let x: 1 + "2";
           """,
          markdown: """
          """
          },
        %{ no: 5,
           title: "คำสั่งใดมีผลทำให้ตัวแปร result เป็นตัวพิมพ์เล็กทั้งหมด ?",
           answer: "",
           mermaid: """
           """,
           code: """
                let result: 'Hello World';
           """,
           markdown: """
           """
          },
        %{ no: 6,
           title: "คำสั่งที่ใช้สำหรับการขึ้นบรรทัดใหม่ในสตริง?",
           answer: "",
           mermaid: """
           """,
           code: """
           """,
           markdown: """
           """
          },
        %{ no: 7,
           title: "หลังจากรันโค้ดต่อไปนี้ ข้อความใดจะพิมพ์บน console ?",
           answer: "",
           mermaid: """
           """,
           code: """
                const fruits: ["apple", "banana", "strawberry"];
                fruits
                    .map((fruit):> "amazing " + fruit)
                    .forEach((fruit):> {
                        console.log(fruit);
                    })
           """,
           markdown: """
           """
          },
        %{ no: 8,
           title: "หลังจากรันโค้ดต่อไปนี้ ข้อความใดจะพิมพ์บน console ?",
           answer: "",
           mermaid: """
           """,
           code: """
                const fruits: ["apple", "banana", "strawberry"];
                fruits
                    .filter((fruit):> fruit.length > 5)
                    .forEach((fruit):> {
                        console.log(fruit);
                    })
           """,
           markdown: """
           """
          },
        %{ no: 9,
            title: "คำสั่งใด ทำให้สามารถพิมพ์ชื่อและนามสกุลไปที่ console ได้ ?",
            answer: "",
            mermaid: """
            """,
            code: """
                let person: {
                    firstName: "Worawut",
                    lastName: "Boonton",
                    fullName: function() {
                        return this.firstName + " " + this.lastName;
                    }
                };
            """,
            markdown: """
            """
          },
        %{ no: 10,
           title: "จงอธิบายการทำงานของโค้ดด้านล่าง",
           answer: "",
           mermaid: """
           """,
           code: """
                function asyncJob() {
                    console.log("Fetching");
                    await fetchUserData(); // `fetchUserData` returns an instace of Promise
                    console.log("Fetched");
                }
                asyncJob();
           """,
           markdown: """
            """
          },
        %{ no: 11,
           title: "ค่าของ x และ y คืออะไร?",
           answer: "",
           mermaid: """
           """,
           code: """
                let x,y: 36;
           """,
           markdown: """
           """
          }
      ]
      json conn, questions
  end
end