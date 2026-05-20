const mongoose = require('mongoose');
const Conflict = require('./models/Conflicts');
const conflicts = require('./data/conflicts.json');

mongoose.connect('mongodb+srv://devanshjain791:gyanganga123@cluster0.sfdkc9v.mongodb.net/conflictDB?appName=Cluster0')
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await Conflict.deleteMany({});
    console.log('🗑️ Old data cleared');
    await Conflict.insertMany(conflicts);
    console.log(`✅ ${conflicts.length} conflicts seeded!`);
    mongoose.connection.close();
  })
  .catch(err => console.log('❌ Error:', err));