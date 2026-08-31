import os
import re

def clean_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    replacements = {
        "24/7": "24 hour",
        "React + Vite": "custom",
        "single-page": "single page",
        "multi-tool": "multi tool",
        "Stoke on Trent - local": "Stoke on Trent, local",
        "Stoke-on-Trent - local": "Stoke on Trent, local"
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
