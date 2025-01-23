# Image Processing Service

A robust RESTful API service for image processing and transformation, built with Node.js, Express, and MongoDB.

## Features

- 🔐 User Authentication (JWT)
- 📤 Image Upload
- 🖼️ Image Transformations
  - Resize
  - Crop
  - Rotate
  - Format Conversion
  - Filters (Grayscale, Sepia)
- 📋 Image Management
- 🔄 Pagination Support
- ⚡ Rate Limiting

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/image-processing
JWT_SECRET=your-secret-key-change-this-in-production
```

4. Start the server:
```bash
npm run dev  # Development
npm start    # Production
```

## API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Image Operations

```
POST   /api/images/upload
POST   /api/images/:id/transform
GET    /api/images/:id
GET    /api/images?page=1&limit=10
```

## Image Transformations

Support for various image transformations:

```json
{
  "transformations": {
    "resize": {
      "width": 800,
      "height": 600
    },
    "crop": {
      "width": 400,
      "height": 400,
      "x": 0,
      "y": 0
    },
    "rotate": 90,
    "format": "webp",
    "filters": {
      "grayscale": true,
      "sepia": false
    }
  }
}
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # Route definitions
├── services/       # Business logic
└── utils/          # Utility functions
```

## Error Handling

The API uses consistent error responses:

```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Error message"
}
```

## Security

- JWT authentication
- Rate limiting on transformations
- Input validation
- Error handling
- Secure password hashing

## License

MIT