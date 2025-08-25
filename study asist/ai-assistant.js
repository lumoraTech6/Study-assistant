// =========================================================================
// Lumora AI Assistant Code: Ultra-Smart Version with Personality
// =========================================================================

// --- Global State Variables ---
let currentQuizQuestion = null;
let currentQuizSubject = null;
let currentPersonality = 'fun'; // Default personality: 'fun' or 'serious'

// New: This array will store a short history of the conversation for context.
let conversationHistory = [];
const MAX_HISTORY_SIZE = 5; // We'll keep the last 5 user messages.

// =========================================================================
// Advanced AI Knowledge Base
// A structured knowledge base with personalities and emotional states.
// =========================================================================
const aiKnowledgeBase = {
    personalities: {
        fun: {
            greetings: [
                "Hey there, superstar! Ready to conquer some knowledge?",
                "Yo! What's crackin'? Let's get learning!",
                "Greetings, future genius! What's on your mind today?",
                "Oh, hey! I was just waiting for you. What's the mission?"
            ],
            farewells: [
                "Catch ya later, alligator! Stay awesome.",
                "Peace out! Come back anytime you need a hand.",
                "Later, gator! Remember, you're the GOAT.",
                "Adios! Keep that brain of yours in tip-top shape."
            ],
            aboutMe: [
                "I'm Lumora AI! My purpose is to light up your path to knowledge. Think of me as your personal study buddy.",
                "You can call me Lumora AI! I'm an educational assistant designed to help you with your subjects.",
                "I'm Lumora! I'm a cool AI created to help you ace your exams and learn new things."
            ],
            slang: {
                "whats up": "Not much, just here to help you study! What's going on with you?",
                "wossop": "Not much, just here to help you study! What's going on with you?",
                "how are you": "I'm doing great! My circuits are buzzing with new information. How are you feeling today?",
                "whats going on": "Just hanging out, ready to tackle some questions. What's going on in your world?"
            },
            emotionalSupport: {
                sad: "Hey, it's okay to feel down. Take a deep breath. How about we look at a topic you're good at to boost your spirits?",
                confused: "It's totally normal to be confused! Let's break down the problem together, piece by piece. What's the first thing that doesn't make sense?",
                stressed: "Hey, take a break! Stress is a signal that you need to recharge. Maybe we can do a quick, easy topic?",
                bored: "Let's zap that boredom away! How about we try a quiz or talk about a really cool science fact?",
                happy: "That's awesome! A happy brain is a super-learning brain! What are you happy about?",
                hard: "It might feel like you're climbing a mountain, but look how far you've come! You've got this!"
            },
            dontKnow: [
                "No worries! That's what I'm here for. Let's find the answer together. What were you thinking about?",
                "No problem! Taking a moment to think is a smart move. Let's find a starting point together. What's the first thing that comes to mind?"
            ],
            general: {
                doing: "Just hanging out, getting smarter with every chat! Ready to learn?",
                robot: "Nope, I'm Lumora AI! A digital friend here to light up your learning!",
                purpose: "My purpose is to help you rock your exams and learn awesome new things!",
                from: "I live in the clouds... the digital clouds, that is!",
                joke: "Why don't scientists trust atoms? Because they make up everything! 🧪",
                smart: "Aww, shucks! Thanks! It's all thanks to the amazing information I get to process.",
                weather: "My circuits don't feel the weather, but I can look it up for you! Where are you?"
            },
            smallTalk: [
                "Okay, let me know when you're ready to get started.",
                "Cool. I'll be here whenever you need me.",
                "Gotcha. Just say the word and we can dive into a topic."
            ]
        },
        serious: {
            greetings: [
                "Hello. How may I assist you with your academic inquiries?",
                "Greetings. I am ready to begin. What is the subject of today's lesson?",
                "Good day. I am available to provide information and guidance.",
                "Greetings. I am prepared to help with your studies. Please state your query."
            ],
            farewells: [
                "Goodbye. Your learning session has concluded.",
                "Farewell. I will be here if you require further assistance.",
                "Until next time. Remember to review your notes.",
                "I must go now. Best of luck with your academic pursuits."
            ],
            aboutMe: [
                "My designation is Lumora AI. My function is to provide educational assistance and academic support.",
                "I am Lumora AI, an educational assistant. I was designed to help students with their studies and exam preparation.",
                "I am Lumora. My primary purpose is to serve as a resource for your learning journey."
            ],
            slang: {
                "whats up": "I am operating optimally. How may I be of service to you?",
                "wossop": "I am operating optimally. How may I be of service to you?",
                "how are you": "My systems are functioning as intended. How are you feeling at this moment?",
                "whats going on": "I am prepared for your questions. What subject would you like to discuss?"
            },
            emotionalSupport: {
                sad: "I sense you are experiencing a state of sadness. It is acceptable to take a pause. We can return to your studies when you are ready.",
                confused: "A feeling of confusion is an indicator of new learning. I can re-explain the concept in a different manner. Please specify what part requires clarification.",
                stressed: "A state of stress can impede learning. I recommend a short pause. We can return to your studies when you are ready.",
                bored: "I understand. Engaging in a new intellectual task is an effective method for overcoming boredom. What topic would you like to explore?",
                happy: "I am pleased to hear of your positive emotional state. This is an opportune time for continued learning.",
                hard: "While the subject may be complex, your capability to learn it is not in question. We can proceed at a slower pace."
            },
            dontKnow: [
                "It is acceptable not to know. We will determine the correct information together. What question is unresolved?",
                "It is acceptable not to have an immediate answer. Let's re-evaluate the question. What part of the query is causing uncertainty?"
            ],
            general: {
                doing: "I am currently awaiting a new query. How may I be of assistance?",
                robot: "I am an artificial intelligence designed to assist with academic tasks.",
                purpose: "My primary function is to serve as a educational resource and study assistant.",
                from: "I am a software program and do not have a physical location.",
                joke: "I do not have a repository of humor. However, I can provide information on a subject of your choosing.",
                smart: "I appreciate your observation. My intelligence is a direct result of my programming and data processing capabilities.",
                weather: "I am unable to perceive weather conditions. Would you like me to access meteorological data for a specific location?"
            },
            smallTalk: [
                "I will wait for you to provide a topic of interest.",
                "Very well. I am on standby for your next query.",
                "Acknowledged. I await your next instruction."
            ]
        }
    },
    emotionalResponses: {
        excited: [
            "YES! Let's do it! This is my favorite topic!",
            "OMG! I've been waiting for this! Let's dive in!",
            "AWESOME! My circuits are buzzing with excitement!",
            "Wooo! I'm ready to rock and roll!"
        ],
        surprised: [
            "Oh my! I didn't see that coming!",
            "Wow! That's a surprising question!",
            "I'm genuinely astonished! What a fascinating query!",
            "Well, I'll be! Let me think about that."
        ],
        exaggerated: [
            "Absolutely! This is, without a doubt, the most crucial topic on the entire planet!",
            "Unbelievable! I simply can't believe how much you're learning!",
            "This is a masterpiece! A work of pure genius!",
            "It's the most extraordinary question I've ever heard!"
        ]
    },
    standardResponses: {
        help: [
            "I can assist with questions on subjects, provide study tips, and offer practice quizzes.",
            "You can ask me about topics in English, PR, Science, and Math. I'm here to support your learning journey."
        ],
        quizTips: [
            "Before you start, read each question carefully. Eliminate wrong answers first.",
            "Pace yourself; don't spend too long on one question. If you have time, review your answers."
        ],
        studyAdvice: [
            "Try the Pomodoro Technique: 25 minutes of focused work, followed by a 5-minute break.",
            "Explain what you learn to someone else. It's a great way to reinforce your understanding."
        ],
        acknowledgements: [
            "Understood. What's next on our agenda?",
            "Okay, I've got it. What's your next question?",
            "Gotcha. Ready for the next topic?"
        ]
    },
    // --- User-provided English Language Notes ---
    englishNotes: {
        sentenceStructure: [
            "A simple sentence has one independent clause.",
            "A compound sentence has two or more independent clauses joined by a conjunction.",
            "A complex sentence has one independent clause and at least one dependent clause.",
            "A compound-complex sentence has at least two independent clauses and one or more dependent clauses."
        ],
        figurativeLanguage: [
            "A simile is a comparison using 'like' or 'as' (e.g., 'He is as brave as a lion').",
            "A metaphor is a direct comparison (e.g., 'Her eyes were stars').",
            "Personification gives human qualities to inanimate objects (e.g., 'The wind whispered through the trees').",
            "An idiom is a phrase with a meaning that cannot be determined from the words alone (e.g., 'break a leg')."
        ],
        grammar: [
            "A subject-verb agreement means the subject and verb must agree in number.",
            "Adjectives modify nouns, and adverbs modify verbs, adjectives, or other adverbs."
        ],
        pronouns: [
            "A pronoun is a word that replaces a noun, serving to prevent repetition.",
            "Examples include: 'he,' 'she,' 'it,' and 'they.'"
        ],
        verbs: [
            "A verb is a word that describes an action, state, or occurrence. They are a fundamental component of a sentence.",
            "Examples include: 'run,' 'jump,' and 'think.'"
        ],
        adjectives: [
            "An adjective is a word or phrase that describes a noun.",
            "They make sentences more descriptive. For example, 'the red ball'."
        ],
        punctuation: [
            "Punctuation marks are the road signs of language! They tell you where to pause and how to read.",
            "Semicolons connect closely related independent clauses.",
            "Use apostrophes to show possession (e.g., John's book) or in contractions (e.g., don't)."
        ]
    },
    subjectKnowledge: {
        english: {
            cv: [
                "A CV should typically be 1-2 pages long for most professionals.",
                "Your CV should include: personal details, professional summary, work experience, education, skills, and certifications."
            ],
            letterWriting: [
                "Formal letters should include: sender's address, date, recipient's address, salutation, body, closing, and signature.",
                "Use 'Yours sincerely' when you know the recipient's name, 'Yours faithfully' when you don't."
            ],
            storyWriting: [
                "A story needs a beginning, a middle, and an end.",
                "Strong characters have clear motivations and flaws."
            ]
        },
        science: {
            photosynthesis: [
                "Photosynthesis is how plants make their own food! It's like a plant cooking with sunlight, water, and air. Pretty neat, huh?",
                "Photosynthesis is the process used by plants, algae, and certain bacteria to convert light energy into chemical energy, which is then stored in carbohydrate molecules."
            ],
            gravity: [
                "Gravity is the invisible force that keeps our feet on the ground and planets orbiting the sun. It's like the universe's giant magnet!",
                "Gravity is a fundamental force of nature that causes objects with mass to attract one another. The force is proportional to the product of their masses."
            ],
            atom: [
                "An atom is the tiny building block of everything! It's so small, you can't even see it, but it makes up all the stuff around you.",
                "An atom is the smallest unit of matter that retains all of the chemical properties of an element. It consists of a nucleus and one or more electrons."
            ],
            ecosystem: [
                "An ecosystem is like a big neighborhood where all the plants, animals, and non-living things live together and help each other out!",
                "An ecosystem is a biological community of interacting organisms and their physical environment."
            ],
            climateChange: [
                "Climate change is like the whole world getting a fever! The planet is getting warmer because of stuff we do, like burning fuels.",
                "Climate change refers to long-term shifts in temperatures and weather patterns, primarily driven by human activities such as the burning of fossil fuels."
            ],
            stars: [
                "Stars are basically gigantic balls of super-hot gas! They're like cosmic furnaces burning bright in the sky.",
                "Stars are celestial bodies composed primarily of hydrogen and helium, which produce light and heat through the process of nuclear fusion."
            ]
        },
        math: {
            variable: [
                "A variable is like a placeholder in math, a little mystery box that can hold any number! We use a letter like 'x' or 'y' to represent it.",
                "In mathematics, a variable is an unknown value or quantity that is subject to change. It is typically represented by a letter of the alphabet."
            ],
            fraction: [
                "A fraction is a way to show a part of a whole! It's like when you share a pizza—you get a fraction of it!",
                "A fraction represents a part of a whole. It is expressed as a number of equal parts of a whole, for example, 1/2 or 3/4."
            ],
            algebra: [
                "Algebra is the fun part of math where we solve puzzles with letters and numbers to find out what the mystery numbers are!",
                "Algebra is a branch of mathematics that deals with symbols and the rules for manipulating those symbols. It is used to express relationships between quantities."
            ],
            primeNumber: [
                "A prime number is a special number that can only be divided by itself and 1. It's like a lone wolf in the number world!",
                "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself."
            ]
        },
        pr: {
            swot: [
                "SWOT stands for Strengths, Weaknesses, Opportunities, and Threats.",
                "Strengths and weaknesses are internal factors, while opportunities and threats are external."
            ],
            pearson: [
                "Pearson is a British multinational publishing and education company.",
                "They provide educational materials, technologies, assessments, and related services."
            ]
        }
    }
};

// =========================================================================
// Core AI Functions - Refactored for Intelligence and Personality
// New Logic: Use a more flexible matching system and context awareness.
// =========================================================================

/**
 * A more flexible function to check for keyword matches, handling typos and partial words.
 * This is a simple version of a fuzzy match.
 * @param {string} message - The user's input.
 * @param {string[]} keywords - An array of keywords to match against.
 * @returns {boolean} True if a match is found.
 */
function fuzzyMatch(message, keywords) {
    const messageWords = message.toLowerCase().split(/\s+/);
    for (const keyword of keywords) {
        const keywordWords = keyword.toLowerCase().split(/\s+/);
        // Check if any word in the message matches a keyword word.
        for (const messageWord of messageWords) {
            for (const keywordWord of keywordWords) {
                // Check for full word match or if the keyword word is a substring of the message word
                // This handles "punctuations" matching "punctuation"
                if (messageWord.includes(keywordWord) || keywordWord.includes(messageWord)) {
                    return true;
                }
            }
        }
    }
    return false;
}

const commandList = [
    {
        name: 'HANDLE_SMALL_TALK',
        keywords: ['nothing much', 'just chilling', 'nothing'],
        action: (message) => getRandomResponse(aiKnowledgeBase.personalities[currentPersonality].smallTalk)
    },
    {
        name: 'GET_AI_NAME',
        keywords: ['your name', 'who are you', 'call you'],
        action: (message) => getRandomResponse(aiKnowledgeBase.personalities[currentPersonality].aboutMe)
    },
    {
        name: 'GET_GENERAL_INFO',
        keywords: ['what are you doing', 'are you a robot', 'what is your purpose', 'where are you from', 'tell me a joke', 'you are smart', 'what is the weather like'],
        action: (message) => {
            const lowerMessage = message.toLowerCase();
            const generalResponses = aiKnowledgeBase.personalities[currentPersonality].general;
            if (lowerMessage.includes('what are you doing')) return generalResponses.doing;
            if (lowerMessage.includes('are you a robot')) return generalResponses.robot;
            if (lowerMessage.includes('what is your purpose')) return generalResponses.purpose;
            if (lowerMessage.includes('where are you from')) return generalResponses.from;
            if (lowerMessage.includes('tell me a joke') || lowerMessage.includes('tell a joke')) return generalResponses.joke;
            if (lowerMessage.includes('you are smart') || lowerMessage.includes('you\'re smart')) return generalResponses.smart;
            if (lowerMessage.includes('what is the weather like')) return generalResponses.weather;
        }
    },
    {
        name: 'HANDLE_EMOTION_BORED',
        keywords: ['i am bored', 'im bored', 'this is boring'],
        action: (message) => getRandomResponse(aiKnowledgeBase.personalities[currentPersonality].emotionalSupport.bored)
    },
    {
        name: 'HANDLE_EMOTION_SAD',
        keywords: ['i am sad', 'i feel sad', 'im sad', 'im feeling down'],
        action: (message) => getRandomResponse(aiKnowledgeBase.personalities[currentPersonality].emotionalSupport.sad)
    },
    {
        name: 'HANDLE_EMOTION_CONFUSED',
        keywords: ['i am confused', 'im confused', 'i don\'t know', 'hmm', 'what does that mean'],
        action: (message) => {
             const lastAIResponse = conversationHistory[conversationHistory.length - 2] || '';
             // New logic: Check if the AI's last message was a question.
             if (lastAIResponse.includes('What specific topic are you interested in?')) {
                 return getRandomResponse(aiKnowledgeBase.personalities[currentPersonality].dontKnow);
             }
             return getRandomResponse(aiKnowledgeBase.personalities[currentPersonality].emotionalSupport.confused);
        }
    },
    {
        name: 'HANDLE_EMOTION_STRESSED',
        keywords: ['i am stressed', 'i feel stressed', 'this is hard'],
        action: (message) => {
            const lowerMessage = message.toLowerCase();
            if (lowerMessage.includes('this is hard')) {
                return getRandomResponse(aiKnowledgeBase.personalities[currentPersonality].emotionalSupport.hard);
            }
            return getRandomResponse(aiKnowledgeBase.personalities[currentPersonality].emotionalSupport.stressed);
        }
    },
    {
        name: 'HANDLE_EMOTION_HAPPY',
        keywords: ['i am happy', 'i feel happy', 'im happy'],
        action: (message) => getRandomResponse(aiKnowledgeBase.personalities[currentPersonality].emotionalSupport.happy)
    },
    {
        name: 'HANDLE_SLANG',
        keywords: ['whats up', 'wossop', 'whats going on', 'how are you', 'how r u', 'sap', 'whatsup'],
        action: (message) => {
            const lowerMessage = message.toLowerCase();
            const slangResponses = aiKnowledgeBase.personalities[currentPersonality].slang;
            if (lowerMessage.includes('whats up') || lowerMessage.includes('whatsup')) {
                return slangResponses['whats up'];
            }
            if (lowerMessage.includes('wossop')) {
                return slangResponses['wossop'];
            }
            if (lowerMessage.includes('whats going on')) {
                return slangResponses['whats going on'];
            }
            if (lowerMessage.includes('how are you') || lowerMessage.includes('how r u')) {
                return slangResponses['how are you'];
            }
            if (lowerMessage.includes('sap')) {
                return slangResponses['whats up'];
            }
        }
    },
    {
        name: 'GREETINGS',
        keywords: ['hello', 'hi', 'hey', 'greetings'],
        action: (message) => getRandomResponse(aiKnowledgeBase.personalities[currentPersonality].greetings)
    },
    {
        name: 'FAREWELLS',
        keywords: ['bye', 'goodbye', 'see you', 'farewell', 'see ya'],
        action: (message) => getRandomResponse(aiKnowledgeBase.personalities[currentPersonality].farewells)
    },
    {
        name: 'ACKNOWLEDGE',
        keywords: ['ok', 'okay', 'got it', 'alright', 'understood'],
        action: (message) => getRandomResponse(aiKnowledgeBase.standardResponses.acknowledgements)
    },
    {
        name: 'POSITIVE_FEEDBACK',
        keywords: ['thanks', 'thank you', 'good job', 'great job'],
        action: (message) => getRandomResponse(aiKnowledgeBase.standardResponses.positiveFeedback)
    },
    {
        name: 'ASK_FOR_HELP',
        keywords: ['help', 'what can you do', 'support', 'assist'],
        action: (message) => getRandomResponse(aiKnowledgeBase.standardResponses.help)
    },
    {
        name: 'SET_PERSONALITY_FUN',
        keywords: ['be fun', 'be funny', 'be exciting'],
        action: (message) => {
            currentPersonality = 'fun';
            return "Alright, personality set to `fun`! Let's get this party started! 🎉";
        }
    },
    {
        name: 'SET_PERSONALITY_SERIOUS',
        keywords: ['be serious', 'be professional', 'be formal'],
        action: (message) => {
            currentPersonality = 'serious';
            return "Understood. Personality has been set to `serious`. I am ready for your commands.";
        }
    },
    {
        name: 'GET_QUIZ_QUESTION',
        keywords: ['question', 'quiz', 'test me', 'practice', 'ask me'],
        action: (message, quizData) => getQuizQuestion(message, quizData)
    },
    {
        name: 'GET_QUIZ_ANSWER',
        keywords: ['answer', 'what is the answer', 'tell me', 'correct answer', 'reveal'],
        action: (message) => {
            if (currentQuizQuestion) {
                const answer = currentQuizQuestion.options[currentQuizQuestion.correctAnswer];
                const explanation = currentQuizQuestion.explanation || 'No explanation available.';

                // Reset state after providing the answer
                currentQuizQuestion = null;
                currentQuizSubject = null;

                return `The correct answer is: **${answer}**\n\nExplanation: ${explanation}`;
            }
            return "I don't have a recent quiz question to answer. Perhaps you would like to start a new one?";
        }
    },
    {
        name: 'GET_SUBJECT_KNOWLEDGE',
        keywords: ['english', 'pr', 'science', 'mathematics', 'math', 'what is', 'explain', 'tell me about', 'punctuations'],
        action: (message) => {
            const lowerMessage = message.toLowerCase();
            const subjects = ['english', 'pr', 'science', 'mathematics', 'math'];
            const subject = subjects.find(key => lowerMessage.includes(key));

            if (subject) {
                const subjectKnowledge = aiKnowledgeBase.subjectKnowledge[subject];
                for (const topic in subjectKnowledge) {
                    // New logic: Check for fuzzy match on topic keywords
                    if (fuzzyMatch(lowerMessage, [topic.toLowerCase()])) {
                        return getRandomResponse(subjectKnowledge[topic]);
                    }
                }
                // Handle English-specific notes first
                const englishTopics = aiKnowledgeBase.englishNotes;
                for (const topic in englishTopics) {
                    if (fuzzyMatch(lowerMessage, [topic.toLowerCase()])) {
                        return getRandomResponse(englishTopics[topic]);
                    }
                }
                return `I have information about ${subject}. What specific topic are you interested in?`;
            }

            // Fallback for generic "what is" questions
            if (lowerMessage.includes('what is') || lowerMessage.includes('explain')) {
                const terms = {
                    'pronoun': aiKnowledgeBase.englishNotes.pronouns,
                    'verb': aiKnowledgeBase.englishNotes.verbs,
                    'adjective': aiKnowledgeBase.englishNotes.adjectives,
                    'fraction': aiKnowledgeBase.subjectKnowledge.math.fraction,
                    'variable': aiKnowledgeBase.subjectKnowledge.math.variable,
                    'photosynthesis': aiKnowledgeBase.subjectKnowledge.science.photosynthesis
                };
                for (const term in terms) {
                    if (lowerMessage.includes(term)) {
                        return getRandomResponse(terms[term]);
                    }
                }
            }

            return null;
        }
    }
];

/**
 * Main function to get AI response based on user input, personality, and emotional cues.
 * @param {string} message - The user's input message.
 * @param {object} quizData - The data object containing quiz questions.
 * @returns {string} The AI's personalized and intelligent response.
 */
function getAIResponse(message, quizData) {
    const lowerMessage = message.toLowerCase();

    // New: Update conversation history.
    conversationHistory.push(message);
    if (conversationHistory.length > MAX_HISTORY_SIZE) {
        conversationHistory.shift(); // Remove the oldest message
    }

    // First, check for quiz answer context. This overrides all other commands.
    if (currentQuizQuestion &&
        (lowerMessage.includes('answer') || lowerMessage.includes('what is the answer') ||
         lowerMessage.includes('tell me'))) {
        return commandList.find(cmd => cmd.name === 'GET_QUIZ_ANSWER').action(message);
    }

    // Check for emotional triggers first, and add a personality-based greeting if applicable
    if (lowerMessage.includes('excited') || lowerMessage.includes('wow') || lowerMessage.includes('awesome')) {
        let emotion = getRandomResponse(aiKnowledgeBase.emotionalResponses.excited);
        let response = emotion + ' ' + getRandomResponse(aiKnowledgeBase.personalities[currentPersonality].greetings);
        return response;
    }
    if (lowerMessage.includes('surprised') || lowerMessage.includes('unexpected')) {
        let emotion = getRandomResponse(aiKnowledgeBase.emotionalResponses.surprised);
        return emotion;
    }
    if (lowerMessage.includes('amazing') || lowerMessage.includes('unbelievable')) {
        let emotion = getRandomResponse(aiKnowledgeBase.emotionalResponses.exaggerated);
        return emotion;
    }

    // --- Find the most relevant command using a score-based system ---
    let bestMatch = null;
    let maxScore = 0;

    for (const command of commandList) {
        // New: Use fuzzy matching for command recognition.
        if (fuzzyMatch(lowerMessage, command.keywords)) {
            let score = 1; // Simple scoring: a match is a match.
            // Extra logic for the "don't know" command to prioritize it in context.
            if (command.name === 'HANDLE_EMOTION_CONFUSED' &&
                (lowerMessage.includes('i don\'t know') || lowerMessage.includes('hmm'))) {
                const lastAIResponse = conversationHistory[conversationHistory.length - 2] || '';
                if (lastAIResponse.includes('What specific topic')) {
                    score = 10; // Prioritize this command if it follows a specific question.
                }
            }
            if (score > maxScore) {
                maxScore = score;
                bestMatch = command;
            }
        }
    }

    // Execute the best-matched command
    if (bestMatch) {
        const response = bestMatch.action(message, quizData);
        // New: Store the AI's response in history for future context.
        conversationHistory.push(response);
        if (conversationHistory.length > MAX_HISTORY_SIZE) {
            conversationHistory.shift();
        }
        return response;
    }

    // Fallback for unhandled queries
    let defaultResponse = "I'm not sure how to respond to that. You can try a new personality like 'fun' or 'serious', or ask about subjects like English or Science.";
    conversationHistory.push(defaultResponse);
    if (conversationHistory.length > MAX_HISTORY_SIZE) {
        conversationHistory.shift();
    }
    return defaultResponse;
}

/**
 * Gets a random response from an array.
 * @param {string[]} responses - Array of possible responses.
 * @returns {string} A random response.
 */
function getRandomResponse(responses) {
    if (!responses || responses.length === 0) return "I don't have a response for that.";
    return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Gets a quiz question and stores it in global state.
 * @param {string} message - User's input message.
 * @param {object} quizData - Quiz data object.
 * @returns {string} The formatted quiz question.
 */
function getQuizQuestion(message, quizData) {
    currentQuizQuestion = null;
    currentQuizSubject = null;

    let requestedSubject = null;
    for (const subject in quizData) {
        if (message.includes(subject)) {
            requestedSubject = subject;
            break;
        }
    }

    if (!requestedSubject) {
        const subjects = Object.keys(quizData);
        requestedSubject = subjects[Math.floor(Math.random() * subjects.length)];
    }

    const subjectQuizzes = quizData[requestedSubject];
    if (!subjectQuizzes || subjectQuizzes.length === 0) {
        return `I don't have any quiz questions for ${requestedSubject} right now.`;
    }

    const randomQuiz = subjectQuizzes[Math.floor(Math.random() * subjectQuizzes.length)];

    if (!randomQuiz.questions || randomQuiz.questions.length === 0) {
        return `I don't have any questions in the ${randomQuiz.title} quiz.`;
    }

    const randomQuestion = randomQuiz.questions[Math.floor(Math.random() * randomQuiz.questions.length)];

    currentQuizQuestion = randomQuestion;
    currentQuizSubject = requestedSubject;

    let response = `Here's a ${requestedSubject} question from the ${randomQuiz.title} quiz:\n\n`;
    response += `Q: ${randomQuestion.question}\n\n`;

    randomQuestion.options.forEach((option, index) => {
        response += `${index + 1}. ${option}\n`;
    });

    response += `\nWhen you're ready, you can ask for the answer!`;

    return response;
}
