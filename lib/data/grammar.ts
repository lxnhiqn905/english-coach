export interface GrammarForm {
  statement: string | null;
  negative: string | null;
  question: string | null;
}

export interface GrammarUse {
  use: string;
  example: string;
}

export interface GrammarSubtopic {
  name: string;
  form: GrammarForm | null;
  uses: GrammarUse[];
  helpful_hints: string[];
  watch_out: string[];
}

export interface GrammarUnit {
  id: string;
  unit: number;
  title: string;
  subtopics: GrammarSubtopic[];
}

export const grammarUnits: GrammarUnit[] = [
  {
    "id": "unit-1",
    "unit": 1,
    "title": "Present simple, present continuous, stative verbs",
    "subtopics": [
      {
        "name": "Present simple",
        "form": {
          "statement": "I/you/we/they play ... / He/she/it plays ...",
          "negative": "I/you/we/they do not (don't) play ... / He/she/it does not (doesn't) play ...",
          "question": "Do I/you/we/they play ...? / Does he/she/it play ...?"
        },
        "uses": [
          {
            "use": "Present habits",
            "example": "Marsha goes to dance lessons every Saturday."
          },
          {
            "use": "Permanent situations",
            "example": "Does Dan work at the cinema?"
          },
          {
            "use": "States",
            "example": "I like the new James Bond film."
          },
          {
            "use": "General truths",
            "example": "You play chess with 32 pieces."
          }
        ],
        "helpful_hints": [
          "The present simple is often used with the following words and phrases: adverbs: always • usually • often • sometimes • rarely • never",
          "phrases: every Monday/week/etc, each Monday/week/etc, once/twice a week/month/etc, three times a week/month/etc",
          "Remember that these adverbs usually go before the verb, but after the verb be. I often play football with my friends. I am often late for my piano lessons."
        ],
        "watch_out": [
          "The verbs be and have have irregular present forms. See page 182."
        ]
      },
      {
        "name": "Present continuous",
        "form": {
          "statement": "I am (I'm) playing ... / He/she/it is (he's/'s) playing ... / You/we/they are ('re) playing ...",
          "negative": "I am not (I'm not) playing ... / He/she/it is not (isn't / 's not) playing ... / You/we/they are not (aren't / 're not) playing ...",
          "question": "Am I playing ...? / Is he/she/it playing ...? / Are you/they playing ...?"
        },
        "uses": [
          {
            "use": "Actions happening now",
            "example": "Jan is watching a DVD upstairs."
          },
          {
            "use": "Temporary situations",
            "example": "She is working at the museum until the end of the month."
          },
          {
            "use": "Annoying habits (usually with always)",
            "example": "My brother is always borrowing my CDs without asking!"
          }
        ],
        "helpful_hints": [
          "The present continuous is often used with the following words and phrases: now • right now • at the moment • today • this week/month/etc"
        ],
        "watch_out": []
      },
      {
        "name": "Stative verbs",
        "form": null,
        "uses": [],
        "helpful_hints": [
          "Stative verbs do not usually describe actions. They describe states (feelings, thoughts, etc). They are not normally used in continuous tenses.",
          "✓ I like reading books in my free time.",
          "✗ I am liking reading books in my free time.",
          "Some common stative verbs: appear, be, believe, belong to, hate, have, include, know, like, love, need, prefer, see, taste, think, understand, want"
        ],
        "watch_out": [
          "Some of these verbs (such as be, have and think) are used in continuous tenses when they describe actions.",
          "✓ What do you think about his new song?",
          "✓ I'm thinking about last night's match."
        ]
      }
    ]
  },
  {
    "id": "unit-2",
    "unit": 2,
    "title": "Past simple, past continuous, used to",
    "subtopics": [
      {
        "name": "Past simple",
        "form": {
          "statement": "I/you/he/she/it/we/they played ...",
          "negative": "I/you/he/she/it/we/they did not (didn't) play ...",
          "question": "Did I/you/he/she/it/we/they play ...?"
        },
        "uses": [
          {
            "use": "Completed actions",
            "example": "I saw the new James Bond film yesterday."
          },
          {
            "use": "Repeated actions in the past",
            "example": "I went to the theatre four times last month."
          },
          {
            "use": "General truths about the past",
            "example": "Fifty years ago, people didn't spend as much on entertainment as they do today."
          },
          {
            "use": "Main events in a story",
            "example": "Josh pushed the door open and looked inside the room."
          }
        ],
        "helpful_hints": [
          "The past simple is often used with the following words and phrases: yesterday • last summer/year/etc • in January/2001/etc • an hour/a week/a year ago"
        ],
        "watch_out": [
          "Some verbs have irregular past simple forms. See page 182."
        ]
      },
      {
        "name": "Past continuous",
        "form": {
          "statement": "I/he/she/it was playing ... / You/we/they were playing ...",
          "negative": "I/he/she/it was not (wasn't) playing ... / You/we/they were not (weren't) playing ...",
          "question": "Was I/he/she/it playing? / Were you/we/they playing?"
        },
        "uses": [
          {
            "use": "Actions happening at a moment in the past",
            "example": "At nine o'clock last night, I was watching TV."
          },
          {
            "use": "Two actions in progress at the same time",
            "example": "I was reading a book while you were doing the washing up."
          },
          {
            "use": "Background information in a story",
            "example": "It was raining so Wendy decided to go to the cinema."
          }
        ],
        "helpful_hints": [
          "The past continuous is often used with the following words and phrases: at that moment • at one/two/etc o'clock • while"
        ],
        "watch_out": [
          "When one action in the past interrupts the middle of another, we use the past simple and the past continuous together. ✓ The phone rang while I was watching a DVD.",
          "We do not use the past continuous for regular or repeated actions in the past. ✗ Last year, I was going to the cinema every weekend."
        ]
      },
      {
        "name": "used to",
        "form": {
          "statement": "I/you/he/she/it/we/they used to ...",
          "negative": "I/you/he/she/it/we/they never used to ... / I/you/he/she/it/we/they didn't use to ...",
          "question": "Did I/you/he/she/it/we/they use to ...?"
        },
        "uses": [
          {
            "use": "Distant past habits and states",
            "example": "When I was four, I used to eat ice cream every day."
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      }
    ]
  },
  {
    "id": "unit-4",
    "unit": 4,
    "title": "Present perfect simple, present perfect continuous",
    "subtopics": [
      {
        "name": "Present perfect simple",
        "form": {
          "statement": "I/you/we/they have ('ve) learnt ... / He/she/it has ('s) learnt ...",
          "negative": "I/you/we/they have not (haven't) learnt ... / He/she/it has not (hasn't) learnt ...",
          "question": "Have I/you/we/they learnt ...? / Has he/she/it learnt ...?"
        },
        "uses": [
          {
            "use": "Situations that started in the past and are still true",
            "example": "Mrs Jenkins has been the head teacher for three years."
          },
          {
            "use": "Completed actions at a time in the past which is not mentioned",
            "example": "I've already read that book."
          },
          {
            "use": "Completed actions where the important thing is the result now",
            "example": "They've all done their homework."
          }
        ],
        "helpful_hints": [
          "The present perfect simple is often used with the following words and phrases:",
          "for – She's taught German here for over five years.",
          "since – Mr Gray has taught French here since 2006.",
          "just – We've just done this exercise.",
          "already – We've already done this exercise.",
          "yet – We haven't checked the answers yet.",
          "ever – Have you ever had guitar lessons?",
          "never – I've never understood why they give us so much homework!",
          "it's the first time – It's the first time we've watched a video in class."
        ],
        "watch_out": [
          "We don't use the present perfect simple when we want to say when something happened in the past. We use the past simple. ✓ I did my homework last night.",
          "We don't use the past simple when we want to show that something happened before now or is still important now. We use the present perfect. ✓ I've finished! Can I go home now?",
          "Some verbs have irregular past participle forms. See page 182."
        ]
      },
      {
        "name": "Present perfect continuous",
        "form": {
          "statement": "I/you/we/they have ('ve) been studying ... / He/she/it has ('s) been studying ...",
          "negative": "I/you/we/they have not (haven't) been studying ... / He/she/it has not (hasn't) been studying ...",
          "question": "Have I/you/we/they been studying ...? / Has he/she/it been studying ...?"
        },
        "uses": [
          {
            "use": "Actions continuing up to now or just before now",
            "example": "We've been doing grammar for over an hour. Can we have a break now? They're having a break now because they've been working so hard."
          }
        ],
        "helpful_hints": [
          "The present perfect continuous is often used with the following words and phrases:",
          "for – I've been learning English for over three years.",
          "since – He's been learning Chinese since 2004.",
          "just – I've just been reading the school newspaper."
        ],
        "watch_out": [
          "The present perfect simple often emphasises the result of an action: ✓ She's written an article for the school newspaper. (= She's finished it.)",
          "The present perfect continuous often emphasises the action, and the time spent on the action, rather than the result: ✓ She's been writing an article for the school newspaper. (= She's started, but she hasn't finished it yet.)"
        ]
      }
    ]
  },
  {
    "id": "unit-5",
    "unit": 5,
    "title": "Past perfect simple, past perfect continuous",
    "subtopics": [
      {
        "name": "Past perfect simple",
        "form": {
          "statement": "I/you/he/she/it/we/they had ('d) written ...",
          "negative": "I/you/he/she/it/we/they had not (hadn't) written ...",
          "question": "Had I/you/he/she/it/we/they written ...?"
        },
        "uses": [
          {
            "use": "Actions and states before a moment in the past",
            "example": "I'd finished my homework a few minutes before the lesson started. Mrs Cross had been a teacher for twenty years before she became a head teacher."
          },
          {
            "use": "Finished actions and states where the important thing is the result at a moment in the past",
            "example": "We were happy because we'd all done our homework."
          }
        ],
        "helpful_hints": [
          "The past perfect simple is often used with the following words and phrases:",
          "by – I'd finished my homework by eight o'clock.",
          "by the time – By the time I got to class, the lesson had started.",
          "before – The teacher had checked the answers before the lesson.",
          "after – I left after I'd finished the test.",
          "just – Simon had just finished the test when the bell rang.",
          "when – I left when I'd finished the test."
        ],
        "watch_out": [
          "Whether we use the past simple or the past perfect simple can change the meaning of a sentence. ✓ The lesson started when I arrived. (= I arrived and then the lesson started.) ✓ The lesson had started when I arrived. (= The lesson started and then I arrived.)",
          "Some verbs have irregular past participle forms. See page 182."
        ]
      },
      {
        "name": "Past perfect continuous",
        "form": {
          "statement": "I/you/he/she/it/we/they had ('d) been writing ...",
          "negative": "I/you/he/she/it/we/they had not (hadn't) been writing ...",
          "question": "Had I/you/he/she/it/we/they been writing ...?"
        },
        "uses": [
          {
            "use": "Actions continuing up to, or stopping just before, a moment in the past",
            "example": "We'd been doing grammar exercises for over an hour, so we were really bored! They had a break because they'd been working so hard."
          }
        ],
        "helpful_hints": [
          "The past perfect continuous is often used with the following words and phrases:",
          "for – Tony had been studying for hours, so he had a headache.",
          "since – She'd been hoping to win the competition since the summer.",
          "before – We'd been talking about the Internet before the lesson started.",
          "all day/night/etc – I'd been studying all day."
        ],
        "watch_out": [
          "The past perfect simple often emphasises the result of an action: ✓ She'd written an article for the school newspaper. (= She'd finished it.)",
          "The past perfect continuous often emphasises the action, and the time spent on the action, rather than the result: ✓ She'd been writing an article for the newspaper. (= She'd started, but she hadn't finished it.)"
        ]
      }
    ]
  },
  {
    "id": "unit-7",
    "unit": 7,
    "title": "Future time (present continuous, will, be going to, present simple)",
    "subtopics": [
      {
        "name": "Present continuous (for future)",
        "form": {
          "statement": "See Unit 1 for the form of the present continuous.",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "Arrangements",
            "example": "We're driving to Berlin this weekend."
          }
        ],
        "helpful_hints": [],
        "watch_out": [
          "Things we want to do in the future but have not arranged are called 'intentions'. We do not use the present continuous for intentions. We use be going to instead. ✗ I'm becoming an explorer when I grow up.",
          "We do not use the present continuous for predictions. We use will or be going to instead. ✗ Do you think you're enjoying your trip to Berlin next week?"
        ]
      },
      {
        "name": "will",
        "form": {
          "statement": "I/you/he/she/it/we/they will ('ll) go ...",
          "negative": "I/you/he/she/it/we/they will not (won't) go ...",
          "question": "Will I/you/he/she/it/we/they go ...?"
        },
        "uses": [
          {
            "use": "Facts about the future",
            "example": "The new airport will be the biggest in Europe."
          },
          {
            "use": "Predictions",
            "example": "You'll have a great time in the Bahamas."
          },
          {
            "use": "Offers and requests",
            "example": "We'll help you get ready for your holiday."
          },
          {
            "use": "Decisions made now",
            "example": "I know! I'll go to China this summer."
          }
        ],
        "helpful_hints": [],
        "watch_out": [
          "With offers which are questions, we use Shall with I and we. ✓ Shall I drive you to the airport?",
          "We do not use will for arrangements. ✗ We'll visit my grandma this weekend."
        ]
      },
      {
        "name": "be going to",
        "form": {
          "statement": "I am (I'm) going to travel ... / He/she/it is ('s) going to travel ... / You/we/they are ('re) going to travel ...",
          "negative": "I am (I'm) not going to travel ... / He/she/it is not (isn't / 's not) going to travel ... / You/we/they are not (aren't / 're not) going to travel ...",
          "question": "Am I going to travel ...? / Is he/she/it going to travel ...? / Are you/we/they going to travel ...?"
        },
        "uses": [
          {
            "use": "Intentions",
            "example": "I'm going to become an explorer when I grow up."
          },
          {
            "use": "Predictions (often with evidence we can see)",
            "example": "It's going to rain, so take an umbrella."
          },
          {
            "use": "Facts about the future",
            "example": "The new airport is going to be the biggest in Europe."
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      },
      {
        "name": "Present simple (for future)",
        "form": {
          "statement": "See Unit 1 for the form of the present simple.",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "Timetables",
            "example": "My plane leaves at six."
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      }
    ]
  },
  {
    "id": "unit-8",
    "unit": 8,
    "title": "Prepositions of time and place",
    "subtopics": [
      {
        "name": "in",
        "form": null,
        "uses": [
          {
            "use": "Time: months",
            "example": "Paris is wonderful in April."
          },
          {
            "use": "Time: years",
            "example": "I first went to Russia in 2005."
          },
          {
            "use": "Time: seasons",
            "example": "My trains go along in winter."
          },
          {
            "use": "Time: parts of the day",
            "example": "My train leaves in the afternoon."
          },
          {
            "use": "Place: towns and cities",
            "example": "There's a famous castle in Edinburgh."
          },
          {
            "use": "Place: countries and continents",
            "example": "My brother is in Mexico."
          },
          {
            "use": "Place: areas and regions",
            "example": "What's life like in the desert?"
          },
          {
            "use": "Place: inside an object",
            "example": "Your passport is in the drawer."
          },
          {
            "use": "Place: inside a building",
            "example": "Sharon has been in the travel agent's for an hour."
          }
        ],
        "helpful_hints": [
          "We also use in in the following phrases: in a minute/an hour • in front of • in the middle (of) • in the future"
        ],
        "watch_out": [
          "With verbs of motion (come, go, move, run, walk, etc), we usually use to instead of in, on or at. ✓ Was it hot when you went to Japan?"
        ]
      },
      {
        "name": "on",
        "form": null,
        "uses": [
          {
            "use": "Time: days",
            "example": "I got a new car on Saturday."
          },
          {
            "use": "Time: dates",
            "example": "My birthday is on 19th March."
          },
          {
            "use": "Place: islands",
            "example": "Last year, we stayed on Mykonos."
          },
          {
            "use": "Place: pages",
            "example": "There are some useful Italian phrases on page 97."
          },
          {
            "use": "Place: on top of an object",
            "example": "Did you put your car keys on the kitchen table?"
          },
          {
            "use": "Place: on a surface",
            "example": "There's a timetable on the wall."
          }
        ],
        "helpful_hints": [
          "We also use on in the following phrases: on the beach • on the left/right • on my birthday"
        ],
        "watch_out": [
          "We say in the morning/afternoon/evening, but on Monday morning/Wednesday evening/etc. ✓ We're flying to Washington in the morning. / on Tuesday morning.",
          "We don't use a preposition with tomorrow, yesterday, tomorrow morning, yesterday evening, etc. ✓ We're flying to Washington tomorrow afternoon."
        ]
      },
      {
        "name": "at",
        "form": null,
        "uses": [
          {
            "use": "Time: clock times",
            "example": "There's a bus at ten past three."
          },
          {
            "use": "Time: holiday periods",
            "example": "What are you doing at Christmas?"
          },
          {
            "use": "Place: exact places",
            "example": "What's it like at the North Pole?"
          },
          {
            "use": "Place: addresses",
            "example": "My cousin lives at 132 London Road."
          },
          {
            "use": "Place: buildings, when we are talking about the activities that happen there",
            "example": "I think John is at the cinema, watching Titanic."
          },
          {
            "use": "Place: activities",
            "example": "Rania isn't here. She's at a party."
          }
        ],
        "helpful_hints": [
          "We also use at in the following phrases: at the moment • at night • at the top/bottom • at the door/window"
        ],
        "watch_out": [
          "Compare how we use in and at for places. We use in for larger areas that are all around us when we are there. We use at for smaller places and points on a journey. ✓ We're spending our next holiday in the countryside. ✓ Let's meet at the train station."
        ]
      }
    ]
  },
  {
    "id": "unit-10",
    "unit": 10,
    "title": "The passive 1",
    "subtopics": [
      {
        "name": "The passive (present simple, past simple, will)",
        "form": {
          "statement": "Everyone is invited! (present simple) / They always invite Grandma. → Grandma is always invited. (active → passive)",
          "negative": "Some people aren't (are not) invited.",
          "question": "Is everyone invited?"
        },
        "uses": [
          {
            "use": "When we don't know who does something",
            "example": "My sister's bike was stolen yesterday."
          },
          {
            "use": "When we don't want or need to say who does something",
            "example": "Was Simon invited?"
          }
        ],
        "helpful_hints": [
          "If you are not sure how to form a passive sentence, think of the active sentence first.",
          "Active sentence: Someone stole my sister's bike yesterday. → Passive sentence: My sister's bike was stolen yesterday.",
          "Look at the active sentence. The verb is stole and the object is my sister's bike.",
          "The object of the active sentence (my sister's bike) becomes the subject of the passive sentence: My sister's bike ...",
          "Then we need the verb be in the same tense as the verb in the active sentence. Here, stole is past simple, so we need was: My sister's bike was ...",
          "Then we need the past participle of the verb in the active sentence. The past participle of steal is stolen: My sister's bike was stolen ...",
          "Finally, we finish the sentence in the right way: My sister's bike was stolen yesterday."
        ],
        "watch_out": [
          "When the verb in a passive sentence is a phrasal verb, don't forget to include the particle. They picked up the broken glass. → The broken glass was picked up.",
          "Some verbs have irregular past participle forms. See page 182."
        ]
      }
    ]
  },
  {
    "id": "unit-11",
    "unit": 11,
    "title": "The passive 2",
    "subtopics": [
      {
        "name": "The passive (present continuous, present perfect simple, past continuous, past perfect simple, be going to, modals)",
        "form": {
          "statement": "The pizzas are being made.",
          "negative": "The pizzas aren't (are not) being made.",
          "question": "Are the pizzas being made?"
        },
        "uses": [
          {
            "use": "present continuous",
            "example": "Active: My aunt is doing the washing-up. / Passive: The washing-up is being done by my aunt."
          },
          {
            "use": "present perfect simple",
            "example": "Active: My cousin has sent the invitations. / Passive: The invitations have been sent by my cousin."
          },
          {
            "use": "past continuous",
            "example": "Active: My uncle was cleaning the car. / Passive: The car was being cleaned by my uncle."
          },
          {
            "use": "past perfect simple",
            "example": "Active: Our neighbours had taken the twins to the zoo. / Passive: The twins had been taken to the zoo by our neighbours."
          },
          {
            "use": "be going to",
            "example": "Active: They're going to invite Phil to the party. / Passive: Phil is going to be invited to the party."
          },
          {
            "use": "modals",
            "example": "Active: They might invite Kyle to the party. / Passive: Kyle might be invited to the party. / We should tell Jenny about the party. → Jenny should be told about the party. / We must tell Dominic about the concert. → Dominic must be told about the concert. / We can hold the party at Jack's house. → The party can be held at Jack's house."
          }
        ],
        "helpful_hints": [],
        "watch_out": [
          "We can use by to emphasise who does something. ✓ My sister's bedroom was painted by my parents. (= My parents painted my sister's bedroom.)",
          "We can use with to emphasise what someone uses. ✓ Soup is usually eaten with a spoon. (= You usually use a spoon to eat soup.)",
          "We don't use by or with when we don't need to say, or don't know, who does something. ✓ Mrs Fisher was taken to hospital yesterday."
        ]
      }
    ]
  },
  {
    "id": "unit-13",
    "unit": 13,
    "title": "Countable and uncountable nouns",
    "subtopics": [
      {
        "name": "Countable nouns",
        "form": null,
        "uses": [
          {
            "use": "Countable nouns have a singular and a plural form and take a singular or plural verb.",
            "example": "shop/shops – There are over 100 shops in the new shopping centre. / baby/babies – They've got some great toys for babies in there. / dish/dishes – We need to get some new dishes for this evening."
          }
        ],
        "helpful_hints": [
          "We use these words with countable nouns: a • an • many • a few • one, two, etc"
        ],
        "watch_out": [
          "A few countable nouns have irregular plurals. They include: one child, two children / one foot, two feet / one man, two men / one person, two people / one tooth, two teeth / one woman, two women"
        ]
      },
      {
        "name": "Uncountable nouns",
        "form": null,
        "uses": [
          {
            "use": "We cannot count some nouns (uncountable nouns). They do not have a plural form and take a singular verb.",
            "example": "advice, bread, fruit, furniture, hair, homework, information, money, news, paper, rice, work – My money is in my wallet. / Your hair is really long! / The news was a complete shock."
          }
        ],
        "helpful_hints": [
          "We use these words with uncountable nouns: a little • much • a bit of • a piece of",
          "We use these words with both countable and uncountable nouns: a lot of • some • lots of • the",
          "We can use any in questions and negative statements with both uncountable nouns and plural countable nouns: Have we got any homework today? / There aren't any eggs left."
        ],
        "watch_out": [
          "There are a few uncountable nouns that are plural and are followed by a plural verb. Be careful with the following words: clothes – ✓ Your clean clothes are on the bed. / jeans – ✓ Your new jeans look great!",
          "Some nouns are uncountable with one meaning and countable with another meaning. ✓ Get me some paper when you go to the shops. (= a packet of paper to write on) ✓ Get me a paper when you go to the shops. (= a newspaper)"
        ]
      }
    ]
  },
  {
    "id": "unit-14",
    "unit": 14,
    "title": "Articles",
    "subtopics": [
      {
        "name": "a (indefinite article)",
        "form": null,
        "uses": [
          {
            "use": "singular countable nouns (not specific)",
            "example": "I need to get a new coat."
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      },
      {
        "name": "an (indefinite article)",
        "form": null,
        "uses": [
          {
            "use": "instead of a when the next word begins with a vowel sound",
            "example": "I don't have enough money for an expensive dress."
          }
        ],
        "helpful_hints": [],
        "watch_out": [
          "Whether we use a or an with a word depends on the sound, not the spelling. Be careful with the following words and phrases: an honest person • an hour • a euro • a uniform"
        ]
      },
      {
        "name": "the (definite article)",
        "form": null,
        "uses": [
          {
            "use": "singular countable nouns (specific)",
            "example": "Let's go to the new shopping centre."
          },
          {
            "use": "plural countable nouns (specific)",
            "example": "Where are the books I ordered?"
          },
          {
            "use": "uncountable nouns (specific)",
            "example": "I gave the shop assistant the money and then left."
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      },
      {
        "name": "No article (zero article)",
        "form": null,
        "uses": [
          {
            "use": "plural countable nouns (general)",
            "example": "Prices have gone up a lot recently."
          },
          {
            "use": "uncountable nouns (general)",
            "example": "Fresh fruit is really good for you."
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      },
      {
        "name": "Special rules",
        "form": null,
        "uses": [
          {
            "use": "places – the: the seas (the Atlantic), rivers (the Amazon), areas (the Antarctic), some countries (the USA, the UK), public buildings (the theatre), the Earth, the world, the sky, the moon, the sun, the sea, the environment",
            "example": ""
          },
          {
            "use": "places – no article: towns and cities (Moscow), most countries (France), continents (Europe), streets (Baker Street), planets (Mars)",
            "example": ""
          },
          {
            "use": "activities – a/an: have a job, work as a ...",
            "example": ""
          },
          {
            "use": "activities – the: the radio, the media, play the piano",
            "example": ""
          },
          {
            "use": "activities – no article: go to work, go to school, be at school, be at university, school subjects (maths), go shopping, play tennis, listen to music, go to work",
            "example": ""
          },
          {
            "use": "time – the: the King, the Prime Minister, the army, the navy, the police, the Germans, the English",
            "example": ""
          },
          {
            "use": "time – no article: days (Thursday), months (May), years (2009), at night",
            "example": ""
          },
          {
            "use": "people – the: the King, the Prime Minister, the army, the navy, the police, the Germans, the English",
            "example": ""
          },
          {
            "use": "people – no article: become king, speak English",
            "example": ""
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      }
    ]
  },
  {
    "id": "unit-16",
    "unit": 16,
    "title": "Pronouns and possessive determiners",
    "subtopics": [
      {
        "name": "Subject pronouns",
        "form": {
          "statement": "I / you / he / she / it / we / they",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "The subject of a verb",
            "example": "They built the first aeroplane."
          },
          {
            "use": "The subject of a verb",
            "example": "Alexander Fleming discovered penicillin, but he did it by mistake!"
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      },
      {
        "name": "Object pronouns",
        "form": {
          "statement": "me / you / him / her / it / us / them",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "The object of a verb",
            "example": "Could you give me that equipment?"
          },
          {
            "use": "The object of a verb",
            "example": "Could you give that equipment to me?"
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      },
      {
        "name": "Possessive determiners",
        "form": {
          "statement": "my / your / his / her / its / our / their",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "To show who owns or has something",
            "example": "That's their car."
          }
        ],
        "helpful_hints": [
          "Possessive determiners are always followed by a noun. ✓ Is this my coffee?"
        ],
        "watch_out": [
          "Its and it's do not mean the same thing. ✓ Here's the dog's water and here's its food. (= the dog's food) ✓ It's the best camera I've ever had. (= It is ...)"
        ]
      },
      {
        "name": "Possessive pronouns",
        "form": {
          "statement": "mine / yours / his / hers / ours / theirs",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "To show who owns or has something",
            "example": "That car is ours."
          }
        ],
        "helpful_hints": [
          "Possessive pronouns are not followed by a noun. ✗ This is hers car."
        ],
        "watch_out": [
          "There is no possessive pronoun for it."
        ]
      },
      {
        "name": "Reflexive pronouns",
        "form": {
          "statement": "myself / yourself / himself / herself / itself / ourselves / yourselves / themselves",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "To describe actions where the subject and object are the same",
            "example": "My computer turns itself off after half an hour."
          },
          {
            "use": "To emphasise who does something",
            "example": "Nobody helped me. I did it myself."
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      }
    ]
  },
  {
    "id": "unit-17",
    "unit": 17,
    "title": "Relative clauses",
    "subtopics": [
      {
        "name": "Relative pronouns",
        "form": null,
        "uses": [
          {
            "use": "who – for people",
            "example": "What's the name of the man who created the Internet?"
          },
          {
            "use": "which – for things and animals",
            "example": "The experiment which worked was the last one."
          },
          {
            "use": "where – for places",
            "example": "This is the town where Albert Einstein was born."
          },
          {
            "use": "whose – to show possession",
            "example": "That's the man whose sister discovered a new planet."
          }
        ],
        "helpful_hints": [],
        "watch_out": [
          "We can use who for animals when we give them a personality. ✓ Our dog, who's called Bary, is eight years old.",
          "When there is a relative pronoun, remember not to repeat the subject/object. ✗ What's the name of the man who he created the World Wide Web? ✗ This is the experiment which I'm doing it at the moment."
        ]
      },
      {
        "name": "Non-defining relative clauses",
        "form": null,
        "uses": [
          {
            "use": "To give extra information",
            "example": "This program, which is totally free, protects your computer against viruses."
          }
        ],
        "helpful_hints": [
          "We use commas with non-defining relative clauses. ✓ Carl, whose sister is famous, is a friend of mine."
        ],
        "watch_out": []
      },
      {
        "name": "Defining relative clauses",
        "form": null,
        "uses": [
          {
            "use": "To define who or what we are talking about",
            "example": "This is the TV which works. This is the TV which doesn't work."
          }
        ],
        "helpful_hints": [
          "We don't use commas with defining relative clauses.",
          "We can use that instead of who and which. ✓ Did you see the programme about the woman who invented Tippex? ✓ Did you see the programme about the woman that invented Tippex?"
        ],
        "watch_out": []
      }
    ]
  },
  {
    "id": "unit-19",
    "unit": 19,
    "title": "Modals 1: ability, permission, advice",
    "subtopics": [
      {
        "name": "Introduction to modals",
        "form": {
          "statement": "can / may / will / shall / must / could / might / would / should",
          "negative": "can't/cannot / may not / won't/will not / shan't/shall not / mustn't/must not / couldn't/could not / mightn't/might not / wouldn't/would not / shouldn't/should not",
          "question": null
        },
        "uses": [],
        "helpful_hints": [
          "All modal verbs: have only one form (I/you/he/she/it/we/they may write an e-mail), are followed by the bare infinitive (You should call Stella.), do not have an infinitive.",
          "Semi-modals: ought to (ought not to), have to (don't have to), need to (don't need to/needn't). Like modals, ought to doesn't change. Have to and need to change for person and tense like normal verbs and have infinitives."
        ],
        "watch_out": [
          "We form questions with modal verbs like this: ✓ Can you understand what he's saying?",
          "We use modals with the passive voice like this: ✓ The address should be written clearly on the front of the envelope."
        ]
      },
      {
        "name": "Ability",
        "form": null,
        "uses": [
          {
            "use": "Ability now or generally",
            "example": "Can you use a fax machine?"
          },
          {
            "use": "Ability in the past",
            "example": "Tom could read when he was two years old."
          }
        ],
        "helpful_hints": [],
        "watch_out": [
          "We use be able to to form other tenses. ✓ It's useful to be able to order things by e-mail. (infinitive) ✓ Soon, I'll be able to speak Italian quite well. (future) ✓ Have you been able to speak English for a long time? (present perfect)"
        ]
      },
      {
        "name": "Permission",
        "form": null,
        "uses": [
          {
            "use": "Asking for permission",
            "example": "Can / Could / May I use the phone?"
          },
          {
            "use": "Giving permission",
            "example": "You can / may send the fax when you like."
          }
        ],
        "helpful_hints": [],
        "watch_out": [
          "May is more polite than could and could is more polite than can."
        ]
      },
      {
        "name": "Advice",
        "form": null,
        "uses": [
          {
            "use": "Asking for and giving advice",
            "example": "Liam ought to / should watch less TV."
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      }
    ]
  },
  {
    "id": "unit-20",
    "unit": 20,
    "title": "Modals 2: obligation, probability, possibility",
    "subtopics": [
      {
        "name": "Obligation",
        "form": null,
        "uses": [
          {
            "use": "Present or future obligation",
            "example": "All visitors must turn off their mobile phones. You have to/need to press 'send'."
          },
          {
            "use": "No present or future obligation",
            "example": "You don't have to/don't need to/needn't pay to send an e-mail."
          },
          {
            "use": "Past obligation",
            "example": "Yesterday, Sam had to buy more stamps."
          },
          {
            "use": "No past obligation",
            "example": "I learnt a little Italian, but everyone spoke English, so I didn't have to/didn't need to use it."
          }
        ],
        "helpful_hints": [
          "In spoken English, have to is more common than must. Must is often used in written notices and instructions. ✓ 'We have to pay the phone bill today,' Rita said. ✓ Passengers must turn off all mobile phones."
        ],
        "watch_out": [
          "Mustn't and don't have to do not mean the same. ✓ You mustn't do that! (= Don't do that!) ✓ You don't have to do that. (= You can do that if you want to, but it's not necessary.)"
        ]
      },
      {
        "name": "Probability and possibility",
        "form": null,
        "uses": [
          {
            "use": "Present strong probability",
            "example": "The phone is ringing – it must be Simon. This letter can't/couldn't be from Japan because it's got a French stamp."
          },
          {
            "use": "Present and future probability",
            "example": "We ought to/should hear from Cheryl this weekend."
          },
          {
            "use": "Present and future possibility",
            "example": "I'm not sure what language it is – it could/may/might be Polish."
          }
        ],
        "helpful_hints": [
          "We often use must, can't and couldn't for probability when we have some evidence for our opinion. ✓ I just rang Paul, but there's no answer. He must be out."
        ],
        "watch_out": [
          "To talk about possibility and probability about the past, we use a modal and the perfect infinitive. See Unit 22."
        ]
      }
    ]
  },
  {
    "id": "unit-22",
    "unit": 22,
    "title": "Modals 3: the modal perfect",
    "subtopics": [
      {
        "name": "Modals + the perfect infinitive",
        "form": {
          "statement": "modal + have + past participle. You should have told me you were going shopping.",
          "negative": "You shouldn't (should not) have told Liz what Bill said.",
          "question": "Should I have invited Carol to the party?"
        },
        "uses": [],
        "helpful_hints": [],
        "watch_out": [
          "Some verbs have irregular past participle forms. See page 182."
        ]
      },
      {
        "name": "Ability",
        "form": null,
        "uses": [
          {
            "use": "To say that someone had the opportunity or ability to do something, but didn't do it",
            "example": "We could have gone to the party, but we decided not to in the end."
          }
        ],
        "helpful_hints": [],
        "watch_out": [
          "We use this for things that someone didn't actually do. For general ability in the past, we use could + bare infinitive (See Unit 19). ✓ I could play the guitar when I was seven. (= I knew how to play the guitar.) ✓ I could have played the guitar. (= I had the opportunity to play the guitar, but I didn't actually play it.)"
        ]
      },
      {
        "name": "Criticism",
        "form": null,
        "uses": [
          {
            "use": "To say that someone's past behaviour was bad or wrong",
            "example": "You should have invited Carol to your party. (= You didn't invite Carol and that was wrong.)"
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      },
      {
        "name": "Probability and possibility",
        "form": null,
        "uses": [
          {
            "use": "Strong probability",
            "example": "They must have had a lovely holiday! (= It's almost certain that they had a lovely holiday.) They can't have had any sleep! (= It's almost certain that they didn't have any sleep.)"
          },
          {
            "use": "Possibility",
            "example": "Helen might have found a new house. (= It's possible, but I'm not certain.)"
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      },
      {
        "name": "Expectation",
        "form": null,
        "uses": [
          {
            "use": "To show you expected the past to be different from what actually happened",
            "example": "Jim should have arrived half an hour ago. I wonder where he is."
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      }
    ]
  },
  {
    "id": "unit-23",
    "unit": 23,
    "title": "Questions, question tags, indirect questions",
    "subtopics": [
      {
        "name": "Questions",
        "form": null,
        "uses": [
          {
            "use": "Normal main verbs – Simple tenses",
            "example": "Do you feel cold? • Did they go shopping?"
          },
          {
            "use": "Normal main verbs – Continuous tenses",
            "example": "Am I annoying you? • Were they waiting for you?"
          },
          {
            "use": "Normal main verbs – Perfect tenses",
            "example": "Have you had a bath every day? • Did they have lunch at one o'clock? • Had it started?"
          },
          {
            "use": "Be as a main verb",
            "example": "Am I late? • Were you all right? • Have you been ill?"
          },
          {
            "use": "Modals",
            "example": "Should I call the police? • Could you call me later?"
          },
          {
            "use": "Question words – who",
            "example": "Who was in prison? • What's your name?"
          },
          {
            "use": "Question words – where/why",
            "example": "Where do they live? • Why did you do that?"
          }
        ],
        "helpful_hints": [],
        "watch_out": [
          "To form questions in the passive, we put the auxiliary verb before the subject. If there is more than one auxiliary verb, only the first one goes before the subject. ✓ Was Mr Jenkins arrested yesterday? ✓ Has Mr Jenkins been arrested?",
          "With the question words who and what, we use do as an auxiliary verb if the question word refers to the object of the sentence. ✓ Who told you? (= Someone told you. Who?) ✓ Who did you tell? (= You told someone. Who?)"
        ]
      },
      {
        "name": "Question tags",
        "form": null,
        "uses": [
          {
            "use": "To ask someone to agree with us",
            "example": "It's confusing, isn't it?"
          },
          {
            "use": "To check whether something is true",
            "example": "You haven't been to prison, have you?"
          },
          {
            "use": "Normal main verbs – Simple tenses",
            "example": "Phil works here, doesn't he? • They didn't leave, did they?"
          },
          {
            "use": "Normal main verbs – Continuous tenses",
            "example": "You are coming, aren't you? • They weren't looking, were they?"
          },
          {
            "use": "Normal main verbs – Perfect tenses",
            "example": "They've gone, haven't they? • You hadn't seen it, had you?"
          },
          {
            "use": "Be as a main verb",
            "example": "He's new here, isn't he? • You weren't old enough, were you?"
          },
          {
            "use": "Have as a main verb",
            "example": "They have a car, haven't / don't they? • You didn't have a shower every day, did you?"
          },
          {
            "use": "Modals",
            "example": "Jan shouldn't do it, should she? • You won't make a mess, will you?"
          }
        ],
        "helpful_hints": [
          "In sentences with I am, we aren't it? In sentences with I'm not, we use am I. ✓ I'm right, aren't I? ✓ I'm not stupid, am I?"
        ],
        "watch_out": [
          "With Let's, we shall in the question tag. ✓ Let's do the washing-up later, shall we?"
        ]
      },
      {
        "name": "Indirect questions",
        "form": {
          "statement": "Phrase + clause with normal word order",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "To ask questions politely",
            "example": "Can/Could you tell me where the bank is? / Can/Could you let me know what time the film starts? / Do you know if Alison lives there? / I wonder if you could tell me where the toilets are. / I wonder if you know how much this costs."
          }
        ],
        "helpful_hints": [],
        "watch_out": [
          "We don't use question word order in the second half of the sentence."
        ]
      }
    ]
  },
  {
    "id": "unit-25",
    "unit": 25,
    "title": "So and such, too and enough",
    "subtopics": [
      {
        "name": "so and such",
        "form": null,
        "uses": [
          {
            "use": "Both so ... that and such ... that are used to show the results of a situation or action.",
            "example": ""
          },
          {
            "use": "with an adjective: so + adjective + that",
            "example": "Al is so good that he was made manager."
          },
          {
            "use": "with a noun: so + many/much + noun + that",
            "example": "Al sells so many cars that he was made manager."
          },
          {
            "use": "with a noun: such + a/an + adjective + noun + that",
            "example": "Al is such a good worker that he was made manager."
          },
          {
            "use": "with a noun: such + adjective + plural noun + that",
            "example": "Al gets such good results that he was made manager."
          },
          {
            "use": "with a noun: such + a lot of + noun + that",
            "example": "Al makes such a lot of money for the company that he was made manager."
          },
          {
            "use": "with an adverb: so + adverb + that",
            "example": "Al works so well that he was made manager."
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      },
      {
        "name": "too and enough",
        "form": null,
        "uses": [
          {
            "use": "Both too and enough are used to talk about how much or how little of something there is. We use too to describe the negative effect of having more than necessary. We use enough to describe the effects of having/not having the right amount of something.",
            "example": ""
          },
          {
            "use": "with an adjective: too + adjective (+ full infinitive)",
            "example": "It's too cold to work in the garden."
          },
          {
            "use": "with an adjective: adjective + enough (+ full infinitive)",
            "example": "Carol isn't patient enough to work as a teacher."
          },
          {
            "use": "with a noun: too + many/much + noun (+ full infinitive)",
            "example": "Jonty works too many hours to have any hobbies."
          },
          {
            "use": "with a noun: enough + noun (+ full infinitive)",
            "example": "We don't have enough money to pay our bills."
          },
          {
            "use": "with an adverb: too + adverb (+ full infinitive)",
            "example": "I got there too late to see the manager."
          },
          {
            "use": "with an adverb: adverb + enough (+ full infinitive)",
            "example": "Jack did the work quickly enough to finish half an hour early."
          }
        ],
        "helpful_hints": [],
        "watch_out": [
          "Too does not mean the same as very. We only use too when we are describing something negative. ✓ I've got too much work. I can't come out tonight. ✗ This job is great because you get paid too much money.",
          "Enough always comes after the adjective. ✓ You're not old enough to work here. ✗ You're not enough old to work here.",
          "Both too and enough can be followed by for. ✓ It's too hot for me in this office. ✓ You're not old enough for the army."
        ]
      }
    ]
  },
  {
    "id": "unit-26",
    "unit": 26,
    "title": "Comparatives and superlatives",
    "subtopics": [
      {
        "name": "Comparatives",
        "form": null,
        "uses": [
          {
            "use": "To compare things/people/actions that are different",
            "example": "My new job is more enjoyable than my old one. I'd like you to get to the office earlier tomorrow."
          }
        ],
        "helpful_hints": [
          "Adjective forms: one syllable (hard → harder), one syllable ending in -e (late → later), one syllable ending in vowel + consonant (big → double last letter + -er → bigger), two syllables ending in -y (pretty → y → -ier → prettier), two or more syllables (interesting → more/less + adjective → more/less interesting), irregular adjectives/quantifiers (good → better, bad → worse, little → less, far → farther/further, many → more, much → more).",
          "Adverb forms: regular adverbs (carefully → more/less + adverb → more/less carefully), irregular adverbs (well → better, badly → worse, early → earlier, near → nearer, late → later, fast → faster, far → farther/further).",
          "The comparative form is often followed by than. ✓ My working day is longer than it used to be."
        ],
        "watch_out": []
      },
      {
        "name": "Superlatives",
        "form": null,
        "uses": [
          {
            "use": "To compare one member of a group of things/people/actions with the whole group",
            "example": "Out of all the jobs in the company, John's is the hardest. The person who does best will get a pay rise."
          }
        ],
        "helpful_hints": [
          "Adjective forms: one syllable (hard → hardest), one syllable ending in -e (late → latest), one syllable ending in vowel + consonant (big → double last letter + -est → biggest), two syllables ending in -y (pretty → y → -iest → prettiest), two or more syllables (interesting → most/least + adjective → most/least interesting), irregular adjectives/quantifiers (good → best, bad → worst, little → least, far → farthest/furthest, many → most, much → most).",
          "Adverb forms: regular adverbs (carefully → most/least + adverb → most/least carefully), irregular adverbs (well → best, badly → worst, early → earliest, near → nearest, late → latest, fast → fastest, far → farthest/furthest).",
          "We usually use the before the superlative. ✓ Today was the worst day since I started working there."
        ],
        "watch_out": []
      }
    ]
  },
  {
    "id": "unit-28",
    "unit": 28,
    "title": "Conditionals 1: zero, first, second",
    "subtopics": [
      {
        "name": "Introduction to conditionals",
        "form": null,
        "uses": [],
        "helpful_hints": [
          "Some sentences with the word if are called conditional sentences. With every conditional sentence, there are two parts: a situation and the result of that situation. It is the situation that starts with if. There are different types of conditional sentence, depending on what the situation is.",
          "When we start the sentence with if, we separate the situation and the result with a comma. ✓ If you join a gym, I'll join too.",
          "When we start the sentence with the result, we don't use a comma. ✓ I'll join too if you join a gym."
        ],
        "watch_out": []
      },
      {
        "name": "Zero conditional",
        "form": {
          "statement": "if + present simple, present simple",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "General or scientific facts",
            "example": "If people eat too much, they often get fat."
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      },
      {
        "name": "First conditional",
        "form": {
          "statement": "if + present simple, will + bare infinitive",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "Real or likely situations in the present or future and their results",
            "example": "If you take these pills, you'll start to feel better very soon."
          }
        ],
        "helpful_hints": [
          "We can also use other modals instead of will, depending on the meaning. ✓ If you get some rest, you might feel better tomorrow.",
          "We can also use an imperative instead of will to give instructions. ✓ If you don't feel well, go home!"
        ],
        "watch_out": []
      },
      {
        "name": "Second conditional",
        "form": {
          "statement": "if + past simple, would + bare infinitive",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "Impossible or unlikely situations in the present or future and their results",
            "example": "If my legs were longer, I would be a much faster runner!"
          }
        ],
        "helpful_hints": [
          "We can also use the second conditional to give advice. We use the phrases If I were you ... or If I was you ... for this. If I were you ... is more formal than If I was you ...",
          "✓ If I were you, I would eat less chocolate. (more formal)",
          "✓ If I was you, I'd eat less chocolate! (more informal)"
        ],
        "watch_out": []
      }
    ]
  },
  {
    "id": "unit-29",
    "unit": 29,
    "title": "Conditionals 2: third",
    "subtopics": [
      {
        "name": "Third conditional",
        "form": {
          "statement": "if + past perfect simple, would + have + past participle",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "Unreal situations in the past and their unreal past results",
            "example": "If the chemist had been open, I would have bought some aspirin. (= The chemist wasn't open, so I didn't buy any aspirin.)"
          },
          {
            "use": "Unreal situations in the past and their unreal past results",
            "example": "If I hadn't listened to you, I would have cooked the chicken for too long. (= I listened to you, so I didn't cook the chicken for too long.)"
          },
          {
            "use": "Unreal situations in the past and their unreal past results",
            "example": "If he had seen the doctor, he wouldn't have been ill for such a long time. (= He didn't see the doctor, so he was ill for a long time.)"
          },
          {
            "use": "Unreal situations in the past and their unreal past results",
            "example": "If you hadn't eaten a giant pizza, you wouldn't have been sick! (= You ate a giant pizza, so you were sick.)"
          }
        ],
        "helpful_hints": [
          "We can also use could and might instead of would, depending on the meaning. ✓ If you had eaten a giant pizza, you might have been sick! (= It's possible, but not certain, that you would have been sick.) ✓ If Mary had told me she was coming, I could have cooked a nice meal. (= I would have been able to cook a nice meal.)"
        ],
        "watch_out": [
          "The third conditional is the only conditional that refers to the past. ✓ If I had had a headache, I would have taken an aspirin. (= in the past)",
          "We use past simple in the second conditional, but this does not refer to the past. ✓ If I had a headache, I would take an aspirin. (= now or generally)",
          "For more information on the second conditional, see Unit 28."
        ]
      }
    ]
  },
  {
    "id": "unit-31",
    "unit": 31,
    "title": "Reported speech",
    "subtopics": [
      {
        "name": "Reported speech",
        "form": {
          "statement": "Direct speech tense → Reported speech tense shift: present simple → past simple, present continuous → past continuous, present perfect continuous → past perfect continuous, past simple → past perfect simple, will → would, am/is/are going to → was/were going to, can → could, must/have to → had to, may → might",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "To report what someone else said",
            "example": "My dad said that he'd written a song."
          },
          {
            "use": "present simple → past simple",
            "example": "'I want to build a new house,' said Jill. → Jill said she wanted to build a new house."
          },
          {
            "use": "present continuous → past continuous",
            "example": "'We are making a dress,' they said. → They said they were making a dress."
          },
          {
            "use": "present perfect continuous → past perfect continuous",
            "example": "'I have been drawing all day,' said Debbie. → Debbie said she had been drawing all day."
          },
          {
            "use": "past simple → past perfect simple",
            "example": "'I made a card for me yesterday,' Amy said. → Amy said she had made a card for her the day before."
          },
          {
            "use": "past continuous → past perfect continuous (was writing)",
            "example": "'I was writing a poem,' said Tina. → Tina said she had been writing a poem."
          },
          {
            "use": "will → would",
            "example": "'I will make you a scarf,' my grandma said. → My grandma said she would make me a scarf."
          },
          {
            "use": "am/is/are going to → was/were going to",
            "example": "'They are going to make a new one,' said Joe. → He said they were going to make a new one."
          },
          {
            "use": "can → could",
            "example": "'I can draw quite well,' Emma said. → Emma said she could draw quite well."
          },
          {
            "use": "must/have to → had to",
            "example": "'You have to visit the fashion show,' she said. → She said she had to visit the fashion show."
          },
          {
            "use": "may → might",
            "example": "'I may visit the White House next week,' said Polly. → Polly said she might visit the White House the following week."
          }
        ],
        "helpful_hints": [
          "We often have to change other words apart from the verb form: pronouns (I → he/she, you → I/he/she/they, we → they, us → them, my → his/her, your → my/their) and time and place (here → there, now → then/at that moment, tomorrow → the next day/the following day, yesterday → the day before, last week → the week before, tonight → that night, ago → before, next week → the following week)."
        ],
        "watch_out": [
          "We only make tense changes when the reporting verb (say, etc) is in the past. ✓ Tony says he is going to study architecture. ✓ Tony says he was going to study architecture.",
          "We don't change the past perfect continuous when reporting: ✓ I had seen the picture before. → He said he had seen the picture before.",
          "We also don't change could, would, should, and might. ✓ I might take up painting. → She said she might take up painting.",
          "We can use verbs like apologise, deny, promise, refuse and suggest in reported speech. ✓ Jan apologised for losing the picture. ✓ Charlotte refused to let me see her painting. ✓ He warned us about breaking the statue. ✓ My dad suggested going to an art gallery. ✓ Terence promised to help me decorate the house."
        ]
      }
    ]
  },
  {
    "id": "unit-32",
    "unit": 32,
    "title": "Reported questions, orders, requests",
    "subtopics": [
      {
        "name": "Reported questions, orders, requests",
        "form": null,
        "uses": [
          {
            "use": "To report what someone else asked/ordered/requested",
            "example": "Pat asked me if I had tried the jeans on in the shop."
          },
          {
            "use": "questions beginning with have, do or be",
            "example": "'Have you been to the gallery?' he asked her. → He asked her if she had been to the gallery. / 'Do you want a sweater?' my mum asked. → My mum asked me if I wanted a sweater. / 'Are you making a skirt?' I asked Anne. → I asked Anne if she was making a skirt."
          },
          {
            "use": "questions beginning with a modal",
            "example": "'Can you paint?' Mary asked her friend. → Mary asked her friend if he could paint. / 'Will you make me one?' I asked Terry. → I asked Terry if he would make me one. / 'Shall I wear a jacket?' I asked Mum. → I asked Mum if I should wear a jacket. / 'May I borrow your coat?' Mr Jones asked me. → Mr Jones asked me if he might borrow my coat."
          },
          {
            "use": "questions beginning with a question word",
            "example": "'What kind of shoes are in fashion now?' my mum asked me. → My mum asked me what kind of shoes were in fashion at that moment. / 'Who did you see at the fashion show?' asked Ben. → Ben asked who he had seen at the fashion show. / 'Which one do you want?' Sarah asked Liam. → Sarah asked Liam which one he wanted. / 'When will they finish the house?' I asked. → I asked when they would finish the house. / 'Why did you say that?' my sister asked me. → My sister asked me why I had said that. / 'How much did your hat cost?' Ed asked Carl. → Ed asked Carl how much his hat had cost."
          },
          {
            "use": "orders",
            "example": "'Put your clothes in the drawer,' Mum said. → Mum told me to put my clothes in the drawer. / 'Don't wear the red one,' Alice said. → Alice told me not to wear the red one."
          },
          {
            "use": "requests",
            "example": "'Will you make me one?' I asked Terry. → I asked Terry to make me one. / 'Please don't move my pictures,' said Olga. → Olga asked me not to move her pictures."
          }
        ],
        "helpful_hints": [
          "We can also use whether instead of if in reported questions. ✓ He asked her whether she had been to the gallery."
        ],
        "watch_out": [
          "Remember not to use question word order in reported questions. ✓ I asked when they would finish the house. ✗ I asked when would they finish the house."
        ]
      }
    ]
  },
  {
    "id": "unit-34",
    "unit": 34,
    "title": "Direct and indirect objects",
    "subtopics": [
      {
        "name": "Verbs without an object",
        "form": {
          "statement": "subject + verb",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "Some verbs only need a subject. They don't need an object.",
            "example": "The flowers grew. / The dog got up."
          }
        ],
        "helpful_hints": [
          "These verbs include: fall down, get up, grow, happen, laugh, run away, sit down, sleep, speak, stand up, walk, work"
        ],
        "watch_out": []
      },
      {
        "name": "Verbs with one object",
        "form": {
          "statement": "subject + verb + object",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "Many verbs can be followed by an object.",
            "example": "We picked up the rubbish. / I've planted a tree."
          }
        ],
        "helpful_hints": [
          "These verbs include: borrow, close, draw, drink, drive, eat, have, invite, open, paint, pick up, plant"
        ],
        "watch_out": []
      },
      {
        "name": "Verbs with two objects",
        "form": {
          "statement": "subject + verb + indirect object + direct object",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "Some verbs can be followed by two objects. One is called the 'direct object' and the other is called the 'indirect object'. The indirect object is usually a person.",
            "example": "Simon gave Jill some flowers. (indirect object + direct object) / Simon gave some flowers to Jill. (direct object + preposition + indirect object)"
          }
        ],
        "helpful_hints": [
          "These verbs include: bring, buy, cost, get, give, lend, make, offer, owe, pass, pay, read, send, show, sing, take, teach, tell, throw, write",
          "There are two prepositions which often go between the direct object and the indirect object: to and for. ✓ I bought an umbrella for George. ✓ I gave the umbrella to George.",
          "Some of the verbs above can also be used in the passive. ✓ Jill was given some flowers. ✓ Some flowers were given to Jill."
        ],
        "watch_out": [
          "We don't use a preposition if the indirect object comes before the direct object. ✗ Simon gave to Jill some flowers."
        ]
      }
    ]
  },
  {
    "id": "unit-35",
    "unit": 35,
    "title": "wish",
    "subtopics": [
      {
        "name": "wish",
        "form": null,
        "uses": [
          {
            "use": "To express wishes about now or generally",
            "example": "Carl wishes he had a telescope. / I wish I wasn't scared of spiders."
          },
          {
            "use": "To express wishes about the past",
            "example": "Tracy wishes she'd seen that programme about the moon last night. / I wish they hadn't cut down so many trees."
          },
          {
            "use": "To criticise other people, or to complain about something",
            "example": "I wish people would throw their litter in the bin and not on the ground. / I wish you wouldn't smoke in here."
          },
          {
            "use": "To express wishes about ability and permission now or in the future",
            "example": "I wish I could travel through time! / David wishes he could come with us, but his parents won't let him."
          }
        ],
        "helpful_hints": [
          "When we use wish + past simple, we can say I/he/she/it was ... or I/he/she/it were ... Were is more formal than was. ✓ I wish I was an astronaut. (more informal) ✓ I wish I were an astronaut. (more formal)",
          "We can use the phrase if only in the same way as wish. ✓ If only I was/were an astronaut."
        ],
        "watch_out": [
          "We don't use wish for wishes about ourselves. ✓ I wish I lived on Mars. ✗ I wish I would live on Mars.",
          "We use wish for situations that aren't real. If there is a possibility that something will happen in the future, we don't use wish, but we can use hope. ✓ I hope it doesn't snow tomorrow. ✗ I wish it doesn't snow tomorrow."
        ]
      }
    ]
  },
  {
    "id": "unit-37",
    "unit": 37,
    "title": "-ing and infinitive",
    "subtopics": [
      {
        "name": "-ing",
        "form": null,
        "uses": [
          {
            "use": "Some verbs are sometimes followed by -ing.",
            "example": "He enjoys making other people laugh."
          }
        ],
        "helpful_hints": [
          "These verbs include: admit, avoid, deny, discuss, dislike, enjoy, feel like, finish, give up, mind, mention, practise, suggest, take up",
          "After a preposition, we usually use -ing. ✓ I'm afraid of flying.",
          "We can also use the -ing form as the subject of a sentence. ✓ Cooking is great fun!"
        ],
        "watch_out": [
          "Some phrases end in the preposition to. These are also followed by -ing, not an infinitive. ✓ I look forward to hearing from you. ✗ I look forward to hear from you."
        ]
      },
      {
        "name": "Infinitive",
        "form": null,
        "uses": [
          {
            "use": "Some verbs are sometimes followed by the full infinitive.",
            "example": "I decided to apologise to Emma."
          }
        ],
        "helpful_hints": [
          "These verbs include: advise, afford, agree, choose, decide, expect, help, hope, invite, learn, offer, plan, pretend, promise, refuse, seem, teach, tell, want, would like",
          "Some verbs are usually followed by object + bare infinitive (without to): let, make. ✓ Michael was made to apologise by his mother. (in the passive, use full infinitive) ✓ He wants to tell him a joke.",
          "Some verbs are followed by the full infinitive alone and some can be followed by an object + full infinitive."
        ],
        "watch_out": []
      },
      {
        "name": "-ing or infinitive",
        "form": null,
        "uses": [
          {
            "use": "Some verbs can be followed by either -ing or the full infinitive. With these verbs (begin, continue, hate, like, love, prefer, start), the meaning is the same or nearly the same.",
            "example": "I started liking / to like James after he helped me with my problem."
          },
          {
            "use": "With some verbs, the meanings change. These verbs include: remember, forget, stop, try",
            "example": ""
          },
          {
            "use": "remember + -ing: have a memory in your mind",
            "example": "Do you remember seeing that comedy?"
          },
          {
            "use": "remember + full infinitive: do something you are/were planning to do",
            "example": "Did you remember to say sorry to James?"
          },
          {
            "use": "forget + -ing: not be able to remember a past event",
            "example": "Oh, I had forgotten hearing that!"
          },
          {
            "use": "forget + full infinitive: not do something you are/were planning to do",
            "example": "I forgot to invite Shelly!"
          },
          {
            "use": "stop + -ing: stop an action",
            "example": "Stop crying – it's not that bad."
          },
          {
            "use": "stop + full infinitive: interrupt an action to do something else",
            "example": "I was on my way to see Maria and I stopped to get her some flowers."
          },
          {
            "use": "try + -ing: do something as a way of solving a problem",
            "example": "Have you tried talking to her?"
          },
          {
            "use": "try + full infinitive: make an effort to do something",
            "example": "I'm trying to say I'm sorry, but you won't listen!"
          }
        ],
        "helpful_hints": [],
        "watch_out": []
      }
    ]
  },
  {
    "id": "unit-38",
    "unit": 38,
    "title": "Both, either, neither, so, nor",
    "subtopics": [
      {
        "name": "both",
        "form": {
          "statement": "both + noun + and + noun / both + adjective + and + adjective",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "To emphasise that each of two things is true",
            "example": "Both Adam and Vicky said Colin was very kind. Simon is both rude and unkind."
          },
          {
            "use": "To say the same thing about two things",
            "example": "My sister and I were both shocked by what you said. Jack and Jill both know lots of jokes."
          }
        ],
        "helpful_hints": [
          "We sometimes use of with both. We always use this when it comes before a pronoun. ✓ I used to be good friends with Lisa and Mike, but I've had an argument with both of them."
        ],
        "watch_out": []
      },
      {
        "name": "either",
        "form": {
          "statement": "either + noun + or + noun / either + adjective + or + adjective / either + verb + or + verb",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "To talk about a choice between two things",
            "example": "I think I'll buy a Valentine's card with either a puppy or a kitten on it. / I'm not sure how Tom will react – he'll be either happy or shocked! / You can either tell him how you feel or hope he notices."
          }
        ],
        "helpful_hints": [
          "We sometimes use of with either. We always use this when it comes before a pronoun. ✓ I really like Robert and Martin – I'll go out with either of them!"
        ],
        "watch_out": []
      },
      {
        "name": "neither",
        "form": {
          "statement": "neither + noun + nor + noun / neither + adjective + nor + adjective / neither + verb + nor + verb",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "To emphasise that each of two negative things is true",
            "example": "I've got neither the time nor the energy to take up a new hobby at the moment. / What you said to Lucy was neither true nor fair."
          }
        ],
        "helpful_hints": [
          "We sometimes use of with neither. We always use this when it comes before a pronoun. ✓ Neither of us found Jason's joke funny."
        ],
        "watch_out": []
      },
      {
        "name": "so and nor",
        "form": {
          "statement": "so + do/have/be/modal + subject / nor + do/have/be/modal + subject",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "To add more information to a positive statement",
            "example": "Lisa is really unkind, and so is Angela. / You're good at listening to people, and so am I."
          },
          {
            "use": "To add more information to a negative statement",
            "example": "My brother hasn't been invited to the party, and nor has his friend. / Tom wouldn't forgive Jenny if she told everyone his secret, and nor would I."
          }
        ],
        "helpful_hints": [
          "You can also use these structures on their own in a conversation. ✓ 'I like Hannah's sense of humour.' 'So do I.' ✓ 'I don't find Mark funny.' 'Nor do I.'"
        ],
        "watch_out": []
      }
    ]
  },
  {
    "id": "unit-40",
    "unit": 40,
    "title": "Connectives",
    "subtopics": [
      {
        "name": "Time words and phrases",
        "form": null,
        "uses": [
          {
            "use": "With some time words and phrases, we use the present simple to talk about the future. We don't use will or be going to.",
            "example": ""
          },
          {
            "use": "after",
            "example": "I'll call you after we solve the problem."
          },
          {
            "use": "as soon as",
            "example": "I'll call you as soon as we solve the problem."
          },
          {
            "use": "before",
            "example": "It'll be a few days before we find the solution."
          },
          {
            "use": "until / till",
            "example": "I won't call you until we find the solution."
          },
          {
            "use": "when",
            "example": "It'll be great when we find the solution."
          },
          {
            "use": "while",
            "example": "I'll be in the office while I deal with this problem."
          }
        ],
        "helpful_hints": [],
        "watch_out": [
          "We can also put these time words and phrases at the beginning of the sentence. ✓ As soon as we solve the problem, I'll call you."
        ]
      },
      {
        "name": "Although",
        "form": {
          "statement": "Although + subject + verb, subject + verb",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "We use the word although to express contrast.",
            "example": "Although my homework was difficult, I finished it before bed."
          }
        ],
        "helpful_hints": [],
        "watch_out": [
          "We can also put although in the middle of the sentence. ✓ I finished my homework before bed, although it was difficult."
        ]
      },
      {
        "name": "In spite of / Despite",
        "form": {
          "statement": "In spite of / despite + -ing form, subject + verb / In spite of / despite + noun, subject + verb",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "We use in spite of and despite to express contrast. They mean the same thing.",
            "example": "In spite of revising for hours, I didn't do well in the test. / Despite my revision, I didn't do well in the test."
          }
        ],
        "helpful_hints": [],
        "watch_out": [
          "We can also put in spite of and despite in the middle of the sentence. ✓ I didn't do well in the test, despite revising for hours."
        ]
      },
      {
        "name": "However",
        "form": {
          "statement": "Subject + verb. However, subject + verb.",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "We use however to express contrast.",
            "example": "We believed that we would find a solution. However, we were wrong."
          }
        ],
        "helpful_hints": [],
        "watch_out": [
          "We can also put however at the end of the second sentence. ✓ We believed that we would find a solution. We were wrong, however."
        ]
      },
      {
        "name": "Unless",
        "form": null,
        "uses": [
          {
            "use": "The word unless means if ... not or except if.",
            "example": "Unless you hurry up, we'll be late. (= If you don't hurry up, we'll be late.)"
          }
        ],
        "helpful_hints": [],
        "watch_out": [
          "For more information on conditional sentences, see Units 28 and 29."
        ]
      }
    ]
  },
  {
    "id": "unit-41",
    "unit": 41,
    "title": "The causative",
    "subtopics": [
      {
        "name": "The causative",
        "form": {
          "statement": "subject + have in the correct form + object + past participle",
          "negative": null,
          "question": null
        },
        "uses": [
          {
            "use": "To show that someone arranges for someone else to do something for them",
            "example": ""
          },
          {
            "use": "present simple",
            "example": "Mrs Taylor has her car cleaned once a month."
          },
          {
            "use": "present continuous",
            "example": "She is having the tyres checked at the moment."
          },
          {
            "use": "present perfect simple",
            "example": "She has had the windscreen replaced."
          },
          {
            "use": "present perfect continuous",
            "example": "This is not usually used in the causative."
          },
          {
            "use": "past simple",
            "example": "She had the car filled up with petrol yesterday."
          },
          {
            "use": "past continuous",
            "example": "She was having the car repaired when I last saw her."
          },
          {
            "use": "past perfect simple",
            "example": "She had had the engine checked."
          },
          {
            "use": "past perfect continuous",
            "example": "This is not usually used in the causative."
          },
          {
            "use": "will and other modals",
            "example": "She will have a car alarm fitted when she can afford it. She would have air bags put in but it's too expensive."
          },
          {
            "use": "be going to",
            "example": "She is going to have a new car radio installed."
          },
          {
            "use": "-ing form",
            "example": "She might stop having the car cleaned so often."
          }
        ],
        "helpful_hints": [
          "Look at the differences between a normal active sentence and a sentence in the causative. Normal active sentence: Someone cleans Mrs Taylor's car every week. → In the causative: Mrs Taylor has her car cleaned every week.",
          "We can also use get instead of have. Get is more informal than have. ✓ I'm going to get my hair cut tomorrow. (more informal) ✓ I'm going to have my hair cut tomorrow. (more informal)",
          "Just as with the passive (see Unit 11), we can use by to show who does the action. ✓ We're having a family photo taken by a local photographer."
        ],
        "watch_out": [
          "With the causative, have always comes before the noun and the past participle always comes after the noun. When we ask questions using the causative, the past participle stays after the noun. ✓ Did you have the furniture delivered yesterday? ✗ Did you have delivered the furniture yesterday?",
          "Some verbs have irregular past participle forms. See page 182."
        ]
      }
    ]
  }
];
