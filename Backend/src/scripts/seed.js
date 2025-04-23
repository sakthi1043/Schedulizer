import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Subject from '../model/subject.model.js';
import Faculty from '../model/faculty.model.js';
import Classroom from '../model/room.model.js';
import Batch from '../model/batch.model.js';
import Timeslot from '../model/timeslot.model.js';
import Timetable from '../model/timetable.model.js';

dotenv.config();

// Database Connection with Retry
async function connectWithRetry() {
  const MONGODB_URI = process.env.MONGODB_URI;
  const maxRetries = 5;
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 30000,
        maxPoolSize: 50
      });
      console.log('✅ MongoDB connected');
      return;
    } catch (err) {
      retries++;
      console.error(`❌ Connection attempt ${retries} failed:`, err.message);
      if (retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 2000 * retries));
      }
    }
  }
  throw new Error('Could not connect to MongoDB after multiple attempts');
}

// Configuration
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const TIMESLOTS = [
  { startTime: '09:00', endTime: '10:30' },
  { startTime: '10:30', endTime: '12:00' },
  { startTime: '13:00', endTime: '14:30' },
  { startTime: '14:30', endTime: '16:00' }
];

// Sample Data
const SAMPLE_DATA = {
  subjects: [
    { code: 'MATH101', name: 'Mathematics', lectureHours: 4, type: 'theory', credits: 4 },
    { code: 'PHYS102', name: 'Physics', lectureHours: 3, type: 'theory', credits: 4 },
    { code: 'PHYSLAB', name: 'Physics Lab', lectureHours: 2, type: 'lab', credits: 1 },
    { code: 'CS201', name: 'Programming', lectureHours: 3, type: 'theory', credits: 3 },
    { code: 'CHEM103', name: 'Chemistry', lectureHours: 3, type: 'theory', credits: 4 },
    { code: 'ENG101', name: 'English', lectureHours: 2, type: 'theory', credits: 2 }
  ],
  faculty: [
    { 
      name: 'Dr. John Doe', 
      email: 'john.doe@university.edu',
      subjects: ['MATH101', 'PHYSLAB'],
      availability: [
        { day: 'Mon', times: ['09:00-10:30', '10:30-12:00'] },
        { day: 'Wed', times: ['13:00-14:30'] }
      ]
    },
    { 
      name: 'Prof. Alice Smith', 
      email: 'alice.smith@university.edu',
      subjects: ['PHYS102', 'CS201'],
      availability: [
        { day: 'Tue', times: ['09:00-10:30', '13:00-14:30'] },
        { day: 'Thu', times: ['10:30-12:00'] }
      ]
    },
    { 
      name: 'Dr. Bob Johnson', 
      email: 'bob.johnson@university.edu',
      subjects: ['MATH101', 'CHEM103'],
      availability: [
        { day: 'Mon', times: ['13:00-14:30'] },
        { day: 'Wed', times: ['09:00-10:30'] },
        { day: 'Fri', times: ['10:30-12:00', '14:30-16:00'] }
      ]
    },
    { 
      name: 'Prof. Sarah Williams', 
      email: 'sarah.williams@university.edu',
      subjects: ['ENG101'],
      availability: [
        { day: 'Tue', times: ['10:30-12:00', '14:30-16:00'] },
        { day: 'Thu', times: ['09:00-10:30'] }
      ]
    }
  ],
  classrooms: [
    { roomNumber: '101', capacity: 40, type: 'theory' },
    { roomNumber: '102', capacity: 35, type: 'theory' },
    { roomNumber: '103', capacity: 30, type: 'theory' },
    { roomNumber: 'Lab-A', capacity: 25, type: 'lab' },
    { roomNumber: 'Lab-B', capacity: 20, type: 'lab' },
    { roomNumber: 'Auditorium', capacity: 100, type: 'theory' }
  ],
  batches: [
    { 
      name: 'CS-2023', 
      semester: 3,
      studentCount: 35,
      subjects: ['MATH101', 'PHYSLAB', 'CS201', 'ENG101']
    },
    { 
      name: 'PHYS-2023',
      semester: 2,
      studentCount: 28,
      subjects: ['MATH101', 'PHYS102', 'PHYSLAB']
    },
    { 
      name: 'CHEM-2023',
      semester: 4,
      studentCount: 32,
      subjects: ['MATH101', 'CHEM103', 'ENG101']
    }
  ]
};

// Clear all collections
async function clearCollections() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

// Create initial data with proper references
async function createInitialData() {
  // Create Timeslots
  const timeslots = await Timeslot.insertMany(TIMESLOTS);
  console.log(`✅ Created ${timeslots.length} timeslots`);

  // Create Subjects and build code-to-ID map
  const createdSubjects = await Subject.insertMany(SAMPLE_DATA.subjects);
  console.log(`✅ Created ${createdSubjects.length} subjects`);
  const subjectCodeMap = new Map(createdSubjects.map(s => [s.code, s._id]));

  // Create Classrooms
  const classrooms = await Classroom.insertMany(SAMPLE_DATA.classrooms);
  console.log(`✅ Created ${classrooms.length} classrooms`);

  // Create Faculty with subject references
  const facultyMembers = await Faculty.insertMany(
    SAMPLE_DATA.faculty.map(f => ({
      ...f,
      subjects: f.subjects.map(code => subjectCodeMap.get(code))
    }))
  );
  console.log(`✅ Created ${facultyMembers.length} faculty members`);

  // Create Batches with subject references
  const batches = await Batch.insertMany(
    SAMPLE_DATA.batches.map(b => ({
      ...b,
      subjects: b.subjects.map(code => subjectCodeMap.get(code))
    }))
  );
  console.log(`✅ Created ${batches.length} batches`);

  return { 
    timeslots, 
    subjects: createdSubjects, 
    facultyMembers, 
    classrooms, 
    batches 
  };
}

// Check faculty availability
function isFacultyAvailable(faculty, day, timeslot) {
  const availability = faculty.availability.find(a => a.day === day);
  if (!availability) return false;
  
  const slotString = `${timeslot.startTime}-${timeslot.endTime}`;
  return availability.times.includes(slotString);
}

// Generate timetable with conflict detection
async function generateTimetable(data) {
  const { batches, facultyMembers, classrooms, timeslots, subjects } = data;
  const timetableEntries = [];
  const conflicts = [];
  
  // Create lookup maps for efficient access
  const subjectMap = new Map(subjects.map(s => [s._id.toString(), s]));
  const facultySubjectMap = new Map();
  const classroomTypeMap = new Map();
  
  // Map faculty to their subjects
  facultyMembers.forEach(faculty => {
    faculty.subjects.forEach(subjectId => {
      const key = subjectId.toString();
      if (!facultySubjectMap.has(key)) {
        facultySubjectMap.set(key, []);
      }
      facultySubjectMap.get(key).push(faculty);
    });
  });
  
  // Organize classrooms by type
  classrooms.forEach(room => {
    if (!classroomTypeMap.has(room.type)) {
      classroomTypeMap.set(room.type, []);
    }
    classroomTypeMap.get(room.type).push(room);
  });
  
  // Sort classrooms by capacity (ascending)
  classroomTypeMap.forEach(rooms => {
    rooms.sort((a, b) => a.capacity - b.capacity);
  });
  
  // Generate all possible time slots
  const allSlots = [];
  DAYS.forEach(day => {
    timeslots.forEach(timeslot => {
      allSlots.push({ day, timeslot });
    });
  });
  
  // Schedule each batch
  for (const batch of batches) {
    console.log(`\n📅 Scheduling ${batch.name} (${batch.studentCount} students)`);
    
    for (const subjectId of batch.subjects) {
      const subject = subjectMap.get(subjectId.toString());
      if (!subject) {
        conflicts.push(`Subject not found for ID: ${subjectId} in ${batch.name}`);
        continue;
      }
      
      const requiredSessions = Math.ceil(subject.lectureHours / 1.5);
      const facultyOptions = facultySubjectMap.get(subject._id.toString()) || [];
      
      if (facultyOptions.length === 0) {
        conflicts.push(`No faculty available for ${subject.name} in ${batch.name}`);
        continue;
      }
      
      // Get suitable classrooms that can accommodate the batch
      const suitableClassrooms = (classroomTypeMap.get(subject.type) || [])
        .filter(room => room.capacity >= batch.studentCount);
      
      if (suitableClassrooms.length === 0) {
        conflicts.push(`No suitable ${subject.type} classroom available for ${subject.name} in ${batch.name} (needs ${batch.studentCount} capacity)`);
        continue;
      }
      
      console.log(`- ${subject.name} (${subject.type}, ${requiredSessions} sessions needed)`);
      
      let scheduledSessions = 0;
      const shuffledSlots = [...allSlots].sort(() => Math.random() - 0.5);
      
      // Try to schedule each required session
      for (let i = 0; i < requiredSessions && scheduledSessions < requiredSessions; i++) {
        // Find available faculty for this subject
        const availableFaculty = facultyOptions.filter(f => 
          shuffledSlots.some(slot => isFacultyAvailable(f, slot.day, slot.timeslot))
        );
        
        if (availableFaculty.length === 0) {
          conflicts.push(`No available faculty for ${subject.name} in ${batch.name}`);
          break;
        }
        
        // Try to find a suitable slot
        for (const slot of shuffledSlots) {
          if (scheduledSessions >= requiredSessions) break;
          
          // Check if batch already has a class at this time
          const batchConflict = timetableEntries.some(entry => 
            entry.batch.equals(batch._id) && 
            entry.day === slot.day && 
            entry.timeslot.equals(slot.timeslot._id)
          );
          
          if (batchConflict) continue;
          
          // Find available faculty for this slot
          const facultyForSlot = availableFaculty.find(f => 
            isFacultyAvailable(f, slot.day, slot.timeslot) &&
            !timetableEntries.some(entry => 
              entry.faculty.equals(f._id) && 
              entry.day === slot.day && 
              entry.timeslot.equals(slot.timeslot._id)
            )
          );
          
          if (!facultyForSlot) continue;
          
          // Find available classroom that fits the batch
          const classroom = suitableClassrooms.find(room => 
            !timetableEntries.some(entry => 
              entry.classroom.equals(room._id) && 
              entry.day === slot.day && 
              entry.timeslot.equals(slot.timeslot._id)
            )
          );
          
          if (classroom) {
            timetableEntries.push({
              batch: batch._id,
              faculty: facultyForSlot._id,
              subject: subject._id,
              classroom: classroom._id,
              timeslot: slot.timeslot._id,
              day: slot.day
            });
            
            scheduledSessions++;
            console.log(`  ✓ Scheduled session ${scheduledSessions}/${requiredSessions}: ${slot.day} ${slot.timeslot.startTime}-${slot.timeslot.endTime} with ${facultyForSlot.name} in ${classroom.roomNumber}`);
            break;
          }
        }
      }
      
      if (scheduledSessions < requiredSessions) {
        conflicts.push(`Could only schedule ${scheduledSessions}/${requiredSessions} sessions for ${subject.name} in ${batch.name}`);
      }
    }
  }
  
  // Insert all timetable entries
  if (timetableEntries.length > 0) {
    await Timetable.insertMany(timetableEntries);
    console.log(`\n✅ Successfully scheduled ${timetableEntries.length} sessions`);
  } else {
    console.log('\n⚠️ No sessions were scheduled');
  }
  
  // Log any conflicts
  if (conflicts.length > 0) {
    console.log('\n⚠️ Scheduling conflicts:');
    conflicts.forEach(conflict => console.log(`- ${conflict}`));
  }
  
  return { timetableEntries, conflicts };
}

// Main function
async function seedData() {
  try {
    await connectWithRetry();
    await clearCollections();
    
    console.log('🚀 Starting data generation...');
    const initialData = await createInitialData();
    
    console.log('\n⏳ Generating timetable...');
    await generateTimetable(initialData);
    
    await mongoose.disconnect();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedData();