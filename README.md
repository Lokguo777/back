# Carbon Management API

A Node.js Express TypeScript API for carbon data management and review system.

## Features

- JWT Authentication
- Role-based access control
- Carbon data CRUD operations
- Review and approval workflow
- PostgreSQL with Drizzle ORM
- Docker support

## Project Structure

```
back/
├── src/
│   ├── routes/           # API路由和業務邏輯
│   │   ├── auth.routes.ts      # 認證相關API (註冊、登入、個人資料)
│   │   ├── carbon.routes.ts    # 碳排資料API (CRUD操作)
│   │   ├── admin.routes.ts     # 管理員API (查看所有資料、統計)
│   │   └── index.ts           # 路由整合和註冊
│   ├── db/               # 資料庫相關
│   │   ├── index.ts           # 資料庫連接配置
│   │   ├── schema.ts          # 資料庫表結構定義
│   │   └── seed/              # 資料庫種子資料
│   ├── validators/       # 資料驗證
│   │   ├── auth.validator.ts  # 認證資料驗證規則
│   │   └── carbon.validator.ts # 碳排資料驗證規則
│   ├── middleware/       # 中間件
│   │   ├── auth.ts           # JWT認證中間件
│   │   └── error.ts          # 錯誤處理中間件
│   ├── utils/           # 工具函數
│   │   ├── passwords.ts      # 密碼加密和驗證
│   │   └── responses.ts      # 統一回應格式
│   ├── config/          # 配置檔案
│   │   └── env.ts           # 環境變數配置
│   ├── types/           # 類型定義
│   │   └── express.d.ts     # Express類型擴展
│   ├── app.ts           # Express應用配置
│   └── server.ts        # 伺服器啟動檔案
├── tests/               # 測試檔案
│   └── auth.test.ts         # 認證功能測試
├── docker/              # Docker配置
│   ├── docker-compose.yml   # Docker Compose配置
│   └── Dockerfile           # Docker映像檔配置
├── package.json         # 專案依賴和腳本
├── tsconfig.json        # TypeScript配置
├── drizzle.config.ts    # Drizzle ORM配置
└── README.md           # 專案說明文件
```

## File Descriptions

### 📁 **Routes (API路由層)**

#### `auth.routes.ts`
- **功能**: 處理用戶認證相關的API端點
- **包含**:
  - `POST /register` - 用戶註冊
  - `POST /login` - 用戶登入
  - `GET /profile` - 獲取個人資料 (需要認證)
- **業務邏輯**: 密碼加密、JWT token生成、用戶資料驗證

#### `carbon.routes.ts`
- **功能**: 處理碳排資料的CRUD操作
- **包含**:
  - `POST /` - 創建碳排資料
  - `GET /my-data` - 獲取用戶的碳排資料
  - `GET /:id` - 獲取特定碳排資料
  - `PUT /:id` - 更新碳排資料
  - `DELETE /:id` - 刪除碳排資料
- **業務邏輯**: 資料驗證、權限檢查、資料庫操作

#### `admin.routes.ts`
- **功能**: 管理員專用API
- **包含**:
  - `GET /all-carbon-data` - 查看所有碳排資料
  - `GET /user-carbon-data/:userId` - 查看特定用戶的碳排資料
  - `GET /carbon-stats` - 獲取碳排統計資料
- **權限**: 需要管理員或審核員權限

#### `index.ts`
- **功能**: 路由整合和註冊
- **作用**: 將所有路由模組整合到Express應用中

### 📁 **Database (資料庫層)**

#### `db/index.ts`
- **功能**: 資料庫連接配置
- **包含**: PostgreSQL連接設定、Drizzle ORM初始化

#### `db/schema.ts`
- **功能**: 資料庫表結構定義
- **包含**:
  - `users` - 用戶表
  - `carbon` - 碳排資料表
  - `devices` - 設備表
  - `scraps` - 廢料表
  - `issues` - 問題表
  - 其他相關表...

#### `db/seed/`
- **功能**: 資料庫種子資料
- **作用**: 初始化測試資料

### 📁 **Validators (資料驗證)**

#### `auth.validator.ts`
- **功能**: 認證相關資料驗證
- **包含**:
  - 註冊資料驗證規則
  - 登入資料驗證規則
- **使用**: Zod驗證庫

#### `carbon.validator.ts`
- **功能**: 碳排資料驗證
- **包含**:
  - 創建碳排資料驗證規則
  - 更新碳排資料驗證規則
- **驗證項目**: 燃料名稱、消耗量、電量、係數等

### 📁 **Middleware (中間件)**

#### `auth.ts`
- **功能**: JWT認證中間件
- **包含**:
  - `authenticateToken` - 驗證JWT token
  - `requireUser` - 要求用戶權限
  - `requireReviewer` - 要求審核員權限

#### `error.ts`
- **功能**: 錯誤處理中間件
- **作用**: 統一處理API錯誤回應

### 📁 **Utils (工具函數)**

#### `passwords.ts`
- **功能**: 密碼處理工具
- **包含**:
  - `hashPassword` - 密碼加密
  - `comparePassword` - 密碼驗證
- **使用**: bcryptjs加密庫

#### `responses.ts`
- **功能**: 統一回應格式
- **包含**:
  - `successResponse` - 成功回應格式
  - `errorResponse` - 錯誤回應格式
  - `notFoundResponse` - 找不到資源回應格式

### 📁 **Config (配置)**

#### `env.ts`
- **功能**: 環境變數配置
- **包含**:
  - 資料庫連接字串
  - JWT密鑰和過期時間
  - 伺服器端口
  - CORS設定
- **使用**: Zod驗證環境變數

### 📁 **Types (類型定義)**

#### `express.d.ts`
- **功能**: Express類型擴展
- **包含**: 自定義Request類型，加入user屬性

### 📁 **Application Files (應用檔案)**

#### `app.ts`
- **功能**: Express應用配置
- **包含**:
  - 中間件註冊
  - 路由註冊
  - 錯誤處理
  - CORS設定

#### `server.ts`
- **功能**: 伺服器啟動檔案
- **作用**: 啟動HTTP伺服器，監聽指定端口

### 📁 **Configuration Files (配置檔案)**

#### `package.json`
- **功能**: 專案依賴和腳本
- **包含**:
  - 專案資訊
  - 依賴套件
  - 執行腳本 (dev, build, start等)

#### `tsconfig.json`
- **功能**: TypeScript編譯配置
- **包含**: 編譯選項、路徑映射、目標版本

#### `drizzle.config.ts`
- **功能**: Drizzle ORM配置
- **包含**: 資料庫連接、遷移設定

### 📁 **Docker (容器化)**

#### `docker/docker-compose.yml`
- **功能**: Docker Compose配置
- **包含**: PostgreSQL資料庫、應用服務配置

#### `docker/Dockerfile`
- **功能**: Docker映像檔配置
- **作用**: 定義應用運行環境

### 📁 **Tests (測試)**

#### `tests/auth.test.ts`
- **功能**: 認證功能測試
- **包含**: 註冊、登入、認證測試案例

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Copy environment file:
```bash
cp env.example .env
```

3. Set up database:
```bash
npm run db:generate
npm run db:migrate
```

4. Start development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Carbon Data
- `POST /api/carbon` - Create carbon data (protected)
- `GET /api/carbon/my-data` - Get user's carbon data (protected)
- `GET /api/carbon/:id` - Get specific carbon data (protected)
- `PUT /api/carbon/:id` - Update carbon data (protected)
- `DELETE /api/carbon/:id` - Delete carbon data (protected)

### Admin
- `GET /api/admin/all-carbon-data` - Get all carbon data (admin only)
- `GET /api/admin/user-carbon-data/:userId` - Get user's carbon data (admin only)
- `GET /api/admin/carbon-stats` - Get carbon statistics (admin only)

## Docker

```bash
docker-compose -f docker/docker-compose.yml up -d
```

## Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio

### Architecture Notes
- **簡化架構**: 採用單層架構，所有業務邏輯集中在routes中
- **類型安全**: 使用TypeScript確保程式碼品質
- **資料驗證**: 使用Zod進行輸入驗證
- **統一回應**: 標準化的API回應格式
- **權限控制**: 基於JWT的角色權限系統 