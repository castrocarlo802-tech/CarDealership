// Quick Fix for MongoDB Connection
// This will help fix the authentication error

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Your credentials from the terminal
const username = 'alisonjaron9_db_user';
const password = '1kutob11'; // Remove angle brackets
const cluster = 'cluster0.qyphzio.mongodb.net';
const database = 'CarDealership';

// URL encode the password (handles special characters)
const encodedPassword = encodeURIComponent(password);

// Build connection string
const connectionString = `mongodb+srv://${username}:${encodedPassword}@${cluster}/${database}?retryWrites=true&w=majority&appName=Cluster0`;

console.log('🔧 Fixing MongoDB Connection...\n');
console.log('📋 Connection Details:');
console.log(`   Username: ${username}`);
console.log(`   Cluster: ${cluster}`);
console.log(`   Database: ${database}`);
console.log(`   Password: ${'*'.repeat(password.length)} (hidden)\n`);

console.log('🔄 Testing connection...\n');

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 15000
})
.then(async (conn) => {
    console.log('✅ Connection Successful!\n');
    console.log(`📦 Database: ${conn.connection.name}`);
    console.log(`🔗 Cluster: ${conn.connection.host}`);
    console.log(`👤 Connected as: ${conn.connection.user || username}\n`);
    
    // Save to .env file
    const envPath = path.join(__dirname, '.env');
    const envContent = `# MongoDB Atlas Connection String
MONGODB_URI=${connectionString}

# Server Port
PORT=5000
`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Connection string saved to .env file!\n');
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('   ✅ Connection Fixed!');
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📋 Next steps:');
    console.log('   1. Initialize database: node init-database.js');
    console.log('   2. Start server: node server.js');
    console.log('   3. Open browser: http://localhost:5000\n');
    
    await mongoose.disconnect();
    process.exit(0);
})
.catch((error) => {
    console.log('❌ Connection Failed!\n');
    console.log(`Error: ${error.message}\n`);
    
    if (error.message.includes('authentication') || error.message.includes('bad auth')) {
        console.log('🔧 Authentication Error - Solutions:\n');
        console.log('   1. Go to MongoDB Atlas → Database Access');
        console.log('   2. Find user: alisonjaron9_db_user');
        console.log('   3. Click "Edit" → "Edit Password"');
        console.log('   4. Set password to: 1kutob11 (no angle brackets)');
        console.log('   5. Make sure user has "Read and write to any database" permission');
        console.log('   6. Wait 1-2 minutes after changing password\n');
        
        console.log('   OR create a new user:');
        console.log('   1. Click "Add New Database User"');
        console.log('   2. Username: alisonjaron9_db_user');
        console.log('   3. Password: 1kutob11');
        console.log('   4. Privileges: "Read and write to any database"');
        console.log('   5. Click "Add User"\n');
    } else if (error.code === 8000) {
        console.log('🔧 Network Access Issue:');
        console.log('   1. Go to MongoDB Atlas → Network Access');
        console.log('   2. Click "Add IP Address"');
        console.log('   3. Add: 0.0.0.0/0 (for testing)');
        console.log('   4. Wait 1-2 minutes\n');
    }
    
    console.log('💡 After fixing, run: node fix-connection.js\n');
    process.exit(1);
});

