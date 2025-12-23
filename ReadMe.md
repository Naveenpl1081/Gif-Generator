#  GIF Generator API (AWS Lambda + Giphy)

A **serverless GIF generator API** built using **TypeScript** and **AWS Lambda**.  
It fetches a GIF from **Giphy** based on a search prompt and returns the GIF as a **Base64-encoded image**.

---

##  Features

- Search GIFs using the **Giphy API**
- AWS Lambda–friendly (Proxy Integration ready)
- Returns binary GIF response (`image/gif`)
- Written in **TypeScript**
- Environment-based configuration
- Lightweight and fast

---

##  How It Works

1. Client sends a request with a `prompt`
2. Lambda calls the Giphy Search API
3. Fetches the first matching GIF
4. Converts GIF to Base64
5. Returns the GIF as an HTTP response

---

## Tech Stack

- Node.js
- TypeScript
- AWS Lambda
- Giphy API
- dotenv

---



