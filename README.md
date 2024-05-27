# NaturallyHued.com

## Overview

As part of a self-directed initiative, I've developed this project dedicated to exploring the world of natural dyes, leveraging the capabilities of OpenAI's GPT-3.5 and DALL-E 2. The content is dynamically generated, providing a comprehensive showcase of various dyes.

## Features

-   **Content Generation:** Utilizing GPT-3.5 and DALL-E 2, The user supplies the dye name and main color and the content is dynamically generated and stored in Google Firestore and Cloud.
-   **Editing Content** Admisistrators can directly edit any contant as well as provide revision instructions to the AI.
-   **Deployment:** The project is designed to be deployed on Netlify through GitHub.

-   **Data Storage:** Files are stored in Google Cloud, while data is managed in Firestore.

## Getting Started

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/your-username/natural-dye-showcase.git
    cd natural-dye-showcase
    ```

2. **Set Up Environment Variables:**
   Create a `.env` file based on the provided `env.example` with your OpenAI API key and Firebase service account key.

    ```env
    OPENAI_API_KEY=your_openai_api_key
    FIREBASE_SERVICE_ACCOUNT_KEY={
      "type": "service_account",
      "project_id": "your_project_id",
      "private_key_id": "your_private_key_id",
      "private_key": "your_private_key",
      "client_email": "your_client_email",
      "universe_domain": "googleapis.com"
    }
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

4. **Run Locally (Files and content still stored remotely):**

    ```bash
    npm run dev
    ```

## Project Structure

-   `/src`: Contains the source code for the project.
-   `/public`: Home and about page content.
-   `/copilot`: AI/CMS

---

Step into the enchanting world of natural dyes, a heritage passed down through generations.

**Note:** Brilliance and dad jokes are included wen you hire me!
