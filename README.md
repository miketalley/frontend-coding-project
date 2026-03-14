## Frontend Take-Home Project: AI Research Assistant

This app utilizes the Gemini API to allow communication with the LLM via text input in the UI.

### To Setup

Create a `.env` file with the following: 
```
NEXT_PUBLIC_GEMINI_API_KEY=<key>
```
Gemini API Key can be generated at https://aistudio.google.com/app/api-keys

### To Run
```
npm i
npm run dev
open http://localhost:3000
```

### What I would do differently with more time
- Create an API endpoint to handle the logic for POSTing to the Gemini API
  - Cleaner environment variable use of `GEMINI_API_KEY` instead of `NEXT_PUBLIC_GEMINI_API_KEY`
- Split out AIResearchAssistant into separate components
- Better error handling
- Improve UI
  - Add icons
  - Replace loading indicator with icon
  - Add copy button to easily copy outputs