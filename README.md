# Carbon Management System

一個完整的碳管理系統，整合後端 API 和前端管理介面，用於企業碳足跡追蹤和管理。

## 🚀 專案特色

- **全端整合**：後端 API + 前端管理介面
- **碳足跡追蹤**：燃料消耗、電力使用、碳排放係數計算
- **設備管理**：設備狀態監控、維護記錄、排程管理
- **用戶權限**：多角色權限控制（管理員、審核員、一般用戶）
- **資料視覺化**：豐富的圖表和統計報表
- **現代化技術棧**：TypeScript、Express、PostgreSQL、SmartAdmin

## 📁 專案結構

```
carbon-management-system/
├── 📁 src/                          # 後端 API 源碼
│   ├── 📄 app.ts                    # Express 應用程式配置
│   ├── 📄 server.ts                 # 伺服器入口點
│   ├── 📁 config/                   # 配置檔案
│   │   └── 📄 env.ts               # 環境變數配置
│   ├── 📁 db/                       # 資料庫相關
│   │   ├── 📄 index.ts             # 資料庫連接
│   │   ├── 📄 schema.ts            # 資料庫表結構
│   │   └── 📁 seed/                # 資料庫種子資料
│   ├── 📁 middleware/               # Express 中間件
│   │   ├── 📄 auth.ts              # JWT 認證中間件
│   │   └── 📄 error.ts             # 錯誤處理中間件
│   ├── 📁 routes/                   # API 路由
│   │   ├── 📄 auth.routes.ts       # 認證相關 API
│   │   ├── 📄 carbon.routes.ts     # 碳管理 API
│   │   ├── 📄 admin.routes.ts      # 管理員 API
│   │   └── 📄 index.ts             # 路由整合
│   ├── 📁 types/                    # TypeScript 類型定義
│   │   └── 📄 express.d.ts         # Express 類型擴展
│   ├── 📁 utils/                    # 工具函數
│   │   ├── 📄 passwords.ts         # 密碼處理
│   │   └── 📄 responses.ts         # 統一回應格式
│   └── 📁 validators/               # 資料驗證
│       ├── 📄 auth.validator.ts    # 認證資料驗證
│       └── 📄 carbon.validator.ts  # 碳資料驗證
├── 📁 frontend/                     # 前端 UI (SmartAdmin)
│   ├── 📁 src/                      # 前端源碼
│   │   ├── 📁 content/             # 頁面內容
│   │   │   ├── 📁 page/            # 各種頁面
│   │   │   │   ├── 📁 page_login/  # 登入頁面
│   │   │   │   ├── 📁 manager_dashboard/ # 管理員儀表板
│   │   │   │   ├── 📁 staff_dashboard/   # 員工儀表板
│   │   │   │   └── 📁 boss_dashboard/    # 老闆儀表板
│   │   │   └── 📁 settings/        # 設定頁面
│   │   ├── 📁 js/                  # JavaScript 檔案
│   │   ├── 📁 scss/                # SCSS 樣式檔案
│   │   ├── 📁 img/                 # 圖片資源
│   │   └── 📁 custom/              # 自定義資源
│   ├── 📁 dist/                     # 前端建置輸出
│   ├── 📄 package.json             # 前端依賴配置
│   ├── 📄 gulpfile.js              # Gulp 建置配置
│   └── 📄 build.json               # 建置配置
├── 📁 tests/                        # 測試檔案
│   └── 📄 auth.test.ts             # 認證功能測試
├── 📁 docker/                       # Docker 配置
│   ├── 📄 Dockerfile               # Docker 映像檔配置
│   └── 📄 docker-compose.yml       # Docker Compose 配置
├── 📁 dist/                         # 後端編譯輸出
├── 📄 package.json                  # 主專案配置
├── 📄 tsconfig.json                 # TypeScript 配置
├── 📄 drizzle.config.ts            # Drizzle ORM 配置
├── 📄 .gitignore                    # Git 忽略檔案
└── 📄 README.md                     # 專案說明文件
```

## 🛠 技術棧

### 後端技術
- **Node.js** + **TypeScript** - 運行環境和語言
- **Express.js** - Web 框架
- **PostgreSQL** - 關聯式資料庫
- **Drizzle ORM** - 資料庫 ORM
- **JWT** - 身份驗證
- **Zod** - 資料驗證
- **bcryptjs** - 密碼加密
- **Helmet** - 安全性中間件
- **CORS** - 跨域資源共享

### 前端技術
- **SmartAdmin** - 管理介面框架
- **Bootstrap 4** - UI 框架
- **jQuery** - JavaScript 庫
- **Gulp** - 建置工具
- **SCSS** - CSS 預處理器
- **Handlebars** - 模板引擎
- **Chart.js/ApexCharts** - 圖表庫
- **DataTables** - 資料表格
- **FullCalendar** - 日曆組件

## 🗄 資料庫結構

### 核心表格
- **users** - 用戶資料（管理員、審核員、一般用戶）
- **devices** - 設備資料（狀態、名稱、開機時間、比率）
- **carbon** - 碳足跡資料（燃料名稱、消耗量、電力、係數）
- **scraps** - 廢料管理（類型、狀態、濕度、重量、體積）
- **issues** - 問題追蹤（描述、發起人、指派者、狀態）
- **maintenance_records** - 維護記錄（問題ID、用戶ID、描述）
- **schedule** - 排程管理（用戶ID、設備ID、標題、時間）
- **energy_record** - 能源記錄（設備ID、類型、日期、消耗量）

## 🚀 快速開始

### 1. 環境需求
- Node.js 18+
- PostgreSQL 12+
- npm 或 yarn

### 2. 安裝依賴

```bash
# 安裝所有依賴（後端 + 前端）
npm run install:all

# 或分別安裝
npm install                    # 後端依賴
cd frontend && npm install     # 前端依賴
```

### 3. 環境配置

複製 `.env.example` 到 `.env` 並配置：

```bash
# 資料庫配置
DATABASE_URL=postgresql://username:password@localhost:5432/carbon_db

# JWT 配置
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# 伺服器配置
PORT=3000
NODE_ENV=development

# CORS 配置
CORS_ORIGIN=http://localhost:3000
```

### 4. 資料庫設置

```bash
# 推送資料庫 schema
npm run db:push

# 啟動 Drizzle Studio（可選）
npm run db:studio
```

### 5. 開發模式

```bash
# 同時啟動後端和前端
npm run dev:full

# 或分別啟動
npm run dev              # 後端開發伺服器 (http://localhost:3000)
npm run dev:frontend     # 前端開發伺服器 (http://localhost:3001)
```

### 6. 建置部署

```bash
# 建置整個專案
npm run build

# 啟動生產環境
npm run start            # 後端
npm run start:frontend   # 前端
```

## 📋 開發腳本

| 腳本 | 描述 |
|------|------|
| `npm run dev` | 啟動後端開發伺服器 |
| `npm run dev:frontend` | 啟動前端開發伺服器 |
| `npm run dev:full` | 同時啟動前後端開發伺服器 |
| `npm run build` | 建置整個專案 |
| `npm run build:backend` | 建置後端 |
| `npm run build:frontend` | 建置前端 |
| `npm run start` | 啟動生產環境後端 |
| `npm run start:frontend` | 啟動生產環境前端 |
| `npm run test` | 執行測試 |
| `npm run test:watch` | 監視模式測試 |
| `npm run db:push` | 推送資料庫 schema |
| `npm run db:studio` | 啟動 Drizzle Studio |
| `npm run install:all` | 安裝所有依賴 |
| `npm run clean` | 清理建置檔案 |
| `npm run lint` | 程式碼檢查 |
| `npm run lint:fix` | 自動修復程式碼問題 |

## 🔌 API 端點

### 認證 API
- `POST /api/auth/register` - 用戶註冊
- `POST /api/auth/login` - 用戶登入
- `GET /api/auth/profile` - 獲取個人資料
- `POST /api/auth/logout` - 用戶登出

### 碳管理 API
- `POST /api/carbon` - 創建碳記錄
- `GET /api/carbon/my-data` - 獲取用戶的碳數據
- `GET /api/carbon/:id` - 獲取特定碳記錄
- `PUT /api/carbon/:id` - 更新碳記錄
- `DELETE /api/carbon/:id` - 刪除碳記錄

### 管理員 API
- `GET /api/admin/all-carbon-data` - 獲取所有碳數據
- `GET /api/admin/user-carbon-data/:userId` - 獲取特定用戶的碳數據
- `GET /api/admin/carbon-stats` - 獲取碳統計資料
- `GET /api/admin/users` - 獲取用戶列表
- `PUT /api/admin/users/:id` - 更新用戶權限

## 🎨 前端頁面

### 認證頁面
- `/page_login` - 登入頁面
- `/page_register` - 註冊頁面
- `/page_forget` - 忘記密碼

### 儀表板
- `/manager_dashboard` - 管理員儀表板
- `/staff_dashboard` - 員工儀表板
- `/boss_dashboard` - 老闆儀表板

### 功能頁面
- `/page_profile` - 用戶資料
- `/page_projects` - 專案管理
- `/page_contacts` - 聯絡人管理
- `/page_inbox` - 訊息收件匣
- `/page_chat` - 即時聊天

### 設定頁面
- `/settings_theme_modes` - 主題模式設定
- `/settings_skin_options` - 外觀設定
- `/settings_layout_options` - 版面配置

## 🐳 Docker 部署

### 使用 Docker Compose

```bash
# 建置並啟動服務
docker-compose up -d

# 查看日誌
docker-compose logs -f

# 停止服務
docker-compose down
```

### 手動建置

```bash
# 建置 Docker 映像
docker build -t carbon-management-system .

# 運行容器
docker run -p 3000:3000 carbon-management-system
```

## 🧪 測試

```bash
# 執行所有測試
npm test

# 監視模式
npm run test:watch

# 測試覆蓋率
npm run test:coverage
```

## 📊 功能特色

### 碳足跡管理
- 燃料消耗追蹤
- 電力使用監控
- 碳排放係數計算
- 歷史數據分析
- 趨勢圖表顯示

### 設備管理
- 設備狀態監控
- 維護記錄追蹤
- 排程管理
- 問題回報系統
- 能源消耗記錄

### 用戶管理
- 多角色權限控制
- 用戶資料管理
- 登入登出功能
- 密碼加密保護
- JWT 身份驗證

### 資料視覺化
- 豐富的圖表類型
- 即時數據更新
- 互動式儀表板
- 報表匯出功能
- 響應式設計

## 🔒 安全性

- **JWT 認證**：安全的身份驗證機制
- **密碼加密**：使用 bcryptjs 加密密碼
- **CORS 保護**：跨域資源共享控制
- **Helmet 安全頭**：防止常見的 Web 攻擊
- **資料驗證**：使用 Zod 進行輸入驗證
- **SQL 注入防護**：使用 Drizzle ORM 防止 SQL 注入

## 🤝 貢獻指南

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📝 授權

此專案採用 MIT 授權 - 詳見 [LICENSE](LICENSE) 檔案

## 📞 支援

如有問題或建議，請：
1. 查看 [Issues](../../issues) 頁面
2. 創建新的 Issue
3. 聯繫開發團隊

---

**Carbon Management System** - 讓碳足跡管理變得簡單高效 🍃 