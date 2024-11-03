VisionAI 

VisionAI is a web-based application enabling users to interact with a generative AI model, designed to provide conversational responses and process images. It offers a visually appealing and responsive user interface, including a sidebar for easy navigation.

# Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Components](#components)
  - [Sidebar Component](#sidebar-component)
- [Customization](#customization)
- [License](#license)

---

# Features

- Text Interaction: Users can submit text prompts and receive responses from the AI model.
- Predefined Prompts: Offers dynamically generated AI-based prompts for easy selection.
- Image Upload: Supports image upload (JPG, PNG, JPEG) for AI-based image analysis.
- Clipboard Copy: One-click copy for AI responses, with confirmation notification.
- Responsive Design: Optimized for both light and dark themes with a user-friendly sidebar layout.

# Installation

# Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn

# Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/vision-ai-frontend.git
   cd vision-ai-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. Run the application:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

4. Open in browser: Visit the application at `http://localhost:3000`.

# Environment Variables

Set up environment variables as follows:

1. Create a `.env.local` file in the root directory.
2. Add the API key:

   ```plaintext
   NEXT_PUBLIC_GEMINI_API_KEY=your_google_generative_ai_api_key
   ```

Replace `your_google_generative_ai_api_key` with your actual Google Generative AI API key.

# Usage

- Home Page: Displays a welcome message that fades after a few seconds.
- Predefined Prompts: Choose from dynamically generated prompts, or type your own query.
- Send Message: Type questions or requests in the input field and submit them.
- Image Upload: Click the paperclip icon to upload an image and receive text-based analysis.
- Copy Response: Click the copy icon to save responses to the clipboard.

# Components

# Sidebar Component

The `Sidebar` component is a collapsible menu that allows users to navigate different sections of the application and start the chatbot. Key functionalities include:

- Expand/Collapse: A button at the top toggles the sidebar width.
- Menu Items: Includes `Chatbot Başlat`, `Geçmiş`, `Hakkında`, and `Ayarlar` options, with icons from FontAwesome and HeroIcons.
- Chatbot Status: If the chatbot is started, a status message is displayed in the sidebar.
  
# Sidebar Properties

- isOpen: Controls the sidebar’s open/close state and width.
- isChatbotStarted: Tracks whether the chatbot has been started.
- sidebarWidth: Determines the width of the sidebar, toggling between `4rem` (closed) and `16rem` (open).

# Sidebar Usage Example

The `Sidebar` component can be integrated into any page component as follows:

```javascript
import Sidebar from './path/to/Sidebar';

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full">
        {/* Main content goes here */}
      </main>
    </div>
  );
}
```

# Customization

Adjustable elements include:

- Prompt Refresh Interval: Set to refresh every 10 seconds by default; modify this in the `useEffect` hook if desired.
- Animations: Customizable animations for welcome and interaction effects in the embedded CSS.

# Notes

- This application integrates with Google Generative AI (Gemini). Ensure the API key is active and authorized.
- Supported image file types are JPG, PNG, and JPEG.

# License

This project is licensed under the MIT License. See the `LICENSE` file for details.

This README provides a comprehensive guide for developers and users alike, covering all key functionalities and configuration options for the VisionAI project.