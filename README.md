# Full-Stack Recipe Application

A comprehensive Recipe management web application built with an ASP.NET Core Web API backend and a React.js frontend.

## 🚀 Features
- Browse and search delicious recipes dynamically
- Detailed view of ingredients and cooking instructions
- Clean, intuitive, and responsive UI layout

## 🛠️ Tech Stack
- **Frontend:** React.js, JavaScript (ES6+), CSS3
- **Backend:** ASP.NET Core Web API (.NET / C#)
- **Database:** MySQL / SQL Server

## ⚙️ Local Configuration & Setup

### 1. Backend Setup (.NET API)
1. Open the backend solution in Visual Studio / VS Code.
2. Update your connection string in `appsettings.Development.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "server=localhost;database=RecipeDb;user=MY-USERNAME;password=MY_PASSWORD;"
   }