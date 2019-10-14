defmodule WebapiWeb.UserController do
  use WebapiWeb, :controller
  def index(conn, _params) do
      # users: [
      #   %{name: "Joe",
      #     email: "joe@example.com",
      #     password: "topsecret",
      #     stooge: "moe"},
      #   %{name: "Anne",
      #     email: "anne@example.com",
      #     password: "guessme",
      #     stooge: "larry"},
      #   %{name: "Franklin",
      #     email: "franklin@example.com",
      #     password: "guessme",
      #     stooge: "curly"},
      # ]
      users = [
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
          }
      ]
      json conn, users
  end
end