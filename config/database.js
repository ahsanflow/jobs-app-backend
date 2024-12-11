import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/candidate');

        console.log('MongoDB connected!');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

export { connectDB }; // Use ES module export
