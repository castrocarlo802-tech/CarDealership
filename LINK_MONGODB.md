# 🔗 Link Your Code to MongoDB - Quick Guide

## ✅ Your code is already set up to connect to MongoDB!

The connection is configured in `db.js` and `server.js`. You just need to provide your MongoDB credentials.

## 🚀 Quick Setup (3 Steps)

### Step 1: Run the Connection Script

```bash
node connect-mongodb.js
```

This interactive script will:
- Ask for your MongoDB credentials
- Test the connection
- Save credentials to `.env` file
- Verify everything works

### Step 2: Get Your MongoDB Connection String

**From MongoDB Atlas:**
1. Go to: https://cloud.mongodb.com/
2. Click **"Database"** (left sidebar)
3. Click **"Connect"** on your cluster
4. Choose **"Connect your application"**
5. Copy the connection string
6. Replace `<password>` with your actual password
7. Replace `<dbname>` with `CarDealership`

**Example:**
```
mongodb+srv://myuser:mypassword123@cluster0.xxxxx.mongodb.net/CarDealership?retryWrites=true&w=majority
```

### Step 3: Verify Connection

After running the script, test it:
```bash
node server.js
```

You should see:
```
✅ MongoDB Atlas Connected Successfully!
📦 Database: CarDealership
🚗 Server running on port 5000
```

## 📝 Alternative: Manual Setup

### Option A: Create .env File

Create file `D:\MONGO_APP\.env`:

```
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/CarDealership?retryWrites=true&w=majority
PORT=5000
```

### Option B: Edit db.js Directly

Edit `db.js` lines 13-16:

```javascript
const username = 'your_username';
const password = 'your_password';
const cluster = 'your_cluster.mongodb.net';
const database = 'CarDealership';
```

## ⚙️ MongoDB Atlas Configuration

Before connecting, make sure:

### 1. Network Access
- Go to MongoDB Atlas → **Network Access**
- Click **"Add IP Address"**
- Add `0.0.0.0/0` (allows all IPs for testing)
- Or add your specific IP address
- Click **"Confirm"**

### 2. Database User
- Go to MongoDB Atlas → **Database Access**
- Click **"Add New Database User"** (if needed)
- Username: Your choice
- Password: Your choice
- Privileges: **"Read and write to any database"**
- Click **"Add User"**

### 3. Wait 1-2 minutes
After making changes in Atlas, wait a minute for them to take effect.

## 🧪 Test Your Connection

```bash
# Test connection only
node test-connection.js

# Or start the full server
node server.js
```

## 📁 How It Works

Your code structure:
```
server.js
  └─> Calls connectDB() from db.js
       └─> Connects to MongoDB Atlas
            └─> Uses credentials from .env or db.js
```

## ✅ Success Indicators

When connected, you'll see:
- ✅ MongoDB Atlas Connected Successfully!
- 📦 Database: CarDealership
- 🚗 Server running on port 5000

## 🆘 Troubleshooting

### Authentication Error?
- Verify username/password in MongoDB Atlas
- Check user has "Read and write" permissions
- Run: `node connect-mongodb.js` to update credentials

### Network Error?
- Check Network Access in MongoDB Atlas
- Add 0.0.0.0/0 for testing
- Wait 1-2 minutes after changes

### Still Not Working?
Run diagnostics:
```bash
node test-connection.js
```

## 🎯 Next Steps After Connection

Once connected:
1. ✅ Your server will start automatically
2. ✅ Users can register/login at: http://localhost:5000/login.html
3. ✅ View users at: http://localhost:5000/users
4. ✅ All data saves to MongoDB CarDealership database

---

**Ready? Run:** `node connect-mongodb.js`

