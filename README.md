# Exhibition Audio Guide

An interactive web-based audio guide application for exhibitions. This application provides a beautiful, modern interface for navigating through exhibition content with audio playback capabilities.

## Features

- **Landing Page**: Welcome screen with call-to-action
- **Introduction Page**: Overview of the exhibition guide
- **Index Page**: Interactive grid with 6 clickable sections
- **Six Content Pages**: Individual pages for each exhibition section with audio playback support
- **Smooth Navigation**: Seamless transitions between pages
- **Audio Controls**: Play/pause functionality for audio guides
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Keyboard Support**: ESC key for navigation

## Structure

- `index.html` - Main HTML file with all pages
- `styles.css` - Modern, responsive styling
- `script.js` - Navigation and audio functionality

## Getting Started

1. Open `index.html` in a web browser
2. Navigate through the pages using the buttons
3. Click on any of the 6 sections in the index to view detailed content
4. Use the audio buttons to play/pause audio guides (audio files need to be added)

## Adding Audio Files

To enable audio playback, add audio files (MP3 format recommended) and update the `<audio>` tags in `index.html`:

```html
<audio id="audio1" preload="none">
    <source src="audio/section1.mp3" type="audio/mpeg">
</audio>
```

Repeat for audio2 through audio6, updating the source paths accordingly.

## Browser Support

Works in all modern browsers that support:
- CSS Grid and Flexbox
- HTML5 Audio API
- ES6 JavaScript

## Customization

- Update content in `index.html` to match your exhibition
- Modify colors in `styles.css` to match your brand
- Add your own audio files for each section
- Adjust page titles and descriptions as needed