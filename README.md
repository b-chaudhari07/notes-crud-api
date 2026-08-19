# Notes CRUD API (Raw Node.js)

A simple Notes CRUD API built using only Node's core `http` module — no Express, no external routing libraries. Built as part of a 35-day backend learning roadmap to understand what frameworks like Express automate under the hood.

## Features

- Manual URL/pathname parsing using the `URL` constructor
- Manual route param extraction (`/notes/:id`) via a custom `getid()` helper
- Manual request body parsing using `req.on("data")` / `req.on("end")`
- In-memory data store (resets on server restart)
- Full CRUD support with proper status codes (200, 201, 404)

## Routes

| Method | Route         | Description              |
|--------|---------------|---------------------------|
| POST   | /notes        | Create a new note         |
| GET    | /notes        | Get all notes             |
| GET    | /notes/:id    | Get a single note by id   |
| PUT    | /notes/:id    | Update a note's text      |
| DELETE | /notes/:id    | Delete a note              |

## Example

**Create a note**