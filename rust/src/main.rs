use actix_web::{
    get, http::header::ContentType, post, web, App, HttpResponse, HttpServer, Responder,
};

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Quiz {
    no: i64,
    title: String,
    answer: String,
    mermaid: String,
    code: String,
    markdown: String,
}

#[get("/")]
async fn get_quiz_result() -> impl Responder {
    let quis = get_quiz();
    let result = serde_json::to_string(&quis);
    let quiz = match result {
        Ok(result) => result,
        Err(err) => err.to_string(),
    };
    HttpResponse::Ok()
        .content_type(ContentType::plaintext())
        .insert_header(("Content-Type", "application/json"))
        .insert_header(("Access-Control-Allow-Origin", "*"))
        .body(quiz)
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

async fn manual_hello2() -> impl Responder {
    HttpResponse::Ok().body("Hey there2!")
}

fn get_quiz() -> [Quiz; 1] {
    let ferris = Quiz {
        no: 123,
        title: String::from("asdasd"),
        answer: String::from("asdasd"),
        mermaid: String::from("asdasd"),
        code: String::from("asdasd"),
        markdown: String::from("asdasd"),
    };
    let quiz: [Quiz; 1] = [ferris];
    return quiz;
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(get_quiz_result)
            .service(echo)
            .route("/hey", web::get().to(manual_hello))
            .route("/ok", web::get().to(manual_hello2))
    })
    .bind(("0.0.0.0", 9999))?
    .run()
    .await
}
