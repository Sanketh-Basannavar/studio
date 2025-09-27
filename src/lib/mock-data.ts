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
  { 
    id: 'les-01', 
    title: 'Factoring Trinomials', 
    subject: 'Mathematics', 
    completed: true,
    content: {
      title: 'Mastering Factoring Trinomials',
      description: 'Learn how to factor trinomials of the form ax² + bx + c.',
      sections: [
        {
          heading: 'Introduction to Trinomials',
          paragraphs: [
            'A trinomial is a polynomial with three terms. We will focus on quadratic trinomials, which have the highest exponent of 2.',
            'The general form is ax² + bx + c, where a, b, and c are coefficients.',
          ],
        },
        {
          heading: 'Factoring when a = 1',
          paragraphs: [
            'When the leading coefficient \'a\' is 1, the trinomial is simpler: x² + bx + c.',
            'To factor this, you need to find two numbers that multiply to \'c\' and add up to \'b\'.',
            'For example, to factor x² + 5x + 6, we need two numbers that multiply to 6 and add to 5. These numbers are 2 and 3. So, the factored form is (x + 2)(x + 3).',
          ],
        },
      ],
    },
  },
  { 
    id: 'les-02', 
    title: 'Mitochondria: The Powerhouse', 
    subject: 'Biology', 
    completed: true,
    content: {
      title: 'Mitochondria: The Powerhouse of the Cell',
      description: 'An in-depth look at the function of mitochondria.',
      sections: [
        {
          heading: 'What are Mitochondria?',
          paragraphs: [
            'Mitochondria are organelles found in the cells of most eukaryotes. They are often referred to as the "powerhouses" of the cell.',
            'Their main job is to generate most of the cell\'s supply of adenosine triphosphate (ATP), used as a source of chemical energy.',
          ],
        },
      ],
    },
  },
  { 
    id: 'les-03', 
    title: 'The Power of Photosynthesis', 
    subject: 'Biology', 
    completed: false,
    content: {
      title: 'The Power of Photosynthesis',
      description: 'An introductory lesson to how plants create their own food.',
      sections: [
        {
          heading: 'What is Photosynthesis?',
          paragraphs: [
            'Photosynthesis is a process used by plants, algae, and certain bacteria to convert light energy into chemical energy, through a process that converts carbon dioxide and water into sugars (glucose) and oxygen. This process is fundamental to life on Earth as it provides the primary source of energy for most ecosystems and releases the oxygen we breathe.',
          ],
        },
        {
          heading: 'The Chemical Equation',
          paragraphs: [
            'The overall balanced equation for photosynthesis is:',
            '6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂',
            'This means that six molecules of carbon dioxide and six molecules of water react in the presence of light to produce one molecule of glucose (a sugar) and six molecules of oxygen.',
          ],
        },
        {
          heading: 'Where Does It Happen?',
          paragraphs: [
            'Photosynthesis takes place inside plant cells in small organelles called chloroplasts. Chloroplasts contain a green pigment called chlorophyll, which is what absorbs the light energy from the sun. The entire process is split into two main stages: the light-dependent reactions and the Calvin cycle (light-independent reactions).',
          ],
        },
      ],
    }
  },
  { 
    id: 'les-04', 
    title: 'Creative Writing: Building a Narrative', 
    subject: 'Literature', 
    completed: false,
    content: {
      title: 'Creative Writing: Building a Strong Narrative',
      description: 'Learn the key elements of storytelling.',
      sections: [
        {
          heading: 'The Core Components',
          paragraphs: [
            'Every great story has a few key components: a plot, characters, a setting, a conflict, and a theme.',
            'We will explore each of these elements and how they work together to create a compelling narrative.',
          ],
        },
        {
          heading: 'Plot Structure',
          paragraphs: [
            'The plot is the sequence of events in a story. A classic plot structure includes the exposition, rising action, climax, falling action, and resolution.',
            'Understanding this structure can help you build tension and create a satisfying conclusion for your readers.',
          ],
        },
      ],
    }
  },
  { 
    id: 'les-05', 
    title: 'The Causes of World War I', 
    subject: 'History', 
    completed: false,
    content: {
      title: 'The Spark: Causes of World War I',
      description: 'Understand the complex factors that led to the outbreak of the Great War.',
      sections: [
        {
          heading: 'The MAIN Causes',
          paragraphs: [
            'Historians often summarize the long-term causes of World War I with the acronym MAIN: Militarism, Alliances, Imperialism, and Nationalism.',
            'We will examine how each of these factors created a volatile political climate in early 20th-century Europe.',
          ],
        },
        {
          heading: 'The Assassination',
          paragraphs: [
            'The immediate cause, or "spark," for the war was the assassination of Archduke Franz Ferdinand of Austria-Hungary in Sarajevo on June 28, 1914.',
            'This event triggered a series of ultimatums and mobilizations, plunging the continent into war.',
          ],
        },
      ],
    }
  },
];

export const mockRecentActivity = [
    { id: 'act-1', studentName: 'Brenda Smith', activity: 'completed the "Cell Structure" lesson.', timestamp: '5m ago' },
    { id: 'act-2', studentName: 'Alex Johnson', activity: 'earned 100 EduCredits for a high quiz score.', timestamp: '1h ago' },
    { id: 'act-3', studentName: 'Diana Ross', activity: 'mastered the "Linear Equations" topic.', timestamp: '3h ago' },
]

export const mockAssignments = [
    { id: 'assign-01', title: 'Quadratic Equations Worksheet', subject: 'Algebra', dueDate: '3 days', type: 'Worksheet' },
    { id: 'assign-02', title: 'Cellular Respiration Quiz', subject: 'Biology', dueDate: '5 days', type: 'Quiz' },
];

export const mockStudentDoubts = [
    { id: 'doubt-01', studentName: 'Charles Lee', studentAvatar: 'student-avatar-3', subject: 'Algebra', timestamp: '2h ago', status: 'Pending' },
    { id: 'doubt-02', studentName: 'Alex Johnson', studentAvatar: 'student-avatar-1', subject: 'Chemistry', timestamp: '1d ago', status: 'Resolved' },
];
