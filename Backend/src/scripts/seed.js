// scripts/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Subject from '../model/subject.model.js';
import Faculty from '../model/faculty.model.js';
import Classroom from '../model/room.model.js';
import Batch from '../model/batch.model.js';
import Timeslot from '../model/timeslot.model.js';
import Timetable from '../model/timetable.model.js';

dotenv.config();

async function connectWithRetry() {
  const MONGODB_URI = process.env.MONGODB_URI + "?retryWrites=true&w=majority&socketTimeoutMS=30000";
  const maxRetries = 3;
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 30000,
      });
      console.log('✅ MongoDB connected');
      return;
    } catch (err) {
      retries++;
      console.error(`❌ Connection attempt ${retries} failed:`, err.message);
      if (retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  throw new Error('Could not connect to MongoDB after multiple attempts');
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TIMESLOTS = [
  { startTime: '09:00', endTime: '10:00' },
  { startTime: '10:00', endTime: '11:00' },
  { startTime: '11:00', endTime: '12:00' },
  { startTime: '12:00', endTime: '13:00' },
  { startTime: '14:00', endTime: '15:00' },
  { startTime: '15:00', endTime: '16:00' }
];

async function seedData() {
  try {
    await connectWithRetry();

    // Clear all existing data
    await Promise.all([
      Subject.deleteMany({}),
      Faculty.deleteMany({}),
      Classroom.deleteMany({}),
      Batch.deleteMany({}),
      Timeslot.deleteMany({}),
      Timetable.deleteMany({})
    ]);

    // Create Timeslots
    const timeslots = await Timeslot.insertMany(TIMESLOTS);
    console.log(`✅ Created ${timeslots.length} timeslots`);

    // Create Subjects with proper types
    const subjectsToCreate = [
      { name: 'Mathematics', lectureHours: 4, type: 'theory' },
      { name: 'Physics Lab', lectureHours: 2, type: 'lab' },
      { name: 'Programming', lectureHours: 3, type: 'theory' },
      { name: 'Chemistry', lectureHours: 3, type: 'theory' },
      { name: 'English', lectureHours: 2, type: 'theory' }
    ];

    const subjects = await Subject.insertMany(subjectsToCreate);
    console.log('✅ Created subjects:');
    subjects.forEach(s => console.log(`- ${s.name} (${s.type}, ${s.lectureHours}hrs)`));

    // Create Faculty with specialized subjects
    const [john, alice, bob, sarah] = await Faculty.insertMany([
      { name: 'John Doe', subjects: [subjects[0]._id, subjects[2]._id] }, // Math, Programming
      { name: 'Alice Smith', subjects: [subjects[1]._id, subjects[3]._id] }, // Physics, Chemistry
      { name: 'Bob Johnson', subjects: [subjects[0]._id, subjects[3]._id] }, // Math, Chemistry
      { name: 'Sarah Williams', subjects: [subjects[4]._id] } // English
    ]);
    console.log(`✅ Created ${await Faculty.countDocuments()} faculty members`);

    // Create Classrooms with varied capacities
    const classrooms = await Classroom.insertMany([
      { name: 'Room 101', capacity: 40, type: 'theory' },
      { name: 'Room 102', capacity: 30, type: 'theory' },
      { name: 'Lab 1', capacity: 25, type: 'lab' },
      { name: 'Lab 2', capacity: 20, type: 'lab' },
      { name: 'Auditorium', capacity: 100, type: 'theory' }
    ]);
    console.log(`✅ Created ${classrooms.length} classrooms`);

    // Create Batches with subjects
    const [batchA, batchB] = await Batch.insertMany([
      { 
        name: 'Batch A', 
        subjects: [subjects[0]._id, subjects[1]._id, subjects[2]._id, subjects[4]._id], // Math, Physics, Programming, English
        size: 35
      },
      { 
        name: 'Batch B',
        subjects: [subjects[0]._id, subjects[3]._id, subjects[1]._id], // Math, Chemistry, Physics
        size: 30
      }
    ]);
    console.log(`✅ Created ${await Batch.countDocuments()} batches`);

    // Generate timetable
    console.log('\nGenerating timetable...');

    // Get all data with proper population
    const [allBatches, allFaculties, allClassrooms, allSubjects] = await Promise.all([
      Batch.find().populate('subjects'),
      Faculty.find().populate('subjects'),
      Classroom.find(),
      Subject.find()
    ]);

    // Create lookup maps
    const facultySubjectMap = new Map();
    allFaculties.forEach(faculty => {
      faculty.subjects.forEach(subject => {
        const subjectId = subject._id.toString();
        if (!facultySubjectMap.has(subjectId)) {
          facultySubjectMap.set(subjectId, []);
        }
        facultySubjectMap.get(subjectId).push(faculty._id);
      });
    });

    const classroomTypeMap = new Map();
    allClassrooms.forEach(room => {
      if (!classroomTypeMap.has(room.type)) {
        classroomTypeMap.set(room.type, []);
      }
      classroomTypeMap.get(room.type).push(room._id);
    });

    const sessionsToInsert = [];
    const usedSlots = new Set();

    // Generate all possible time slots
    const allSlots = [];
    DAYS.forEach(day => {
      timeslots.forEach(slot => {
        allSlots.push({ day, timeslot: slot._id });
      });
    });

    // Shuffle slots for better distribution
    const shuffledSlots = [...allSlots].sort(() => Math.random() - 0.5);

    // Schedule each batch
    for (const batch of allBatches) {
      console.log(`\nScheduling for ${batch.name}`);
      
      for (const subject of batch.subjects) {
        const requiredHours = subject.lectureHours;
        const facultyOptions = facultySubjectMap.get(subject._id.toString()) || [];
        
        if (facultyOptions.length === 0) {
          console.warn(`⚠️ No faculty available for ${subject.name}`);
          continue;
        }

        const suitableClassrooms = classroomTypeMap.get(subject.type) || [];
        if (suitableClassrooms.length === 0) {
          console.warn(`⚠️ No ${subject.type} classrooms available for ${subject.name}`);
          continue;
        }

        let assignedHours = 0;
        const faculty = facultyOptions[Math.floor(Math.random() * facultyOptions.length)];

        console.log(`- Scheduling ${subject.name} (${subject.type}, ${requiredHours}hrs)`);

        for (const slot of shuffledSlots) {
          if (assignedHours >= requiredHours) break;
          
          const slotKey = `${slot.day}-${slot.timeslot.toString()}`;
          if (usedSlots.has(slotKey)) continue;

          // Check conflicts
          const facultyConflict = sessionsToInsert.some(s => 
            s.faculty.equals(faculty) && 
            s.day === slot.day && 
            s.timeslot.equals(slot.timeslot)
          );

          const batchConflict = sessionsToInsert.some(s => 
            s.batch.equals(batch._id) && 
            s.day === slot.day && 
            s.timeslot.equals(slot.timeslot)
          );

          if (facultyConflict || batchConflict) continue;

          // Find available classroom
          for (const classroomId of suitableClassrooms) {
            const classroomConflict = sessionsToInsert.some(s => 
              s.classroom.equals(classroomId) && 
              s.day === slot.day && 
              s.timeslot.equals(slot.timeslot)
            );

            if (!classroomConflict) {
              sessionsToInsert.push({
                batch: batch._id,
                faculty,
                subject: subject._id,
                classroom: classroomId,
                timeslot: slot.timeslot,
                day: slot.day
              });

              usedSlots.add(slotKey);
              assignedHours++;
              console.log(`  ✓ Booked ${slot.day} ${(await Timeslot.findById(slot.timeslot)).startTime}-${(await Timeslot.findById(slot.timeslot)).endTime} in ${(await Classroom.findById(classroomId)).name}`);
              break;
            }
          }
        }

        if (assignedHours < requiredHours) {
          console.warn(`  ⚠️ Only scheduled ${assignedHours}/${requiredHours} sessions for ${subject.name}`);
        }
      }
    }

    if (sessionsToInsert.length > 0) {
      await Timetable.insertMany(sessionsToInsert);
      console.log(`\n✅ Successfully scheduled ${sessionsToInsert.length} sessions`);
    } else {
      console.warn('\n⚠️ No sessions were scheduled');
    }

    await mongoose.disconnect();
    console.log('✅ Database connection closed');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedData();