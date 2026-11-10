export const SITE_METADATA = {
  name: 'Spectre Education',
  tagline: 'A more considered approach to education.',
  supportingStatement: 'Thoughtfully matched educators. Personalised learning. Mentorship for the journey ahead.',
  city: 'Delhi',
  supportEmail: 'hello@spectretutors.in',
  coordinatorWhatsApp: '919220638540',
  displayPhone: '+91 92206 38540',
  targetClasses: 'Classes 6–12',
  subjectsCovered: 'Mathematics, Science, English',
};

export const CHILD_NEED_CARDS = [
  {
    id: 'concept-clarity',
    title: 'Concept Clarity',
    description: 'Understand foundational principles deeply instead of memorising formulas and answers.',
    helpValue: 'Concept clarity',
  },
  {
    id: 'exam-prep',
    title: 'Exam Preparation',
    description: 'Structured revision, timed answer writing, past papers and board examination preparation.',
    helpValue: 'Exam preparation',
  },
  {
    id: 'confidence',
    title: 'Confidence Building',
    description: 'A patient, encouraging mentor who creates a safe environment to ask questions and make mistakes.',
    helpValue: 'Confidence building',
  },
  {
    id: 'catching-up',
    title: 'Catching Up',
    description: 'Diagnose and close cumulative learning gaps from previous terms to regain academic momentum.',
    helpValue: 'Catching up',
  },
  {
    id: 'academic-guidance',
    title: 'Academic Direction & Guidance',
    description: 'Clarify subject priorities, study habits, curriculum choices and future educational direction.',
    helpValue: 'Academic direction & guidance',
  },
];

export const PERSONALISATION_POINTS = [
  {
    number: '01',
    title: "Learning at the student's pace",
    description: "Classrooms move forward regardless of whether a student has fully grasped a topic. One-to-one education adapts instantly to slow down or accelerate where appropriate.",
  },
  {
    number: '02',
    title: 'Identifying the actual learning gap',
    description: 'Often, a difficulty in Class 10 Trigonometry stems from an unaddressed gap in Class 8 Geometry. We locate the root cause rather than treating superficial symptoms.',
  },
  {
    number: '03',
    title: 'Developing academic confidence',
    description: 'Confidence rarely comes from hollow praise—it comes from the repeatable experience of working through difficult problems and arriving at genuine understanding.',
  },
  {
    number: '04',
    title: 'Building consistency and accountability',
    description: 'A structured weekly schedule with a dedicated educator transforms sporadic cramming into calm, sustainable academic momentum.',
  },
  {
    number: '05',
    title: 'Encouraging independent thinking',
    description: 'The purpose of thoughtful education is to make the student self-reliant. Our educators guide students on how to think through questions rather than dictating solutions.',
  },
  {
    number: '06',
    title: 'Preparing for future academic decisions',
    description: 'Strong conceptual foundations in secondary school open meaningful pathways for senior secondary stream selection, competitive examinations, and higher education.',
  },
];

export const EDUCATIONAL_SERVICES = [
  {
    id: 'tutoring',
    tag: 'Core Academic Service',
    title: 'Private One-to-One Tutoring',
    lead: "Individual instruction shaped around the student's academic requirements.",
    description: 'Dedicated home tuition for Classes 6–12 across Delhi in Mathematics, Science and English. We focus on rigorous conceptual understanding, board curriculum alignment (CBSE, ICSE), and calm examination mastery.',
    features: [
      'Classes 6–12 across CBSE, ICSE and State Boards',
      'Mathematics, Science (Physics, Chemistry, Biology) and English',
      'In-person home sessions across major Delhi localities',
      'Syllabus pacing, homework support and examination technique',
    ],
    actionText: 'Request an Educator',
    actionLink: '/request-tutor',
    detailLink: '/private-tutoring',
    isExternal: false,
  },
  {
    id: 'mentorship',
    tag: 'Academic Development',
    title: 'Academic Mentorship',
    lead: 'Supporting the student beyond the subject being taught.',
    description: 'Effective education requires more than subject knowledge. Mentorship focuses on sustainable study habits, disciplined time management, revision structures, and the intellectual maturity needed to thrive independently.',
    features: [
      'Personalised weekly study schedules and time management',
      'Effective note-taking and active revision frameworks',
      'Overcoming academic procrastination and exam anxiety',
      'Building disciplined intellectual independence',
    ],
    note: 'Mentorship complements tutoring and is introduced thoughtfully based on the student’s needs.',
    actionText: 'Enquire About Mentorship',
    actionLink: '/mentorship',
    detailLink: '/mentorship',
    isExternal: false,
  },
  {
    id: 'guidance',
    tag: 'Advisory Service',
    title: 'Educational Guidance',
    lead: 'Helping families make more informed academic decisions.',
    description: 'Navigating stream selection in Class 11, subject choices, board transitions, and higher education exploration requires objective, patient insight aligned with the student’s genuine strengths and interests.',
    features: [
      'Class 10 to 11 stream selection exploration (Science, Commerce, Humanities)',
      'Aligning subject strengths with university and career pathways',
      'Navigating board requirements and curriculum transitions',
      'Considered discussions with experienced educational advisors',
    ],
    note: 'Offered as an advisory service to help families plan academic trajectories thoughtfully.',
    actionText: 'Explore Educational Guidance',
    actionLink: '/career-guidance',
    detailLink: '/career-guidance',
    isExternal: false,
  },
];

export const SPECTRE_APPROACH_STEPS = [
  {
    number: '01',
    title: 'Understand the student',
    description: 'We begin by listening. We understand the student’s current academic level, learning pace, personality, specific subject hurdles, and upcoming school milestones.',
  },
  {
    number: '02',
    title: 'Consider suitable educators',
    description: 'Rather than dispatching whoever happens to be closest on a map, we carefully evaluate which educator possesses the right temperament, academic background, and pedagogical style for that specific student.',
  },
  {
    number: '03',
    title: 'Introduce the recommended educator',
    description: 'We arrange an initial in-home trial session. The educator reviews current coursework, diagnoses foundation gaps, and outlines a realistic progression roadmap for the family.',
  },
  {
    number: '04',
    title: 'Support continued academic development',
    description: 'We maintain regular contact with both the family and the educator, reviewing progress, adapting schedules, and ensuring the learning partnership remains productive and encouraging.',
  },
];

export const SUBJECTS_DATA = [
  {
    name: 'Mathematics',
    tag: 'Classes 6–12',
    description: 'Moving beyond rote memorisation to intuitive conceptual clarity, analytical problem-solving, and calm board examination performance.',
    topics: [
      'Arithmetic & Algebraic foundations',
      'Geometry, Coordinate Geometry & Trigonometry',
      'Calculus, Probability & Senior Board Exam practice',
      'Clear, step-by-step mathematical reasoning',
    ],
  },
  {
    name: 'Science',
    tag: 'Classes 6–12',
    description: 'Developing genuine scientific intuition across Physics, Chemistry, and Biology through first-principles explanations and structured numerical practice.',
    topics: [
      'Physics: Mechanics, Optics, Electricity & Numerical problem-solving',
      'Chemistry: Atomic structure, Chemical bonding, Reactions & Equations',
      'Biology: Systems, Diagrams, Terminology & Conceptual mastery',
      'Experimental reasoning and board assessment techniques',
    ],
  },
  {
    name: 'English',
    tag: 'Classes 6–12',
    description: 'Refining grammar, reading comprehension, critical analysis, and articulate written expression for school examinations and lifelong communication.',
    topics: [
      'Grammar precision, syntax, and sentence architecture',
      'Reading comprehension and analytical passage deduction',
      'Structured essay, letter, and formal answer writing',
      'Literature interpretation and thematic appreciation',
    ],
  },
];

export const EDUCATOR_STANDARDS = [
  {
    title: 'Academic qualification review',
    description: 'We verify university credentials, degree certificates, and board academic records from reputable institutions before consideration.',
  },
  {
    title: 'Teaching experience assessment',
    description: 'We evaluate familiarity with CBSE and ICSE curricula, previous tutoring experience, and the ability to explain complex topics simply.',
  },
  {
    title: 'Identity & background verification',
    description: 'All educators submit government identification and residential address documentation in Delhi prior to introduction.',
  },
  {
    title: 'Communication & suitability',
    description: 'We assess articulation, patience, professional conduct, and the empathy needed to teach secondary school students effectively.',
  },
  {
    title: 'Student-specific matching',
    description: 'An educator is only introduced when their teaching pace and pedagogical style align with the student’s specific learning requirements.',
  },
];

export const PARENT_DIAGNOSTIC_QUESTIONS = [
  'Is my child genuinely understanding concepts or memorising answers to pass the next test?',
  'Are recurring academic difficulties being addressed at their root cause, or simply managed temporarily?',
  'Does my child feel comfortable asking questions when they do not understand a topic?',
  'Are their daily study habits and time management improving over time?',
  'Are their senior secondary academic choices aligned with their genuine strengths and interests?',
];

export const FAQ_ITEMS = [
  {
    question: 'How does Spectre select educators?',
    answer: 'We evaluate candidates through a structured two-tier screening process: an initial review of academic credentials and background, followed by a live pedagogical demonstration to assess subject depth, communication clarity, and patience.',
  },
  {
    question: 'Do you provide one-to-one home tutoring?',
    answer: 'Yes. Spectre focuses on in-person 1-on-1 education delivered directly to your home in Delhi. This ensures focused, undistracted mentorship in a familiar, comfortable learning environment.',
  },
  {
    question: 'Which classes and subjects do you support?',
    answer: 'We specialise in Classes 6 to 12 for Mathematics, Science (Physics, Chemistry, Biology), and English across CBSE, ICSE, and recognized state boards.',
  },
  {
    question: 'Which areas of Delhi do you cover?',
    answer: 'We cover prominent localities across South Delhi, East Delhi, West Delhi, North Delhi, Central Delhi, Dwarka, and Rohini. During your request, we match you with an educator located within a convenient radius.',
  },
  {
    question: 'How does the matching process work?',
    answer: 'Parents share their child’s class, board, specific academic requirements, and schedule through our request form. An advisor reviews the profile and recommends an educator whose teaching style fits the student, arranging an initial trial session.',
  },
  {
    question: 'Can parents request a particular schedule?',
    answer: 'Yes. You specify your preferred days of the week, time slots (morning, afternoon, or evening), and session frequency. We coordinate directly around your family’s routine.',
  },
  {
    question: 'Do you provide academic mentorship?',
    answer: 'Yes. Alongside subject tutoring, mentorship can be incorporated to support study habits, time management, revision structures, and independent learning discipline.',
  },
  {
    question: 'Can parents enquire about career guidance?',
    answer: 'Yes. We provide advisory discussions to help families explore stream selection (Class 10 to 11), subject combinations, and academic pathways aligned with the student’s genuine strengths.',
  },
];
