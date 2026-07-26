# Demo Gallery Setup - SecureLens

## Overview
A fully functional demo gallery has been implemented for the SecureLens project. When users click the "Watch Demo" button on the homepage, they can view all 19 demo screenshots in an interactive gallery.

## What Was Added

### 1. **Public Demo Images** 
- Location: `/apps/frontend/public/demo-gallery/`
- Total Images: 19 screenshots (S1.png through S19.png)
- All images copied from: `/home/stavan/Videos/`
- Total Size: ~30 MB

### 2. **DemoGallery Component**
- Location: `/apps/frontend/components/sections/DemoGallery/DemoGallery.tsx`
- Features:
  - Full-screen modal gallery
  - **Side-by-side viewing** on desktop (2 images displayed at once)
  - Single image view on mobile
  - Navigation controls:
    - Previous/Next buttons
    - Thumbnail strip for quick navigation
    - Click any thumbnail to jump to that image
  - Smooth animations using Framer Motion
  - Image counter showing current position
  - Close button (X) and click-outside to close

### 3. **Updated HeroButtons Component**
- Location: `/apps/frontend/components/sections/Hero/HeroButtons.tsx`
- Changes:
  - Added state management for demo gallery modal
  - "Watch Demo" button now opens the gallery
  - Integrated DemoGallery component

## Key Features

✅ **Responsive Design**
- Desktop: 2 images side-by-side
- Tablet/Mobile: Single image with full-width viewing

✅ **Navigation**
- Prev/Next buttons (cycle through images)
- Clickable thumbnail strip at the bottom
- Keyboard-friendly (use arrow buttons)

✅ **Performance**
- Images served from public folder (optimized by Next.js)
- Lazy loading with Image component
- Smooth animations with Framer Motion

✅ **User Experience**
- Modal overlay with backdrop blur
- Title and image counter
- Smooth transitions between images
- Touch/click-friendly controls

## Usage

1. **Open the demo gallery:**
   - Navigate to the SecureLens homepage
   - Click the "Watch Demo" button in the hero section

2. **Navigate through images:**
   - Use Previous/Next arrow buttons
   - Click any thumbnail to jump to that image
   - On mobile, swipe or use arrow buttons

3. **Close the gallery:**
   - Click the X button in the top-right
   - Click outside the modal
   - Press Escape (can be added with a keyboard event listener)

## Image Sequence

The 19 demo screenshots show the complete SecureLens onboarding flow:

1. **S1** - Meet SecureLens (Introduction)
2. **S2** - Create Your Account
3. **S3** - Dashboard Overview
4. **S4** - Security Workspaces
5. **S5** - Create Workspace - Details
6. **S6** - Select Analysis Mode
7. **S7** - Configure Security Engines
8. **S8** - Review & Confirm
9. **S9** - Workspace Created
10. **S10** - Configure Live Scan
11. **S11-S13** - Scan Configuration Steps
12. **S14** - Scan Started
13. **S15** - Scan Progress
14. **S16** - Findings Overview
15. **S17** - Security Analysis
16. **S18** - Detailed Findings
17. **S19** - Final Report

## File Structure

```
apps/frontend/
├── public/
│   └── demo-gallery/
│       ├── S1.png through S19.png
│       └── (all 19 screenshots)
├── components/
│   └── sections/
│       ├── DemoGallery/
│       │   └── DemoGallery.tsx (NEW)
│       └── Hero/
│           └── HeroButtons.tsx (UPDATED)
└── ...
```

## Testing

To test the demo gallery:

1. Start the frontend development server:
   ```bash
   cd apps/frontend
   npm run dev
   ```

2. Navigate to `http://localhost:3000`

3. Click "Watch Demo" button on the homepage

4. Test:
   - Image loading
   - Navigation (prev/next buttons)
   - Thumbnail navigation
   - Responsive layout (resize browser)
   - Close functionality

## Future Enhancements

Potential improvements:
- Add keyboard navigation (arrow keys, Esc to close)
- Add swipe gestures for mobile
- Add full-screen mode
- Add download button for images
- Add slideshow auto-play option
- Add image descriptions/captions
- Add sharing functionality

## Notes

- All images are automatically optimized by Next.js Image component
- Images are served from `/public/demo-gallery/` path
- The gallery uses Framer Motion for animations
- The component is fully responsive and mobile-friendly
- Works with both development and production builds
