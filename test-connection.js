// Test MongoDB Atlas Connection
const mongoose = require('mongoose');

const testConnection = async () => {
    try {
        // Test with URL-encoded password (in case of special characters)
        const password = encodeURIComponent('papajesus12');
        const MONGODB_URI = `mongodb+srv://johncarloc201_db_user:${password}@cluster0.cptuapp.mongodb.net/CarDealership?retryWrites=true&w=majority&appName=Cluster0`;
        
        console.log('🔄 Testing MongoDB Atlas Connection...');
        console.log('📋 Connection String (password hidden):');
        console.log(`   mongodb+srv://johncarloc201_db_user:***@cluster0.cptuapp.mongodb.net/CarDealership`);
        console.log('');
        
        const conn = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        
        console.log('✅ Connection Successful!');
        console.log(`📦 Database: ${conn.connection.name}`);
        console.log(`🔗 Host: ${conn.connection.host}`);
        console.log(`👤 User: ${conn.connection.user}`);
        
        // Test a simple query
        const collections = await conn.connection.db.listCollections().toArray();
        console.log(`📚 Collections found: ${collections.length}`);
        
        await mongoose.disconnect();
        console.log('✅ Disconnected successfully');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Connection Failed!');
        console.error(`   Error Code: ${error.code || 'Unknown'}`);
        console.error(`   Error Name: ${error.name}`);
        console.error(`   Error Message: ${error.message}`);
        
        if (error.message.includes('authentication failed')) {
            console.error('\n🔧 Authentication Issue:');
            console.error('   → Check if username "johncarloc201_db_user" exists');
            console.error('   → Verify password is correct');
            console.error('   → Go to: Database Access → Check user credentials');
        } else if (error.message.includes('bad auth')) {
            console.error('\n🔧 Bad Authentication:');
            console.error('   → Username or password is incorrect');
            console.error('   → Password might contain special characters that need encoding');
        } else if (error.code === 8000) {
            console.error('\n🔧 Network Access Issue:');
            console.error('   → Even though 0.0.0.0/0 is added, try:');
            console.error('   → 1. Remove and re-add the IP address');
            console.error('   → 2. Wait 5 minutes for changes to propagate');
            console.error('   → 3. Check if there are any IP restrictions');
        }
        
        process.exit(1);
    }
};

testConnection();

