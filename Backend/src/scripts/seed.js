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
const MONGODB_URI = process.env.MONGODB_URI;

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


async function seedData() {
    await mongoose.connect(MONGODB_URI);

    // Create Subjects
  const [math, physics, programming] = await Subject.insertMany([
    { name: 'Mathematics', lectureHours: 4, type: 'theory' },
    { name: 'Physics Lab', lectureHours: 2, type: 'lab' },
    { name: 'Programming', lectureHours: 3, type: 'theory' }
  ]);

  // Create Faculty
  const [john, alice] = await Faculty.insertMany([
    { name: 'John Doe', subjects: [math._id, programming._id] },
    { name: 'Alice Smith', subjects: [physics._id] }
  ]);

  // Create Classrooms
  const [room101, lab1] = await Classroom.insertMany([
    { name: 'Room 101', capacity: 40, type: 'theory' },
    { name: 'Lab 1', capacity: 25, type: 'lab' }
  ]);

  // Create Batch
  const [batchA] = await Batch.insertMany([
    { name: 'Batch A', subjects: [math._id, physics._id, programming._id] }
  ]);

  // Create Timeslots
  const [ts1, ts2, ts3] = await Timeslot.insertMany([
    { startTime: '09:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '11:00' },
    { startTime: '11:00', endTime: '12:00' }
  ]);

  console.log('✅ Seed data created successfully');

    console.log('Generating timetable...');
  
    const [batches, faculties, classrooms, timeslots] = await Promise.all([
      Batch.find({}).populate('subjects'),
      Faculty.find({}),
      Classroom.find({}),
      Timeslot.find({})
    ]);
  
    // Clear existing timetables
    await Timetable.deleteMany({});
    console.log('🧹 Old timetable cleared');
  
    const sessionsToInsert = [];
  
    for (const batch of batches) {
      for (const subject of batch.subjects) {
        // Find a faculty who can teach this subject
        const possibleFaculties = faculties.filter(f => f.subjects.includes(subject._id));
  
        if (possibleFaculties.length === 0) {
          console.warn(`⚠️ No faculty for ${subject.name}`);
          continue;
        }
  
        const faculty = possibleFaculties[Math.floor(Math.random() * possibleFaculties.length)];
  
        // Find suitable classrooms (match type)
        const suitableClassrooms = classrooms.filter(c => c.type === subject.type);
  
        let sessionCount = subject.lectureHours;
  
        while (sessionCount > 0) {
          let assigned = false;
  
          // Try all combinations of day and timeslot
          for (const day of DAYS) {
            for (const slot of timeslots) {
              // Check for conflicts
              const conflict = await Timetable.findOne({
                day,
                timeslot: slot._id,
                $or: [
                  { faculty: faculty._id },
                  { batch: batch._id },
                  { classroom: { $in: suitableClassrooms.map(c => c._id) } }
                ]
              });
  
              if (!conflict) {
                const classroom = suitableClassrooms[Math.floor(Math.random() * suitableClassrooms.length)];
  
                sessionsToInsert.push({
                  batch: batch._id,
                  faculty: faculty._id,
                  subject: subject._id,
                  classroom: classroom._id,
                  timeslot: slot._id,
                  day
                });
  
                assigned = true;
                sessionCount--;
                break;
              }
            }
            if (assigned) break;
          }
  
          if (!assigned) {
            console.warn(`❌ Could not schedule all sessions for ${subject.name} (${batch.name})`);
            break;
          }
        }
      }
    }
  
    await Timetable.insertMany(sessionsToInsert);
    console.log(`✅ Timetable generated successfully with ${sessionsToInsert.length} sessions`);
  
    await mongoose.disconnect();
}

seedData().catch(err => {
  console.error('❌ Seeding failed:', err);
  mongoose.disconnect();
});
