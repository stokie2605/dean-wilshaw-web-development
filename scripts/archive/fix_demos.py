with open("src/pages/DemosPage.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("engine.accentColor", "engine.accent")
text = text.replace("engine.engineLabel", "engine.badge")

with open("src/pages/DemosPage.tsx", "w", encoding="utf-8") as f:
    f.write(text)
print("done")
