# Exhibition Audio Guide

A modern, interactive web-based audio guide application for exhibitions.

## Features

- **Landing Page**: Welcoming entry point to the exhibition
- **Introduction**: Overview of the exhibition with instructions
- **Exhibition Index**: Interactive grid with 6 clickable exhibit options
- **6 Exhibit Pages**: Detailed pages for each exhibit with:
  - Audio player interface (ready for audio files)
  - Historical context and descriptions
  - Technical details and information
  - Navigation between exhibits

## How to Use

1. **Open the Application**: 
   - Open `index.html` in your web browser
   - Or use a local server (recommended): `python -m http.server 8000`

2. **Navigate the Exhibition**:
   - Start at the landing page
   - Click "Begin Your Journey" to see the introduction
   - Continue to the Exhibition Index
   - Click on any of the 6 exhibits to explore

3. **Audio Functionality**:
   - Each exhibit has an audio player interface
   - Click the play button (▶) to play audio descriptions
   - Note: Audio files need to be added to `/audio/` directory
   - Expected audio files:
     - `audio/introduction.mp3`
     - `audio/exhibit1.mp3` through `audio/exhibit6.mp3`

## File Structure

```
/workspace/
├── index.html                 # Landing page
├── introduction.html          # Introduction page
├── exhibition-index.html      # Index with 6 exhibit links
├── exhibit1.html             # Exhibit 1: The Starry Canvas
├── exhibit2.html             # Exhibit 2: Ancient Sculpture
├── exhibit3.html             # Exhibit 3: Portrait of Time
├── exhibit4.html             # Exhibit 4: Ceramic Heritage
├── exhibit5.html             # Exhibit 5: Modern Expression
├── exhibit6.html             # Exhibit 6: Historical Manuscript
├── styles.css                # Shared styling
├── audio-player.js           # Audio player functionality
└── README.md                 # This file
```

## Design Features

- **Modern UI**: Clean, gradient-based design with smooth animations
- **Responsive**: Works on desktop, tablet, and mobile devices
- **Accessible**: Keyboard navigation support and clear visual hierarchy
- **Interactive**: Hover effects, smooth transitions, and engaging animations

## Customization

### Adding Audio Files

1. Create an `audio` directory: `mkdir audio`
2. Add your MP3 files:
   - `introduction.mp3`
   - `exhibit1.mp3` through `exhibit6.mp3`

### Customizing Content

- Edit the HTML files to change exhibit titles, descriptions, and details
- Modify `styles.css` to adjust colors, fonts, and layout
- Update the CSS variables in `:root` for quick theme changes

### Color Theme

The application uses CSS variables for easy theming:

```css
--primary-color: #2c3e50;
--secondary-color: #3498db;
--accent-color: #e74c3c;
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript
- HTML5 Audio API

## Future Enhancements

- Add actual images for each exhibit
- Implement audio progress bars
- Add volume controls
- Create admin panel for content management
- Add multi-language support
- Implement QR code navigation for physical exhibitions

## License

See LICENSE file for details.
