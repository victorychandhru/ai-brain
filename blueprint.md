# **App Name**: SRISHTI

## Core Features:

- Clean Chat UI: Render a clean, modern chat interface based on the specified layout: top navbar, left sidebar with navigation, scrollable main chat area, and input section.
- Core Chat Interaction: Allow users to type and send messages. Display user messages on the right and AI replies on the left within a scrollable chat interface.
- AI Response Simulation: Simulate AI responses with an indicator like 'Processing...' followed by a generated placeholder text, representing an AI model's output.
- Speech-to-Text Input Tool: Implement a mic button that, upon click, triggers a popup for real-time speech recognition, converting spoken words into text for the input box.
- File Attachment Display: Provide a file upload button allowing users to select files, displaying the selected file's name in the input area without actual server-side upload for the MVP.
- Message Action Buttons: For each AI reply, display interaction buttons: copy, like, dislike, share, play (for voice output), and regenerate response.
- Text-to-Speech Output Tool: Enable a 'Play' button for AI messages, utilizing text-to-speech to audibly read out the content of the AI's reply.
- User Session and Chat History Management: Manage user authentication state and display a history of chat sessions and projects in the sidebar, persisting data (e.g., using browser storage initially for MVP or later with a backend).

## Style Guidelines:

- Primary accent color: A deep, professional royal blue (#2A2AAD) to highlight interactive elements and branding, complementing the overall clean aesthetic. This contrasts well with the bright background.
- Background color: Pure white (#FFFFFF) for the main application canvas, creating a clean and minimalist environment as explicitly requested by the user.
- Accent color: A vibrant yet professional sky blue (#51B6F6) for secondary highlights and elements that require distinction, offering a refreshing contrast to the primary blue.
- Body and headline font: 'Inter' (sans-serif) for its high readability, neutral aesthetics, and modern, machined feel, aligning with the clean, corporate design akin to Apple or ChatGPT.
- All icons should follow a professional, minimalist outline style, ensuring no cartoonish elements are present, adhering to the corporate and clean design mandate.
- Implement a fixed top navbar (SRISHTI logo left, YUGA Foundation logo 'yuga.png' and text 'Powered by YUGA Foundation' right) and a fixed left sidebar (user/project info, chat history, profile options), framing a central, scrollable chat area. The input section remains at the bottom of the chat area.
- Subtle and fluid animations for transitions, message loading (e.g., 'Processing...'), and button feedback to enhance the user experience without being intrusive or distracting.