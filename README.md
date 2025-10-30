# lab8-ai-services
Comp 305, Fall 2025

## Overview
This lab extends the MVC chat from Lab 7 with a swappable AI Service Layer that can route messages to different providers local Eliza, Mock, or Google Gemini. 

## Setup Instructions

We reused the MVC setup from Lab 7:
- mode.js
- view.js
- controller.js
- index.html, style.css, and app.js

### New in Lab 8
1. **AI Service Layer**
   - A new `ai/` directory was added containing:
     - `AIService.js`: Base abstract class  
     - `ElizaService.js`: Local regex-based chatbot  
     - `MockService.js`: Simple mock for testing and debugging  
     - `GeminiService.js`: Connects to Google’s Gemini 2.5 Flash API 

2. **Provider Selection**
   - The controller was updated with a dropdown menu that lets users switch between the three AI providers.
   - The Gemini option prompts for an API key, which is saved to `localStorage`.

3. **Gemini Integration**
   - Implemented `fetch` calls to the Gemini endpoint:
     ```
     https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
     ```
   - Added error handling for invalid keys, network issues, and rate limits.

4. **Testing**
   - Playwright was added for end-to-end testing.
   - One test validates the Eliza service.
   - Another simulates AI interactions using a mock Gemini response.

5. **Deployment**
   - The finished app deployed on **Netlify**

## AI Service Comparison

**ElizaService:**  
A local, pattern matching chatbot built with predefined responses.  
Runs entirely offline and private. 

**MockService:**  
A local test implementation that returns a mock string.  
Used for debugging, predictable tests, and UI validation.  

**GeminiService:**  
Uses Google’s Gemini API for real AI-generated responses.  
Provides smarter, aware answers but requires an API key, internet access. 

## Privacy and Cost Discussion
**Privacy:**  
- Both Eliza and Mock run fully in the browser and never send user data over the internet. These are private and safe for offline use.  
- Gemini sends prompts to Google’s servers for processing. This introduces privacy concerns since data leaves the local environment. While the API key is stored locally, messages are sent to the cloud. This mirrors real tradeoffs between privacy and AI power.

**Cost:**  
- Eliza and Mock are completely free.  
- Gemini may include costs after the free credit limit in MakerSuite is reached. The API can enforce rate limits depending on usage. Developers must balance accuracy and cost when choosing a provider.

## Repository
LAB8-AI-SERVICES/
├── ai/
│ ├── AIService.js
│ ├── ElizaService.js
│ ├── GeminiService.js
│ └── MockService.js
│
├── js/
│ ├── controller.js
│ ├── eliza.js
│ ├── model.js
│ └── view.js
│
├── r-n-d/
│ ├── gemini/
│ ├── openai/
│ └── README.md
│
├── tests/
│ ├── Eliza.spec.js
│ └── mock.spec.js
│
├── test-results/
│
├── .gitignore
├── app.js
├── index.html
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── styles.css

## License
This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) for
details.

## Author 
William Sampson