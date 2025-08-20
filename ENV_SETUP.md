# 環境配置說明

## .env 檔案的作用

`.env` 檔案用來儲存環境變數，讓應用程式在不同環境下使用不同的配置。

## 不同環境的配置

### 1. 開發環境 (.env.development)

```env
# 開發環境配置
NODE_ENV=development
PORT=3000

# 開發環境資料庫 (本地 PostgreSQL)
DATABASE_URL=postgresql://postgres:password@localhost:5432/carbon_management_dev

# JWT 配置 (開發環境可以使用較簡單的密鑰)
JWT_SECRET=dev-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# CORS 配置 (允許本地開發)
CORS_ORIGIN=http://localhost:3000

# 日誌等級 (開發環境需要詳細日誌)
LOG_LEVEL=debug
```

### 2. 測試環境 (.env.test)

```env
# 測試環境配置
NODE_ENV=test
PORT=3001

# 測試環境資料庫 (使用測試專用資料庫)
DATABASE_URL=postgresql://postgres:password@localhost:5432/carbon_management_test

# JWT 配置 (測試環境使用較短的過期時間)
JWT_SECRET=test-secret-key
JWT_EXPIRES_IN=1h

# CORS 配置
CORS_ORIGIN=http://localhost:3001

# 日誌等級 (測試環境減少日誌輸出)
LOG_LEVEL=error
```

### 3. 生產環境 (.env.production)

```env
# 生產環境配置
NODE_ENV=production
PORT=8080

# 生產環境資料庫 (正式資料庫)
DATABASE_URL=postgresql://prod_user:strong_password@prod-db-host:5432/carbon_management

# JWT 配置 (生產環境必須使用強密鑰)
JWT_SECRET=your-super-secure-production-jwt-secret-key-here
JWT_EXPIRES_IN=7d

# CORS 配置 (只允許正式網域)
CORS_ORIGIN=https://your-production-domain.com

# 日誌等級 (生產環境只記錄重要日誌)
LOG_LEVEL=info
```

## 如何設定環境

### 方法 1: 使用 .env 檔案 (推薦)

1. 複製 `env.example` 為 `.env`：
   ```bash
   cp env.example .env
   ```

2. 根據你的環境修改 `.env` 檔案中的值

### 方法 2: 使用環境變數

在啟動時設定環境變數：

```bash
# Windows PowerShell
$env:NODE_ENV="development"; $env:DATABASE_URL="your-db-url"; npm run dev

# Linux/Mac
NODE_ENV=development DATABASE_URL=your-db-url npm run dev
```

### 方法 3: 使用 .env 檔案切換

創建不同環境的 `.env` 檔案：

```bash
# 開發環境
cp .env.development .env

# 測試環境
cp .env.test .env

# 生產環境
cp .env.production .env
```

## 重要注意事項

1. **安全性**：
   - 永遠不要將 `.env` 檔案提交到 Git
   - 生產環境的密鑰必須是強密鑰
   - 定期更換密鑰

2. **資料庫配置**：
   - 開發環境：使用本地資料庫
   - 測試環境：使用測試專用資料庫
   - 生產環境：使用正式資料庫

3. **日誌等級**：
   - `debug`: 最詳細的日誌，適合開發
   - `info`: 一般資訊，適合生產
   - `warn`: 只記錄警告
   - `error`: 只記錄錯誤

4. **CORS 配置**：
   - 開發環境：允許本地網域
   - 生產環境：只允許正式網域

## 驗證環境配置

你的專案已經使用 Zod 來驗證環境變數，確保所有必要的變數都已正確設定。

如果環境變數設定錯誤，應用程式會在啟動時顯示錯誤訊息並停止執行。

