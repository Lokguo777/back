# DATABASE_URL 連接字串說明

## 連接字串格式

```
postgresql://username:password@host:port/database_name
```

## 各部分說明

### 1. 協議 (Protocol)
```
postgresql://
```
- 指定資料庫類型為 PostgreSQL
- 其他常見協議：`mysql://`, `sqlite://`, `mongodb://`

### 2. 使用者名稱 (Username)
```
postgres
```
- 資料庫使用者的名稱
- 在 PostgreSQL 中，預設的超級使用者通常是 `postgres`
- 你也可以創建其他使用者

### 3. 密碼 (Password)
```
password
```
- 資料庫使用者的密碼
- **重要**：這應該是強密碼，不要使用預設密碼

### 4. 主機 (Host)
```
localhost
```
- 資料庫伺服器的位址
- `localhost` = 本機
- 如果是遠端資料庫，會是 IP 位址或網域名稱

### 5. 埠號 (Port)
```
5432
```
- PostgreSQL 的預設埠號
- 其他資料庫的預設埠號：
  - MySQL: 3306
  - MongoDB: 27017
  - Redis: 6379

### 6. 資料庫名稱 (Database Name)
```
carbon_management_dev
```
- 你要連接的具體資料庫名稱
- 建議使用有意義的名稱，並加上環境後綴

## 你的專案配置

### 使用 Docker (推薦)

你的專案已經配置了 Docker，可以直接使用：

```bash
# 啟動資料庫和應用程式
cd docker
docker-compose up -d

# 或者只啟動資料庫
docker-compose up -d postgres
```

對應的 DATABASE_URL：
```env
# 使用 Docker 時的配置
DATABASE_URL=postgresql://postgres:password@localhost:5432/carbon_management
```

### 不使用 Docker

如果你想在本地安裝 PostgreSQL：

```bash
# 1. 安裝 PostgreSQL (Windows)
# 從 https://www.postgresql.org/download/windows/ 下載安裝

# 2. 創建資料庫
psql -U postgres
CREATE DATABASE carbon_management_dev;
CREATE DATABASE carbon_management_test;
\q

# 3. 設定密碼
psql -U postgres
ALTER USER postgres PASSWORD 'your_secure_password';
\q
```

對應的 DATABASE_URL：
```env
# 本地 PostgreSQL 配置
DATABASE_URL=postgresql://postgres:your_secure_password@localhost:5432/carbon_management_dev
```

## 實際操作步驟

### 方法 1: 使用 Docker (最簡單)

1. **啟動資料庫**：
   ```bash
   cd -back/project/docker
   docker-compose up -d postgres
   ```

2. **創建 .env 檔案**：
   ```bash
   cd -back/project
   cp env.example .env
   ```

3. **編輯 .env 檔案**：
   ```env
   # 使用 Docker 的配置
   DATABASE_URL=postgresql://postgres:password@localhost:5432/carbon_management
   ```

4. **測試連接**：
   ```bash
   npm run dev
   ```

### 方法 2: 本地 PostgreSQL

1. **安裝 PostgreSQL**：
   - 下載並安裝 PostgreSQL
   - 設定 postgres 使用者密碼

2. **創建資料庫**：
   ```bash
   psql -U postgres
   CREATE DATABASE carbon_management_dev;
   CREATE DATABASE carbon_management_test;
   \q
   ```

3. **設定 .env 檔案**：
   ```env
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/carbon_management_dev
   ```

## 不同環境的 DATABASE_URL

### 開發環境
```env
# 使用 Docker
DATABASE_URL=postgresql://postgres:password@localhost:5432/carbon_management

# 本地 PostgreSQL
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/carbon_management_dev
```

### 測試環境
```env
# 使用 Docker (需要修改 docker-compose.yml)
DATABASE_URL=postgresql://postgres:password@localhost:5432/carbon_management_test

# 本地 PostgreSQL
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/carbon_management_test
```

### 生產環境
```env
# 雲端資料庫 (例如 AWS RDS, Google Cloud SQL)
DATABASE_URL=postgresql://prod_user:prod_password@your-db-host.com:5432/carbon_management
```

## 測試連接

### 使用 psql 測試
```bash
# 測試 Docker 資料庫
psql "postgresql://postgres:password@localhost:5432/carbon_management"

# 測試本地資料庫
psql "postgresql://postgres:your_password@localhost:5432/carbon_management_dev"
```

### 使用應用程式測試
```bash
# 啟動應用程式
npm run dev

# 如果連接成功，你會看到應用程式正常啟動
# 如果連接失敗，會顯示錯誤訊息
```

## 常見問題解決

### 1. 連接被拒絕
```bash
# 檢查 Docker 是否運行
docker ps

# 檢查 PostgreSQL 容器狀態
docker-compose ps

# 重新啟動容器
docker-compose restart postgres
```

### 2. 資料庫不存在
```bash
# 連接到 PostgreSQL
psql -U postgres -h localhost

# 創建資料庫
CREATE DATABASE carbon_management_dev;
CREATE DATABASE carbon_management_test;
```

### 3. 權限問題
```bash
# 連接到 PostgreSQL
psql -U postgres -h localhost

# 授予權限
GRANT ALL PRIVILEGES ON DATABASE carbon_management_dev TO postgres;
```

## 安全建議

1. **生產環境**：
   - 使用強密碼
   - 啟用 SSL 連接
   - 限制資料庫存取 IP

2. **開發環境**：
   - 可以使用簡單密碼
   - 但不要使用預設密碼

3. **密碼管理**：
   - 使用環境變數
   - 不要將密碼寫在程式碼中
   - 定期更換密碼
