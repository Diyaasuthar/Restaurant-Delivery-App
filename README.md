# Restaurant Food Delivery App

A comprehensive food delivery platform built with Next.js that connects customers, restaurants, and delivery partners.

## Features

- **Customer Features:**
  - Browse restaurants by location
  - Search for restaurants and food items
  - Add items to cart
  - Place orders
  - Track order status
  - User authentication

- **Restaurant Features:**
  - Restaurant dashboard
  - Add/edit food items
  - Manage orders
  - Restaurant authentication

- **Delivery Partner Features:**
  - Delivery dashboard
  - Accept/reject orders
  - Update order status
  - Delivery partner authentication

## Tech Stack

- **Frontend:** Next.js 15, React 19
- **Backend:** Next.js API Routes
- **Database:** MongoDB with Mongoose
- **Styling:** CSS with custom styles

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd resto-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory with your MongoDB credentials:
   ```env
   dbusername=your_mongodb_username
   password=your_mongodb_password
   ```

4. **Build the application:**
   ```bash
   npm run build
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
resto-app/
├── src/
│   ├── app/
│   │   ├── _components/          # Reusable components
│   │   ├── api/                  # API routes
│   │   ├── lib/                  # Database models and utilities
│   │   ├── cart/                 # Cart page
│   │   ├── deliverydashboard/    # Delivery partner dashboard
│   │   ├── deliveryPartner/      # Delivery partner pages
│   │   ├── explore/              # Restaurant exploration
│   │   ├── myProfile/            # User profile and orders
│   │   ├── order/                # Order placement
│   │   ├── restaurant/           # Restaurant pages
│   │   └── user-auth/            # Authentication pages
│   └── globals.css               # Global styles
├── public/                       # Static assets
└── package.json
```

## API Endpoints

### Customer APIs
- `GET /api/customer` - Get restaurants with filters
- `GET /api/customer/[id]` - Get restaurant details
- `GET /api/customer/location` - Get available locations

### User APIs
- `POST /api/user` - User signup
- `POST /api/user/login` - User login

### Restaurant APIs
- `POST /api/restaurant` - Restaurant signup
- `GET /api/restaurant/foods` - Get restaurant food items
- `POST /api/restaurant/foods` - Add food item
- `PUT /api/restaurant/foods/edit/[id]` - Edit food item
- `DELETE /api/restaurant/foods/[id]` - Delete food item

### Order APIs
- `POST /api/order` - Create order
- `GET /api/order/[id]` - Get order details

### Delivery Partner APIs
- `POST /api/deliveryPartner/signup` - Delivery partner signup
- `POST /api/deliveryPartner/login` - Delivery partner login
- `GET /api/deliveryPartner/[city]` - Get delivery partners by city
- `PUT /api/deliveryPartner/orders/[id]` - Update order status

## Usage

### For Customers:
1. Visit the homepage
2. Select your location or search for restaurants
3. Browse restaurant menus
4. Add items to cart
5. Login/signup to place orders
6. Track your orders in the profile section

### For Restaurants:
1. Sign up as a restaurant
2. Access the restaurant dashboard
3. Add food items to your menu
4. Manage incoming orders

### For Delivery Partners:
1. Sign up as a delivery partner
2. Access the delivery dashboard
3. Accept/reject delivery requests
4. Update order status

## Build and Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Database Schema

The app uses MongoDB with the following main collections:
- **Users** - Customer information
- **Restaurants** - Restaurant details and food items
- **Orders** - Order information and status
- **DeliveryPartners** - Delivery partner information

## Troubleshooting

### Common Issues:

1. **Build Errors:**
   - Ensure all dependencies are installed: `npm install`
   - Check for localStorage usage in server-side rendering (fixed in this version)

2. **Database Connection:**
   - Verify MongoDB credentials in `.env.local`
   - Ensure MongoDB Atlas network access is configured

3. **API Errors:**
   - Check if the development server is running
   - Verify API endpoint URLs in the frontend code

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
