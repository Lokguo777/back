# Docker 本地建置指南

## 步驟 1: 啟動 Docker Desktop

### 方法 1: 使用命令列啟動
```bash
# 啟動 Docker Desktop
docker desktop start
```

## 步驟 2: 確認 Docker 運行狀態

```bash
# 檢查 Docker 是否正常運行
docker info

# 檢查容器列表
docker ps

# 檢查 Docker Compose 版本
docker-compose --version
```

**正常狀態應該顯示：**
- 沒有錯誤訊息
- 顯示 Docker 引擎資訊
- `docker ps` 顯示空列表（正常）

## 步驟 3: 啟動 PostgreSQL 容器

```bash
# 確保在正確的目錄
cd -back/project/docker

# 啟動 PostgreSQL 容器
docker-compose up -d postgres

# 檢查容器狀態
docker ps

# 查看容器日誌
docker-compose logs postgres
```

## 步驟 4: 設定環境變數

```bash
# 回到專案根目錄
cd ..

# 複製環境變數範例
cp env.example .env
```

編輯 `.env` 檔案：
```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration (使用 Docker)
DATABASE_URL=postgresql://postgres:password@localhost:5432/carbon_management

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
```

## 步驟 5: 測試資料庫連接

```bash
# 測試資料庫連接
docker-compose exec postgres psql -U postgres -d carbon_management -c "SELECT version();"

# 或者啟動應用程式測試
npm run dev
```

## 常用 Docker 命令

### 容器管理
```bash
# 啟動所有服務
docker-compose up -d

# 只啟動 PostgreSQL
docker-compose up -d postgres

# 停止所有服務
docker-compose down

# 重新啟動 PostgreSQL
docker-compose restart postgres

# 查看運行中的容器
docker ps

# 查看所有容器（包括停止的）
docker ps -a
```

### 日誌查看
```bash
# 查看 PostgreSQL 日誌
docker-compose logs postgres

# 即時查看日誌
docker-compose logs -f postgres

# 查看所有服務日誌
docker-compose logs
```

### 資料庫操作
```bash
# 進入 PostgreSQL 容器
docker-compose exec postgres psql -U postgres -d carbon_management

# 執行 SQL 查詢
docker-compose exec postgres psql -U postgres -d carbon_management -c "SELECT * FROM users;"

# 備份資料庫
docker-compose exec postgres pg_dump -U postgres carbon_management > backup.sql
```

### 清理操作
```bash
# 停止並刪除容器
docker-compose down

# 停止並刪除容器和網路
docker-compose down --remove-orphans

# 刪除所有容器和映像檔
docker-compose down --rmi all --volumes --remove-orphans

# 清理未使用的資源
docker system prune -a
```

## 故障排除

### 1. Docker Desktop 無法啟動
```bash
# 檢查 Docker Desktop 狀態
docker desktop status

# 重新啟動 Docker Desktop
docker desktop restart

# 如果還是有問題，重啟電腦
```

### 2. 埠號被佔用
```bash
# 檢查 5432 埠號是否被使用
netstat -an | findstr 5432

# 修改 docker-compose.yml 中的埠號
ports:
  - "5433:5432"  # 改為 5433
```

### 3. 容器無法啟動
```bash
# 查看詳細錯誤日誌
docker-compose logs postgres

# 重新創建容器
docker-compose down
docker-compose up -d postgres

# 檢查磁碟空間
docker system df
```

### 4. 權限問題
```bash
# 以管理員身份運行 PowerShell
# 或者檢查 Docker Desktop 設定
```

### 5. 網路問題
```bash
# 檢查 Docker 網路
docker network ls

# 重新創建網路
docker-compose down
docker network prune
docker-compose up -d
```

## 驗證建置成功

### 1. 檢查容器狀態
```bash
docker ps
# 應該看到 carbon_management_db 容器在運行
```

### 2. 測試資料庫連接
```bash
# 使用 psql 測試
docker-compose exec postgres psql -U postgres -d carbon_management -c "SELECT 1;"

# 或者啟動應用程式
npm run dev
```

### 3. 檢查應用程式日誌
```bash
# 如果使用 docker-compose 啟動應用程式
docker-compose logs app
```

## 下一步

Docker 環境建置完成後，你可以：

1. **執行資料庫遷移**：
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

2. **查看資料庫**：
   ```bash
   npm run db:studio
   ```

3. **執行測試**：
   ```bash
   npm test
   ```

4. **啟動完整環境**：
   ```bash
   cd docker
   docker-compose up -d
   ```

## 注意事項

1. **首次啟動**：Docker 需要下載 PostgreSQL 映像檔，可能需要一些時間
2. **資源使用**：Docker 會使用一定的系統資源，確保有足夠的記憶體和磁碟空間
3. **防火牆**：如果遇到網路問題，檢查防火牆設定
4. **定期清理**：定期執行 `docker system prune` 清理未使用的資源
