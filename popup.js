// --- DOM Elements ---
const generateBtn = document.getElementById('generate-btn');
const keywordInput = document.getElementById('main-keyword');
const languageSelect = document.getElementById('language-select');
const sortSelect = document.getElementById('sort-by');
const loader = document.getElementById('loader');
const resultsWrapper = document.getElementById('results-wrapper');
const apiKeyWarning = document.getElementById('api-key-warning');
const openOptionsLink = document.getElementById('open-options-link');

// Tags elements
const copyTagsBtn = document.getElementById('copy-tags-btn');
const tagsOutput = document.getElementById('tags-output');

// Description elements
const copyDescBtn = document.getElementById('copy-desc-btn');
const descriptionOutput = document.getElementById('description-output');

// --- State ---
let generatedTags = [];
let generatedDescription = "";
let geminiApiKey = null;


// --- API Call to Gemini ---
async function getAiContent(keyword, language) {
    if (!geminiApiKey) {
        alert('Gemini API Key not set. Please set it in the options page.');
        return null;
    }
    const languageName = language === 'en' ? 'English' : 'Indonesian';
    const prompt = `I need content for a YouTube video with the main keyword: "${keyword}". Please generate two things, all in **${languageName}**:
    1. A list of 25 relevant YouTube tags. Each tag should have a relevance score (1-100).
    2. A draft for an engaging, SEO-friendly YouTube description of about 3-4 paragraphs. Include the main keyword in the first paragraph and a call-to-action to like, subscribe, and comment.
    
    Respond ONLY with a single JSON object with two properties: "tags" and "description".
    - "tags" must be an array of objects, each with "tag" (string) and "score" (number) properties, sorted by the highest score.
    - "description" must be a single string containing the entire description text.`;

    const modelName = 'gemini-1.5-flash-latest';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiApiKey}`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8,
      },
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`API Error: ${response.status} ${response.statusText}. ${errorBody.error.message}`);
        }

        const result = await response.json();
        const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textResponse) {
            const jsonString = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonString);
        } else {
            throw new Error("Invalid response structure from API.");
        }
    } catch (error) {
        console.error('Failed to fetch content:', error);
        alert(`Failed to get content from AI: ${error.message}`);
        return null;
    }
}

// --- Display Logic ---
function displayTags() {
    tagsOutput.innerHTML = '';
    let sortedTags = [...generatedTags];

    if (sortSelect.value === 'alphabetical') {
        sortedTags.sort((a, b) => a.tag.localeCompare(b.tag));
    } else {
        sortedTags.sort((a, b) => b.score - a.score);
    }
    
    sortedTags.forEach(({ tag, score }) => {
        const tagElement = document.createElement('div');
        tagElement.className = 'bg-gray-100 p-2 rounded-md flex items-center justify-between text-sm';

        const tagText = document.createElement('span');
        tagText.className = 'text-gray-800';
        tagText.textContent = tag;

        const scoreSpan = document.createElement('span');
        scoreSpan.className = 'bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full';
        scoreSpan.textContent = score.toFixed(1);
        
        tagElement.appendChild(tagText);
        tagElement.appendChild(scoreSpan);

        tagsOutput.appendChild(tagElement);
    });
}

// --- Event Handlers ---
generateBtn.addEventListener('click', async () => {
    const keyword = keywordInput.value.trim();
    if (!keyword) {
        alert('Please enter a main keyword.');
        return;
    }
    
    resultsWrapper.classList.add('hidden');
    loader.style.display = 'flex';
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';

    const aiContent = await getAiContent(keyword, languageSelect.value);

    loader.style.display = 'none';
    generateBtn.disabled = false;
    generateBtn.textContent = 'Generate';

    if (aiContent && aiContent.tags && aiContent.description) {
        generatedTags = aiContent.tags;
        generatedDescription = aiContent.description;
        displayTags();
        
        descriptionOutput.innerText = generatedDescription;

        copyTagsBtn.disabled = false;
        copyDescBtn.disabled = false;
        resultsWrapper.classList.remove('hidden');
    }
});

sortSelect.addEventListener('change', () => {
    if(generatedTags.length > 0) displayTags();
});

function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = buttonElement.textContent;
        buttonElement.textContent = 'Disalin!';
        setTimeout(() => { buttonElement.textContent = originalText; }, 2000);
    }).catch(err => {
        console.error('Copy failed:', err);
        // Fallback for environments where clipboard API is not available
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            const originalText = buttonElement.textContent;
            buttonElement.textContent = 'Disalin!';
            setTimeout(() => { buttonElement.textContent = originalText; }, 2000);
        } catch (err) {
            console.error('Gagal menyalin', err);
        }
        document.body.removeChild(textArea);
    });
}

copyTagsBtn.addEventListener('click', () => {
    if (generatedTags.length === 0) return;
    const tagsString = generatedTags.map(t => t.tag).join(', ');
    copyToClipboard(tagsString, copyTagsBtn);
});

copyDescBtn.addEventListener('click', () => {
    if (!generatedDescription) return;
    copyToClipboard(generatedDescription, copyDescBtn);
});

openOptionsLink.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
});

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['geminiApiKey'], (result) => {
        if (result.geminiApiKey) {
            geminiApiKey = result.geminiApiKey;
        } else {
            apiKeyWarning.classList.remove('hidden');
            generateBtn.disabled = true;
        }
    });
});
