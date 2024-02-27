import app from './index';
import mongoose from 'mongoose';


mongoose.connect('mongodb://localhost:27017/myBlogsDatabase')
  .then(() => {
    console.log('Connected to MongoDB !! ');
    
    app.listen(7000, () => {
      console.log(`Server is running on port 7000`);
    });
  })
  .catch((error) => {
    console.error('Error in connecting to MongoDB:', error);
  });

  export default app;