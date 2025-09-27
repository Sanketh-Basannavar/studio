export const mockStudent = {
  id: 'st-001',
  name: 'Alex',
  progress: 75,
  eduCredits: 1250,
  avatar: 'student-avatar-1',
};

export const mockStudents = [
  { id: 'st-001', name: 'Alex Johnson', progress: 75, eduCredits: 1250, avatar: 'student-avatar-1' },
  { id: 'st-002', name: 'Brenda Smith', progress: 92, eduCredits: 2100, avatar: 'student-avatar-2' },
  { id: 'st-003', name: 'Charles Lee', progress: 58, eduCredits: 800, avatar: 'student-avatar-3' },
  { id: 'st-004', name: 'Diana Ross', progress: 88, eduCredits: 1850, avatar: 'student-avatar-4' },
];

export const mockClassPerformance = [
  { subject: "Algebra", averageScore: 85 },
  { subject: "Biology", averageScore: 72 },
  { subject: "History", averageScore: 78 },
  { subject: "Chemistry", averageScore: 65 },
  { subject: "Literature", averageScore: 81 },
];

export const mockAiTwinProfile = {
    learningStyle: 'Visual & Kinesthetic',
    topSubject: 'Algebra',
    pace: 'Methodical',
    strengths: ['Logical Reasoning', 'Problem Solving', 'Pattern Recognition', 'Geometry'],
    improvementAreas: ['Essay Writing', 'Historical Dates', 'Chemical Formulas'],
    subjectMastery: [
        { subject: 'Algebra', mastery: 92 },
        { subject: 'Biology', mastery: 75 },
        { subject: 'History', mastery: 68 },
        { subject: 'Literature', mastery: 80 },
    ],
    recommendations: [
        'Practice creative writing prompts to improve composition skills.',
        'Use flashcards or mnemonic devices for memorizing historical dates.',
        'Watch video tutorials on complex biological processes for better visualization.'
    ]
}

export const mockLessons = [
    { id: 'les-01', title: 'Factoring Trinomials', subject: 'Mathematics', completed: true },
    { id: 'les-02', title: 'Mitochondria: The Powerhouse', subject: 'Biology', completed: true },
    { id: 'les-03', title: 'The Power of Photosynthesis', subject: 'Biology', completed: false },
    { id: 'les-04', title: 'Creative Writing: Building a Narrative', subject: 'Literature', completed: false },
    { id: 'les-05', title: 'The Causes of World War I', subject: 'History', completed: false },
];

export const mockRecentActivity = [
    { id: 'act-1', studentName: 'Brenda Smith', activity: 'completed the "Cell Structure" lesson.', timestamp: '5m ago' },
    { id: 'act-2', studentName: 'Alex Johnson', activity: 'earned 100 EduCredits for a high quiz score.', timestamp: '1h ago' },
    { id: 'act-3', studentName: 'Diana Ross', activity: 'mastered the "Linear Equations" topic.', timestamp: '3h ago' },
]
