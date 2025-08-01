const { dbusername, password } = process.env;

console.log("username,password", dbusername, password);

export const connectionStr = `mongodb+srv://${dbusername}:${password}@cluster0.psqxfb1.mongodb.net/restoDB?retryWrites=true&w=majority&appName=Cluster0`;

// Optimized database connection with connection pooling
let cachedConnection = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const mongoose = await import('mongoose');
    
    // Configure connection options for better performance
    const options = {
      maxPoolSize: 10, // Maximum number of connections in the pool
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Timeout for socket operations
      bufferMaxEntries: 0, // Disable mongoose buffering
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.default.connect(connectionStr, options);
    
    cachedConnection = mongoose.default.connection;
    
    // Handle connection events
    cachedConnection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      cachedConnection = null;
    });

    cachedConnection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      cachedConnection = null;
    });

    console.log('MongoDB connected successfully');
    return cachedConnection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

// Helper function to get database connection
export async function getDbConnection() {
  return await connectToDatabase();
}