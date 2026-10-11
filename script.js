
import { pipeline, env } from
  'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2';

// WildQuest AI: browser-based image classification
const MODEL_ID = 'Xenova/mobilenet_v2';

env.allowLocalModels = false;

const $ = (id) => document.getElementById(id);

const photoInput = $('photoInput');
const preview = $('preview');
const uploadPrompt = $('uploadPrompt');
const analyzeBtn = $('analyzeBtn');
const aiStatus = $('aiStatus');
const result = $('result');
const resultTitle = $('resultTitle');
const resultDescription = $('resultDescription');
const confidence = $('confidence');
const saveDiscoveryBtn = $('saveDiscoveryBtn');

let selectedFile = null;
let imageClassifier = null;
let isAnalyzing = false;
let latestPrediction = null;
let savedCurrentDiscovery = false;
let previewUrl = null;

const quests = [
  {
    id: 'leaves',
    icon: '🍃',
    title: 'Leaf Detective',
    description: 'Find three different leaf shapes. Notice their edges, patterns, and colors.',
    time: '10 minutes',
    xp: 15
  },
  {
    id: 'sky',
    icon: '☁️',
    title: 'Sky Watcher',
    description: 'Look up safely and observe three different cloud shapes or patterns.',
    time: '5 minutes',
    xp: 10
  },
  {
    id: 'sounds',
    icon: '🐦',
    title: 'Nature Listener',
    description: 'Pause in a safe spot and listen for three different natural sounds.',
    time: '5 minutes',
    xp: 10
  },
  {
    id: 'textures',
    icon: '🌱',
    title: 'Tiny World Explorer',
    description: 'Observe three natural textures without disturbing plants or animals.',
    time: '10 minutes',
    xp: 15
  },
  {
    id: 'colors',
    icon: '🌼',
    title: 'Color Collector',
    description: 'Spot five colors in nature. Leave every flower and leaf where it is.',
    time: '10 minutes',
    xp: 15
  },
  {
    id: 'break',
    icon: '🚶',
    title: 'Screen-Free Stroll',
    description: 'Take a short walk in a safe, familiar place with an adult’s permission when needed.',
    time: '10–15 minutes',
    xp: 20
  }
];

const defaultState = {
  points: 0,
  discoveries: [],
  completedQuests: []
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem('wildquest-state'));

    if (!saved || typeof saved !== 'object') {
      return { ...defaultState };
    }

    return {
      points: Number.isFinite(saved.points) ? saved.points : 0,
      discoveries: Array.isArray(saved.discoveries)
        ? saved.discoveries : [],
      completedQuests: Array.isArray(saved.completedQuests)
        ? saved.completedQuests : []
    };
  } catch {
    return { ...defaultState };
  }
}

let state = loadState();

function saveState() {
  try {
    localStorage.setItem('wildquest-state', JSON.stringify(state));
  } catch {
    aiStatus.textContent =
      'Your browser could not save progress. You can still use the app for this session.';
  }
}

function updateStats() {
  $('points').textContent = state.points;
  $('discoveries').textContent = state.discoveries.length;
  $('questsDone').textContent = state.completedQuests.length;
}

function renderQuests() {
  const grid = $('questGrid');
  grid.replaceChildren();

  quests.forEach((quest) => {
    const done = state.completedQuests.includes(quest.id);

    const card = document.createElement('article');
    card.className = `quest-card${done ? ' completed' : ''}`;

    const icon = document.createElement('div');
    icon.className = 'quest-icon';
    icon.textContent = quest.icon;

    const title = document.createElement('h3');
    title.textContent = quest.title;

    const description = document.createElement('p');
    description.textContent = quest.description;

    const meta = document.createElement('div');
    meta.className = 'quest-meta';

    const duration = document.createElement('span');
    duration.textContent = `⏱ ${quest.time}`;

    const reward = document.createElement('span');
    reward.textContent = `+${quest.xp} XP`;

    meta.append(duration, reward);

    const button = document.createElement('button');
    button.className = 'primary-btn';
    button.textContent = done ? '✓ Completed' : 'Mark as completed';
    button.disabled = done;

    button.addEventListener('click', () => {
      completeQuest(quest.id);
    });

    card.append(icon, title, description, meta, button);
    grid.append(card);
  });
}

function completeQuest(id) {
  if (state.completedQuests.includes(id)) return;

  const quest = quests.find((item) => item.id === id);
  if (!quest) return;

  state.completedQuests.push(id);
  state.points += quest.xp;

  saveState();
  updateStats();
  renderQuests();
}

function renderJournal() {
  const journal = $('journal');
  journal.replaceChildren();

  if (state.discoveries.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent =
      'Your nature journal is waiting for its first discovery 🌱';
    journal.append(empty);
    return;
  }

  [...state.discoveries].reverse().forEach((item) => {
    const entry = document.createElement('article');
    entry.className = 'journal-entry';

    const title = document.createElement('h3');
    title.textContent = `🌿 ${item.label}`;

    const description = document.createElement('p');
    description.textContent = item.description;

    const date = document.createElement('p');
    date.textContent = item.date;

    entry.append(title, description, date);
    journal.append(entry);
  });
}

photoInput.addEventListener('change', () => {
  const file = photoInput.files?.[0];

  if (!file) return;

  if (!file.type.startsWith('image/')) {
    aiStatus.textContent = 'Please choose a valid image file.';
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    aiStatus.textContent = 'Please choose an image smaller than 10 MB.';
    photoInput.value = '';
    return;
  }

  selectedFile = file;
  latestPrediction = null;
  savedCurrentDiscovery = false;

  result.hidden = true;
  analyzeBtn.disabled = false;
  saveDiscoveryBtn.disabled = false;

  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = URL.createObjectURL(file);

  preview.src = previewUrl;
  preview.hidden = false;
  uploadPrompt.hidden = true;

  aiStatus.textContent = 'Photo ready! Start AI identification when you are ready.';
});

async function getClassifier() {
  if (imageClassifier) return imageClassifier;

  aiStatus.textContent =
    'Loading the open-weight AI model... The first download may take a while.';

  analyzeBtn.disabled = true;

  imageClassifier = await pipeline(
    'image-classification',
    MODEL_ID,
    {
      device: 'auto'
    }
  );

  return imageClassifier;
}

analyzeBtn.addEventListener('click', async () => {
  if (!selectedFile || isAnalyzing) return;

  isAnalyzing = true;
  latestPrediction = null;
  savedCurrentDiscovery = false;
  result.hidden = true;
  saveDiscoveryBtn.disabled = false;
  analyzeBtn.disabled = true;

  try {
    const classifier = await getClassifier();

    aiStatus.textContent = 'Looking at your discovery...';

    const predictions = await classifier(preview.src, {
      top_k: 3
    });

    if (!predictions || predictions.length === 0) {
      throw new Error('The model did not return any predictions.');
    }

    latestPrediction = predictions[0];

    resultTitle.textContent = formatLabel(latestPrediction.label);

    resultDescription.textContent =
      'The model thinks your photo most closely matches this category. ' +
      'Look at the image and compare it with a trusted field guide ' +
      'before drawing conclusions.';

    confidence.textContent =
      `Model score: ${(latestPrediction.score * 100).toFixed(1)}%. ` +
      'This is a model score, not a guarantee of correctness.';

    result.hidden = false;
    aiStatus.textContent = 'Analysis complete! Explore your result below.';
  } catch (error) {
    console.error('WildQuest AI error:', error);

    imageClassifier = null;

    aiStatus.textContent =
      'AI could not load or analyze this photo. Check your internet ' +
      'connection, then try again. You can still complete outdoor quests.';
  } finally {
    isAnalyzing = false;
    analyzeBtn.disabled = !selectedFile;
  }
});

function formatLabel(label) {
  return String(label)
    .replaceAll('_', ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

saveDiscoveryBtn.addEventListener('click', () => {
  if (!latestPrediction || savedCurrentDiscovery) return;

  const label = formatLabel(latestPrediction.label);

  state.discoveries.push({
    label,
    description:
      `AI suggested this category with a score of ` +
      `${(latestPrediction.score * 100).toFixed(1)}%.`,
    date: new Date().toLocaleDateString()
  });

  state.points += 20;
  savedCurrentDiscovery = true;

  saveState();
  updateStats();
  renderJournal();

  saveDiscoveryBtn.textContent = '✓ Discovery saved!';
  saveDiscoveryBtn.disabled = true;
});

$('resetBtn').addEventListener('click', () => {
  const confirmed = window.confirm(
    'Reset all saved XP, quests, and discoveries? This cannot be undone.'
  );

  if (!confirmed) return;

  state = {
    points: 0,
    discoveries: [],
    completedQuests: []
  };

  saveState();
  updateStats();
  renderQuests();
  renderJournal();
});

updateStats();
renderQuests();
renderJournal();
