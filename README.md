# 🚀 **TechHelpDesk API**

TechHelpDesk is a modular support ticket management API built with **NestJS**, **TypeORM**, and **PostgreSQL**.
It includes authentication, role-based access control, business rules, validations, Swagger documentation, and automatic seeding.

---

## 📌 **Main Features**

* JWT-based authentication
* Role-based authorization (`ADMIN`, `TECHNICIAN`, `CLIENT`)
* CRUD operations for users, clients, technicians, and categories
* Ticket system with business rules:

  * Valid status workflow:
    `OPEN → IN_PROGRESS → RESOLVED → CLOSED`
  * A technician cannot have more than **5 active IN_PROGRESS tickets**
* Global validation with `class-validator`
* Consistent API responses via a global interceptor
* Global error handling
* Auto-generated Swagger documentation
* Automatic seeding on application startup

---

## 📁 **Project Structure**

```
src/
 ├── common/
 │    ├── decorators/      (Roles, Public, CurrentUser)
 │    ├── guards/          (JwtAuthGuard, RolesGuard)
 │    ├── filters/         (HttpExceptionFilter)
 │    └── interceptors/    (TransformInterceptor)
 │
 ├── modules/
 │    ├── auth/
 │    ├── users/
 │    ├── tickets/
 │    ├── clients/
 │    ├── technicians/
 │    └── categories/
 │
 ├── seed/
 │    ├── seed.module.ts
 │    └── seed.service.ts
 │
 └── main.ts
```
---
## 🛠️ Project setup

```bash
# clone the repository
$ git clone https://github.com/Susilvav03/TechHelpDesk.git

$ cd TechHelpDesk

# install dependecies
$ pnpm i
```

### ▶️ Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

### ▶️ Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

---
## ⚙️ **Environment Variables (`.env`)**

Create a `.env` file at the project root:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=tech_helpdesk
DB_USER=postgres
DB_PASS=postgres

# Required for Render
DB_SSL=true

JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=3600s
```

When using Render’s PostgreSQL, replace:

* `DB_HOST`
* `DB_USER`
* `DB_PASS`
* `DB_NAME`

with the credentials provided by Render.

---

API Base URL:

```
http://localhost:3000/api
```

Swagger Documentation:

```
http://localhost:3000/api/docs
```

---
## 🌱 **Automatic Database Seeding**

On every application startup:

* If **no users exist**, the following are created:

  * Default admin (`admin@techhelpdesk.com`, password: `admin123`)
  * Default categories
  * Demo client
  * Demo technician

To reset manually:

```sql
DELETE FROM users;
DELETE FROM categories;
DELETE FROM clients;
DELETE FROM technicians;
```

Restart the server afterwards.

---
## 🔐 **Authentication**

### Login Endpoint

```
POST /auth/login
```

Body:

```json
{
  "email": "admin@techhelpdesk.com",
  "password": "admin123"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "accessToken": "..."
  },
  "message": null
}
```

### Using JWT in Swagger

Click **Authorize** → enter:

```
Bearer YOUR_TOKEN
```

---

# 👥 **User Roles**

| Role           | Capabilities                                                            |
| -------------- | ----------------------------------------------------------------------- |
| **ADMIN**      | Full CRUD on users, clients, technicians, categories. View all tickets. |
| **CLIENT**     | Create tickets and view own ticket history.                             |
| **TECHNICIAN** | View assigned tickets and update status.                                |

---

# 📝 **Main Endpoints**

## Auth

| Method | Endpoint      | Description                 |
| ------ | ------------- | --------------------------- |
| POST   | `/auth/login` | Authenticate and obtain JWT |

---

## Users (ADMIN only)

| Method | Endpoint     |
| ------ | ------------ |
| POST   | `/users`     |
| GET    | `/users`     |
| GET    | `/users/:id` |
| PATCH  | `/users/:id` |
| DELETE | `/users/:id` |

---

## Clients (ADMIN only)

| Method | Endpoint       |
| ------ | -------------- |
| POST   | `/clients`     |
| GET    | `/clients`     |
| GET    | `/clients/:id` |
| PATCH  | `/clients/:id` |
| DELETE | `/clients/:id` |

---

## Technicians (ADMIN only)

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/technicians`     |
| GET    | `/technicians`     |
| GET    | `/technicians/:id` |
| PATCH  | `/technicians/:id` |
| DELETE | `/technicians/:id` |

---

## Categories (ADMIN only)

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | `/categories`     |
| GET    | `/categories`     |
| GET    | `/categories/:id` |
| PATCH  | `/categories/:id` |
| DELETE | `/categories/:id` |

---

## 🎫 Tickets

| Method | Endpoint                  | Role             |
| ------ | ------------------------- | ---------------- |
| POST   | `/tickets`                | CLIENT/ADMIN     |
| GET    | `/tickets`                | ADMIN            |
| GET    | `/tickets/:id`            | CLIENT/ADMIN     |
| GET    | `/tickets/client/:id`     | CLIENT/ADMIN     |
| GET    | `/tickets/technician/:id` | TECHNICIAN/ADMIN |
| PATCH  | `/tickets/:id/status`     | TECHNICIAN/ADMIN |

### Business Rules

* Valid workflow:

  ```
  OPEN → IN_PROGRESS → RESOLVED → CLOSED
  ```
* A technician cannot exceed **5 simultaneous IN_PROGRESS tickets**
* On creation:

  * Category must exist
  * Client must exist
  * Technician (if provided) must exist and have capacity

---

## 📘 **Swagger Documentation**

Available at:

```
http://localhost:3000/api/docs
```

Includes:

* `@ApiTags`
* `@ApiOperation`
* `@ApiBearerAuth`

---

## 🧪 **Testing (Jest)**

Includes tests such as:

* Ticket creation
* Invalid status transitions
* Technician capacity validation

Run tests:

```bash
pnpm test
```

---

## 🐳 **Docker Support**

### Build the image:

```bash
docker build -t techhelpdesk .
```

### Run with Docker Compose:

```bash
docker compose up --build
```

Services:

* API → `http://localhost:3000`
* PostgreSQL DB → port `5432`

---

## Stay in touch

- Author - [Susana Silva Vallejo](https://github.com/Susilvav03)
- Clan - Ubuntu

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
