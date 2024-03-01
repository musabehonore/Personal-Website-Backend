import app from './index';
import mongoose from 'mongoose';


mongoose.connect('mongodb+srv://MusabeDB:Musabe1@musabedb.yhmlt9y.mongodb.net/?retryWrites=true&w=majority&appName=MusabeDB')
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