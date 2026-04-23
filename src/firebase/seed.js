import { db } from './firebase/firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const seedDatabase = async () => {
  console.log("Starting Database Seeding Protocol...");

  const data = {
    roadmaps: [
      {
        id: 'fullstack',
        title: 'Full-Stack Architecture',
        description: 'Master the entire stack from low-level systems to high-performance frontends.',
        level: 'Advanced',
        modules: 12,
        duration: '24 Weeks'
      },
      {
        id: 'security',
        title: 'Adversarial Engineering',
        description: 'Deep dive into offensive and defensive network protocols.',
        level: 'Elite',
        modules: 8,
        duration: '16 Weeks'
      }
    ],
    courses: [
      {
        id: 'react-systems',
        title: 'Advanced React Systems',
        description: 'Optimize high-performance dashboards and state management.',
        category: 'Development',
        difficulty: 'Hard',
        xp: 1500
      },
      {
        id: 'kernel-security',
        title: 'Kernel Security Auditing',
        description: 'Buffer overflow prevention and memory safe architectures.',
        category: 'Security',
        difficulty: 'Elite',
        xp: 3000
      }
    ]
  };

  try {
    for (const roadmap of data.roadmaps) {
      await setDoc(doc(db, 'roadmaps', roadmap.id), {
        ...roadmap,
        createdAt: serverTimestamp()
      });
    }
    for (const course of data.courses) {
      await setDoc(doc(db, 'courses', course.id), {
        ...course,
        createdAt: serverTimestamp()
      });
    }
    console.log("Database Seeding Successful.");
  } catch (err) {
    console.error("Database Seeding Failed:", err);
  }
};

export default seedDatabase;
