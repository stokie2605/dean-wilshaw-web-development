# -*- coding: utf-8 -*-
import os

def clean_file(path):
    if not os.path.exists(path):
        return
        
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    replacements = {
        "Low-Risk Entry Offer": "Low Risk Entry Offer",
        "24h Turnaround": "24 Hour Turnaround",
        "One-off payment": "One off payment",
        "£49/mo managed site care retainer": "£49 per month managed site care retainer",
        "Multi-tool integrations": "Multi tool integrations",
        "View Our Performance Prototypes &rarr;": "View Our Layout Showcases &rarr;",
        "View Our Performance Prototypes": "View Our Layout Showcases",
        "Real mobile speed benchmarks": "Honest mobile speed review",
        "Bespoke Architecture": "Built to your specification",
        "Turnkey Bundles": "Complete packages",
        "web widgets": "tools",
        "Dynamic Sliders": "visual pricing sliders",
        "analyse friction points": "find the problems stopping customers from calling",
        "3-minute video breakdown": "short video walkthrough",
        "vendor lock-in": "platform contracts",
        "multi page commercial portals": "custom commercial portals",
        "Live booking systems, payment flows, and CRM integrations": "Live booking systems and payment setups",
        
        "24 7 missed call text interceptors": "24 hour missed call text alerts",
        "'engine 0' + engine.id": "`engine-${engine.id}`",
        "Live Architecture Showcase": "Live Layout Showcase",
        "Six Proven Trade Layout Archetypes": "Six Proven Trade Website Layouts",
        "Hand coded website architectures": "Hand coded websites",
        "Request Custom Architecture": "Request a Custom Layout",
        "tap to call bars": "call buttons",
        
        "Smart Intake Form": "Smart Enquiry Form",
        "Telephony Voice Interceptor": "Missed Call Handler",
        "automatically texts instant price estimates.": "automatically sends a text with your pricing details.",
        "dispatch location": "job location",
        
        "4-Step Engineering Roadmap": "4 Step Build Process",
        "4 Step Engineering Roadmap": "4 Step Build Process",
        "Bespoke UX & Conversion Path": "Custom Design & Page Layout",
        "High-Performance": "Hand Coded Build",
        "SEO Audit & Live Handoff": "SEO Setup & Go Live",
        "3 - 5 Days": "3 to 5 Days",
        "7 - 10 Days": "7 to 10 Days",
        "1 - 2 Days": "1 to 2 Days",
        "Crafting high-converting visual page layouts": "Building clear page layouts",
        "frictionless quote forms": "simple quote forms",
        "phone tap to call CTAs": "phone call buttons",
        "Discovery & Local Strategy": "Initial Consultation",
        "Predictable Execution": "Clear Process",
        "Final Core Web Vitals speed tests": "Final speed tests",
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
    "src/components/DemoViewer.tsx"
]

for f in files_to_clean:
    clean_file(f)

print("done applying patches")
