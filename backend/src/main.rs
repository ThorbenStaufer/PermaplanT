//! The backend of `PermaplanT`.

#![recursion_limit = "256"]
// Enable all lints apart from clippy::restriction by default.
// See https://rust-lang.github.io/rust-clippy/master/index.html#blanket_clippy_restriction_lints for as to why restriction is not enabled.
#![warn(clippy::pedantic)]
#![warn(clippy::nursery)]
#![warn(clippy::cargo)]
// Lints in clippy::restriction which seem useful.
#![warn(
    clippy::clone_on_ref_ptr,
    clippy::empty_structs_with_brackets,
    clippy::exit,
    clippy::expect_used,
    clippy::format_push_string,
    clippy::get_unwrap,
    clippy::if_then_some_else_none,
    clippy::indexing_slicing,
    clippy::integer_division,
    clippy::large_include_file,
    clippy::missing_docs_in_private_items,
    clippy::mixed_read_write_in_expression,
    clippy::multiple_inherent_impl,
    clippy::mutex_atomic,
    clippy::panic_in_result_fn,
    clippy::partial_pub_fields,
    clippy::print_stderr,
    clippy::print_stdout,
    clippy::rc_buffer,
    clippy::rc_mutex,
    clippy::rest_pat_in_fully_bound_structs,
    clippy::same_name_method,
    clippy::shadow_unrelated,
    clippy::str_to_string,
    clippy::string_to_string,
    clippy::suspicious_xor_used_as_pow,
    clippy::todo,
    clippy::try_err,
    clippy::unimplemented,
    clippy::unnecessary_self_imports,
    clippy::unneeded_field_pattern,
    clippy::unreachable,
    clippy::unseparated_literal_suffix,
    clippy::unwrap_in_result,
    clippy::unwrap_used,
    clippy::use_debug,
    clippy::verbose_file_reads
)]
// Cannot fix some errors because dependecies import them.
#![allow(clippy::multiple_crate_versions)]
// Allow for now. Remove one after another as part of #60.
#![allow(clippy::module_name_repetitions)]

use actix_cors::Cors;
use actix_web::{http, web::Data, App, HttpServer};
use config::{db, routes};

pub mod config;
pub mod constants;
pub mod controllers;
pub mod error;
pub mod models;
// Auto generated, therefore impossible add documentation.
#[allow(clippy::missing_docs_in_private_items)]
pub mod schema;
pub mod services;

/// Main function.
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let config = match config::app::Config::from_env() {
        Ok(config) => config,
        Err(e) => panic!("Error reading configuration: {e}"),
    };

    HttpServer::new(move || {
        let pool = db::init_pool(&config.database_url);
        let data = Data::new(pool);

        App::new()
            .wrap(cors_configuration())
            .app_data(data)
            .configure(routes::config)
    })
    .bind(config.bind_address)?
    .run()
    .await
}

/// Create a cors configuration for the server.
fn cors_configuration() -> Cors {
    Cors::default() // allowed_origin return access-control-allow-origin: * by default
        .allowed_origin("http://127.0.0.1:5173")
        .allowed_origin("http://localhost:5173")
        .send_wildcard()
        .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
        .allowed_header(http::header::CONTENT_TYPE)
        .max_age(3600)
}
