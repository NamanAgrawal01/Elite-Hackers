const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// PLEASE NOTE: To run this seed script, you must have your Firebase Admin SDK serviceAccountKey.json 
// in the same directory, or specify the path below.
// This is required to write secure backend documents directly bypassing client rules.
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const COURSES = [
  {
    id: "python",
    title: "Python Sandbox Operations",
    category: "DATA/ML",
    difficulty: "Beginner",
    xpReward: 500,
    lessons: [
      {
        id: "py-01",
        title: "Initialize IO Functions",
        theory: "Print statements establish baseline communications. Output 'ACCESS GRANTED' to satisfy the node.",
        initialCode: "# Write payload here\n",
        expectedOutput: "ACCESS GRANTED",
        xpReward: 50
      },
      {
        id: "py-02",
        title: "Variable Hoisting Mechanics",
        theory: "Variables store target data. Create a variable 'target' set to 'Mainframe' and print it.",
        initialCode: "target = ''\n# Print target below\n",
        expectedOutput: "Mainframe",
        xpReward: 75
      }
    ]
  },
  {
    id: "javascript",
    title: "JavaScript Network Domination",
    category: "WEB",
    difficulty: "Intermediate",
    xpReward: 400,
    lessons: [
      {
        id: "js-01",
        title: "Console Logging Basics",
        theory: "Use console.log to output 'INITIATE CONNECTION'.",
        initialCode: "// Payload here\n",
        expectedOutput: "INITIATE CONNECTION",
        xpReward: 50
      }
    ]
  }
];

const seedDatabase = async () => {
   try {
      console.log('Seeding Database...');
      const batch = db.batch();
      
      COURSES.forEach(course => {
         const courseRef = db.collection('courses').doc(course.id);
         batch.set(courseRef, course);
      });
      
      // Also seed an example daily challenge
      const challengeRef = db.collection('challenges').doc('today');
      batch.set(challengeRef, {
         title: "Decrypt the Array",
         description: "Extract the highest numerical value contained within a nested array parameter.",
         language: "python",
         xpReward: 500,
         date: new Date()
      });

      await batch.commit();
      console.log('Database Seeding Completed Successfully.');
      process.exit(0);
   } catch (error) {
      console.error('Seeding Failed:', error);
      process.exit(1);
   }
};

seedDatabase();
