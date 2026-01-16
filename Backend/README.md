# Recipe Management Backend API

This repository contains the **backend implementation** of the Recipe Management System, developed using **ASP.NET Core Web API**.

The backend provides a RESTful API for managing recipes, ingredients, and related operations.  
It follows a **layered architecture** to ensure clean separation of concerns, maintainability, and scalability.

---

## Backend Overview
The API is responsible for handling:
- Recipe creation, update, and retrieval
- Ingredient management
- Business logic and validation
- Data persistence through Entity Framework Core

The backend is designed to be consumed by a frontend client (React application) via HTTP requests.

---

## Architecture
- **Controllers** handle HTTP requests and responses
- **DTOs** are used to transfer data between layers
- **Business layer** contains application logic
- **Data layer** manages database operations
- **Models** represent domain entities

This structure ensures loose coupling and easier testing and extension.

---

## Technologies Used
- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- LINQ

---

## Configuration
Environment-specific settings are handled through configuration files.

> Sensitive or environment-specific configuration files are excluded from version control and provided as example templates when necessary.

---

## Purpose
This backend project was developed for **educational and portfolio purposes**, demonstrating:
- Clean backend architecture
- RESTful API design
- Separation of concerns
- Real-world backend development practices
