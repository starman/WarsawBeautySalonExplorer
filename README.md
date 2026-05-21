# Warsaw Beauty Salon Explorer

A web application that allows users to browse, view, and edit hair and beauty salons in Warsaw. 

## Tech Stack

### Frontend
 - Next.js
 - React
 - TypeScript
 - Tailwind CSS

### Backend
 - ASP.NET Core Web API (.NET 10)
 - C#
 - JSON data storing
 - Swagger UI enabled for API testing and endpoint exploration
    

## API Endpoints

Backend exposes the following endpoints:

- `GET /api/salons` - returns list of salons (id, name, district, rating)
- `GET /api/salons/{id}` - returns single salon details
- `PUT /api/salons/{id}` - update salon

## How to run

### Requirements
 - .NET 10
 - Node.js
 - npm

### Steps
1. Clone the repository: ```https://github.com/starman/WarsawBeautySalonExplorer.git```
2. Go into repository directory: ```cd WarsawBeautySalonExplorer```
3. Run backend:
    - ```cd WarsawBeautySalonExplorer```
    - ```dotnet restore```
    - ```dotnet run```
4. Run frontend:
    - ```cd frontend```
    - Create .env.local with ```NEXT_PUBLIC_API_URL=http://{YOUR_ADDRESS}/api```
    - ```npm install```
    - ```npm run dev```


## Future improvements

- Move data storage from JSON to database
- Add pagination
- Backend validation for PUT requests
- Improve frontend error handling
