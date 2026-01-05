# Website Mini E-commerce - Kinh doanh Đặc sản Địa phương

Dự án website thương mại điện tử mini chuyên kinh doanh các đặc sản địa phương, được xây dựng với React (Vite) cho frontend và Node.js (Express) cho backend.

## 📋 Mục lục

- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt](#cài-đặt)
- [Cấu hình môi trường](#cấu-hình-môi-trường)
- [Chạy dự án](#chạy-dự-án)
- [API Endpoints](#api-endpoints)
- [Tính năng chính](#tính-năng-chính)

## ✨ Tính năng

### Người dùng
- 🔐 Đăng ký và đăng nhập
- 🛍️ Duyệt và tìm kiếm sản phẩm
- 🛒 Quản lý giỏ hàng
- 💳 Thanh toán qua MoMo
- 📦 Theo dõi đơn hàng
- ⭐ Đánh giá sản phẩm
- 👤 Quản lý hồ sơ cá nhân

### Quản trị viên
- 📊 Dashboard thống kê
- 📦 Quản lý sản phẩm (CRUD)
- 📋 Quản lý đơn hàng
- 📊 Quản lý tồn kho
- 📈 Báo cáo doanh thu
- 🖼️ Upload ảnh sản phẩm (Cloudinary)

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 18** - Thư viện UI
- **Vite** - Build tool và dev server
- **React Router DOM** - Điều hướng
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hot Toast** - Thông báo
- **Recharts** - Biểu đồ
- **Lucide React** - Icons
- **Date-fns** - Xử lý ngày tháng

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Xác thực
- **Bcrypt** - Mã hóa mật khẩu
- **Joi** - Validation
- **Multer** - Upload file
- **Cloudinary** - Lưu trữ ảnh
- **CORS** - Cross-origin resource sharing

## 📁 Cấu trúc dự án

```
Website Mini E-commerce Kinh doanh Đặc sản Địa phương/
├── client-vite/                 # Frontend application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── admin/          # Admin components
│   │   │   └── ...             # Common components
│   │   ├── context/            # React Context (Auth, Cart)
│   │   ├── layouts/            # Layout components
│   │   ├── pages/              # Page components
│   │   │   ├── admin/          # Admin pages
│   │   │   └── ...             # Public pages
│   │   ├── App.jsx             # Main App component
│   │   └── main.jsx            # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── Server/                      # Backend application
    ├── src/
    │   ├── config/             # Configuration files
    │   │   ├── db.js           # MongoDB connection
    │   │   ├── env.js          # Environment variables
    │   │   ├── jwt.js          # JWT configuration
    │   │   └── cloudinary.js   # Cloudinary configuration
    │   ├── middlewares/        # Express middlewares
    │   │   ├── auth.middleware.js
    │   │   ├── error.middleware.js
    │   │   ├── role.middleware.js
    │   │   ├── upload.middleware.js
    │   │   └── validate.middleware.js
    │   ├── modules/            # Feature modules
    │   │   ├── auth/           # Authentication
    │   │   ├── products/       # Products management
    │   │   ├── cart/           # Shopping cart
    │   │   ├── orders/         # Orders management
    │   │   ├── payments/       # Payment processing
    │   │   ├── inventory/      # Inventory management
    │   │   ├── reviews/        # Product reviews
    │   │   ├── shipments/      # Shipment tracking
    │   │   ├── reports/        # Reports & analytics
    │   │   └── location/       # Location services
    │   ├── utils/              # Utility functions
    │   ├── routes.js           # Route definitions
    │   ├── app.js              # Express app setup
    │   └── server.js           # Server entry point
    └── package.json
```

## 💻 Yêu cầu hệ thống

- **Node.js** >= 16.x
- **npm** >= 8.x hoặc **yarn**
- **MongoDB** >= 5.x (hoặc MongoDB Atlas)
- Tài khoản **Cloudinary** (để upload ảnh)

## 🚀 Cài đặt

### 1. Clone repository

```bash
git clone <repository-url>
cd "Website Mini E-commerce Kinh doanh Đặc sản Địa phương"
```

### 2. Cài đặt dependencies cho Backend

```bash
cd Server
npm install
```

### 3. Cài đặt dependencies cho Frontend

```bash
cd ../client-vite
npm install
```

## ⚙️ Cấu hình môi trường

### Backend (.env trong thư mục Server/)

Tạo file `.env` trong thư mục `Server/` với nội dung:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/ecommerce-db
# Hoặc MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce-db

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### Frontend

Cấu hình API URL trong file `.env` (nếu cần) trong thư mục `client-vite/`:

```env
VITE_API_URL=http://localhost:5000/api
```

## ▶️ Chạy dự án

### Chạy Backend

```bash
cd Server
npm run dev    # Development mode với nodemon
# hoặc
npm start      # Production mode
```

Backend sẽ chạy tại: `http://localhost:5000`

### Chạy Frontend

Mở terminal mới:

```bash
cd client-vite
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173` (hoặc port khác nếu 5173 đã được sử dụng)

### Build Frontend cho Production

```bash
cd client-vite
npm run build
```

Files build sẽ được tạo trong thư mục `dist/`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm mới (Admin)
- `PUT /api/products/:id` - Cập nhật sản phẩm (Admin)
- `DELETE /api/products/:id` - Xóa sản phẩm (Admin)

### Cart
- `GET /api/cart` - Lấy giỏ hàng
- `POST /api/cart` - Thêm sản phẩm vào giỏ hàng
- `PUT /api/cart/:id` - Cập nhật giỏ hàng
- `DELETE /api/cart/:id` - Xóa sản phẩm khỏi giỏ hàng

### Orders
- `GET /api/orders` - Lấy danh sách đơn hàng
- `GET /api/orders/:id` - Lấy chi tiết đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `PUT /api/orders/:id` - Cập nhật trạng thái đơn hàng

### Payments
- `POST /api/payments/create` - Tạo thanh toán MoMo
- `POST /api/payments/callback` - Callback từ MoMo

### Reviews
- `GET /api/reviews/product/:productId` - Lấy đánh giá sản phẩm
- `POST /api/reviews` - Tạo đánh giá mới

### Admin
- `GET /api/reports/sales` - Báo cáo doanh thu (Admin)
- `GET /api/inventory` - Quản lý tồn kho (Admin)

## 🎯 Tính năng chính

### 1. Quản lý sản phẩm
- Hiển thị danh sách sản phẩm với phân trang
- Tìm kiếm và lọc sản phẩm
- Chi tiết sản phẩm với hình ảnh
- Quản lý biến thể sản phẩm (variants)

### 2. Giỏ hàng
- Thêm/xóa sản phẩm
- Cập nhật số lượng
- Lưu trữ giỏ hàng theo user

### 3. Thanh toán
- Tích hợp MoMo Payment Gateway
- Xử lý callback từ MoMo
- Quản lý trạng thái thanh toán

### 4. Quản lý đơn hàng
- Tạo đơn hàng từ giỏ hàng
- Theo dõi trạng thái đơn hàng
- Quản lý vận chuyển

### 5. Dashboard Admin
- Thống kê tổng quan
- Quản lý sản phẩm, đơn hàng
- Quản lý tồn kho
- Báo cáo doanh thu

## 📝 Scripts hữu ích

### Backend
- `npm start` - Chạy server production
- `npm run dev` - Chạy server development với auto-reload

### Frontend
- `npm run dev` - Chạy development server
- `npm run build` - Build cho production
- `npm run preview` - Preview build production
- `npm run lint` - Kiểm tra lỗi code

## 🔒 Bảo mật

- Mật khẩu được mã hóa bằng bcrypt
- JWT token cho authentication
- Role-based access control (Admin/User)
- Input validation với Joi
- CORS được cấu hình

## 📄 License

ISC

## 👥 Tác giả

Dự án được phát triển cho mục đích học tập và thương mại.

---

**Lưu ý**: Đảm bảo thay đổi các giá trị mặc định trong file `.env` trước khi deploy lên production!

