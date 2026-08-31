import os
import re

def clean_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Generic hyphen removals (be careful not to break HTML/Tailwind classes)
    # We'll specifically target the exact phrases seen.
    replacements = {
        "High-urgency": "High urgency",
        "tap-to-call": "tap to call",
        "sub-minute": "sub minute",
        "Plug-and-play": "Plug and play",
        "Plug & Play": "Ready to install",
        "Data-dense": "Data dense",
        "full-bleed": "full bleed",
        "High-ticket": "High ticket",
        "multi-page": "multi page",
        "multi-practice": "multi practice",
        "24/7 missed call": "24 hour missed call",
        "24/7 Web Triage": "24 hour Web Triage",
        "24/7 Voice to Quote": "24 hour Voice to Quote",
        "sub-second": "sub second",
        "sub-0.4s load speed": "instant load speed",
        "0.4s": "instant",
        "99/100 Lighthouse": "Instant loading",
        "100/100 Lighthouse performance": "instant loading",
        "zero plugin bloat, and full Schema JSON-LD markup": "no heavy plugins, and fully optimised for Google searches",
        "High-Performance React Build": "Hand Coded Build",
        "Final Core Web Vitals speed tests": "Final speed tests",
        "Stoke-on-Trent": "Stoke on Trent",
        "4-Step": "4 Step",
        "100/100 Mobile Lighthouse score, loads in under 0.5 seconds on any phone": "Instant loading speed on any mobile connection",
        "React + Vite, Tailwind CSS, Vercel Edge CDN": "Hand coded, fully custom build",
        "React 19 + Vite": "custom",
        "SEO Schema": "SEO strategy",
        "Local SEO schema": "Local SEO setup",
        "local SEO schema": "local SEO setup",
        "zero template bloat": "no template bloat"
    }

    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

files_to_clean = [
    "src/pages/PricingPage.tsx",
    "src/pages/ToolsPage.tsx",
    "src/pages/DemosPage.tsx",
    "src/components/PricingSection.tsx",
    "src/components/ProcessTimeline.tsx",
    "src/components/HeroSection.tsx",
    "src/components/ServicesBento.tsx",
    "src/components/AboutDeanSection.tsx",
    "src/components/InteractiveDemosSection.tsx",
    "src/components/AIToolkit.tsx"
]

for f in files_to_clean:
    if os.path.exists(f):
        clean_file(f)

print("done")
