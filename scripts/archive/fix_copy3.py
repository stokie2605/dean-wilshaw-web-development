import os

def clean_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    replacements = {
        "Zero-friction": "Zero friction",
        "1-tap": "1 tap",
        "self-serve": "self serve"
    }

    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

files_to_clean = [
    "src/pages/ToolsPage.tsx"
]

for f in files_to_clean:
    if os.path.exists(f):
        clean_file(f)

print("done")
