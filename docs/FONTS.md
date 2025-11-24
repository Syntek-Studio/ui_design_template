# Font Setup Guide

This library uses **Inter** for body text and **Poppins** for headings/display text. You need to install these fonts in your consuming projects.

## Web Project (React + Tailwind)

### Option 1: Google Fonts CDN (Easiest)

Add to your `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Option 2: Self-Host WOFF2/WOFF Files

1. Place font files in `public/fonts/`:
   ```
   public/fonts/
   ├── Inter-Regular.woff2
   ├── Inter-Regular.woff
   ├── Inter-Medium.woff2
   ├── Inter-Medium.woff
   ├── Poppins-Regular.woff2
   ├── Poppins-Regular.woff
   ├── Poppins-SemiBold.woff2
   └── Poppins-SemiBold.woff
   ```

2. Create `fonts.css`:
   ```css
   @font-face {
     font-family: 'Inter';
     src: url('/fonts/Inter-Regular.woff2') format('woff2'),
          url('/fonts/Inter-Regular.woff') format('woff');
     font-weight: 400;
     font-style: normal;
     font-display: swap;
   }

   @font-face {
     font-family: 'Inter';
     src: url('/fonts/Inter-Medium.woff2') format('woff2'),
          url('/fonts/Inter-Medium.woff') format('woff');
     font-weight: 500;
     font-style: normal;
     font-display: swap;
   }

   @font-face {
     font-family: 'Poppins';
     src: url('/fonts/Poppins-Regular.woff2') format('woff2'),
          url('/fonts/Poppins-Regular.woff') format('woff');
     font-weight: 400;
     font-style: normal;
     font-display: swap;
   }

   @font-face {
     font-family: 'Poppins';
     src: url('/fonts/Poppins-SemiBold.woff2') format('woff2'),
          url('/fonts/Poppins-SemiBold.woff') format('woff');
     font-weight: 600;
     font-style: normal;
     font-display: swap;
   }
   ```

3. Import in your app entry:
   ```tsx
   import './fonts.css'
   ```

## React Native Project

### Setup TTF Fonts

1. Create `assets/fonts/` directory:
   ```
   assets/fonts/
   ├── Inter-Regular.ttf
   ├── Inter-Medium.ttf
   ├── Inter-SemiBold.ttf
   ├── Inter-Bold.ttf
   ├── Poppins-Regular.ttf
   ├── Poppins-Medium.ttf
   ├── Poppins-SemiBold.ttf
   └── Poppins-Bold.ttf
   ```

2. Add to `react-native.config.js`:
   ```js
   module.exports = {
     project: {
       ios: {},
       android: {},
     },
     assets: ['./assets/fonts/'],
   }
   ```

3. Link fonts:
   ```bash
   npx react-native-asset
   ```

### For Expo Projects

1. Place fonts in `assets/fonts/` (TTF files)

2. Load fonts in `App.tsx`:
   ```tsx
   import * as Font from 'expo-font'
   import * as SplashScreen from 'expo-splash-screen'
   import { useEffect, useState } from 'react'

   SplashScreen.preventAutoHideAsync()

   export default function App() {
     const [fontsLoaded, setFontsLoaded] = useState(false)

     useEffect(() => {
       async function loadFonts() {
         await Font.loadAsync({
           'Inter': require('./assets/fonts/Inter-Regular.ttf'),
           'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
           'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
           'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
           'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
           'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
           'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
           'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
         })
         setFontsLoaded(true)
         await SplashScreen.hideAsync()
       }

       loadFonts()
     }, [])

     if (!fontsLoaded) {
       return null
     }

     return <YourApp />
   }
   ```

## Font Weights Mapping

### Inter
- 300: Light
- 400: Regular
- 500: Medium
- 600: SemiBold
- 700: Bold

### Poppins
- 400: Regular
- 500: Medium
- 600: SemiBold
- 700: Bold

## Where to Download Fonts

- **Inter**: https://fonts.google.com/specimen/Inter
- **Poppins**: https://fonts.google.com/specimen/Poppins
- **Montserrat** (if needed): https://fonts.google.com/specimen/Montserrat

### Download Instructions

1. Visit Google Fonts
2. Select the weights you need
3. For Web: Download as WOFF2/WOFF
4. For React Native: Download as TTF

Alternatively, use https://gwfh.mranftl.com/fonts for easy downloads with all formats.
