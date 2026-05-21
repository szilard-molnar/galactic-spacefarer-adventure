# Galactic Spacefarer Adventure

This project was created as part of a SAP CAP + SAP Fiori Elements technical exercise.

---

# Technologies

* SAP CAP (Cloud Application Programming Model)
* SAP Fiori Elements
* OData V4
* SAP UI5
* SQLite
* Node.js

---

# How to Run the Project

## 1. Install dependencies

Navigate to the root folder of the project and run:

```bash
npm install
```

---

## 2. Start the CAP server

```bash
cds watch
```

---

## 3. Open the application

Open the following URL in your browser:

```txt
http://localhost:4004
```

Under **Web Applications**, open:

```txt
/galactic-spacefarer/dist
```

---

# Mock Authentication

When prompted, use one of the following demo users:

| Username | Password | Access        |
| -------- | -------- | ------------- |
| alice    | alice    | Planet X data |
| bob      | bob      | Planet Y data |
| admin    | admin    | Full access   |

---

# Loading Mock Data

After login, the table may initially appear empty.

Click the **GO** button in the top-right corner to load the mock data.

Mock data files are located under:

```txt
/db/data
```

---

# CRUD Operations

The application supports:

* Create
* Read
* Update
* Delete

operations for Spacefarers.

You can freely modify the database content during runtime.

However, for demo purposes, the original mock data files are not overwritten.
After restarting the application or logging in again, the original mock data will be restored.

---

# Fiori Application

The Fiori application for this demo project was generated using:

```txt
SAP Fiori tools - Extension Pack
```

for Visual Studio Code.

---
