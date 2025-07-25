# Photos Directory

This directory contains all the photography portfolio images.

## Folder Structure
```
public/photos/
├── nature/                    # Nature photography
├── travel/                    # Travel photography (organized by continent/country)
│   ├── europe/
│   │   ├── france/
│   │   ├── italy/
│   │   ├── spain/
│   │   └── uk/
│   ├── asia/
│   │   ├── japan/
│   │   ├── thailand/
│   │   ├── india/
│   │   └── singapore/
│   ├── north-america/
│   │   ├── usa/
│   │   ├── canada/
│   │   ├── mexico/
│   │   └── costa-rica/
│   └── africa/
│       ├── morocco/
│       ├── south-africa/
│       ├── kenya/
│       └── egypt/
├── street/                    # Street photography
├── architecture/              # Architecture photography
├── cars/                      # Car photography
├── featured/                  # Featured carousel images
└── profile/                   # Profile and about page images
```

## Image Guidelines
- **Format**: JPG or PNG
- **Size**: Recommended under 500KB for web performance
- **Dimensions**: Various sizes work (the layout adapts)
- **Naming**: Use descriptive names like `golden-hour-mountain.jpg`

## How to Add Photos
1. Create subfolders for each category
2. Add your photos to the appropriate folders
3. Update the photo URLs in the code to match your filenames
4. Update titles, locations, and other metadata

## Example
If you add `travel/asia/india/taj-mahal.jpg`, update the code:
```typescript
{
  url: '/photos/travel/asia/india/taj-mahal.jpg',
  title: 'Taj Mahal',
  location: 'Agra, India'
}
```