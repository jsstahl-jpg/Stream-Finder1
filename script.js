// ========================================
// STREAMFINDER - COMPLETE WITH TV SHOWS
// ========================================

const TMDB_V4_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWQ3ZGFjM2QyZDI4OGFiMDFiMTliMDA1YWQzMjIxNCIsIm5iZiI6MTc2MzA4MjI4Mi4wOTYsInN1YiI6IjY5MTY4MDJhMzEzN2M3ZGFmMTg3NjVhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mNnYHf28DA9OqlRm8Vc6tsVs96b9YrA6eJlnWJbtuXY";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";

let userSelectedPlatforms = [];

// ========================================
// ENHANCED AI KEYWORDS - 500+ Keywords
// ========================================
const CHATBOT_RULES = {
    patterns: [
        { keywords: ['action', 'fight', 'fighting', 'adrenaline', 'explosive', 'explosion', 'thrill', 'thrilling', 'battle', 'combat', 'chase', 'gun', 'shooting', 'assassin', 'spy', 'agent', 'martial arts', 'kung fu', 'karate', 'superhero', 'comic book', 'vigilante', 'revenge', 'vengeance', 'heist', 'robbery', 'car chase', 'parkour', 'stunts', 'mission', 'special ops', 'tactical', 'warfare', 'commando', 'sniper', 'mercenary', 'bounty hunter', 'sword fight', 'samurai', 'ninja', 'gunfight', 'shootout', 'explosives', 'bomb', 'hostage', 'rescue', 'spec ops', 'black ops', 'covert', 'undercover', 'infiltration', 'extraction', 'raid', 'strike team', 'fast-paced', 'high-octane', 'pulse-pounding', 'edge of your seat', 'adrenaline rush'], genres: [28, 53], mood: 'Action' },
        { keywords: ['adventure', 'explore', 'exploring', 'exploration', 'journey', 'quest', 'expedition', 'treasure', 'treasure hunt', 'island', 'jungle', 'desert', 'mountain', 'discovery', 'epic', 'voyage', 'pirate', 'lost city', 'ancient', 'relic', 'artifact', 'wilderness', 'survival adventure', 'exotic', 'safari', 'expedition team', 'uncharted', 'mysterious island', 'tomb raider', 'indiana jones style', 'swashbuckling', 'high seas', 'buried treasure', 'map', 'compass', 'explorer', 'archaeologist'], genres: [12, 14], mood: 'Adventure' },
        { keywords: ['comedy', 'funny', 'laugh', 'laughing', 'humor', 'humorous', 'hilarious', 'comedic', 'quirky', 'witty', 'silly', 'goofy', 'parody', 'satire', 'satirical', 'slapstick', 'romantic comedy', 'romcom', 'dark comedy', 'black comedy', 'mockumentary', 'absurd', 'ridiculous', 'joke', 'stand-up', 'comedian', 'screwball', 'farce', 'spoof', 'comedy of errors', 'buddy comedy', 'fish out of water', 'mistaken identity', 'sarcastic', 'deadpan', 'ironic', 'irreverent', 'wacky', 'zany', 'madcap', 'lighthearted comedy', 'feel-good comedy', 'laugh out loud', 'side-splitting', 'rib-tickling', 'comic', 'amusing', 'entertaining', 'playful', 'whimsical'], genres: [35], mood: 'Comedy' },
        { keywords: ['romantic', 'romance', 'love', 'love story', 'couple', 'dating', 'relationship', 'date night', 'sweet love', 'passionate', 'affair', 'wedding', 'marriage', 'soulmate', 'heartbreak', 'breakup', 'valentine', 'kissing', 'intimacy', 'crush', 'falling in love', 'true love', 'soul mate', 'love triangle', 'forbidden love', 'star-crossed', 'lovers', 'courtship', 'engagement', 'proposal', 'eternal love', 'unrequited love', 'first love', 'second chance romance', 'enemies to lovers', 'fake relationship', 'arranged marriage', 'love at first sight', 'sweetheart', 'romantic getaway', 'passionate kiss', 'chemistry', 'spark', 'butterflies', 'heart flutter'], genres: [10749], mood: 'Romantic' },
        { keywords: ['horror', 'scary', 'terror', 'terrifying', 'spooky', 'frightening', 'creepy', 'supernatural', 'ghost', 'haunted', 'haunting', 'demon', 'possession', 'exorcism', 'zombie', 'vampire', 'monster', 'creature', 'slasher', 'gore', 'bloody', 'disturbing', 'nightmare', 'paranormal', 'occult', 'witchcraft', 'evil', 'dark', 'sinister', 'cursed', 'undead', 'werewolf', 'beast', 'mutant', 'killer', 'serial killer', 'psycho', 'maniac', 'stalker', 'found footage', 'body horror', 'cosmic horror', 'lovecraftian', 'psychological horror', 'survival horror', 'jump scare', 'spine-chilling', 'blood-curdling', 'bone-chilling', 'hair-raising', 'macabre', 'eerie', 'dread', 'terror', 'fright'], genres: [27], mood: 'Horror' },
        { keywords: ['thriller', 'suspense', 'suspenseful', 'tense', 'tension', 'mystery', 'mysterious', 'crime', 'detective', 'investigation', 'whodunit', 'murder', 'killer', 'serial killer', 'psychological', 'mind game', 'twist', 'plot twist', 'conspiracy', 'espionage', 'noir', 'neo-noir', 'cat and mouse', 'double cross', 'betrayal', 'corruption', 'cover-up', 'puzzle', 'riddle', 'clues', 'forensic', 'cold case', 'manhunt', 'chase thriller', 'political thriller', 'techno-thriller', 'legal thriller', 'medical thriller', 'erotic thriller', 'gripping', 'edge of seat', 'nail-biting', 'heart-pounding', 'page-turner', 'unpredictable', 'shocking twist'], genres: [53, 9648, 80], mood: 'Thriller' },
        { keywords: ['drama', 'dramatic', 'emotional', 'touching', 'serious', 'intense', 'powerful', 'moving', 'deep', 'tear-jerker', 'tearjerker', 'sad', 'melancholy', 'poignant', 'bittersweet', 'tragic', 'tragedy', 'coming of age', 'coming-of-age', 'family drama', 'character study', 'slice of life', 'realistic', 'gritty', 'raw', 'courtroom', 'legal drama', 'medical drama', 'redemption', 'loss', 'grief', 'mourning', 'sacrifice', 'struggle', 'hardship', 'poverty', 'addiction', 'recovery', 'mental health', 'identity', 'self-discovery', 'ambition', 'rivalry', 'jealousy', 'regret', 'forgiveness', 'compelling', 'thought-provoking', 'character-driven', 'human condition', 'life-changing'], genres: [18], mood: 'Drama' },
        { keywords: ['sci-fi', 'scifi', 'science fiction', 'futuristic', 'future', 'space', 'outer space', 'spaceship', 'alien', 'aliens', 'extraterrestrial', 'dystopian', 'dystopia', 'utopia', 'cyberpunk', 'steampunk', 'time travel', 'robot', 'android', 'artificial intelligence', 'AI', 'virtual reality', 'parallel universe', 'alternate reality', 'apocalypse', 'post-apocalyptic', 'wasteland', 'cyborg', 'clone', 'cloning', 'genetic engineering', 'mutation', 'teleportation', 'wormhole', 'black hole', 'interstellar', 'intergalactic', 'space opera', 'space exploration', 'terraforming', 'colony', 'first contact', 'invasion', 'alien invasion', 'mind control', 'telepathy', 'superhuman', 'nanobots', 'hologram', 'simulation', 'matrix', 'singularity', 'transhumanism', 'bioengineering', 'quantum', 'dimension', 'multiverse'], genres: [878], mood: 'Sci-Fi' },
        { keywords: ['fantasy', 'magic', 'magical', 'wizard', 'witch', 'sorcerer', 'dragon', 'mythical', 'mythology', 'myth', 'legend', 'legendary', 'fairytale', 'fairy tale', 'enchanted', 'medieval', 'sword', 'sorcery', 'spell', 'potion', 'quest', 'epic fantasy', 'high fantasy', 'dark fantasy', 'elf', 'dwarf', 'orc', 'goblin', 'troll', 'giant', 'unicorn', 'phoenix', 'griffin', 'centaur', 'mermaid', 'vampire fantasy', 'werewolf fantasy', 'shapeshifter', 'prophecy', 'chosen one', 'kingdom', 'realm', 'enchantress', 'warlock', 'necromancer', 'portal', 'dimension', 'crystal', 'rune', 'curse', 'magic sword', 'mystical', 'supernatural powers', 'spellcasting', 'enchantment'], genres: [14, 12], mood: 'Fantasy' },
        { keywords: ['animation', 'animated', 'cartoon', 'anime', 'hand-drawn', 'stop-motion', 'claymation', 'cgi', '3d animation', '2d animation', 'pixar', 'disney', 'dreamworks', 'studio ghibli', 'family animation', 'adult animation', 'anime series', 'manga adaptation', 'cel animation', 'rotoscope', 'motion capture', 'computer animated', 'hand drawn'], genres: [16], mood: 'Animation' },
        { keywords: ['documentary', 'docuseries', 'doc', 'true story', 'real', 'real life', 'real-life', 'biography', 'biopic', 'biographical', 'non-fiction', 'factual', 'educational', 'informative', 'investigation', 'expose', 'nature documentary', 'wildlife', 'historical documentary', 'social documentary', 'political documentary', 'crime documentary', 'true crime', 'investigative', 'observational', 'fly on the wall', 'talking heads', 'archival', 'propaganda', 'exposé', 'journalistic', 'real events', 'based on true events', 'real people'], genres: [99], mood: 'Documentary' },
        { keywords: ['family', 'kids', 'children', "children's", 'child', 'family-friendly', 'wholesome', 'innocent', 'fun for all', 'all ages', 'parents', 'kids movie', 'bedtime story', 'talking animals', 'adventure family', 'family values', 'multigenerational', 'grandparents', 'siblings', 'adoption', 'foster', 'safe for kids', 'kid-friendly', 'family fun', 'family entertainment'], genres: [10751, 16], mood: 'Family' },
        { keywords: ['historical', 'history', 'period', 'period piece', 'costume drama', 'based on true', 'true events', 'war', 'world war', 'wwii', 'ww2', 'vietnam', 'civil war', 'revolutionary', 'renaissance', 'victorian', 'medieval', 'ancient', 'empire', 'dynasty', 'historical fiction', 'historical romance', 'epic historical', 'biographical drama', 'war drama', 'battle', 'military', 'soldier', 'navy', 'air force', 'army', 'marines', 'veteran', 'pow', 'resistance', 'occupation', 'liberation', 'd-day', 'pearl harbor', 'holocaust', 'cold war', 'korean war', 'historical epic', 'period drama', 'bygone era', 'historical setting'], genres: [10752, 36, 18], mood: 'Historical' },
        { keywords: ['music', 'musical', 'concert', 'band', 'singer', 'song', 'singing', 'rock', 'pop', 'jazz', 'hip hop', 'rap', 'orchestra', 'opera', 'broadway', 'dance', 'dancing', 'musician', 'composer', 'songwriter', 'rockstar', 'pop star', 'diva', 'choir', 'acoustic', 'classical music', 'rock and roll', 'country music', 'blues', 'soul', 'r&b', 'electronic music', 'dj', 'music video', 'recording studio', 'tour', 'festival', 'jukebox musical', 'backstage musical', 'music biopic', 'concert film'], genres: [10402, 18], mood: 'Music' },
        { keywords: ['sports', 'sport', 'athlete', 'athletic', 'game', 'competition', 'championship', 'tournament', 'football', 'basketball', 'baseball', 'soccer', 'hockey', 'boxing', 'wrestling', 'racing', 'olympics', 'coach', 'underdog', 'team', 'training', 'comeback', 'rivalry', 'championship game', 'playoffs', 'world cup', 'super bowl', 'marathon', 'triathlon', 'extreme sports', 'surfing', 'skateboarding', 'snowboarding', 'skiing', 'cycling', 'tennis', 'golf', 'swimming', 'track and field', 'sports drama', 'underdog story', 'team spirit', 'victory', 'defeat'], genres: [99, 18], mood: 'Sports' },
        { keywords: ['western', 'cowboy', 'cowboys', 'wild west', 'frontier', 'outlaw', 'sheriff', 'gunslinger', 'saloon', 'ranch', 'spaghetti western', 'bounty', 'duel', 'cattle drive', 'gold rush', 'lawman', 'desperado', 'rustler', 'homestead', 'pioneer', 'old west', 'gunfight at high noon', 'horseback', 'revolver', 'bandits'], genres: [37], mood: 'Western' },
        { keywords: ['heartwarming', 'heartfelt', 'uplifting', 'inspiring', 'inspirational', 'feel-good', 'feel good', 'wholesome', 'sweet', 'touching', 'warm', 'cozy', 'comforting', 'happy', 'joyful', 'optimistic', 'hopeful', 'life-affirming', 'positive', 'encouraging', 'motivational', 'upbeat', 'cheerful'], genres: [10749, 35, 18, 10751], mood: 'Heartwarming' },
        { keywords: ['dark', 'gritty', 'disturbing', 'depressing', 'bleak', 'heavy', 'intense', 'hardcore', 'violent', 'brutal', 'graphic', 'mature', 'adult themes', 'controversial', 'provocative', 'unsettling', 'nightmarish', 'harrowing', 'visceral', 'unflinching'], genres: [18, 53, 27, 80], mood: 'Dark' },
        { keywords: ['thought-provoking', 'thought provoking', 'philosophical', 'cerebral', 'intelligent', 'smart', 'complex', 'deep', 'meaningful', 'profound', 'existential', 'metaphysical', 'contemplative', 'introspective', 'meditative', 'reflective', 'intellectually stimulating'], genres: [18, 878, 9648], mood: 'Thought-Provoking' },
        { keywords: ['lighthearted', 'light-hearted', 'easy watching', 'easy watch', 'relaxing', 'chill', 'laid back', 'casual', 'breezy', 'carefree', 'easygoing', 'mellow', 'gentle', 'pleasant', 'uncomplicated'], genres: [35, 10749, 10751], mood: 'Lighthearted' },
        { keywords: ['food', 'cooking', 'chef', 'restaurant', 'culinary', 'cuisine', 'baker', 'baking', 'dinner', 'meal', 'recipe', 'gastronomy', 'food truck', 'master chef', 'competition cooking', 'foodie', 'gourmet', 'culinary arts', 'kitchen', 'dishes', 'cooking show'], genres: [35, 18, 99], mood: 'Food' },
        { keywords: ['nostalgic', 'nostalgia', 'childhood', 'memory', 'memories', 'retro', 'throwback', 'old school', 'classic', '80s', '90s', 'vintage', 'period nostalgia', 'coming of age nostalgia', 'reminiscent', 'sentimental', 'bygone days', 'good old days', 'flashback'], genres: [18, 35, 10751], mood: 'Nostalgic' },
        { keywords: ['travel', 'traveling', 'vacation', 'trip', 'journey', 'wanderlust', 'destination', 'road trip', 'backpacking', 'adventure travel', 'cultural journey', 'world tour', 'globe-trotting', 'tourism', 'sightseeing', 'getaway', 'escape', 'exploration'], genres: [12, 99, 18], mood: 'Travel' },
        { keywords: ['mind-bending', 'mind bending', 'trippy', 'surreal', 'surrealism', 'strange', 'weird', 'bizarre', 'psychedelic', 'abstract', 'experimental', 'unconventional', 'avant-garde', 'dreamlike', 'nonlinear', 'reality-bending', 'consciousness', 'perception', 'illusion', 'hallucinatory'], genres: [878, 9648, 53], mood: 'Mind-Bending' },
        { keywords: ['heist', 'con', 'con artist', 'scam', 'theft', 'robbery', 'steal', 'criminal', 'mastermind', 'clever', 'caper', 'bank robbery', 'casino heist', 'art theft', 'jewel heist', 'elaborate plan', 'scheme', 'swindle', 'fraud', 'plot', 'crew', 'job', 'score', 'getaway'], genres: [80, 53, 28], mood: 'Heist' },
        { keywords: ['friendship', 'friends', 'buddy', 'bromance', 'camaraderie', 'bond', 'bonding', 'best friends', 'platonic', 'loyalty', 'bff', 'companionship', 'fellowship', 'kinship', 'solidarity', 'allies'], genres: [35, 18, 12], mood: 'Friendship' },
        { keywords: ['survival', 'stranded', 'isolated', 'alone', 'wilderness', 'trapped', 'lost', 'castaway', 'deserted island', 'plane crash', 'shipwreck', 'against the elements', 'survive', 'endurance', 'perseverance', 'will to live', 'fight for survival'], genres: [12, 18, 53], mood: 'Survival' },
        { keywords: ['political', 'politics', 'government', 'election', 'power', 'corruption', 'scandal', 'conspiracy', 'white house', 'parliament', 'senator', 'president', 'campaign', 'diplomacy', 'geopolitics', 'political intrigue', 'power struggle', 'regime'], genres: [18, 53, 99], mood: 'Political' },
        { keywords: ['nature', 'wildlife', 'environment', 'ocean', 'forest', 'animals', 'planet', 'earth', 'ecology', 'conservation', 'biodiversity', 'rainforest', 'safari', 'natural world', 'ecosystem', 'habitat', 'species', 'wilderness'], genres: [99, 12], mood: 'Nature' },
        { keywords: ['technology', 'tech', 'computer', 'hacker', 'hacking', 'internet', 'social media', 'startup', 'silicon valley', 'programming', 'cyber', 'digital', 'innovation', 'coding', 'software', 'hardware', 'algorithm', 'data', 'network', 'online'], genres: [878, 53, 99], mood: 'Technology' },
        { keywords: ['art', 'artist', 'painter', 'painting', 'museum', 'creativity', 'creative', 'sculpture', 'gallery', 'masterpiece', 'renaissance art', 'modern art', 'impressionism', 'artistic', 'canvas', 'exhibition', 'art world', 'abstract art'], genres: [18, 99], mood: 'Art' },
        { keywords: ['cult', 'cult classic', 'underground', 'indie', 'independent', 'arthouse', 'art house', 'foreign', 'international', 'criterion', 'auteur', 'offbeat', 'unconventional', 'niche', 'alternative'], genres: [18, 35, 9648], mood: 'Cult' },
        { keywords: ['top rated', 'highest rated', 'best rated', 'best films', 'best movies', 'critically acclaimed', 'award winning', 'oscar', 'academy award', 'golden globe', 'cannes', 'sundance', 'masterpiece', 'acclaimed', 'celebrated', 'lauded', 'prestigious'], genres: [18, 28, 35, 878, 53], mood: 'Top-Rated' },
        { keywords: ['similar to', 'similar films', 'similar movies', 'recommendations like', 'movies like', 'shows like', 'like this', 'something like', 'reminds me of', 'comparable to'], genres: [], mood: 'Similar Movies', isSimilarSearch: true }
    ]
};

const MOOD_CONFIG = {
    cozy: { genres: [35, 10749, 18], sort: "popularity.desc", minVotes: 50 },
    excited: { genres: [28, 53, 878], sort: "popularity.desc", minVotes: 50 },
    sad: { genres: [18, 10752, 27], sort: "vote_average.desc", minVotes: 100 },
    tired: { genres: [35, 10751, 18], sort: "popularity.desc", minVotes: 50 },
    curious: { genres: [99, 9648, 878, 36, 14], sort: "popularity.desc", minVotes: 30 }
};

const RUNTIME_CONFIG = {
    short: { lte: 30 },
    medium: { gte: 30, lte: 60 },
    long: { gte: 80, lte: 160 },
    binge: null
};

const PLATFORM_NAMES = {
    8: "Netflix", 15: "Hulu", 1899: "Max", 337: "Disney+", 9: "Prime Video",
    531: "Paramount+", 384: "MGM+", 257: "Fubo TV", 350: "Apple TV+",
    386: "Peacock", 1796: "Crunchyroll"
};

const PLATFORM_URLS = {
    8: "https://www.netflix.com/", 15: "https://www.hulu.com/",
    1899: "https://www.max.com/", 337: "https://www.disneyplus.com/",
    9: "https://www.primevideo.com/primemembers", 531: "https://www.paramountplus.com/",
    384: "https://www.mgmplus.com/", 257: "https://www.fubo.tv/",
    350: "https://tv.apple.com/", 386: "https://www.peacocktv.com/",
    1796: "https://www.crunchyroll.com/"
};

const GENRE_NAMES = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
    99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
    27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction",
    10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western",
    10759: "Action & Adventure", 10762: "Kids", 10763: "News", 10764: "Reality",
    10765: "Sci-Fi & Fantasy", 10766: "Soap", 10767: "Talk", 10768: "War & Politics"
};

const MOVIE_FACTS = [
    "The first feature-length film ever made was 'The Story of the Kelly Gang' from Australia in 1906.",
    "The shortest Oscar-winning live action film is 'The Crescent' at just 39 seconds!",
    "The word 'cinema' comes from the Greek word 'kinema' meaning 'movement'.",
    "In 1927, 'The Jazz Singer' was the first film with synchronized dialogue.",
    "The oldest movie still in existence is 'Roundhay Garden Scene' from 1888.",
    "Each frame in a typical film is displayed for only 1/24th of a second.",
    "The most expensive film ever made was 'Avengers: Endgame' at $356-379 million.",
    "Marilyn Monroe started with a different name: Norma Jeane Mortenson.",
    "Alfred Hitchcock never won an Oscar for Best Director, despite 5 nominations.",
    "Charlie Chaplin's iconic 'Tramp' character was created in his second film in 1914."
];

let currentStep = 0;
let selections = { mood: null, time: null, genres: [], platforms: [] };
let favorites;
try {
    const savedFavs = JSON.parse(localStorage.getItem('streamFinderFavs'));
    favorites = Array.isArray(savedFavs) ? savedFavs : [];
} catch (e) {
    console.error("Error parsing watchlist data:", e);
    favorites = [];
    localStorage.removeItem('streamFinderFavs');
}

let navigationHistory = [];
let currentResultsCache = [];
let aiResultsCache = [];
let isSurpriseMode = false;

const apiCache = new Map();
const CACHE_DURATION = 300000;

const navQuiz = document.getElementById('nav-quiz');
const navAI = document.getElementById('nav-ai');
const navFavs = document.getElementById('nav-favorites');
const viewQuiz = document.getElementById('view-quiz');
const viewAI = document.getElementById('view-ai');
const viewFavs = document.getElementById('view-favorites');
const favCountEl = document.getElementById('fav-count');
const logoHome = document.getElementById('logo-home');

async function cachedFetch(url, options = {}) {
    const cacheKey = url + JSON.stringify(options);
    const cached = apiCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }
    
    const response = await fetch(url, options);
    const data = await response.json();
    
    apiCache.set(cacheKey, { data, timestamp: Date.now() });
    
    return data;
}

function showIMDbModal() {
    const modal = document.getElementById('imdb-modal');
    const closeBtn = document.querySelector('.modal-close');
    
    modal.style.display = 'block';
    
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; };
    
    setTimeout(() => modal.style.display = 'none', 3000);
}

function shareMovie(movie) {
    const shareUrl = movie.imdb_id ? `https://www.imdb.com/title/${movie.imdb_id}/` : window.location.href;
    const shareText = movie.imdb_id ? `Check out "${movie.title}" on IMDb!` : `Check out "${movie.title}" on StreamFinder!`;
    
    if (navigator.share) {
        navigator.share({ title: movie.title, text: shareText, url: shareUrl }).catch(() => {});
    } else {
        navigator.clipboard.writeText(`${movie.title} - ${shareUrl}`)
            .then(() => alert('Link copied to clipboard!'))
            .catch(() => alert(`Share: ${movie.title} - ${shareUrl}`));
    }
}

function initializeMovieFact() {
    const movieFactEl = document.getElementById('movie-fact');
    const factTextEl = document.getElementById('fact-text');

    if (!movieFactEl) return;

    const randomFact = MOVIE_FACTS[Math.floor(Math.random() * MOVIE_FACTS.length)];
    factTextEl.textContent = randomFact;

    setTimeout(() => {
        movieFactEl.classList.add('fade-out');
        setTimeout(() => movieFactEl.style.display = 'none', 800);
    }, 8000);
}

function pushHistory(step) {
    navigationHistory.push(step);
    window.history.pushState({ step }, '', `#step-${step}`);
}

window.addEventListener('popstate', (e) => {
    if (e.state && e.state.step !== undefined) {
        goToStep(e.state.step, false);
    }
});

function switchView(view) {
    [viewQuiz, viewAI, viewFavs].forEach(v => v.classList.remove('active'));
    [navQuiz, navAI, navFavs].forEach(n => n.classList.remove('active'));

    if (view === 'quiz') {
        viewQuiz.classList.add('active');
        navQuiz.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'ai') {
        viewAI.classList.add('active');
        navAI.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (aiMessages.children.length === 0) {
            const greetingMessage = document.createElement('div');
            greetingMessage.className = 'ai-message bot-message';
            greetingMessage.innerHTML = `<div class="message-content"><p>Hi! 👋 Tell me what you're in the mood for!</p><p><small>Try: "heist movies", "mind-bending thrillers", "heartwarming family films"</small></p></div>`;
            aiMessages.appendChild(greetingMessage);
        }
    } else {
        viewFavs.classList.add('active');
        navFavs.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        renderCategorizedFavorites();
    }
}

navQuiz.addEventListener('click', () => switchView('quiz'));
navAI.addEventListener('click', () => switchView('ai'));
navFavs.addEventListener('click', () => switchView('favs'));

const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');

hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

logoHome.addEventListener('click', () => {
    switchView('quiz');
    goToStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function goToStep(index, addToHistory = true) {
    if (index < 0 || index > 5) return;

    const activeStep = document.querySelector('.quiz-step.active');
    const nextStepEl = document.getElementById(`step-${index}`);

    if (activeStep) {
        activeStep.classList.add('fading-out');
        activeStep.classList.remove('active');

        setTimeout(() => {
            activeStep.classList.remove('fading-out');
            activeStep.style.display = 'none';

            if (nextStepEl) {
                nextStepEl.style.display = 'flex';
                setTimeout(() => nextStepEl.classList.add('active'), 50);
            }
        }, 400);
    } else if (nextStepEl) {
        nextStepEl.classList.add('active');
    }

    currentStep = index;
    if (addToHistory) pushHistory(index);
}

document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', () => goToStep(currentStep === 0 ? 1 : currentStep + 1));
});

document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.target || (currentStep - 1), 10)));
});

function setupSingleSelection(parentId, key) {
    const parent = document.getElementById(parentId);
    if (!parent) return;
    
    const btns = parent.querySelectorAll('.option-card');
    const nextBtn = parent.closest('.quiz-step')?.querySelector('.next-btn');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.tagName === 'BUTTON') {
                btns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selections[key] = btn.dataset.value;
                if (nextBtn) nextBtn.disabled = false;
            }
        });
    });
}

setupSingleSelection('mood-buttons', 'mood');
setupSingleSelection('time-buttons', 'time');

const genreParent = document.getElementById('genre-buttons');
if (genreParent) {
    genreParent.querySelectorAll('.option-card').forEach(btn => {
        btn.addEventListener('click', () => {
            const genreId = parseInt(btn.dataset.genreId, 10);
            const index = selections.genres.indexOf(genreId);
            btn.classList.toggle('selected');
            if (index > -1) selections.genres.splice(index, 1);
            else selections.genres.push(genreId);
        });
    });
}

function initializeSelectAllButton() {
    const selectAllBtn = document.getElementById('select-all-platforms');
    const platformCheckboxes = document.querySelectorAll('input[name="platform"]');
    const platformCards = document.querySelectorAll('.platform-card');

    if (!selectAllBtn) return;

    selectAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const allChecked = Array.from(platformCheckboxes).every(cb => cb.checked);
        
        platformCheckboxes.forEach(checkbox => checkbox.checked = !allChecked);
        platformCards.forEach(card => {
            const checkbox = card.querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.checked) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });

        selectAllBtn.innerHTML = allChecked ? 
            '<i class="fas fa-check-double"></i> Select All' : 
            '<i class="fas fa-times-circle"></i> Deselect All';
    });

    platformCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT') {
                e.preventDefault();
                const checkbox = card.querySelector('input[type="checkbox"]');
                if (checkbox) checkbox.checked = !checkbox.checked;
            }
            
            const checkbox = card.querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.checked) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
    });
}

document.getElementById('surprise-btn').addEventListener('click', () => {
    const moods = Object.keys(MOOD_CONFIG);
    selections.mood = moods[Math.floor(Math.random() * moods.length)];
    selections.time = null;
    selections.genres = [];
    selections.platforms = Object.keys(PLATFORM_NAMES).map(id => id.toString());

    isSurpriseMode = true;
    goToStep(5);
    fetchSurpriseMoviesPerPlatform();
});

document.getElementById('quiz-form').addEventListener('submit', (e) => {
    e.preventDefault();
    selections.platforms = Array.from(document.querySelectorAll('input[name="platform"]:checked')).map(cb => cb.value);
    userSelectedPlatforms = selections.platforms.slice();
    
    isSurpriseMode = false;
    goToStep(5);
    fetchMoviesFromEachPlatform();
});

const backToTopBtn = document.getElementById('back-to-top-btn');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function updateVibeButton() {
    const vibeText = document.getElementById('vibe-text');
    if (vibeText && selections.mood) {
        vibeText.textContent = selections.mood;
    }
}

function showFeedbackLoop() {
    const feedbackLoop = document.getElementById('feedback-loop');
    if (!feedbackLoop) return;
    
    feedbackLoop.style.display = 'block';
    
    // Remove old event listeners by cloning buttons
    const feedbackButtons = feedbackLoop.querySelectorAll('.feedback-btn');
    feedbackButtons.forEach(oldBtn => {
        const newBtn = oldBtn.cloneNode(true);
        oldBtn.parentNode.replaceChild(newBtn, oldBtn);
    });
    
    // Add fresh event listeners
    feedbackLoop.querySelectorAll('.feedback-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const feedback = btn.dataset.feedback;
            feedbackLoop.querySelectorAll('.feedback-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            
            if (feedback === 'loved') {
                triggerConfetti();
            } else if (feedback === 'nope') {
                // Reset the selected state after a moment
                setTimeout(() => {
                    feedbackLoop.querySelectorAll('.feedback-btn').forEach(b => b.classList.remove('selected'));
                }, 300);
                
                setTimeout(() => {
                    const moods = Object.keys(MOOD_CONFIG);
                    selections.mood = moods[Math.floor(Math.random() * moods.length)];
                    fetchSurpriseMoviesPerPlatform();
                }, 500);
            }
        });
    });
}

function triggerConfetti() {
    const confetti = new ConfettiGenerator({
        target: 'confetti-canvas',
        max: 200,
        size: 1,
        animate: true,
        props: ['circle', 'square', 'triangle', 'line'],
        colors: [[212, 175, 55], [25, 118, 210], [255, 215, 0], [255, 165, 0]],
        clock: 25,
        rotate: true,
        respawn: true
    });
    confetti.render();
    setTimeout(() => confetti.clear(), 3000);
}

// Show loading bar
function showLoadingBar() {
    const loadingBarContainer = document.getElementById('loading-bar-container');
    if (loadingBarContainer) {
        loadingBarContainer.style.display = 'block';
    }
}

// Hide loading bar
function hideLoadingBar() {
    const loadingBarContainer = document.getElementById('loading-bar-container');
    if (loadingBarContainer) {
        loadingBarContainer.style.display = 'none';
    }
}

// ========================================
// FIXED: Fetch BOTH Movies AND TV Shows
// ========================================
async function fetchMoviesFromEachPlatform() {
    const container = document.getElementById('results-area');
    container.innerHTML = '';
    
    // Show loading bar
    showLoadingBar();

    const resultsTitleEl = document.getElementById('results-main-title');
    const resultsSubtitleEl = document.getElementById('results-subtitle');
    
    if (resultsTitleEl) resultsTitleEl.textContent = 'Your Perfect Picks';
    if (resultsSubtitleEl) resultsSubtitleEl.textContent = 'Movies & shows from your streaming services.';

    const vibeSelector = document.getElementById('vibe-selector');
    if (vibeSelector) vibeSelector.style.display = 'none';

    try {
        const platformContent = await Promise.all(
            selections.platforms.map(platformId => fetchContentForPlatform(platformId))
        );

        const allContent = platformContent.flat().filter(Boolean);
        
        // Hide loading bar
        hideLoadingBar();
        
        if (allContent.length === 0) {
            container.innerHTML = '<div class="empty-state">No matches found. Try different filters.</div>';
            return;
        }

        currentResultsCache = allContent;
        renderResultsSummary(false, []);
        displayMovies(allContent, container);

    } catch (e) {
        console.error("Fetch Error:", e);
        hideLoadingBar();
        container.innerHTML = '<div class="empty-state">Error connecting to database.</div>';
    }
}

// FIXED: Fetch both movies AND TV shows for each platform
async function fetchContentForPlatform(platformId) {
    try {
        let finalGenreIds = [];
        let sortStr = "popularity.desc";
        
        if (selections.genres.length > 0) {
            finalGenreIds = selections.genres;
        } else if (selections.mood) {
            finalGenreIds = MOOD_CONFIG[selections.mood].genres;
            sortStr = MOOD_CONFIG[selections.mood].sort;
        }

        const minVotes = selections.mood && MOOD_CONFIG[selections.mood] ? 
            MOOD_CONFIG[selections.mood].minVotes : 50;

        // Fetch Movies
        const movieUrl = new URL(`${TMDB_BASE_URL}/discover/movie`);
        movieUrl.searchParams.append("watch_region", "US");
        movieUrl.searchParams.append("with_watch_providers", platformId);
        
        if (finalGenreIds.length) {
            movieUrl.searchParams.append("with_genres", finalGenreIds.join(","));
        }
        
        movieUrl.searchParams.append("sort_by", sortStr);
        movieUrl.searchParams.append("vote_count.gte", minVotes);

        if (selections.time && RUNTIME_CONFIG[selections.time]) {
            const rt = RUNTIME_CONFIG[selections.time];
            if (rt.gte) movieUrl.searchParams.append("with_runtime.gte", rt.gte);
            if (rt.lte) movieUrl.searchParams.append("with_runtime.lte", rt.lte);
        }

        // Fetch TV Shows - FIXED: Only fetch from user-selected platforms
        const tvUrl = new URL(`${TMDB_BASE_URL}/discover/tv`);
        tvUrl.searchParams.append("watch_region", "US");
        tvUrl.searchParams.append("with_watch_providers", platformId);
        
        if (finalGenreIds.length) {
            tvUrl.searchParams.append("with_genres", finalGenreIds.join(","));
        }
        
        tvUrl.searchParams.append("sort_by", sortStr);
        tvUrl.searchParams.append("vote_count.gte", minVotes);

        // Fetch both in parallel
        const [movieData, tvData] = await Promise.all([
            cachedFetch(movieUrl.toString(), { headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` } }),
            cachedFetch(tvUrl.toString(), { headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` } })
        ]);

        // Take 2 movies + 2 TV shows per platform
        const movies = (movieData.results || []).slice(0, 2);
        const tvShows = (tvData.results || []).slice(0, 2);
        
        const enrichedMovies = await Promise.all(movies.map(m => enrichMovieData(m)));
        const enrichedShows = await Promise.all(tvShows.map(s => enrichTVShowData(s)));
        
        return [...enrichedMovies, ...enrichedShows];
        
    } catch (e) {
        console.error(`Error fetching content for platform ${platformId}:`, e);
        return [];
    }
}

async function fetchSurpriseMoviesPerPlatform() {
    const container = document.getElementById('results-area');
    container.innerHTML = '';
    
    // Show loading bar
    showLoadingBar();

    const resultsTitleEl = document.getElementById('results-main-title');
    const resultsSubtitleEl = document.getElementById('results-subtitle');
    
    if (resultsTitleEl) resultsTitleEl.textContent = 'Surprise Me!';
    if (resultsSubtitleEl) resultsSubtitleEl.textContent = 'Movies & shows from each streaming service!';

    const vibeSelector = document.getElementById('vibe-selector');
    if (vibeSelector) vibeSelector.style.display = 'block';

    try {
        const allPlatformIds = Object.keys(PLATFORM_NAMES);
        
        const platformContent = await Promise.all(
            allPlatformIds.map(platformId => fetchSurpriseForPlatform(platformId))
        );

        const allContent = platformContent.flat().filter(Boolean);
        
        // Hide loading bar
        hideLoadingBar();
        
        if (allContent.length === 0) {
            container.innerHTML = '<div class="empty-state">No surprises available.</div>';
            return;
        }

        currentResultsCache = allContent;
        renderResultsSummary(true, []);
        displayMovies(allContent, container);

    } catch (e) {
        console.error("Surprise Error:", e);
        hideLoadingBar();
        container.innerHTML = '<div class="empty-state">Error loading surprises.</div>';
    }
}

// FIXED: Surprise includes both movies AND TV shows - FETCH MULTIPLE ITEMS
async function fetchSurpriseForPlatform(platformId) {
    try {
        const finalGenreIds = MOOD_CONFIG[selections.mood].genres;
        const sortStr = MOOD_CONFIG[selections.mood].sort;
        const minVotes = MOOD_CONFIG[selections.mood].minVotes;
        
        // Fetch both movies AND TV shows
        const movieUrl = new URL(`${TMDB_BASE_URL}/discover/movie`);
        movieUrl.searchParams.append("watch_region", "US");
        movieUrl.searchParams.append("with_watch_providers", platformId);
        movieUrl.searchParams.append("with_genres", finalGenreIds.join(","));
        movieUrl.searchParams.append("sort_by", sortStr);
        movieUrl.searchParams.append("vote_count.gte", minVotes);
        
        const tvUrl = new URL(`${TMDB_BASE_URL}/discover/tv`);
        tvUrl.searchParams.append("watch_region", "US");
        tvUrl.searchParams.append("with_watch_providers", platformId);
        tvUrl.searchParams.append("with_genres", finalGenreIds.join(","));
        tvUrl.searchParams.append("sort_by", sortStr);
        tvUrl.searchParams.append("vote_count.gte", minVotes);

        const [movieData, tvData] = await Promise.all([
            cachedFetch(movieUrl.toString(), { headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` } }),
            cachedFetch(tvUrl.toString(), { headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` } })
        ]);

        const movies = (movieData.results || []).slice(0, 4); // Get 4 movies
        const tvShows = (tvData.results || []).slice(0, 4); // Get 4 TV shows
        
        // Combine and shuffle
        const combined = [...movies, ...tvShows];
        const shuffled = combined.sort(() => Math.random() - 0.5);
        
        // Take 5-8 random items
        const itemsToShow = shuffled.slice(0, Math.floor(Math.random() * 4) + 5); // Random 5-8 items
        
        const enrichedItems = await Promise.all(
            itemsToShow.map(item => {
                const isMovie = item.title !== undefined;
                return isMovie ? enrichMovieData(item) : enrichTVShowData(item);
            })
        );
        
        // Add platform info
        enrichedItems.forEach(item => {
            item.platformName = PLATFORM_NAMES[platformId];
            item.platformUrl = PLATFORM_URLS[platformId];
        });
        
        return enrichedItems;
        
    } catch (e) {
        console.error(`Error fetching surprise for platform ${platformId}:`, e);
        return [];
    }
}

function renderResultsSummary(surpriseMode, selectedGenreNames) {
    let platformOptions = '<option value="default">All Platforms</option>';
    Object.entries(PLATFORM_NAMES).forEach(([id, name]) => {
        platformOptions += `<option value="platform-${id}">${name}</option>`;
    });
    
    const sortDropdown = document.getElementById('sort-by-platform');
    if (sortDropdown) {
        sortDropdown.innerHTML = platformOptions;
        
        const newDropdown = sortDropdown.cloneNode(true);
        sortDropdown.parentNode.replaceChild(newDropdown, sortDropdown);
        
        newDropdown.addEventListener('change', (e) => {
            const sortBy = e.target.value;
            const resultsArea = document.getElementById('results-area');
            
            if (sortBy.startsWith('platform-')) {
                const platformId = sortBy.split('-')[1];
                const platformName = PLATFORM_NAMES[platformId];
                const filtered = currentResultsCache.filter(movie => {
                    if (movie.platformName) return movie.platformName === platformName;
                    return movie.providers?.some(p => p.name === platformName);
                });
                displayMovies(filtered, resultsArea);
            } else {
                displayMovies(currentResultsCache, resultsArea);
            }
        });
    }

    updateVibeButton();
    if (surpriseMode) showFeedbackLoop();
}

function displayMovies(movies, container) {
    container.innerHTML = "";
    if (!movies.length) {
        container.innerHTML = '<div class="empty-state">No matches found.</div>';
        return;
    }

    // Remove duplicates by movie ID
    const uniqueMovies = [];
    const seenIds = new Set();
    
    movies.forEach(movie => {
        if (!seenIds.has(movie.id)) {
            seenIds.add(movie.id);
            uniqueMovies.push(movie);
        }
    });

    const groups = {};
    uniqueMovies.forEach((movie) => {
        let platformKey;
        
        if (movie.platformName) {
            platformKey = movie.platformName;
        } else if (movie.providers && movie.providers.length > 0) {
            platformKey = movie.providers[0].name;
        } else {
            platformKey = "Other";
        }
        
        if (!groups[platformKey]) {
            groups[platformKey] = { name: platformKey, movies: [] };
        }
        groups[platformKey].movies.push(movie);
    });
    
    for (const group of Object.values(groups)) {
        const section = document.createElement('div');
        section.className = 'genre-section';
        section.innerHTML = `<h3 class="genre-title">${group.name} (${group.movies.length})</h3>`;
        
        const grid = document.createElement('div');
        grid.className = 'results-grid';
        
        group.movies.forEach(movie => grid.appendChild(createUnifiedMovieCard(movie)));
        
        section.appendChild(grid);
        container.appendChild(section);
    }
}

async function enrichMovieData(movie) {
    if (!movie) return movie;
    
    try {
        const [creditsData, externalIdsData, providersData] = await Promise.all([
            cachedFetch(`${TMDB_BASE_URL}/movie/${movie.id}/credits`, { 
                headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` } 
            }),
            cachedFetch(`${TMDB_BASE_URL}/movie/${movie.id}/external_ids`, { 
                headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` } 
            }),
            cachedFetch(`${TMDB_BASE_URL}/movie/${movie.id}/watch/providers`, { 
                headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` } 
            })
        ]);

        movie.cast = creditsData.cast ? creditsData.cast.slice(0, 5) : [];

        const actorPromises = movie.cast.map(actor => 
            cachedFetch(`${TMDB_BASE_URL}/person/${actor.id}/external_ids`, { 
                headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` } 
            }).then(data => {
                actor.imdb_id = data.imdb_id;
                return actor;
            }).catch(() => actor)
        );
        
        await Promise.all(actorPromises);

        const usProviders = providersData?.results?.US?.flatrate || [];
        movie.providers = usProviders.map(p => {
            const name = PLATFORM_NAMES[p.provider_id];
            const url = PLATFORM_URLS[p.provider_id] || '#';
            return name ? { name, url } : null;
        }).filter(Boolean);

        movie.imdb_id = externalIdsData.imdb_id;

    } catch (e) {
        console.error("Error enriching movie:", e);
    }
    return movie;
}

async function enrichTVShowData(show) {
    if (!show) return show;
    
    try {
        const [creditsData, externalIdsData, providersData] = await Promise.all([
            cachedFetch(`${TMDB_BASE_URL}/tv/${show.id}/credits`, { 
                headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` } 
            }),
            cachedFetch(`${TMDB_BASE_URL}/tv/${show.id}/external_ids`, { 
                headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` } 
            }),
            cachedFetch(`${TMDB_BASE_URL}/tv/${show.id}/watch/providers`, { 
                headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` } 
            })
        ]);

        show.cast = creditsData.cast ? creditsData.cast.slice(0, 5) : [];

        const actorPromises = show.cast.map(actor => 
            cachedFetch(`${TMDB_BASE_URL}/person/${actor.id}/external_ids`, { 
                headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` } 
            }).then(data => {
                actor.imdb_id = data.imdb_id;
                return actor;
            }).catch(() => actor)
        );
        
        await Promise.all(actorPromises);

        const usProviders = providersData?.results?.US?.flatrate || [];
        show.providers = usProviders.map(p => {
            const name = PLATFORM_NAMES[p.provider_id];
            const url = PLATFORM_URLS[p.provider_id] || '#';
            return name ? { name, url } : null;
        }).filter(Boolean);

        show.imdb_id = externalIdsData.imdb_id;
        show.title = show.name;

    } catch (e) {
        console.error("Error enriching TV show:", e);
    }
    return show;
}
// ========================================
// AI CHATBOT - Enhanced Keywords
// ========================================
const aiInput = document.getElementById('ai-input');
const aiSendBtn = document.getElementById('ai-send-btn');
const aiMessages = document.getElementById('ai-chat-messages');
const aiResults = document.getElementById('ai-results');

function detectMoodFromUserInput(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    const tvKeywords = ['tv show', 'tv series', 'series', 'show', 'binge', 'episodes', 'season'];
    const movieKeywords = ['movie', 'film', 'watch a film'];

    let contentType = 'movie';
    let isShowRequest = false;

    for (const keyword of tvKeywords) {
        if (lowerMessage.includes(keyword)) {
            contentType = 'tv';
            isShowRequest = true;
            break;
        }
    }

    for (const keyword of movieKeywords) {
        if (lowerMessage.includes(keyword)) {
            contentType = 'movie';
            isShowRequest = false;
            break;
        }
    }

    for (const rule of CHATBOT_RULES.patterns) {
        for (const keyword of rule.keywords) {
            const regex = new RegExp(`\\b${keyword}\\b`, 'i');
            if (regex.test(lowerMessage)) {
                return {
                    mood: rule.mood,
                    genres: rule.genres,
                    matchedKeyword: keyword,
                    contentType: contentType,
                    isShowRequest: isShowRequest
                };
            }
        }
    }

    return {
        mood: 'Keyword Search',
        genres: [28, 35, 18, 878, 53, 27, 10749],
        matchedKeyword: 'general',
        contentType: contentType,
        isShowRequest: isShowRequest,
        searchQuery: userMessage
    };
}

function generateBotResponse(detectedMood, userMessage, isShowRequest = false) {
    const responses = {
        'Heartwarming': isShowRequest ? [`💕 Found beautiful TV shows!`] : [`💕 Found heartwarming movies!`],
        'Action': isShowRequest ? [`🎬 Intense action shows!`] : [`🎬 Action movies found!`],
        'Comedy': isShowRequest ? [`😂 Hilarious shows!`] : [`😂 Funny movies found!`],
        'Romantic': isShowRequest ? [`💕 Love stories!`] : [`💕 Romantic movies!`],
        'Horror': isShowRequest ? [`👻 Scary shows!`] : [`👻 Horror movies!`],
        'Drama': isShowRequest ? [`🎭 Drama series!`] : [`🎭 Dramatic movies!`],
        'Sci-Fi': isShowRequest ? [`🚀 Sci-fi shows!`] : [`🚀 Sci-fi movies!`],
        'Adventure': isShowRequest ? [`🗺️ Adventure shows!`] : [`🗺️ Adventure movies!`],
        'Fantasy': isShowRequest ? [`🐉 Fantasy shows!`] : [`🐉 Fantasy movies!`],
        'Thriller': isShowRequest ? [`🔪 Suspenseful shows!`] : [`🔪 Thriller movies!`],
        'Mystery': isShowRequest ? [`🕵️ Mystery shows!`] : [`🕵️ Mystery movies!`],
        'Documentary': isShowRequest ? [`📺 Documentaries!`] : [`📽️ Documentaries!`],
        'Food': isShowRequest ? [`🍕 Food shows!`] : [`🍕 Food movies!`],
        'Nostalgic': isShowRequest ? [`🕰️ Nostalgic shows!`] : [`🕰️ Nostalgic movies!`],
        'Sports': isShowRequest ? [`🏀 Sports shows!`] : [`🏀 Sports movies!`],
        'Music': isShowRequest ? [`🎵 Musical shows!`] : [`🎵 Music movies!`],
        'Travel': isShowRequest ? [`✈️ Travel shows!`] : [`✈️ Travel movies!`],
        'War': isShowRequest ? [`⚔️ War shows!`] : [`⚔️ War movies!`],
        'Western': isShowRequest ? [`🤠 Western shows!`] : [`🤠 Western movies!`],
        'Mind-Bending': isShowRequest ? [`🧠 Mind-bending shows!`] : [`🧠 Mind-bending movies!`],
        'Heist': isShowRequest ? [`💰 Heist shows!`] : [`💰 Heist movies!`],
        'Dark': isShowRequest ? [`🌑 Dark shows!`] : [`🌑 Dark movies!`],
        'Keyword Search': isShowRequest ? [`🔍 Searching TV...`] : [`🔍 Searching movies...`],
        'Similar Movies': isShowRequest ? [`🔍 Finding similar shows...`] : [`🔍 Finding similar movies...`]
    };

    const defaultResponses = isShowRequest ? [`🎬 Great shows!`] : [`🎬 Great movies!`];
    const responseArray = responses[detectedMood] || defaultResponses;
    return responseArray[0];
}

async function sendChatbotMessage() {
    const userMessage = aiInput.value.trim();

    if (!userMessage) {
        alert('Please tell me what you\'re in the mood for!');
        return;
    }

    addMessageToChat('user', userMessage);
    aiInput.value = '';

    aiSendBtn.disabled = true;
    aiSendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Finding...';

    try {
        const analysis = detectMoodFromUserInput(userMessage);
        const botResponse = generateBotResponse(analysis.mood, userMessage, analysis.isShowRequest);

        addMessageToChat('assistant', botResponse);

        if (analysis.mood === 'Similar Movies') {
            let movieTitle = userMessage.toLowerCase();
            const similarKeywords = ['similar to', 'like', 'similar films', 'similar movies', 'recommendations like', 'movies like', 'shows like'];

            for (const keyword of similarKeywords) {
                if (movieTitle.includes(keyword)) {
                    movieTitle = movieTitle.replace(keyword, '').trim();
                    break;
                }
            }

            await searchSimilarMovies(movieTitle, analysis.isShowRequest);
        } else if (analysis.mood === 'Keyword Search' && analysis.searchQuery) {
            await searchByKeywords(analysis.searchQuery, analysis.isShowRequest);
        } else if (analysis.isShowRequest) {
            await searchTVShowsByRules(analysis.genres, analysis.mood);
        } else {
            await searchMoviesByRules(analysis.genres, analysis.mood);
        }

    } catch (error) {
        console.error('Chatbot error:', error);
        addMessageToChat('assistant', '❌ Sorry, something went wrong. Please try again!');
    } finally {
        aiSendBtn.disabled = false;
        aiSendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Get Recommendations';
    }
}

if (aiSendBtn) {
    aiSendBtn.addEventListener('click', sendChatbotMessage);
}

if (aiInput) {
    aiInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatbotMessage();
        }
    });
}

async function searchMoviesByRules(genreIds, mood) {
    aiResults.innerHTML = '<div class="ai-loading"><i class="fas fa-spinner fa-spin"></i> Searching...</div>';

    try {
        const url = new URL(`${TMDB_BASE_URL}/discover/movie`);
        if (genreIds.length > 0) {
            url.searchParams.append('with_genres', genreIds.join(','));
        }

        if (userSelectedPlatforms.length > 0) {
            url.searchParams.append("watch_region", "US");
            url.searchParams.append("with_watch_providers", userSelectedPlatforms.join("|"));
        } else {
            const allPlatforms = Object.keys(PLATFORM_NAMES);
            url.searchParams.append("watch_region", "US");
            url.searchParams.append("with_watch_providers", allPlatforms.join("|"));
        }

        if (mood === 'Top-Rated') {
            url.searchParams.append('sort_by', 'vote_average.desc');
            url.searchParams.append('vote_count.gte', '200');
        } else {
            url.searchParams.append('sort_by', 'popularity.desc');
            url.searchParams.append('vote_count.gte', '50');
        }

        url.searchParams.append('page', '1');
        url.searchParams.append('include_adult', 'false');

        const data = await cachedFetch(url.toString(), {
            headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` }
        });

        if (!data.results || data.results.length === 0) {
            aiResults.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No movies found. Try different keywords!</p>';
            return;
        }

        const topMovies = data.results.slice(0, 5);
        const enrichedMovies = await Promise.all(topMovies.map(movie => enrichMovieData(movie)));

        aiResultsCache = enrichedMovies;
        displayChatbotMovieResults(enrichedMovies, mood);

    } catch (error) {
        console.error('Error searching movies:', error);
        aiResults.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Error searching. Try again!</p>';
    }
}

async function searchTVShowsByRules(genreIds, mood) {
    aiResults.innerHTML = '<div class="ai-loading"><i class="fas fa-spinner fa-spin"></i> Searching TV...</div>';

    try {
        const url = new URL(`${TMDB_BASE_URL}/discover/tv`);
        if (genreIds.length > 0) {
            url.searchParams.append('with_genres', genreIds.join(','));
        }

        // FIXED: Only search on user-selected platforms, or all platforms if none selected
        if (userSelectedPlatforms.length > 0) {
            url.searchParams.append("watch_region", "US");
            url.searchParams.append("with_watch_providers", userSelectedPlatforms.join("|"));
        } else {
            const allPlatforms = Object.keys(PLATFORM_NAMES);
            url.searchParams.append("watch_region", "US");
            url.searchParams.append("with_watch_providers", allPlatforms.join("|"));
        }

        if (mood === 'Top-Rated') {
            url.searchParams.append('sort_by', 'vote_average.desc');
            url.searchParams.append('vote_count.gte', '200');
        } else {
            url.searchParams.append('sort_by', 'popularity.desc');
            url.searchParams.append('vote_count.gte', '50');
        }

        url.searchParams.append('page', '1');
        url.searchParams.append('include_adult', 'false');

        const data = await cachedFetch(url.toString(), {
            headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` }
        });

        if (!data.results || data.results.length === 0) {
            aiResults.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No TV shows found. Try different keywords!</p>';
            return;
        }

        const topShows = data.results.slice(0, 5);
        const enrichedShows = await Promise.all(topShows.map(show => enrichTVShowData(show)));

        aiResultsCache = enrichedShows;
        displayChatbotMovieResults(enrichedShows, mood, true);

    } catch (error) {
        console.error('Error searching TV shows:', error);
        aiResults.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Error searching. Try again!</p>';
    }
}

async function searchByKeywords(keywords, isShowRequest = false) {
    aiResults.innerHTML = '<div class="ai-loading"><i class="fas fa-spinner fa-spin"></i> Searching...</div>';

    try {
        const searchUrl = new URL(`${TMDB_BASE_URL}/search/${isShowRequest ? 'tv' : 'movie'}`);
        searchUrl.searchParams.append('query', keywords);
        searchUrl.searchParams.append('include_adult', 'false');
        searchUrl.searchParams.append('page', '1');

        const searchData = await cachedFetch(searchUrl.toString(), {
            headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` }
        });

        if (!searchData.results || searchData.results.length === 0) {
            aiResults.innerHTML = `<p style="color: var(--text-muted); text-align: center;">No ${isShowRequest ? 'shows' : 'movies'} found for "${keywords}".</p>`;
            return;
        }

        const topResults = searchData.results.slice(0, 5);
        const enrichedResults = await Promise.all(
            topResults.map(item => isShowRequest ? enrichTVShowData(item) : enrichMovieData(item))
        );

        aiResultsCache = enrichedResults;
        displayChatbotMovieResults(enrichedResults, `Results for "${keywords}"`, isShowRequest);

    } catch (error) {
        console.error('Error searching by keywords:', error);
        aiResults.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Error searching. Try again!</p>';
    }
}

async function searchSimilarMovies(movieTitle, isShowRequest = false) {
    aiResults.innerHTML = '<div class="ai-loading"><i class="fas fa-spinner fa-spin"></i> Finding similar...</div>';

    try {
        const searchUrl = new URL(`${TMDB_BASE_URL}/search/${isShowRequest ? 'tv' : 'movie'}`);
        searchUrl.searchParams.append('query', movieTitle);
        searchUrl.searchParams.append('include_adult', 'false');

        const searchData = await cachedFetch(searchUrl.toString(), {
            headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` }
        });

        if (!searchData.results || searchData.results.length === 0) {
            aiResults.innerHTML = `<p style="color: var(--text-muted); text-align: center;">Could not find "${movieTitle}".</p>`;
            return;
        }

        const referenceItem = searchData.results[0];
        let genreIds = referenceItem.genre_ids ? referenceItem.genre_ids.slice(0, 3) : [28, 35, 18];

        const similarUrl = new URL(`${TMDB_BASE_URL}/discover/${isShowRequest ? 'tv' : 'movie'}`);
        similarUrl.searchParams.append('with_genres', genreIds.join(','));
        similarUrl.searchParams.append('sort_by', 'vote_average.desc');
        similarUrl.searchParams.append('vote_count.gte', '50');
        similarUrl.searchParams.append('page', '1');
        similarUrl.searchParams.append('include_adult', 'false');

        const similarData = await cachedFetch(similarUrl.toString(), {
            headers: { Authorization: `Bearer ${TMDB_V4_TOKEN}` }
        });

        if (!similarData.results || similarData.results.length === 0) {
            aiResults.innerHTML = `<p style="color: var(--text-muted); text-align: center;">No similar content found.</p>`;
            return;
        }

        const topSimilar = similarData.results.slice(0, 5);
        const enrichedSimilar = await Promise.all(
            topSimilar.map(item => isShowRequest ? enrichTVShowData(item) : enrichMovieData(item))
        );

        aiResultsCache = enrichedSimilar;
        displayChatbotMovieResults(enrichedSimilar, `Similar to "${referenceItem.title || referenceItem.name}"`, isShowRequest);

    } catch (error) {
        console.error('Error searching for similar content:', error);
        aiResults.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Error searching. Try again!</p>';
    }
}

function displayChatbotMovieResults(movies, mood, isShowRequest = false) {
    aiResults.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'ai-results-grid';

    movies.forEach(movie => {
        const card = createUnifiedMovieCard(movie);
        grid.appendChild(card);
    });

    aiResults.appendChild(grid);
}

function addMessageToChat(role, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${role}`;
    messageDiv.innerHTML = `
        <div class="ai-message-content">
            <strong>${role === 'user' ? '👤 You' : '🤖 StreamFinder'}:</strong>
            <p>${message}</p>
        </div>
    `;
    aiMessages.appendChild(messageDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;
}

// ========================================
// OPTIMIZED: Movie Card Creation
// ========================================
function createUnifiedMovieCard(movie) {
    const div = document.createElement('div');
    div.className = 'movie-card';
    const isFav = favorites.some(f => f.id === movie.id);
    const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
    const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/342x513?text=No+Image';

    const castHTML = movie.cast && movie.cast.length > 0
        ? `<div class="movie-cast">
             <div class="cast-title">Starring</div>
             <div class="cast-list">
               ${movie.cast.map(actor => {
                   if (actor.imdb_id) {
                       return `<a href="https://www.imdb.com/name/${actor.imdb_id}/" target="_blank" rel="noopener" class="cast-member" onclick="event.stopPropagation()">${actor.name}</a>`;
                   } else {
                       return `<span class="cast-member no-imdb" data-actor-name="${actor.name}">${actor.name}</span>`;
                   }
               }).join('')}
             </div>
           </div>`
        : '';

    let providersDisplay = [];
    if (movie.platformName && movie.platformUrl) {
        providersDisplay.push({ name: movie.platformName, url: movie.platformUrl });
    } else {
        providersDisplay = movie.providers || [];
    }

    const providersHTML = providersDisplay.length > 0
        ? `<div class="movie-platforms">
             ${providersDisplay.map(p => {
            return `<a href="${p.url}" target="_blank" rel="noopener" class="movie-platform streaming-link" onclick="event.stopPropagation()">${p.name}</a>`;
        }).join('')}
           </div>`
        : '';

    const voteAverage = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

    div.innerHTML = `
        <div class="movie-card-inner">
            <div class="movie-collapsed-view">
                <img src="${posterUrl}" class="movie-poster" alt="${movie.title} Poster" loading="lazy">
                <div class="movie-title-overlay">
                    <div class="movie-title">${movie.title}</div>
                    <div class="expand-icon"><i class="fas fa-chevron-down"></i></div>
                </div>
            </div>
            
            <div class="movie-expanded-view">
                <div class="movie-header-expanded">
                    <div class="movie-title-main">${movie.title}</div>
                    ${providersHTML}
                </div>
                
                <div class="movie-meta-expanded">
                    <span class="meta-year"><i class="fas fa-calendar"></i> ${year}</span>
                    <span class="meta-rating"><i class="fas fa-star"></i> ${voteAverage}</span>
                </div>
                
                <div class="movie-overview">
                    <p>${movie.overview || "No description available."}</p>
                </div>
                
                ${castHTML}
                
                <div class="action-links-expanded">
                    <button class="expanded-action-btn btn-favorite-expanded ${isFav ? 'is-active' : ''}" title="Add to watchlist">
                        ${isFav ? '<i class="fas fa-trash-alt"></i> Remove' : '<i class="far fa-heart"></i> Watchlist'}
                    </button>
                    ${movie.imdb_id ? `<a href="https://www.imdb.com/title/${movie.imdb_id}/" target="_blank" rel="noopener" class="expanded-action-btn btn-imdb-expanded" onclick="event.stopPropagation()" title="View on IMDB">
                        <i class="fas fa-external-link-alt"></i> IMDb
                    </a>` : ''}
                    <button class="expanded-action-btn btn-share-expanded" data-title="${movie.title}">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                </div>
                
                <div class="collapse-hint">
                    <i class="fas fa-chevron-up"></i> Click to collapse
                </div>
            </div>
        </div>
    `;

    div.addEventListener('click', (e) => {
        if (e.target.closest('.streaming-link') || 
            e.target.closest('.cast-member') || 
            e.target.closest('.expanded-action-btn') ||
            e.target.closest('a') ||
            e.target.closest('button')) {
            return;
        }
        div.classList.toggle('expanded');
    });

    div.querySelectorAll('.cast-member.no-imdb').forEach(actorEl => {
        actorEl.addEventListener('click', (e) => {
            e.stopPropagation();
            showIMDbModal();
        });
    });

    div.querySelectorAll('.btn-favorite-expanded').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault(); // Prevent any default behavior
            toggleFavorite(movie);

            const active = favorites.some(f => f.id === movie.id);
            div.querySelectorAll('.btn-favorite-expanded').forEach(favBtnExpanded => {
                favBtnExpanded.classList.toggle('is-active', active);
                favBtnExpanded.innerHTML = active ? '<i class="fas fa-trash-alt"></i> Remove' : '<i class="far fa-heart"></i> Watchlist';
            });
        });
    });

    div.querySelectorAll('.btn-share-expanded').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            shareMovie(movie);
        });
    });

    return div;
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-times-circle"></i>';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function updateFavCount() {
    favCountEl.innerText = favorites.length;
    favCountEl.style.display = favorites.length > 0 ? 'inline' : 'none';
    favCountEl.classList.add('updated');
    setTimeout(() => favCountEl.classList.remove('updated'), 500);
}
updateFavCount();

function toggleFavorite(movie) {
    const idx = favorites.findIndex(f => f.id === movie.id);
    let storedProviderNames = [];
    if (movie.platformName) {
        storedProviderNames = [movie.platformName];
    } else if (movie.providers) {
        storedProviderNames = movie.providers.map(p => p.name);
    }

    if (idx > -1) {
        favorites.splice(idx, 1);
        showToast(`Removed "${movie.title}" from Watchlist`, 'removed');
    } else {
        favorites.push({
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            poster_path: movie.poster_path,
            overview: movie.overview,
            genre_ids: movie.genre_ids,
            providers: storedProviderNames,
            imdb_id: movie.imdb_id
        });
        showToast(`Added "${movie.title}" to Watchlist!`, 'success');
    }
    
    localStorage.setItem('streamFinderFavs', JSON.stringify(favorites));
    updateFavCount();
}

function renderCategorizedFavorites() {
    const container = document.getElementById('favorites-container');
    container.innerHTML = "";

    if (favorites.length === 0) {
        container.innerHTML = '<div class="empty-state">Your watchlist is empty. Go find some great content!</div>';
        return;
    }

    const groups = {};
    favorites.forEach(movie => {
        const gId = (movie.genre_ids && movie.genre_ids.length > 0) ? movie.genre_ids[0] : 'other';
        if (!groups[gId]) groups[gId] = [];
        groups[gId].push(movie);
    });

    for (const [gId, movies] of Object.entries(groups)) {
        const section = document.createElement('div');
        section.className = 'genre-section';
        const genreName = GENRE_NAMES[gId] || "Uncategorized";
        section.innerHTML = `<h3 class="genre-title">${genreName} (${movies.length})</h3>`;

        const grid = document.createElement('div');
        grid.className = 'favorites-grid';

        const promises = movies.map(m => {
            if (m.providers && Array.isArray(m.providers)) {
                m.providers = m.providers.map(item => {
                    if (typeof item === 'object' && item.name) return item;
                    const name = String(item);
                    const platformId = Object.keys(PLATFORM_NAMES).find(key => PLATFORM_NAMES[key] === name);
                    return { name, url: platformId ? PLATFORM_URLS[platformId] : '#' };
                });
            }
            return enrichMovieData(m);
        });

        Promise.all(promises).then(enrichedMovies => {
            enrichedMovies.forEach(m => grid.appendChild(createUnifiedMovieCard(m)));
        }).catch(err => {
            console.error("Error enriching watchlist:", err);
            movies.forEach(m => grid.appendChild(createUnifiedMovieCard(m)));
        });

        section.appendChild(grid);
        container.appendChild(section);
    }

    setupWatchlistPlatformSort();
}

function setupWatchlistPlatformSort() {
    const sortDropdown = document.getElementById('watchlist-sort-platform');
    if (!sortDropdown) return;

    let platformOptions = '<option value="default">All Platforms</option>';
    Object.entries(PLATFORM_NAMES).forEach(([id, name]) => {
        platformOptions += `<option value="platform-${id}">${name}</option>`;
    });

    sortDropdown.innerHTML = platformOptions;
    const newDropdown = sortDropdown.cloneNode(true);
    sortDropdown.parentNode.replaceChild(newDropdown, sortDropdown);

    newDropdown.addEventListener('change', (e) => {
        const sortBy = e.target.value;
        const container = document.getElementById('favorites-container');

        if (sortBy === 'default') {
            renderCategorizedFavorites();
        } else if (sortBy.startsWith('platform-')) {
            const platformId = sortBy.split('-')[1];
            const platformName = PLATFORM_NAMES[platformId];

            const filtered = favorites.filter(movie => {
                if (!movie.providers || movie.providers.length === 0) return false;
                return movie.providers.some(provider => {
                    if (typeof provider === 'object' && provider.name) {
                        return provider.name === platformName;
                    }
                    return String(provider) === platformName;
                });
            });

            container.innerHTML = '';

            if (filtered.length === 0) {
                container.innerHTML = `<div class="empty-state">No movies found on ${platformName}.</div>`;
                return;
            }

            const grid = document.createElement('div');
            grid.className = 'favorites-grid';

            const promises = filtered.map(m => {
                if (m.providers && Array.isArray(m.providers)) {
                    m.providers = m.providers.map(item => {
                        if (typeof item === 'object' && item.name) return item;
                        const name = String(item);
                        const pId = Object.keys(PLATFORM_NAMES).find(key => PLATFORM_NAMES[key] === name);
                        return { name, url: pId ? PLATFORM_URLS[pId] : '#' };
                    });
                }
                return enrichMovieData(m);
            });

            Promise.all(promises).then(enrichedMovies => {
                enrichedMovies.forEach(m => grid.appendChild(createUnifiedMovieCard(m)));
            }).catch(err => {
                console.error("Error enriching filtered:", err);
                filtered.forEach(m => grid.appendChild(createUnifiedMovieCard(m)));
            });

            container.appendChild(grid);
        }
    });
}

const backToTopBtnFav = document.getElementById('back-to-top-btn-fav');
if (backToTopBtnFav) {
    window.addEventListener('scroll', () => {
        backToTopBtnFav.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    backToTopBtnFav.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeMovieFact();
    initializeSelectAllButton();
});

pushHistory(0);