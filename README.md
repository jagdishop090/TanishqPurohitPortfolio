# Tanishq Purohit - Portfolio

An immersive, modern portfolio website showcasing the work of Tanishq Purohit - Designer, Software Developer, and Game Developer.

## Features

- 🎨 **Modern Design**: Light, premium design with neutral color scheme (#dadbd4 background)
- 🎭 **GSAP Stair Animation**: Smooth stair transition effect when switching between pages
- ✨ **Animated Header**: Modern header with hamburger menu for mobile
- 🌈 **Neon Lines**: Animated neon-colored curvy lines in hero section background
- 🎮 **Interactive Game**: 2D shooter platformer game in About section with mobile joystick controls
- 🖱️ **Custom Cursor**: Black custom cursor with smooth tracking
- 🎯 **Smooth Animations**: Framer Motion and GSAP powered animations throughout
- 📱 **Fully Responsive**: Mobile-optimized with hamburger menu and touch controls
- 🎨 **Skills Showcase**: Interactive progress bars for Design, Software Development, and Game Development
- 📂 **Projects Display**: Modern project cards with case study links

## Tech Stack

- React 18
- Framer Motion (animations)
- GSAP (stair transitions)
- Vite (build tool)
- CSS3 with custom animations
- Canvas API (game)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx            # Header with hamburger menu
│   ├── CustomCursor.jsx     # Custom black cursor
│   ├── NeonLines.jsx         # Animated neon background lines
│   ├── ShooterGame.jsx       # 2D platformer game
│   ├── StairTransition.jsx   # GSAP stair transition
│   └── DynamicBackground.jsx # Background component
├── pages/
│   ├── Home.jsx              # Landing page with hero section
│   ├── About.jsx             # About page with game
│   ├── Projects.jsx          # Projects showcase
│   ├── Skills.jsx            # Skills with progress bars
│   └── Contact.jsx           # Contact information
├── App.jsx                   # Main app component
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## Customization

### Colors

Edit the CSS variables in `src/index.css`:

```css
:root {
  --black: #000000;
  --white: #ffffff;
  --purple: #8b5cf6;
  --purple-dark: #6d28d9;
  --purple-light: #a78bfa;
}
```

### Content

Update the content in each page component:
- `src/pages/Home.jsx` - Landing page content
- `src/pages/About.jsx` - About section
- `src/pages/Projects.jsx` - Project listings
- `src/pages/Skills.jsx` - Skills and technologies
- `src/pages/Contact.jsx` - Contact information and form

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright (c) 2025 Tanishq Purohit

All rights reserved.

This software and associated documentation files (the "Software") are the 
exclusive property of Tanishq Purohit.

No part of this Software may be reproduced, distributed, or transmitted in 
any form or by any means, including photocopying, recording, or other 
electronic or mechanical methods, without the prior written permission 
of Tanishq Purohit, except in the case of brief quotations embodied in 
critical reviews and certain other noncommercial uses permitted by 
copyright law.

For permissions requests, please contact:
Email: tanishqpurohit1205@gmail.com

---

Built with ❤️ by Tanishq Purohit
