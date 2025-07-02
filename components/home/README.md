# Home Page Configuration Guide

## 🚀 Adding New Sections

The home page is now **super easy to edit**! All the card configurations are in `home-config.ts`.

### Quick Start

1. **Open** `components/home/home-config.ts`
2. **Add** a new object to the `HOME_CARDS` array
3. **Save** - that's it! ✨

### Example: Adding a "Flashcards" Section

```typescript
// In home-config.ts, add to HOME_CARDS array:
{
  title: "Flashcards",
  description: "Review key concepts with interactive flashcards",
  href: "/flashcards",
  icon: BookOpen, // Import from lucide-react
  badge: {
    icon: Brain,
    text: "Memory Boost"
  }
}
```

### Configuration Properties

| Property | Type | Description |
|----------|------|-------------|
| `title` | string | Card title (displayed prominently) |
| `description` | string | Card description text |
| `href` | string | Route/URL to navigate to |
| `icon` | LucideIcon | Main icon for the card |
| `badge.icon` | LucideIcon | Small icon in the badge |
| `badge.text` | string | Text shown in the badge |

### Available Icons

Browse icons at: [https://lucide.dev/icons/](https://lucide.dev/icons/)

Popular choices:
- `BookOpen`, `Brain`, `Target`, `TrendingUp`
- `MessageSquare`, `Microscope`, `Calendar`
- `Users`, `Settings`, `Award`, `Lightbulb`

### Features

✅ **Automatic animations** - Each card gets staggered entrance animations  
✅ **Responsive layout** - Automatically adapts to screen size  
✅ **Consistent styling** - All cards follow the same design system  
✅ **TypeScript support** - Full type checking and IntelliSense  
✅ **Accessibility** - Proper ARIA labels and keyboard navigation  

### File Structure

```
components/home/
├── home-page.tsx      # Main component (rarely needs editing)
├── home-config.ts     # 👈 Edit this file to add sections
└── README.md          # This guide
```

### Tips

- Keep descriptions under 80 characters for best display
- Choose icons that relate to your content
- Test on mobile devices - cards stack vertically on small screens
- Use consistent badge text patterns (e.g., "5 Questions", "Interactive")

---

**That's it!** The component handles all the styling, animations, and layout automatically. Just focus on your content! 🎉 