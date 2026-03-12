export interface GrammarSituation {
  situation: string;
  example: string;
}

export interface GrammarDefinition {
  description: string;
  situations: GrammarSituation[];
}

export interface GrammarStructure {
  name: string;
  positive: string;
  negative: string;
  question: string;
  example_positive: string;
  example_negative: string;
  example_question: string;
}

export interface GrammarExercise {
  sentence: string;
  answer: string;
  hint: string;
}

export interface GrammarReading {
  title: string;
  text: string;
  highlight: string[];
}

export interface GrammarContent {
  id: string;
  unit: number;
  title: string;
  definition: GrammarDefinition;
  structures: GrammarStructure[];
  notes: string[];
  exercises: GrammarExercise[];
  reading: GrammarReading;
}

export const grammarContent: GrammarContent[] = [
  {
    id: "unit-1",
    unit: 1,
    title: "Present simple, present continuous, stative verbs",
    definition: {
      description: "The present simple describes habits, facts, and permanent situations. The present continuous describes actions happening now or temporary situations.",
      situations: [
        { situation: "Daily habits", example: "She drinks coffee every morning." },
        { situation: "Actions happening now", example: "He is reading a book right now." },
        { situation: "General facts", example: "Water boils at 100 degrees." },
        { situation: "Temporary situation", example: "I am staying at my friend's place this week." }
      ]
    },
    structures: [
      {
        name: "Present simple",
        positive: "S + V (base) / S + V-s/es (he/she/it)",
        negative: "S + don't/doesn't + V",
        question: "Do/Does + S + V?",
        example_positive: "She works at a hospital.",
        example_negative: "He doesn't like spicy food.",
        example_question: "Do you play tennis?"
      },
      {
        name: "Present continuous",
        positive: "S + am/is/are + V-ing",
        negative: "S + am not/isn't/aren't + V-ing",
        question: "Am/Is/Are + S + V-ing?",
        example_positive: "They are watching a movie.",
        example_negative: "She isn't working today.",
        example_question: "Is he coming to the party?"
      }
    ],
    notes: [
      "Stative verbs (like, know, want, believe) are NOT used in continuous tenses.",
      "Use present simple with: always, usually, often, sometimes, never, every day.",
      "Use present continuous with: now, right now, at the moment, today.",
      "Third person singular adds -s or -es: she plays, he watches."
    ],
    exercises: [
      { sentence: "She _____ (work) at a school. She loves her job.", answer: "works", hint: "present simple, he/she/it" },
      { sentence: "Look! The dog _____ (run) in the garden.", answer: "is running", hint: "present continuous, action now" },
      { sentence: "I _____ (not/eat) meat. I'm vegetarian.", answer: "don't eat", hint: "present simple, negative" },
      { sentence: "They _____ (study) for their exam this week.", answer: "are studying", hint: "present continuous, temporary" },
      { sentence: "_____ (she/speak) French?", answer: "Does she speak", hint: "present simple, question" }
    ],
    reading: {
      title: "A typical morning",
      text: "Maria starts her day at 7 a.m. She usually makes coffee and reads the news online. She works as a graphic designer and loves her job. But this week she is working from a café because her apartment is being painted. Right now she is sitting at a corner table and designing a logo for a new client. She doesn't check her phone very often during work because she wants to focus. She always finishes her first task before 10 a.m.",
      highlight: [
        "She usually makes coffee and reads the news online.",
        "This week she is working from a café.",
        "Right now she is sitting at a corner table.",
        "She always finishes her first task before 10 a.m."
      ]
    }
  },
  {
    id: "unit-2",
    unit: 2,
    title: "Past simple, past continuous, used to",
    definition: {
      description: "The past simple describes completed actions in the past. The past continuous describes actions that were in progress at a specific time in the past. Used to describes past habits or states that no longer exist.",
      situations: [
        { situation: "Completed past action", example: "We visited Rome last summer." },
        { situation: "Action in progress in the past", example: "It was raining when I left work." },
        { situation: "Past habit no longer true", example: "I used to play basketball every weekend." },
        { situation: "Two actions at the same time", example: "She was cooking while he was setting the table." }
      ]
    },
    structures: [
      {
        name: "Past simple",
        positive: "S + V-ed / S + irregular verb (2nd form)",
        negative: "S + didn't + V",
        question: "Did + S + V?",
        example_positive: "They visited Paris last year.",
        example_negative: "I didn't sleep well last night.",
        example_question: "Did you see that film?"
      },
      {
        name: "Past continuous",
        positive: "S + was/were + V-ing",
        negative: "S + wasn't/weren't + V-ing",
        question: "Was/Were + S + V-ing?",
        example_positive: "She was reading when I called.",
        example_negative: "We weren't watching TV.",
        example_question: "Was he waiting long?"
      },
      {
        name: "Used to",
        positive: "S + used to + V",
        negative: "S + didn't use to + V",
        question: "Did + S + use to + V?",
        example_positive: "He used to have long hair.",
        example_negative: "She didn't use to like coffee.",
        example_question: "Did they use to live here?"
      }
    ],
    notes: [
      "Use the past continuous to describe a longer action interrupted by a shorter action: I was cooking when the phone rang.",
      "Used to only refers to the past — you cannot say 'I use to' for the present.",
      "When and while often connect past simple and past continuous.",
      "Common irregular verbs: go → went, see → saw, buy → bought, have → had."
    ],
    exercises: [
      { sentence: "I _____ (meet) Tom at a conference two years ago.", answer: "met", hint: "past simple" },
      { sentence: "She _____ (study) when the fire alarm went off.", answer: "was studying", hint: "past continuous" },
      { sentence: "He _____ (use to/live) in a small village before moving to the city.", answer: "used to live", hint: "used to" },
      { sentence: "They _____ (not/finish) the project on time.", answer: "didn't finish", hint: "past simple, negative" },
      { sentence: "_____ (you/watch) TV when I texted you?", answer: "Were you watching", hint: "past continuous, question" }
    ],
    reading: {
      title: "My first trip abroad",
      text: "My first trip abroad was to Thailand when I was nineteen. I used to be very shy, so travelling alone felt scary at first. When I arrived in Bangkok, it was raining heavily and I didn't know anyone. While I was walking through the market, I met a local guide called Som. She showed me around the city and we visited several temples together. I didn't use to enjoy spicy food, but I tried it there and loved it. By the end of the trip, I was feeling much more confident about travelling on my own.",
      highlight: [
        "I used to be very shy, so travelling alone felt scary at first.",
        "While I was walking through the market, I met a local guide.",
        "She showed me around the city and we visited several temples.",
        "I didn't use to enjoy spicy food, but I tried it there and loved it."
      ]
    }
  },
  {
    id: "unit-4",
    unit: 4,
    title: "Present perfect simple, present perfect continuous",
    definition: {
      description: "The present perfect connects the past to the present. The present perfect simple focuses on a completed action or result, while the present perfect continuous focuses on how long an activity has been happening.",
      situations: [
        { situation: "Life experience", example: "Have you ever been to Japan?" },
        { situation: "Recent completed action with a result", example: "She has just finished the report." },
        { situation: "How long an action has been going on", example: "He has been learning Spanish for two years." },
        { situation: "Unfinished time period", example: "I haven't seen her this week." }
      ]
    },
    structures: [
      {
        name: "Present perfect simple",
        positive: "S + have/has + past participle",
        negative: "S + haven't/hasn't + past participle",
        question: "Have/Has + S + past participle?",
        example_positive: "She has visited ten countries.",
        example_negative: "I haven't eaten yet.",
        example_question: "Have you ever tried sushi?"
      },
      {
        name: "Present perfect continuous",
        positive: "S + have/has + been + V-ing",
        negative: "S + haven't/hasn't + been + V-ing",
        question: "Have/Has + S + been + V-ing?",
        example_positive: "They have been waiting for an hour.",
        example_negative: "She hasn't been sleeping well.",
        example_question: "How long have you been working here?"
      }
    ],
    notes: [
      "Use for with a period of time (for three days) and since with a starting point (since Monday).",
      "Use the present perfect with: already, yet, just, ever, never, for, since.",
      "The present perfect continuous often explains why something looks or feels a certain way: He's tired because he's been running.",
      "Do NOT use the present perfect with a specific past time: I have seen him yesterday. → I saw him yesterday."
    ],
    exercises: [
      { sentence: "She _____ (already/send) the email.", answer: "has already sent", hint: "present perfect simple" },
      { sentence: "I _____ (wait) for the bus for twenty minutes!", answer: "have been waiting", hint: "present perfect continuous" },
      { sentence: "They _____ (never/try) Thai food before.", answer: "have never tried", hint: "present perfect simple, never" },
      { sentence: "How long _____ (you/study) English?", answer: "have you been studying", hint: "present perfect continuous, question" },
      { sentence: "He _____ (not/finish) his homework yet.", answer: "hasn't finished", hint: "present perfect simple, negative" }
    ],
    reading: {
      title: "A busy photographer",
      text: "Lena has been working as a travel photographer for five years. She has visited over thirty countries and has published photos in several international magazines. This month, she has been travelling through South America. She has already been to Colombia and Peru, and she hasn't visited Bolivia yet. Her followers have been commenting on her latest posts all day. She has taken more than two thousand photos on this trip so far. She says the best part of her job is that every day is different.",
      highlight: [
        "Lena has been working as a travel photographer for five years.",
        "She has visited over thirty countries.",
        "This month, she has been travelling through South America.",
        "She hasn't visited Bolivia yet."
      ]
    }
  },
  {
    id: "unit-5",
    unit: 5,
    title: "Past perfect simple, past perfect continuous",
    definition: {
      description: "The past perfect describes an action that happened before another action in the past. The past perfect continuous emphasises how long an action had been going on before another past event.",
      situations: [
        { situation: "Action before another past event", example: "When I arrived, they had already left." },
        { situation: "Reason for a past situation", example: "She was tired because she had been working all day." },
        { situation: "Duration before a past moment", example: "He had been waiting for two hours when she finally called." },
        { situation: "Reported speech context", example: "She said she had finished the project." }
      ]
    },
    structures: [
      {
        name: "Past perfect simple",
        positive: "S + had + past participle",
        negative: "S + hadn't + past participle",
        question: "Had + S + past participle?",
        example_positive: "They had eaten before we arrived.",
        example_negative: "I hadn't met her before the party.",
        example_question: "Had you ever flown before?"
      },
      {
        name: "Past perfect continuous",
        positive: "S + had been + V-ing",
        negative: "S + hadn't been + V-ing",
        question: "Had + S + been + V-ing?",
        example_positive: "She had been studying for hours.",
        example_negative: "He hadn't been sleeping well.",
        example_question: "Had they been waiting long?"
      }
    ],
    notes: [
      "Use the past perfect to make it clear which action happened first.",
      "Common connectors: before, after, when, already, just, by the time.",
      "The past perfect continuous often explains the cause of a past result.",
      "If the order of events is already clear, the past perfect is optional but still more precise."
    ],
    exercises: [
      { sentence: "By the time we arrived, the film _____ (already/start).", answer: "had already started", hint: "past perfect simple" },
      { sentence: "She was exhausted because she _____ (run) for over an hour.", answer: "had been running", hint: "past perfect continuous" },
      { sentence: "He _____ (not/eat) all day, so he was very hungry.", answer: "hadn't eaten", hint: "past perfect simple, negative" },
      { sentence: "I recognised her because we _____ (meet) once before.", answer: "had met", hint: "past perfect simple" },
      { sentence: "How long _____ (they/live) in Berlin before they moved to Paris?", answer: "had they been living", hint: "past perfect continuous, question" }
    ],
    reading: {
      title: "The delayed flight",
      text: "When Ana finally boarded the plane, she was exhausted. She had been standing in the queue for almost three hours because the check-in system had broken down. By the time she found her seat, most passengers had already fallen asleep. She hadn't eaten anything since breakfast, so she was very hungry. She asked the flight attendant if food was still available. Luckily, they had saved a meal for her. She ate quickly and fell asleep almost immediately. She had been awake since 4 a.m. and the flight still had six hours to go.",
      highlight: [
        "She had been standing in the queue for almost three hours.",
        "By the time she found her seat, most passengers had already fallen asleep.",
        "She hadn't eaten anything since breakfast.",
        "She had been awake since 4 a.m."
      ]
    }
  },
  {
    id: "unit-7",
    unit: 7,
    title: "Future time: present continuous, will, be going to, present simple",
    definition: {
      description: "English has several ways to talk about the future. The choice depends on whether the action is planned, decided, predicted, or scheduled.",
      situations: [
        { situation: "Spontaneous decision", example: "I'll help you with that." },
        { situation: "Personal plan or intention", example: "We're going to visit my parents next week." },
        { situation: "Arranged future event", example: "She's meeting Tom at 8 tonight." },
        { situation: "Fixed timetable or schedule", example: "The train leaves at 6:30 a.m." }
      ]
    },
    structures: [
      {
        name: "Will (prediction / spontaneous decision)",
        positive: "S + will + V",
        negative: "S + won't + V",
        question: "Will + S + V?",
        example_positive: "It will probably rain tomorrow.",
        example_negative: "I won't be at home tonight.",
        example_question: "Will you help me?"
      },
      {
        name: "Be going to (plan / intention)",
        positive: "S + am/is/are + going to + V",
        negative: "S + am not/isn't/aren't + going to + V",
        question: "Am/Is/Are + S + going to + V?",
        example_positive: "They are going to buy a new car.",
        example_negative: "She isn't going to apply for the job.",
        example_question: "Are you going to come to the party?"
      },
      {
        name: "Present continuous (fixed arrangement)",
        positive: "S + am/is/are + V-ing",
        negative: "S + isn't/aren't + V-ing",
        question: "Is/Are + S + V-ing?",
        example_positive: "I'm flying to Tokyo on Friday.",
        example_negative: "We aren't attending that meeting.",
        example_question: "Are you seeing the doctor tomorrow?"
      }
    ],
    notes: [
      "Will is NOT used for plans already made — use be going to or present continuous instead.",
      "Be going to + evidence = strong prediction: Look at those clouds. It's going to rain.",
      "Present simple is used for timetables: The bus departs at 9 a.m.",
      "Will is often used for offers and promises: I'll call you tonight."
    ],
    exercises: [
      { sentence: "It's very cloudy. I think it _____ (rain) soon.", answer: "is going to rain", hint: "be going to, prediction with evidence" },
      { sentence: "A: I forgot my umbrella. B: Don't worry, I _____ (lend) you mine.", answer: "will lend", hint: "will, spontaneous offer" },
      { sentence: "We _____ (have) dinner with our friends tomorrow evening. We booked the restaurant last week.", answer: "are having", hint: "present continuous, fixed arrangement" },
      { sentence: "The concert _____ (start) at 7 p.m. according to the programme.", answer: "starts", hint: "present simple, scheduled event" },
      { sentence: "She _____ (not/go to) take the job. She already decided.", answer: "isn't going to", hint: "be going to, negative" }
    ],
    reading: {
      title: "Weekend plans",
      text: "Sam is very excited about this weekend. On Saturday morning, he is meeting his friend Jake at the gym at 9 a.m. — they have been planning this for weeks. After that, he is going to cook a special dinner for his family. He has already bought all the ingredients. In the evening, he will probably watch a film at home if he isn't too tired. On Sunday, the community market opens at 10 a.m. and he wants to go. He won't stay long because he has a lot of work to do in the afternoon.",
      highlight: [
        "He is meeting his friend Jake at the gym at 9 a.m.",
        "He is going to cook a special dinner for his family.",
        "He will probably watch a film at home.",
        "The community market opens at 10 a.m."
      ]
    }
  },
  {
    id: "unit-8",
    unit: 8,
    title: "Prepositions of time and place",
    definition: {
      description: "Prepositions of time show when something happens. Prepositions of place show where something is or where it goes.",
      situations: [
        { situation: "Specific time", example: "The meeting starts at 9 a.m." },
        { situation: "General time period", example: "She was born in July." },
        { situation: "Location", example: "The keys are on the table." },
        { situation: "Movement direction", example: "She walked into the room." }
      ]
    },
    structures: [
      {
        name: "Prepositions of time",
        positive: "at + clock time / specific point: at noon, at midnight",
        negative: "in + month/year/season: in March, in 2020, in summer",
        question: "on + day/date: on Monday, on 5th June",
        example_positive: "The shop opens at 9 a.m.",
        example_negative: "She was born in 1995.",
        example_question: "The party is on Friday."
      },
      {
        name: "Prepositions of place",
        positive: "at (point/location) / in (enclosed space) / on (surface)",
        negative: "above, below, beside, behind, in front of, next to, between",
        question: "into (movement inside) / onto (movement onto surface)",
        example_positive: "The book is on the shelf.",
        example_negative: "She is sitting beside the window.",
        example_question: "He walked into the building."
      }
    ],
    notes: [
      "Use at for precise times and specific places: at 6 p.m., at the station.",
      "Use in for large areas (countries, cities) and enclosed spaces: in France, in the room.",
      "Use on for surfaces and days: on the table, on Tuesday.",
      "No preposition before: today, yesterday, tomorrow, last week, next year, this morning."
    ],
    exercises: [
      { sentence: "I always wake up _____ 7 o'clock.", answer: "at", hint: "preposition of time, clock time" },
      { sentence: "She was born _____ a small town _____ Italy.", answer: "in / in", hint: "preposition of place, enclosed area" },
      { sentence: "The homework is due _____ Friday.", answer: "on", hint: "preposition of time, day" },
      { sentence: "He left his phone _____ the café table.", answer: "on", hint: "preposition of place, surface" },
      { sentence: "They met _____ summer, _____ a music festival.", answer: "in / at", hint: "preposition of time and place" }
    ],
    reading: {
      title: "The new neighbour",
      text: "A new family moved into the flat next to mine last week. They arrived on a Saturday morning, around 10 a.m. I noticed boxes stacked in the corridor in front of their door. In the afternoon, I knocked and introduced myself. The family — two adults and a child — moved from a small town in the south. They are staying in the city until the end of summer. Their daughter placed a pot of flowers on the windowsill right away. It was nice to see the flat come to life. We agreed to have coffee at the weekend.",
      highlight: [
        "They arrived on a Saturday morning, around 10 a.m.",
        "Boxes stacked in the corridor in front of their door.",
        "They moved from a small town in the south.",
        "Their daughter placed a pot of flowers on the windowsill."
      ]
    }
  },
  {
    id: "unit-10",
    unit: 10,
    title: "The passive 1 (present/past simple passive)",
    definition: {
      description: "The passive voice is used when the action is more important than who does it, or when the agent is unknown or obvious. The present and past simple passive are the most common passive forms.",
      situations: [
        { situation: "Focus on the result", example: "The windows are cleaned every week." },
        { situation: "Unknown agent", example: "My wallet was stolen on the bus." },
        { situation: "Formal or impersonal writing", example: "The report was published in 2022." },
        { situation: "General facts", example: "Coffee is grown in Brazil." }
      ]
    },
    structures: [
      {
        name: "Present simple passive",
        positive: "S + am/is/are + past participle",
        negative: "S + am not/isn't/aren't + past participle",
        question: "Am/Is/Are + S + past participle?",
        example_positive: "This building is used by students.",
        example_negative: "English isn't spoken there.",
        example_question: "Is milk delivered every morning?"
      },
      {
        name: "Past simple passive",
        positive: "S + was/were + past participle",
        negative: "S + wasn't/weren't + past participle",
        question: "Was/Were + S + past participle?",
        example_positive: "The bridge was built in 1890.",
        example_negative: "The letter wasn't sent.",
        example_question: "Was the car repaired yesterday?"
      }
    ],
    notes: [
      "To mention the agent (doer), use by: The cake was made by my grandmother.",
      "The object of an active sentence becomes the subject of a passive sentence.",
      "The passive is very common in news, science, and formal writing.",
      "If the agent is obvious or unimportant, you do not need to include it."
    ],
    exercises: [
      { sentence: "This cathedral _____ (build) in the 14th century.", answer: "was built", hint: "past simple passive" },
      { sentence: "English _____ (speak) by millions of people around the world.", answer: "is spoken", hint: "present simple passive" },
      { sentence: "The packages _____ (not/deliver) yesterday.", answer: "were not delivered", hint: "past simple passive, negative" },
      { sentence: "_____ the results _____ (announce) yet?", answer: "Were / announced", hint: "past simple passive, question" },
      { sentence: "The new café _____ (open) every day at 8 a.m.", answer: "is opened", hint: "present simple passive" }
    ],
    reading: {
      title: "A famous painting",
      text: "The Mona Lisa is one of the most famous paintings in the world. It was painted by Leonardo da Vinci in the early 16th century. Today, it is displayed in the Louvre Museum in Paris. The painting is protected by bulletproof glass and is watched by security cameras at all times. It was stolen in 1911 but was found two years later. Every year, millions of people visit the museum just to see it. Many smaller copies are sold in shops around the Louvre. The original is valued at over 800 million dollars.",
      highlight: [
        "It was painted by Leonardo da Vinci in the early 16th century.",
        "Today, it is displayed in the Louvre Museum in Paris.",
        "It was stolen in 1911 but was found two years later.",
        "Many smaller copies are sold in shops around the Louvre."
      ]
    }
  },
  {
    id: "unit-11",
    unit: 11,
    title: "The passive 2 (other tenses passive)",
    definition: {
      description: "The passive can be formed in many tenses. The structure is always a form of the verb be + past participle, but the tense of be changes depending on when the action happens.",
      situations: [
        { situation: "Ongoing passive action", example: "The road is being repaired." },
        { situation: "Completed action relevant to now", example: "The contract has been signed." },
        { situation: "Future passive", example: "The results will be published next week." },
        { situation: "Past ongoing passive", example: "The suspect was being interviewed when we arrived." }
      ]
    },
    structures: [
      {
        name: "Present continuous passive",
        positive: "S + am/is/are + being + past participle",
        negative: "S + isn't/aren't + being + past participle",
        question: "Is/Are + S + being + past participle?",
        example_positive: "The house is being painted.",
        example_negative: "Dinner isn't being prepared yet.",
        example_question: "Is the data being collected?"
      },
      {
        name: "Present perfect passive",
        positive: "S + have/has + been + past participle",
        negative: "S + haven't/hasn't + been + past participle",
        question: "Have/Has + S + been + past participle?",
        example_positive: "The form has been submitted.",
        example_negative: "The problem hasn't been fixed.",
        example_question: "Has the package been delivered?"
      },
      {
        name: "Future passive (will)",
        positive: "S + will + be + past participle",
        negative: "S + won't + be + past participle",
        question: "Will + S + be + past participle?",
        example_positive: "The winners will be announced tomorrow.",
        example_negative: "The event won't be cancelled.",
        example_question: "Will the documents be signed?"
      }
    ],
    notes: [
      "The structure be + past participle stays the same — only the tense of be changes.",
      "Modal passives follow: modal + be + past participle (e.g., it should be done).",
      "Passive with get is informal: My bike got stolen. / The window got broken.",
      "Avoid using the passive too much — it can make writing less clear."
    ],
    exercises: [
      { sentence: "The new hospital _____ (build) right now. It will open next year.", answer: "is being built", hint: "present continuous passive" },
      { sentence: "All the tickets _____ (already/sell). There are none left.", answer: "have already been sold", hint: "present perfect passive" },
      { sentence: "The announcement _____ (make) at noon tomorrow.", answer: "will be made", hint: "future passive with will" },
      { sentence: "The children _____ (look after) by their grandparents while we were away.", answer: "were being looked after", hint: "past continuous passive" },
      { sentence: "Our order _____ (not/deliver) yet. We're still waiting.", answer: "hasn't been delivered", hint: "present perfect passive, negative" }
    ],
    reading: {
      title: "City construction",
      text: "Our city is changing fast. A new shopping centre is being built near the train station. According to the city council, it will be completed by next spring. Two old buildings have been demolished to make space for it. Local residents have been asked for their opinions, but not everyone is happy. A petition has been signed by over five hundred people who want a park instead. The final decision will be made by the council next month. In the meantime, the area is being fenced off for safety.",
      highlight: [
        "A new shopping centre is being built near the train station.",
        "Two old buildings have been demolished to make space for it.",
        "A petition has been signed by over five hundred people.",
        "The final decision will be made by the council next month."
      ]
    }
  },
  {
    id: "unit-13",
    unit: 13,
    title: "Countable and uncountable nouns",
    definition: {
      description: "Countable nouns can be counted and have a plural form. Uncountable nouns cannot be counted individually and have no plural form.",
      situations: [
        { situation: "Countable item", example: "Can I have two coffees, please?" },
        { situation: "Uncountable substance", example: "We need some milk from the shop." },
        { situation: "Asking about quantity", example: "How many apples are there?" },
        { situation: "Expressing amount", example: "There isn't much time left." }
      ]
    },
    structures: [
      {
        name: "Countable nouns",
        positive: "a/an + singular noun / some + plural noun",
        negative: "no/not any + plural noun",
        question: "How many + plural noun?",
        example_positive: "I have three friends coming for dinner.",
        example_negative: "There aren't any eggs left.",
        example_question: "How many chairs do we need?"
      },
      {
        name: "Uncountable nouns",
        positive: "some + uncountable noun",
        negative: "no/not any + uncountable noun",
        question: "How much + uncountable noun?",
        example_positive: "I'd like some advice.",
        example_negative: "There isn't any sugar.",
        example_question: "How much water do you drink a day?"
      }
    ],
    notes: [
      "Common uncountable nouns: water, milk, rice, bread, advice, information, news, luggage, money, weather.",
      "Some nouns can be both countable and uncountable with different meanings: a glass (object) vs. some glass (material).",
      "Use a piece of / a bit of + uncountable: a piece of advice, a bit of luck.",
      "Some and any: use some in positives and offers; use any in negatives and most questions."
    ],
    exercises: [
      { sentence: "There isn't _____ milk left in the fridge.", answer: "any", hint: "uncountable, negative" },
      { sentence: "Could I have _____ information about the tour?", answer: "some", hint: "uncountable, polite request" },
      { sentence: "How _____ people were at the concert?", answer: "many", hint: "countable, question" },
      { sentence: "I only have _____ little time before my train.", answer: "a", hint: "a little, uncountable" },
      { sentence: "She gave me _____ useful piece of advice.", answer: "a", hint: "a piece of, countable unit" }
    ],
    reading: {
      title: "Cooking a new recipe",
      text: "Last night I decided to cook a new recipe. I needed some flour, two eggs, a little butter, and some milk. I went to the shop and was surprised — there wasn't any butter left on the shelf. I asked a shop assistant for help, and she gave me some useful advice: try the organic section. I found a small piece of butter there. I also bought a few vegetables and some cheese. I didn't have much experience cooking this dish, but the result was great. My flatmates ate three pieces each and asked for the recipe.",
      highlight: [
        "I needed some flour, two eggs, a little butter, and some milk.",
        "There wasn't any butter left on the shelf.",
        "She gave me some useful advice.",
        "I didn't have much experience cooking this dish."
      ]
    }
  },
  {
    id: "unit-14",
    unit: 14,
    title: "Articles (a, an, the)",
    definition: {
      description: "Articles show whether a noun is specific or general. A/an is used for non-specific singular nouns, while the is used when both speaker and listener know which one is meant.",
      situations: [
        { situation: "First mention", example: "I saw a dog in the park." },
        { situation: "Second mention (specific)", example: "The dog was very friendly." },
        { situation: "Unique or known item", example: "The sun rises in the east." },
        { situation: "No article (general plural/uncountable)", example: "Dogs are loyal animals." }
      ]
    },
    structures: [
      {
        name: "A / An (indefinite article)",
        positive: "a + consonant sound / an + vowel sound",
        negative: "not + a/an + singular noun",
        question: "Is/Are + S + a/an + noun?",
        example_positive: "She is a teacher. He has an idea.",
        example_negative: "It is not a good idea.",
        example_question: "Is that an old photo?"
      },
      {
        name: "The (definite article)",
        positive: "the + any noun (singular, plural, uncountable)",
        negative: "not + the + noun",
        question: "Is/Was + the + noun + ...?",
        example_positive: "Please close the door.",
        example_negative: "That's not the right answer.",
        example_question: "Did you take the train?"
      }
    ],
    notes: [
      "Use a/an when introducing something for the first time or talking about one of many.",
      "Use the when it is clear which specific thing you mean — after first mention, or because there is only one.",
      "No article with: plural nouns in general (Cats like fish), uncountable nouns in general (I love music).",
      "Use the with: the cinema, the theatre, the internet, the environment, the moon."
    ],
    exercises: [
      { sentence: "I need _____ umbrella. It's raining outside.", answer: "an", hint: "indefinite article, vowel sound" },
      { sentence: "Can you close _____ window? It's very cold.", answer: "the", hint: "definite article, specific" },
      { sentence: "She wants to be _____ doctor when she grows up.", answer: "a", hint: "indefinite article, job" },
      { sentence: "_____ life is full of surprises.", answer: "(no article)", hint: "no article, general concept" },
      { sentence: "We went to _____ cinema last night and loved _____ film.", answer: "the / the", hint: "definite article" }
    ],
    reading: {
      title: "A walk in the city",
      text: "I went for a walk in the city centre yesterday. I passed a small café I had never noticed before, so I went in. The café had a cosy atmosphere and played soft jazz music. I ordered a coffee and a piece of cake. The cake was delicious — it was a lemon cake with white icing. Near my table, a young woman was sketching in a notebook. She noticed me looking and smiled. We started chatting. She was an art student at the local university. By the time I left, an hour had passed. It was the best afternoon I had had in weeks.",
      highlight: [
        "I passed a small café I had never noticed before.",
        "The café had a cosy atmosphere.",
        "She was an art student at the local university.",
        "It was the best afternoon I had had in weeks."
      ]
    }
  },
  {
    id: "unit-16",
    unit: 16,
    title: "Pronouns and possessive determiners",
    definition: {
      description: "Pronouns replace nouns to avoid repetition. Possessive determiners show that something belongs to someone.",
      situations: [
        { situation: "Replacing a noun", example: "Maria called. She left a message." },
        { situation: "Showing ownership", example: "This is my bag, not yours." },
        { situation: "Referring to a group", example: "The students finished their homework." },
        { situation: "Reflexive action", example: "He hurt himself while cooking." }
      ]
    },
    structures: [
      {
        name: "Subject / Object pronouns",
        positive: "Subject: I, you, he, she, it, we, they",
        negative: "Object: me, you, him, her, it, us, them",
        question: "Who + verb / Whom + verb?",
        example_positive: "She gave it to me.",
        example_negative: "I didn't see them at the party.",
        example_question: "Who told you that?"
      },
      {
        name: "Possessive determiners / pronouns",
        positive: "Determiners: my, your, his, her, its, our, their",
        negative: "Pronouns: mine, yours, his, hers, ours, theirs",
        question: "Whose + noun + is it?",
        example_positive: "This is her coat.",
        example_negative: "That book isn't mine.",
        example_question: "Whose keys are these?"
      }
    ],
    notes: [
      "Possessive determiners come before a noun (my bag), while possessive pronouns stand alone (it's mine).",
      "Reflexive pronouns: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves.",
      "Each other = two people; one another = three or more people (though each other is widely used for both).",
      "It can refer to time, weather, distance: It's hot. It's 5 o'clock. It's far."
    ],
    exercises: [
      { sentence: "Have you seen _____ phone? I can't find it anywhere.", answer: "my", hint: "possessive determiner" },
      { sentence: "That jacket is not mine. It's _____.", answer: "hers", hint: "possessive pronoun, female" },
      { sentence: "The dog hurt _____ paw while playing in the garden.", answer: "its", hint: "possessive determiner, animal" },
      { sentence: "I didn't go to the party because nobody invited _____.", answer: "me", hint: "object pronoun" },
      { sentence: "The twins look exactly like _____.", answer: "each other", hint: "reciprocal pronoun" }
    ],
    reading: {
      title: "Moving in together",
      text: "Emma and her flatmate Jade have just moved into a new apartment. It's bigger than their old one, so they each have their own room now. Emma decorated hers with plants and photos. Jade's room has a cosy reading corner with lots of books. They share the kitchen, and they take turns cooking for each other. Yesterday they made dinner together — Emma made the pasta and Jade prepared the salad herself. Their neighbours knocked and introduced themselves. They seemed friendly. Emma and Jade think they are going to love living there.",
      highlight: [
        "They each have their own room now.",
        "Emma decorated hers with plants and photos.",
        "They take turns cooking for each other.",
        "Jade prepared the salad herself."
      ]
    }
  },
  {
    id: "unit-17",
    unit: 17,
    title: "Relative clauses",
    definition: {
      description: "Relative clauses give more information about a noun. Defining relative clauses identify which person or thing we mean, while non-defining ones add extra information.",
      situations: [
        { situation: "Identifying a person", example: "The man who called you is my uncle." },
        { situation: "Identifying a thing", example: "The book that I read last week was amazing." },
        { situation: "Adding extra information (non-defining)", example: "My sister, who lives in London, is visiting this weekend." },
        { situation: "Referring to a place", example: "That's the café where we first met." }
      ]
    },
    structures: [
      {
        name: "Defining relative clause",
        positive: "Noun + who/that (person) / which/that (thing) / where (place) / whose (possession)",
        negative: "No commas — the clause is essential to the meaning.",
        question: "The pronoun can sometimes be omitted: The film (that) I watched was great.",
        example_positive: "The woman who lives next door is a nurse.",
        example_negative: "The phone that I bought doesn't work well.",
        example_question: "Is this the place where they got married?"
      },
      {
        name: "Non-defining relative clause",
        positive: "Noun + , + who/which/where/whose + clause + ,",
        negative: "Always use commas — the clause adds extra, non-essential information.",
        question: "Cannot use that in non-defining clauses.",
        example_positive: "My laptop, which I bought last year, is already broken.",
        example_negative: "Paul, who is my best friend, got engaged last night.",
        example_question: "We visited Rome, where we had an amazing time."
      }
    ],
    notes: [
      "Use who/that for people, which/that for things, where for places, whose for possession.",
      "In non-defining clauses, you CANNOT use that — use who or which.",
      "In defining clauses, you can often omit the pronoun when it is the object: The film I saw was great.",
      "Non-defining clauses always need commas around them."
    ],
    exercises: [
      { sentence: "The man _____ helped me find my keys was very kind.", answer: "who", hint: "relative pronoun, person" },
      { sentence: "The restaurant _____ we had dinner last night was excellent.", answer: "where", hint: "relative pronoun, place" },
      { sentence: "That's the bag _____ I was looking for!", answer: "that / which", hint: "relative pronoun, thing" },
      { sentence: "My cousin, _____ works as a vet, loves animals.", answer: "who", hint: "non-defining clause, person" },
      { sentence: "I met a girl _____ father is a famous chef.", answer: "whose", hint: "relative pronoun, possession" }
    ],
    reading: {
      title: "The baker on the corner",
      text: "There is a bakery on the corner of my street which makes the best croissants I have ever tasted. The owner, whose name is Henri, moved here from France ten years ago. He wakes up at 4 a.m. every day to prepare the dough. The customers who come early in the morning always get the fresh ones. I spoke to a woman who had been buying bread there for fifteen years. She said it was the place where her whole family went every Sunday. Henri, who is now in his sixties, has no plans to retire.",
      highlight: [
        "There is a bakery which makes the best croissants I have ever tasted.",
        "The owner, whose name is Henri, moved here from France.",
        "The customers who come early in the morning always get the fresh ones.",
        "She said it was the place where her whole family went every Sunday."
      ]
    }
  },
  {
    id: "unit-19",
    unit: 19,
    title: "Modals 1 (can, could, may, might, should)",
    definition: {
      description: "Modal verbs express ability, possibility, permission, and advice. They are followed by the base form of the verb and do not change for person.",
      situations: [
        { situation: "Ability", example: "She can speak three languages." },
        { situation: "Possibility", example: "It might rain this afternoon." },
        { situation: "Asking for permission", example: "May I leave early today?" },
        { situation: "Giving advice", example: "You should get more sleep." }
      ]
    },
    structures: [
      {
        name: "Can / Could",
        positive: "S + can/could + V (base)",
        negative: "S + can't/couldn't + V",
        question: "Can/Could + S + V?",
        example_positive: "She can play the guitar well.",
        example_negative: "I couldn't hear you — it was too loud.",
        example_question: "Can you help me with this?"
      },
      {
        name: "May / Might",
        positive: "S + may/might + V (base)",
        negative: "S + may not/might not + V",
        question: "May + S + V? (mainly for permission)",
        example_positive: "He might be late tonight.",
        example_negative: "She may not come to the party.",
        example_question: "May I sit here?"
      },
      {
        name: "Should",
        positive: "S + should + V (base)",
        negative: "S + shouldn't + V",
        question: "Should + S + V?",
        example_positive: "You should visit a doctor.",
        example_negative: "You shouldn't eat so much sugar.",
        example_question: "Should I bring anything?"
      }
    ],
    notes: [
      "Can = ability now; could = ability in the past or polite request.",
      "May = more formal permission/possibility; might = less certain possibility.",
      "Should = advice or mild obligation (not as strong as must).",
      "Modal verbs have no -s in third person: She can, not She cans."
    ],
    exercises: [
      { sentence: "You look tired. You _____ go to bed earlier.", answer: "should", hint: "modal, advice" },
      { sentence: "I _____ swim when I was five years old.", answer: "could", hint: "could, past ability" },
      { sentence: "Take an umbrella — it _____ rain later.", answer: "might / may", hint: "modal, possibility" },
      { sentence: "_____ I use your phone for a moment?", answer: "Can / Could / May", hint: "modal, permission" },
      { sentence: "She _____ be at home — her car is outside.", answer: "might / may", hint: "modal, deduction/possibility" }
    ],
    reading: {
      title: "Before the interview",
      text: "Tom has a job interview tomorrow and he is quite nervous. His friend Lisa is giving him some advice. She says he should prepare a few answers to common questions and he shouldn't stay up too late tonight. Tom is worried he might not know the answer to some technical questions. Lisa tells him he can always ask the interviewer to repeat or clarify a question. She says he could also bring examples of his previous work. Tom feels a bit better. He might even enjoy the interview if he stays calm. He should get a good night's sleep.",
      highlight: [
        "He should prepare a few answers to common questions.",
        "He shouldn't stay up too late tonight.",
        "He might not know the answer to some technical questions.",
        "He could also bring examples of his previous work."
      ]
    }
  },
  {
    id: "unit-20",
    unit: 20,
    title: "Modals 2 (must, have to, need to, should)",
    definition: {
      description: "Must, have to, and need to all express obligation, but they differ in where the obligation comes from. Should is used for advice or recommendation.",
      situations: [
        { situation: "Strong personal obligation", example: "I must call my mother — it's her birthday." },
        { situation: "External rule or requirement", example: "You have to wear a seatbelt by law." },
        { situation: "Necessity to do something", example: "We need to buy more coffee." },
        { situation: "Something not allowed", example: "You mustn't smoke in the building." }
      ]
    },
    structures: [
      {
        name: "Must / Mustn't",
        positive: "S + must + V (base)",
        negative: "S + mustn't + V",
        question: "Must + S + V?",
        example_positive: "You must finish this by 5 p.m.",
        example_negative: "You mustn't use your phone during the exam.",
        example_question: "Must we wear a uniform?"
      },
      {
        name: "Have to / Don't have to",
        positive: "S + have to/has to + V",
        negative: "S + don't/doesn't have to + V",
        question: "Do/Does + S + have to + V?",
        example_positive: "She has to work on Saturdays.",
        example_negative: "You don't have to come if you're tired.",
        example_question: "Do we have to pay in advance?"
      },
      {
        name: "Need to / Don't need to",
        positive: "S + need to + V",
        negative: "S + don't/doesn't need to + V",
        question: "Do/Does + S + need to + V?",
        example_positive: "I need to renew my passport.",
        example_negative: "You don't need to bring food.",
        example_question: "Does she need to sign the form?"
      }
    ],
    notes: [
      "Must = internal obligation (from speaker); have to = external obligation (rules, laws).",
      "Mustn't = prohibition (you are NOT allowed); don't have to = no obligation (but you can if you want).",
      "Need to is similar to have to but is more neutral.",
      "Must has no past form — use had to instead: We had to leave early."
    ],
    exercises: [
      { sentence: "You _____ touch that! It's very dangerous.", answer: "mustn't", hint: "strong prohibition" },
      { sentence: "She _____ wear a uniform at work. It's the company rule.", answer: "has to", hint: "external obligation" },
      { sentence: "You _____ bring a gift to the party, but it's a nice gesture.", answer: "don't have to", hint: "no obligation" },
      { sentence: "I _____ buy milk — there's none left.", answer: "need to", hint: "necessity" },
      { sentence: "We _____ leave early yesterday because the roads were icy.", answer: "had to", hint: "past obligation, have to" }
    ],
    reading: {
      title: "New job rules",
      text: "Starting a new job always comes with new rules. At my company, all employees have to arrive by 9 a.m. and must sign in at the reception desk. We don't have to wear formal clothes, but we mustn't wear anything with offensive images. All staff need to complete a health and safety course in the first week. You don't need to bring your own lunch — the canteen is free. You must not use your personal phone during meetings. My manager told me I need to read the employee handbook before my first full day. It's a lot to remember!",
      highlight: [
        "All employees have to arrive by 9 a.m.",
        "We mustn't wear anything with offensive images.",
        "All staff need to complete a health and safety course.",
        "You don't need to bring your own lunch."
      ]
    }
  },
  {
    id: "unit-22",
    unit: 22,
    title: "Modals 3 (modal perfect: should have, could have, must have)",
    definition: {
      description: "Modal perfect forms combine a modal verb with have + past participle to talk about past situations — expressing regret, missed opportunities, deductions, or criticism.",
      situations: [
        { situation: "Deduction about the past", example: "She's not answering — she must have left already." },
        { situation: "Regret or criticism", example: "You should have called me earlier." },
        { situation: "Missed opportunity", example: "I could have taken that job." },
        { situation: "Uncertain past possibility", example: "He might have forgotten about the meeting." }
      ]
    },
    structures: [
      {
        name: "Must have / Can't have",
        positive: "S + must have + past participle (certain deduction)",
        negative: "S + can't have + past participle (impossible deduction)",
        question: "Could + S + have + past participle?",
        example_positive: "She must have been very tired — she fell asleep immediately.",
        example_negative: "He can't have eaten all of that!",
        example_question: "Could they have taken the wrong turn?"
      },
      {
        name: "Should have / Shouldn't have",
        positive: "S + should have + past participle (regret / criticism — it didn't happen)",
        negative: "S + shouldn't have + past participle (it happened but was wrong)",
        question: "Should + S + have + past participle?",
        example_positive: "I should have studied more for the exam.",
        example_negative: "She shouldn't have said that.",
        example_question: "Should I have told him the truth?"
      },
      {
        name: "Could have / Might have",
        positive: "S + could/might have + past participle",
        negative: "S + couldn't have + past participle",
        question: "Could + S + have + past participle?",
        example_positive: "You could have asked for help.",
        example_negative: "She couldn't have known about it.",
        example_question: "Might he have misunderstood?"
      }
    ],
    notes: [
      "Must have = I'm certain something happened; can't have = I'm certain it didn't happen.",
      "Should have = it was the right thing to do but didn't happen (regret or advice for past).",
      "Shouldn't have = it happened but was the wrong thing to do.",
      "Could have = it was possible but didn't happen."
    ],
    exercises: [
      { sentence: "He looks really cold. He _____ (bring) a jacket.", answer: "should have brought", hint: "should have, regret" },
      { sentence: "She passed the exam with 98%. She _____ (study) very hard.", answer: "must have studied", hint: "must have, deduction" },
      { sentence: "I'm sorry I was late. I _____ (leave) the house earlier.", answer: "should have left", hint: "should have, criticism of self" },
      { sentence: "He _____ (take) that job — it was a great opportunity.", answer: "could have taken", hint: "could have, missed opportunity" },
      { sentence: "She _____ (send) that email — now her boss is angry.", answer: "shouldn't have sent", hint: "shouldn't have, it was wrong" }
    ],
    reading: {
      title: "The missed train",
      text: "Dan arrived at the station to find his train had already gone. He checked his watch — it was 9:15. The train must have left at 9:00 as scheduled. He should have checked the timetable more carefully. His friend had warned him, but he hadn't listened. He could have taken an earlier bus, but he chose to walk. Now he had to wait ninety minutes for the next one. He thought about the meeting he might have missed. He shouldn't have stayed up so late the night before. Next time, he told himself, he would be more careful.",
      highlight: [
        "The train must have left at 9:00 as scheduled.",
        "He should have checked the timetable more carefully.",
        "He could have taken an earlier bus.",
        "He shouldn't have stayed up so late the night before."
      ]
    }
  },
  {
    id: "unit-23",
    unit: 23,
    title: "Questions, question tags, indirect questions",
    definition: {
      description: "English uses auxiliary verbs to form questions. Question tags check or confirm information, and indirect questions are used in polite or formal situations.",
      situations: [
        { situation: "Direct question", example: "Where did you go last night?" },
        { situation: "Question tag to confirm", example: "It's a beautiful day, isn't it?" },
        { situation: "Indirect question (polite)", example: "Could you tell me where the station is?" },
        { situation: "Subject question", example: "Who called you this morning?" }
      ]
    },
    structures: [
      {
        name: "Direct questions",
        positive: "Wh-word + auxiliary + S + V?",
        negative: "Wh-word + auxiliary + S + not + V?",
        question: "Do/Does/Did/Is/Are + S + V?",
        example_positive: "What time does the shop close?",
        example_negative: "Why didn't you tell me?",
        example_question: "Are you coming tonight?"
      },
      {
        name: "Question tags",
        positive: "Positive statement + negative tag",
        negative: "Negative statement + positive tag",
        question: "She's French, isn't she? / You don't smoke, do you?",
        example_positive: "He works here, doesn't he?",
        example_negative: "You haven't eaten, have you?",
        example_question: "It was a great film, wasn't it?"
      },
      {
        name: "Indirect questions",
        positive: "Could you tell me + question word + S + V? (statement word order)",
        negative: "Do you know + if/whether + S + V?",
        question: "Would you mind telling me...?",
        example_positive: "Could you tell me what time it is?",
        example_negative: "I don't know if she's coming.",
        example_question: "Do you know whether the bank is open?"
      }
    ],
    notes: [
      "In indirect questions, the word order changes to subject + verb (no inversion): Do you know where he lives?",
      "Use if or whether in indirect yes/no questions: Can you tell me if the train is on time?",
      "Question tags: if the statement is positive, the tag is negative and vice versa.",
      "Subject questions (Who/What) use the same word order as statements: Who called you?"
    ],
    exercises: [
      { sentence: "You're from Spain, _____ you?", answer: "aren't", hint: "question tag, positive statement" },
      { sentence: "Could you tell me _____ the museum is?", answer: "where", hint: "indirect question with where" },
      { sentence: "She hasn't left yet, _____ she?", answer: "has", hint: "question tag, negative statement" },
      { sentence: "Do you know _____ the last bus leaves?", answer: "when", hint: "indirect question with when" },
      { sentence: "_____ made this delicious cake?", answer: "Who", hint: "subject question" }
    ],
    reading: {
      title: "Tourist information",
      text: "When I arrived in Edinburgh, I stopped at the tourist information office. The woman at the desk was very helpful. I asked her if she could tell me where the castle was. She gave me a map and explained the bus routes. Then I asked whether the castle was open on Mondays. She said it was. An older man standing nearby added, 'You've never been here before, have you?' I smiled and said no. He recommended a local café and said I should definitely try the soup. 'It's the best in the city, isn't it?' he said with a smile.",
      highlight: [
        "I asked her if she could tell me where the castle was.",
        "I asked whether the castle was open on Mondays.",
        "You've never been here before, have you?",
        "It's the best in the city, isn't it?"
      ]
    }
  },
  {
    id: "unit-25",
    unit: 25,
    title: "So and such, too and enough",
    definition: {
      description: "So and such are used to emphasise degree. Too means more than necessary or desirable. Enough means the right amount — or after an adjective to say something is sufficient.",
      situations: [
        { situation: "Emphasising an adjective", example: "The film was so boring!" },
        { situation: "Emphasising with a noun", example: "He is such a talented musician." },
        { situation: "Expressing excess", example: "It's too hot to go outside." },
        { situation: "Saying something is sufficient", example: "She is old enough to vote." }
      ]
    },
    structures: [
      {
        name: "So / Such",
        positive: "so + adjective/adverb / such (a/an) + adjective + noun",
        negative: "not so + adjective / not such + adjective + noun",
        question: "Why is it so + adjective? / Why such + noun?",
        example_positive: "It was such a beautiful day.",
        example_negative: "It's not so difficult if you practise.",
        example_question: "Why are you so worried?"
      },
      {
        name: "Too / Enough",
        positive: "too + adjective (before noun) / adjective + enough",
        negative: "not + adjective + enough",
        question: "Is it + too + adjective? / Is it + adjective + enough?",
        example_positive: "This bag is too heavy to carry.",
        example_negative: "She isn't confident enough to perform.",
        example_question: "Is it warm enough to swim?"
      }
    ],
    notes: [
      "So goes before an adjective or adverb: so fast, so quickly.",
      "Such goes before a noun (with or without adjective): such noise, such a good idea.",
      "Too = negative sense (a problem); enough = positive sense (sufficient).",
      "Enough comes AFTER adjectives: good enough, but BEFORE nouns: enough time."
    ],
    exercises: [
      { sentence: "It was _____ an interesting book that I finished it in one day.", answer: "such", hint: "such + noun phrase" },
      { sentence: "The coffee is _____ hot to drink right now.", answer: "too", hint: "too + adjective" },
      { sentence: "She spoke _____ quietly that I couldn't hear her.", answer: "so", hint: "so + adverb" },
      { sentence: "He's not strong _____ to lift that box alone.", answer: "enough", hint: "adjective + enough" },
      { sentence: "It was _____ lovely weather that we ate outside.", answer: "such", hint: "such + noun (uncountable)" }
    ],
    reading: {
      title: "The hiking trip",
      text: "Last weekend, our group went on a hiking trip in the mountains. The weather was so clear that we could see for miles. It was such a peaceful place — no traffic noise, no phones. However, the trail was too difficult for two members of our group who had to turn back. The rest of us were fit enough to reach the top. We had packed enough food and water for the whole day. By the time we reached the summit, we were so tired that we just sat down and enjoyed the view in silence. It was such a special moment.",
      highlight: [
        "The weather was so clear that we could see for miles.",
        "It was such a peaceful place.",
        "The trail was too difficult for two members of our group.",
        "We were fit enough to reach the top."
      ]
    }
  },
  {
    id: "unit-26",
    unit: 26,
    title: "Comparatives and superlatives",
    definition: {
      description: "Comparatives compare two things or people. Superlatives compare one thing to all others in a group.",
      situations: [
        { situation: "Comparing two things", example: "This laptop is faster than my old one." },
        { situation: "Comparing to all others", example: "That was the best meal I've ever had." },
        { situation: "Saying things are equal", example: "This coat is as warm as that one." },
        { situation: "Gradual change", example: "The days are getting shorter and shorter." }
      ]
    },
    structures: [
      {
        name: "Comparative",
        positive: "short adj + -er + than / more + long adj + than",
        negative: "not as + adj + as",
        question: "Is + S + adj-er/more adj + than + S?",
        example_positive: "This hotel is cheaper than the other one.",
        example_negative: "She is not as tall as her sister.",
        example_question: "Is Madrid hotter than London?"
      },
      {
        name: "Superlative",
        positive: "the + short adj + -est / the + most + long adj",
        negative: "not the + adj-est / not the most + adj",
        question: "What is the + adj-est / most + adj?",
        example_positive: "This is the most expensive restaurant in town.",
        example_negative: "It's not the most exciting film ever.",
        example_question: "What's the tallest building in the world?"
      }
    ],
    notes: [
      "Short adjectives (1-2 syllables): add -er/-est: fast → faster → fastest.",
      "Long adjectives (3+ syllables): use more/most: interesting → more interesting → most interesting.",
      "Irregular forms: good → better → best / bad → worse → worst / far → further → furthest.",
      "Use the with superlatives: the best, the most popular."
    ],
    exercises: [
      { sentence: "My new flat is _____ (comfortable) than my old one.", answer: "more comfortable", hint: "comparative, long adjective" },
      { sentence: "This is _____ (bad) film I have ever seen.", answer: "the worst", hint: "superlative, irregular" },
      { sentence: "She runs _____ (fast) than anyone else on the team.", answer: "faster", hint: "comparative, short adjective" },
      { sentence: "He is not _____ (tall) _____ his brother.", answer: "as tall as", hint: "as ... as, equal comparison" },
      { sentence: "The _____ (old) the wine, the _____ (good) it tastes.", answer: "older / better", hint: "the + comparative" }
    ],
    reading: {
      title: "Choosing a city to live in",
      text: "I've lived in three cities: a small town, a medium-sized city, and a big capital. The small town was the quietest and the most affordable, but it was the least exciting. The capital was more expensive than the others, but it had the best transport links and the widest range of job opportunities. The medium-sized city was a good balance — not as noisy as the capital but more interesting than the town. In the end, I chose the medium-sized city because it felt more comfortable for everyday life. It wasn't the most glamorous, but it was the best fit for me.",
      highlight: [
        "The small town was the quietest and the most affordable.",
        "The capital was more expensive than the others.",
        "Not as noisy as the capital but more interesting than the town.",
        "It was the best fit for me."
      ]
    }
  },
  {
    id: "unit-28",
    unit: 28,
    title: "Conditionals 1 (zero, first, second conditional)",
    definition: {
      description: "Conditionals describe situations and their results. Zero conditionals are for general truths, first conditionals are for real future possibilities, and second conditionals are for imaginary or unlikely situations.",
      situations: [
        { situation: "General truth or fact", example: "If you heat water to 100°C, it boils." },
        { situation: "Real future possibility", example: "If it rains, we'll cancel the barbecue." },
        { situation: "Imaginary situation (present/future)", example: "If I won the lottery, I would travel the world." },
        { situation: "Giving advice", example: "If I were you, I would apologise." }
      ]
    },
    structures: [
      {
        name: "Zero conditional",
        positive: "If + present simple, present simple",
        negative: "If + S + don't/doesn't + V, S + don't/doesn't + V",
        question: "What happens if + present simple?",
        example_positive: "If you press this button, the machine starts.",
        example_negative: "If you don't water plants, they die.",
        example_question: "What happens if it snows?"
      },
      {
        name: "First conditional",
        positive: "If + present simple, will + V",
        negative: "If + present simple, won't + V",
        question: "Will + S + V + if + present simple?",
        example_positive: "If she studies hard, she'll pass the exam.",
        example_negative: "If you don't hurry, you'll miss the train.",
        example_question: "Will you come if I invite you?"
      },
      {
        name: "Second conditional",
        positive: "If + past simple, would + V",
        negative: "If + past simple, wouldn't + V",
        question: "Would + S + V + if + past simple?",
        example_positive: "If I had more time, I would learn to paint.",
        example_negative: "If she knew the answer, she wouldn't ask.",
        example_question: "What would you do if you lost your job?"
      }
    ],
    notes: [
      "Zero conditional: use for facts and rules that are always true.",
      "First conditional: use for real, possible future situations.",
      "Second conditional: use for imaginary, unlikely, or hypothetical situations.",
      "In second conditionals, use were instead of was in formal English: If I were you..."
    ],
    exercises: [
      { sentence: "If you _____ (touch) the stove, you _____ (burn) yourself.", answer: "touch / burn", hint: "zero conditional" },
      { sentence: "If it _____ (be) sunny tomorrow, we _____ (go) to the beach.", answer: "is / will go", hint: "first conditional" },
      { sentence: "If I _____ (have) more money, I _____ (buy) a bigger flat.", answer: "had / would buy", hint: "second conditional" },
      { sentence: "If she _____ (not study), she _____ (fail) her exams.", answer: "doesn't study / will fail", hint: "first conditional, negative" },
      { sentence: "What _____ you _____ (do) if you _____ (find) a wallet in the street?", answer: "would / do / found", hint: "second conditional, question" }
    ],
    reading: {
      title: "A dream and a plan",
      text: "Anna loves the idea of opening her own café one day. 'If I had enough money, I would rent a small place near the park,' she says. 'If the café were successful, I would hire two or three staff.' Her friend Tom is more practical. 'If you save a little every month, you'll have enough in a few years,' he says. Anna agrees. She has started putting money aside. 'If things go well, I'll apply for a small business loan next year,' she adds. Her mother always says: 'If you work hard, dreams come true.' Anna believes that.",
      highlight: [
        "If I had enough money, I would rent a small place near the park.",
        "If you save a little every month, you'll have enough in a few years.",
        "If things go well, I'll apply for a small business loan next year.",
        "If you work hard, dreams come true."
      ]
    }
  },
  {
    id: "unit-29",
    unit: 29,
    title: "Conditionals 2 (third conditional)",
    definition: {
      description: "The third conditional talks about imaginary situations in the past — things that did not happen and their imaginary results. It is often used to express regret or to think about how things could have been different.",
      situations: [
        { situation: "Imaginary past result", example: "If I had studied harder, I would have passed." },
        { situation: "Regret about the past", example: "If she had left earlier, she wouldn't have missed the bus." },
        { situation: "Speculating about the past", example: "If he had known about the traffic, he would have taken a different route." },
        { situation: "Mixed conditional (past cause, present result)", example: "If I had taken that job, I would be living in New York now." }
      ]
    },
    structures: [
      {
        name: "Third conditional",
        positive: "If + past perfect, would have + past participle",
        negative: "If + past perfect, wouldn't have + past participle",
        question: "Would + S + have + past participle + if + past perfect?",
        example_positive: "If she had come earlier, she would have met him.",
        example_negative: "If I had known, I wouldn't have said that.",
        example_question: "Would you have accepted if they had offered more money?"
      },
      {
        name: "Mixed conditional (past → present)",
        positive: "If + past perfect, would + V",
        negative: "If + past perfect, wouldn't + V",
        question: "Would + S + V + if + S + had + past participle?",
        example_positive: "If she had studied medicine, she would be a doctor now.",
        example_negative: "If I hadn't moved here, I wouldn't know you.",
        example_question: "Would he be happier if he had stayed?"
      }
    ],
    notes: [
      "The third conditional always refers to the past and cannot change — it is imaginary.",
      "Would have + past participle = the imaginary past result.",
      "Could have and might have can replace would have: If you had asked, I could have helped you.",
      "Mixed conditionals combine third conditional with second: the past cause has a present result."
    ],
    exercises: [
      { sentence: "If she _____ (study) more, she _____ (pass) the exam.", answer: "had studied / would have passed", hint: "third conditional" },
      { sentence: "I _____ (not miss) the flight if I _____ (wake up) earlier.", answer: "wouldn't have missed / had woken up", hint: "third conditional, negative" },
      { sentence: "If he _____ (take) the other road, he _____ (avoid) the traffic.", answer: "had taken / would have avoided", hint: "third conditional" },
      { sentence: "She _____ (not be) sick now if she _____ (wear) a coat yesterday.", answer: "wouldn't be / had worn", hint: "mixed conditional" },
      { sentence: "Would you _____ (accept) the offer if they _____ (give) you more money?", answer: "have accepted / had given", hint: "third conditional, question" }
    ],
    reading: {
      title: "The wrong decision",
      text: "Ben often thinks about the night he turned down a job offer in Berlin. If he had accepted it, he would have moved to Germany and started a new career. If he had gone, he would have met different people and had completely new experiences. But he chose to stay because his relationship felt important at the time. Now he wonders: if he had moved, would he have been happier? His friend says, 'If you hadn't stayed, you wouldn't have helped your family through that difficult year.' Ben realises the decision wasn't wrong — it was just different. There is no perfect path.",
      highlight: [
        "If he had accepted it, he would have moved to Germany.",
        "If he had gone, he would have met different people.",
        "If you hadn't stayed, you wouldn't have helped your family.",
        "Would he have been happier if he had moved?"
      ]
    }
  },
  {
    id: "unit-31",
    unit: 31,
    title: "Reported speech",
    definition: {
      description: "Reported speech (indirect speech) is used to tell someone what another person said. When reporting, verb tenses usually shift back one tense, and time expressions and pronouns often change.",
      situations: [
        { situation: "Reporting a statement", example: "She said she was tired." },
        { situation: "Reporting a past event", example: "He told me he had finished the report." },
        { situation: "Reporting a future plan", example: "They said they would call me." },
        { situation: "Reporting a fact", example: "The teacher said that Paris is the capital of France." }
      ]
    },
    structures: [
      {
        name: "Reported statements",
        positive: "S + said (that) + reported clause (tense shifted back)",
        negative: "S + said (that) + S + wasn't/didn't/wouldn't + V",
        question: "S + told + O + (that) + clause",
        example_positive: "Direct: 'I am happy.' → Reported: She said she was happy.",
        example_negative: "Direct: 'I don't know.' → Reported: He said he didn't know.",
        example_question: "Direct: 'I will help.' → Reported: She told me she would help."
      }
    ],
    notes: [
      "Tense shifts: present simple → past simple / present continuous → past continuous / will → would / can → could.",
      "Time shifts: now → then / today → that day / tomorrow → the next day / yesterday → the day before.",
      "Say vs. tell: say (no object): She said she was fine. / tell (+ object): She told me she was fine.",
      "No tense shift needed if the situation is still true: He said the Earth is round."
    ],
    exercises: [
      { sentence: "'I am studying for my exam,' she said. → She said she _____ for her exam.", answer: "was studying", hint: "present continuous → past continuous" },
      { sentence: "'We will arrive at 8,' they said. → They said they _____ at 8.", answer: "would arrive", hint: "will → would" },
      { sentence: "'I don't like spicy food,' he told me. → He told me he _____ spicy food.", answer: "didn't like", hint: "present simple → past simple" },
      { sentence: "'I have already eaten,' she said. → She said she _____ already _____.", answer: "had / eaten", hint: "present perfect → past perfect" },
      { sentence: "'I can't come tomorrow,' he said. → He said he _____ come the next day.", answer: "couldn't", hint: "can → could" }
    ],
    reading: {
      title: "After the meeting",
      text: "After the team meeting, Sophie told her colleague what had been discussed. She said the manager had announced that the project deadline would be moved to the following month. She also told him that the new team member would join that week. A colleague had asked about the budget, and the manager had said it hadn't been confirmed yet. Sophie added that everyone had seemed pleased about the extra time. She mentioned that the manager had told them they were doing an excellent job. Her colleague smiled and said he was glad he hadn't missed anything important.",
      highlight: [
        "She said the manager had announced that the deadline would be moved.",
        "She told him that the new team member would join that week.",
        "The manager had said it hadn't been confirmed yet.",
        "He said he was glad he hadn't missed anything important."
      ]
    }
  },
  {
    id: "unit-32",
    unit: 32,
    title: "Reported questions, orders, requests",
    definition: {
      description: "When we report questions, the word order changes to subject + verb (no inversion). Reported orders and requests use an infinitive structure.",
      situations: [
        { situation: "Reported yes/no question", example: "She asked if I had eaten." },
        { situation: "Reported wh-question", example: "He asked me where I lived." },
        { situation: "Reported order", example: "The teacher told us to sit down." },
        { situation: "Reported request", example: "She asked me to help her." }
      ]
    },
    structures: [
      {
        name: "Reported questions",
        positive: "S + asked + (O) + wh-word / if/whether + S + V (statement order)",
        negative: "S + asked + if/whether + S + didn't/wasn't + V",
        question: "No question mark in reported questions.",
        example_positive: "Direct: 'Where do you live?' → He asked me where I lived.",
        example_negative: "Direct: 'Are you coming?' → She asked if I was coming.",
        example_question: "Direct: 'Did you finish?' → He asked whether I had finished."
      },
      {
        name: "Reported orders and requests",
        positive: "S + told/asked + O + (not) + to + V",
        negative: "S + told + O + not + to + V",
        question: "S + asked + O + to + V?",
        example_positive: "She told me to close the window.",
        example_negative: "He told the children not to run.",
        example_question: "She asked me to wait outside."
      }
    ],
    notes: [
      "In reported questions, there is NO inversion and NO question mark.",
      "Use if or whether for yes/no reported questions.",
      "Use tell + object + to infinitive for orders: He told me to leave.",
      "Use ask + object + to infinitive for requests: She asked me to help."
    ],
    exercises: [
      { sentence: "'What time is it?' → She asked me what time _____.", answer: "it was", hint: "reported wh-question, no inversion" },
      { sentence: "'Are you free tonight?' → He asked if I _____ free that evening.", answer: "was", hint: "reported yes/no question" },
      { sentence: "'Don't touch the screen!' → She told us not _____ the screen.", answer: "to touch", hint: "reported order, negative" },
      { sentence: "'Can you open the door?' → He asked me _____ the door.", answer: "to open", hint: "reported request" },
      { sentence: "'Where did you go last weekend?' → She asked me where I _____ the weekend before.", answer: "had gone", hint: "reported wh-question, tense shift" }
    ],
    reading: {
      title: "The interview",
      text: "After the job interview, Paul told his flatmate how it had gone. He said the interviewer had asked him where he had studied and what his previous experience was. She had also asked whether he could start in January. Paul said he had told her he was available immediately. At one point, she had asked him to describe a difficult situation he had handled at work. He told his flatmate he had felt nervous, but he thought it went well. The interviewer had asked him not to contact HR directly and told him they would be in touch within a week.",
      highlight: [
        "The interviewer had asked him where he had studied.",
        "She had also asked whether he could start in January.",
        "She had asked him to describe a difficult situation.",
        "The interviewer had asked him not to contact HR directly."
      ]
    }
  },
  {
    id: "unit-34",
    unit: 34,
    title: "Direct and indirect objects",
    definition: {
      description: "The direct object receives the action of the verb. The indirect object shows who receives or benefits from the action. Word order can change depending on whether a preposition is used.",
      situations: [
        { situation: "Giving something to someone", example: "She gave her friend a gift." },
        { situation: "With a preposition", example: "She gave a gift to her friend." },
        { situation: "Sending or showing", example: "He showed me the photos." },
        { situation: "Telling or teaching", example: "The teacher explained the rule to us." }
      ]
    },
    structures: [
      {
        name: "Direct and indirect object order",
        positive: "S + V + indirect object + direct object (no preposition)",
        negative: "S + V + direct object + to/for + indirect object (with preposition)",
        question: "Who/What did + S + V + to/for?",
        example_positive: "She sent me a message.",
        example_negative: "She sent a message to me.",
        example_question: "Who did you buy the flowers for?"
      }
    ],
    notes: [
      "Common verbs with both objects: give, send, tell, show, bring, buy, teach, offer, write.",
      "If the indirect object is a pronoun, it often comes before the direct object: Give me the book.",
      "If the direct object is a pronoun, use the preposition structure: Give it to me (NOT give me it).",
      "Some verbs only use to (give, send, show); others use for (buy, make, cook, get)."
    ],
    exercises: [
      { sentence: "Could you pass _____ the salt, please?", answer: "me", hint: "indirect object, pronoun" },
      { sentence: "She wrote a letter _____ her grandmother.", answer: "to", hint: "preposition for indirect object" },
      { sentence: "He gave _____ a birthday card.", answer: "her", hint: "indirect object before direct object" },
      { sentence: "The teacher explained the grammar rule _____ the class.", answer: "to", hint: "to + indirect object" },
      { sentence: "Can you buy _____ some milk on your way home?", answer: "me", hint: "indirect object, pronoun" }
    ],
    reading: {
      title: "A surprise birthday",
      text: "For her mother's birthday, Clara planned a special evening. She baked her a chocolate cake and made her a card with a handwritten message. Her brother bought their mother some flowers and gave them to her at the door. Their father had booked a table at her favourite restaurant and told the staff to bring her a small gift. At the end of the evening, Clara handed her mother an envelope. Inside was a gift card for a spa day. Her mother smiled and said it was the best birthday she had had in years. Clara felt happy — she had given her mother something truly special.",
      highlight: [
        "She baked her a chocolate cake and made her a card.",
        "Her brother gave the flowers to her at the door.",
        "Their father told the staff to bring her a small gift.",
        "Clara handed her mother an envelope."
      ]
    }
  },
  {
    id: "unit-35",
    unit: 35,
    title: "Wish",
    definition: {
      description: "Wish is used to express regret about the present or past, or to want a situation to be different. It is followed by a past tense for present wishes and a past perfect for past wishes.",
      situations: [
        { situation: "Wish about present (regret)", example: "I wish I had more free time." },
        { situation: "Wish about past (regret)", example: "I wish I had studied harder." },
        { situation: "Wishing someone would change", example: "I wish he would stop talking so loudly." },
        { situation: "Expressing a desire for the future", example: "I wish it would stop raining." }
      ]
    },
    structures: [
      {
        name: "Wish + past simple (present wish)",
        positive: "S + wish + S + past simple",
        negative: "S + wish + S + didn't/weren't + V",
        question: "Do you wish + S + past simple?",
        example_positive: "I wish I spoke better French.",
        example_negative: "She wishes she didn't have to work weekends.",
        example_question: "Do you wish you lived somewhere else?"
      },
      {
        name: "Wish + past perfect (past wish / regret)",
        positive: "S + wish + S + had + past participle",
        negative: "S + wish + S + hadn't + past participle",
        question: "Do you wish + S + had + past participle?",
        example_positive: "I wish I had taken more photos.",
        example_negative: "She wishes she hadn't said that.",
        example_question: "Do you wish you had chosen a different career?"
      },
      {
        name: "Wish + would (wanting change in behaviour)",
        positive: "S + wish + O + would + V",
        negative: "S + wish + O + wouldn't + V",
        question: "Do you wish + O + would + V?",
        example_positive: "I wish you would listen more carefully.",
        example_negative: "She wishes he wouldn't drive so fast.",
        example_question: "Do you wish they would arrive on time?"
      }
    ],
    notes: [
      "After wish, use were instead of was in formal English: I wish I were taller.",
      "Wish + would is used for habits or behaviour you want someone else to change.",
      "Wish + past perfect = regret about a completed past action.",
      "If only is more emphatic than wish: If only I had listened!"
    ],
    exercises: [
      { sentence: "I wish I _____ (know) how to cook. I always eat out.", answer: "knew", hint: "wish + past simple, present regret" },
      { sentence: "She wishes she _____ (not say) those words. She feels terrible.", answer: "hadn't said", hint: "wish + past perfect, regret" },
      { sentence: "I wish the neighbours _____ (stop) playing loud music at night.", answer: "would stop", hint: "wish + would, behaviour change" },
      { sentence: "He wishes he _____ (study) medicine instead of law.", answer: "had studied", hint: "wish + past perfect" },
      { sentence: "If only I _____ (be) taller! I can't reach the shelf.", answer: "were", hint: "if only + were, present wish" }
    ],
    reading: {
      title: "Looking back",
      text: "Every year around his birthday, Marco sits with a cup of tea and thinks about his choices. He wishes he had spent more time with his father before he passed away. He also wishes he hadn't left his hometown so young — he was only eighteen. 'I wish I knew what I know now,' he says quietly. He looks at an old photo and wishes things were simpler again. But he doesn't regret everything. He is proud of the business he built. He only wishes he had started it five years earlier. 'If only I had believed in myself sooner,' he says with a smile.",
      highlight: [
        "He wishes he had spent more time with his father.",
        "He wishes he hadn't left his hometown so young.",
        "I wish I knew what I know now.",
        "If only I had believed in myself sooner."
      ]
    }
  },
  {
    id: "unit-37",
    unit: 37,
    title: "-ing and infinitive",
    definition: {
      description: "Some verbs are followed by -ing, some by the infinitive (to + verb), and some can take both — sometimes with a change in meaning.",
      situations: [
        { situation: "Verb + -ing", example: "She enjoys cooking for her family." },
        { situation: "Verb + infinitive", example: "He decided to change jobs." },
        { situation: "Verb + both (same meaning)", example: "I like swimming. / I like to swim." },
        { situation: "Verb + both (different meaning)", example: "She stopped eating. / She stopped to eat." }
      ]
    },
    structures: [
      {
        name: "Verbs + -ing",
        positive: "S + verb + V-ing",
        negative: "S + verb + not + V-ing",
        question: "Do/Does + S + verb + V-ing?",
        example_positive: "He loves travelling by train.",
        example_negative: "I don't mind waiting a little.",
        example_question: "Do you enjoy cooking?"
      },
      {
        name: "Verbs + infinitive (to + V)",
        positive: "S + verb + to + V",
        negative: "S + verb + not + to + V (or: decided not to go)",
        question: "Do/Does + S + verb + to + V?",
        example_positive: "She wants to become a lawyer.",
        example_negative: "He decided not to apply.",
        example_question: "Do you hope to travel next year?"
      },
      {
        name: "Verbs + both (meaning changes)",
        positive: "remember/forget/stop/try + -ing or + to (different meanings)",
        negative: "stop + -ing = cease / stop + to = pause in order to",
        question: "remember + -ing = memory / remember + to = remember a task",
        example_positive: "I remember meeting her (memory of past event).",
        example_negative: "I remembered to call her (= I didn't forget to do it).",
        example_question: "Did you try calling him? / Did you try to call him?"
      }
    ],
    notes: [
      "Verbs followed by -ing: enjoy, mind, avoid, finish, suggest, keep, consider, miss, practise.",
      "Verbs followed by infinitive: want, hope, decide, plan, offer, refuse, seem, need, manage.",
      "After prepositions, always use -ing: interested in learning, good at cooking.",
      "Stop + -ing = you stop doing something. Stop + to + V = you stop in order to do something."
    ],
    exercises: [
      { sentence: "She enjoys _____ (walk) in the park early in the morning.", answer: "walking", hint: "verb + -ing: enjoy" },
      { sentence: "He decided _____ (apply) for the scholarship.", answer: "to apply", hint: "verb + infinitive: decide" },
      { sentence: "Don't forget _____ (lock) the door when you leave.", answer: "to lock", hint: "verb + infinitive: remember/forget task" },
      { sentence: "I remember _____ (see) her at the party last year.", answer: "seeing", hint: "verb + -ing: memory of past" },
      { sentence: "She stopped _____ (check) her phone and focused on the meeting.", answer: "checking", hint: "stop + -ing: cease" }
    ],
    reading: {
      title: "Learning a new skill",
      text: "Kai had always wanted to learn how to draw, but he kept putting it off. Finally, he decided to sign up for a local class. He enjoyed learning the basic techniques, and he practised drawing faces every evening. He tried to improve his shading and kept working on it for months. One day he stopped to look at his earlier sketches and couldn't believe how much he had improved. He remembered struggling with simple shapes at first. Now he was considering entering a local art competition. His teacher suggested sharing his work online. Kai had avoided doing that before, but now he felt ready.",
      highlight: [
        "He kept putting it off.",
        "He decided to sign up for a local class.",
        "He stopped to look at his earlier sketches.",
        "He remembered struggling with simple shapes at first."
      ]
    }
  },
  {
    id: "unit-38",
    unit: 38,
    title: "Both, either, neither, so, nor",
    definition: {
      description: "Both, either, and neither are used to talk about two people or things. So and nor/neither are used to agree with positive or negative statements.",
      situations: [
        { situation: "Talking about two people/things", example: "Both sisters are doctors." },
        { situation: "Choosing between two options", example: "You can take either road — they both lead to town." },
        { situation: "Negative about two things", example: "Neither café was open." },
        { situation: "Agreeing with a statement", example: "A: I love pasta. B: So do I." }
      ]
    },
    structures: [
      {
        name: "Both / Either / Neither",
        positive: "both + plural noun / both of + the/pronoun + plural noun",
        negative: "neither + singular noun (negative meaning)",
        question: "either + singular noun (any one of two)",
        example_positive: "Both candidates were impressive.",
        example_negative: "Neither option is perfect.",
        example_question: "You can sit on either side."
      },
      {
        name: "So / Nor / Neither (short agreements)",
        positive: "So + auxiliary + S (agreeing with positive)",
        negative: "Neither/Nor + auxiliary + S (agreeing with negative)",
        question: "Are both of them + adj?",
        example_positive: "A: I can swim. B: So can I.",
        example_negative: "A: I don't eat meat. B: Neither do I.",
        example_question: "A: She hasn't replied. B: Nor has he."
      }
    ],
    notes: [
      "Both = the two things are true / positive. Neither = none of the two / negative meaning.",
      "Either can be negative too: I don't like either (= I don't like any of the two).",
      "So + auxiliary + subject to agree with positive; Neither/Nor + auxiliary + subject to agree with negative.",
      "The auxiliary in the short answer must match the tense of the original statement."
    ],
    exercises: [
      { sentence: "_____ of my brothers live abroad — one in Spain, one in Canada.", answer: "Both", hint: "both, two people" },
      { sentence: "A: I haven't seen that film. B: _____ have I.", answer: "Neither", hint: "agreeing with negative" },
      { sentence: "_____ restaurant was good. I preferred the one near the river.", answer: "Neither", hint: "neither, negative about two things" },
      { sentence: "A: I love spicy food. B: _____ do I!", answer: "So", hint: "agreeing with positive" },
      { sentence: "You can take _____ bus — they go to the same place.", answer: "either", hint: "either, any one of two options" }
    ],
    reading: {
      title: "Two new colleagues",
      text: "Priya and Sam started at the company on the same day. Both of them had experience in marketing, and neither had worked in such a large office before. They were both friendly and hardworking. At lunch, Priya said she liked the canteen food, and Sam said so did he. Later, Priya mentioned she hadn't used the project management software before. Sam said neither had he, so they decided to figure it out together. Either approach they tried worked reasonably well. By the end of the day, both felt settled. Their manager said she had been lucky to hire two such capable people at the same time.",
      highlight: [
        "Both of them had experience in marketing.",
        "Neither had worked in such a large office before.",
        "Priya said she liked the canteen food, and Sam said so did he.",
        "Sam said neither had he."
      ]
    }
  },
  {
    id: "unit-40",
    unit: 40,
    title: "Connectives",
    definition: {
      description: "Connectives are words and phrases that link ideas within a sentence or between sentences. They show relationships like contrast, reason, result, and addition.",
      situations: [
        { situation: "Adding information", example: "She is intelligent. Moreover, she is very hard-working." },
        { situation: "Showing contrast", example: "He is rich, but he is not happy." },
        { situation: "Giving a reason", example: "I stayed home because it was raining." },
        { situation: "Showing a result", example: "She studied hard, so she passed the exam." }
      ]
    },
    structures: [
      {
        name: "Addition",
        positive: "and, also, in addition, furthermore, moreover, as well as",
        negative: "Used to add more supporting points.",
        question: "Both ... and ... / Not only ... but also ...",
        example_positive: "The hotel was cheap. In addition, the location was perfect.",
        example_negative: "She not only sings but also plays the piano.",
        example_question: "Both the food and the service were excellent."
      },
      {
        name: "Contrast",
        positive: "but, however, although, even though, despite, in spite of, while, whereas",
        negative: "Used to show an unexpected or opposing idea.",
        question: "Although + clause / Despite + noun/-ing",
        example_positive: "Although it was cold, we went for a walk.",
        example_negative: "Despite the rain, the match continued.",
        example_question: "He earns a lot. However, he is never satisfied."
      },
      {
        name: "Reason and result",
        positive: "because, since, as (reason) / so, therefore, as a result, consequently (result)",
        negative: "because of + noun (not a full clause)",
        question: "Why? Because... / What happened? As a result...",
        example_positive: "She was late because she missed the bus.",
        example_negative: "The event was cancelled due to bad weather.",
        example_question: "He didn't prepare. As a result, he failed."
      }
    ],
    notes: [
      "Although/even though are followed by a clause; despite/in spite of are followed by a noun or -ing.",
      "However and moreover are followed by a comma: However, the weather was fine.",
      "Because introduces a reason clause; so introduces a result clause.",
      "Therefore and consequently are more formal than so."
    ],
    exercises: [
      { sentence: "He was very tired; _____, he kept working until midnight.", answer: "however", hint: "contrast connector" },
      { sentence: "She got the job _____ she had no previous experience.", answer: "even though / although", hint: "contrast connector + clause" },
      { sentence: "The traffic was terrible. _____, we arrived late.", answer: "As a result / Consequently / Therefore", hint: "result connector" },
      { sentence: "_____ the bad weather, the festival was a great success.", answer: "Despite / In spite of", hint: "contrast + noun/-ing" },
      { sentence: "He loves cooking. _____, he goes to the market every Saturday.", answer: "In addition / Furthermore / Moreover", hint: "addition connector" }
    ],
    reading: {
      title: "Working from home",
      text: "Many people now work from home, and this has both advantages and disadvantages. On the one hand, employees save time and money on commuting. Furthermore, they often feel more relaxed and productive at home. However, some people find it hard to separate work from personal life. In addition, not everyone has a quiet space to concentrate. Despite these challenges, surveys show that most remote workers would not return to a traditional office full-time. As a result, many companies are now offering flexible working arrangements. Although it is not perfect for everyone, working from home is clearly here to stay.",
      highlight: [
        "Furthermore, they often feel more relaxed and productive at home.",
        "However, some people find it hard to separate work from personal life.",
        "Despite these challenges, surveys show that most remote workers would not return.",
        "As a result, many companies are now offering flexible working arrangements."
      ]
    }
  },
  {
    id: "unit-41",
    unit: 41,
    title: "The causative (have something done)",
    definition: {
      description: "The causative structure (have/get something done) is used when someone arranges for another person to do something for them. The subject does not do the action themselves.",
      situations: [
        { situation: "Professional service", example: "I had my car serviced at the garage." },
        { situation: "Arranging work done at home", example: "We're having the kitchen painted next week." },
        { situation: "Personal service", example: "She gets her hair cut every six weeks." },
        { situation: "Something negative happened to you", example: "He had his wallet stolen on the train." }
      ]
    },
    structures: [
      {
        name: "Have something done",
        positive: "S + have/has/had + object + past participle",
        negative: "S + don't/doesn't/didn't + have + object + past participle",
        question: "Do/Does/Did + S + have + object + past participle?",
        example_positive: "She has her teeth checked every year.",
        example_negative: "I didn't have the car repaired — it was too expensive.",
        example_question: "Do you have your hair cut here?"
      },
      {
        name: "Get something done (informal)",
        positive: "S + get/gets/got + object + past participle",
        negative: "S + don't/doesn't/didn't + get + object + past participle",
        question: "Did + S + get + object + past participle?",
        example_positive: "He got his phone fixed at the shop.",
        example_negative: "She didn't get her essay checked before submitting.",
        example_question: "Did you get your glasses repaired?"
      }
    ],
    notes: [
      "The causative shows that someone else does the action, arranged by the subject.",
      "Get something done is more informal than have something done.",
      "The object comes between have/get and the past participle.",
      "The same structure can describe a negative event: He had his phone stolen."
    ],
    exercises: [
      { sentence: "She _____ her apartment _____ (redecorate) last month. It looks amazing.", answer: "had / redecorated", hint: "have something done, past" },
      { sentence: "I need to _____ my passport _____ (renew) before the trip.", answer: "have / renewed", hint: "have something done" },
      { sentence: "He _____ his car _____ (steal) outside the supermarket.", answer: "had / stolen", hint: "causative, negative event" },
      { sentence: "She _____ her eyes _____ (test) every two years.", answer: "gets / tested", hint: "get something done" },
      { sentence: "They are _____ a new alarm system _____ (install) tomorrow.", answer: "having / installed", hint: "have something done, present continuous" }
    ],
    reading: {
      title: "Preparing for the party",
      text: "Nina was preparing for her big birthday party. She had the house professionally cleaned the day before. In the morning, she got her hair and nails done at a local salon. Her partner had a large cake made by their favourite bakery. They had about sixty balloons delivered in the afternoon. Nina also had the garden lights repaired since two of them had stopped working. By evening, everything was ready. A photographer had been hired, and he was having his equipment set up in the corner. Nina looked around and felt happy. She hadn't done everything herself — but that was exactly the point.",
      highlight: [
        "She had the house professionally cleaned the day before.",
        "She got her hair and nails done at a local salon.",
        "Her partner had a large cake made by their favourite bakery.",
        "Nina also had the garden lights repaired."
      ]
    }
  }
];
