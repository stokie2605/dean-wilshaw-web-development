import re

with open("src/pages/DemosPage.tsx", "r", encoding="utf-8") as f:
    content = f.read()

new_engines = """export const PORTFOLIO_ENGINES = [
  {
    id: "01",
    title: "Engine 01 / Emergency Dispatch Layout",
    badge: "Interactive Preview / Mobile First",
    accent: "#DC2626",
    defaultView: "mobile",
    description: "Built for emergency callouts and fast customer contact. Places direct phone calling and WhatsApp messaging right at the bottom of the screen.",
    tags: ["Direct Phone Link", "Instant Message Button", "Fixed Bottom Bar"],
    specs: {
      bestFor: "Emergency trades, breakdown recovery, and 24 hour repair services",
      keyFeatures: [
        "Fixed bottom calling bar for instant phone bookings",
        "Clear pricing breakdown with no hidden fees",
        "Live status notice showing active team availability"
      ],
      delivery: "Complete setup with your branding within 5 working days",
      ownership: "100 percent code ownership with zero monthly software fees"
    }
  },
  {
    id: "02",
    title: "Engine 02 / Commercial Tender Layout",
    badge: "Interactive Preview / Desktop First",
    accent: "#F59E0B",
    defaultView: "desktop",
    description: "Built for commercial contractors and plant hire firms quoting on large contracts and site operations.",
    tags: ["Tonnage Slider", "Safety Accreditations", "Spec Sheet Downloads"],
    specs: {
      bestFor: "Commercial contractors, heavy plant hire, and logistics firms",
      keyFeatures: [
        "Interactive tonnage slider for fast job estimates",
        "Safety accreditation showcase for quick vetting",
        "Direct download buttons for equipment spec sheets"
      ],
      delivery: "Complete setup with your branding within 7 working days",
      ownership: "100 percent code ownership with zero monthly software fees"
    }
  },
  {
    id: "03",
    title: "Engine 03 / Bespoke Portfolio Layout",
    badge: "Interactive Preview / Desktop First",
    accent: "#0F766E",
    defaultView: "desktop",
    description: "Built for bespoke craftsmen, architects, and high end interior studios who need a clean visual showcase of their work.",
    tags: ["Project Gallery", "Process Breakdown", "Direct Consultation Form"],
    specs: {
      bestFor: "Joinery studios, architects, bespoke builders, and designers",
      keyFeatures: [
        "Large project photo showcase with clean typography",
        "Step by step client process breakdown",
        "Simple consultation booking form"
      ],
      delivery: "Complete setup with your branding within 7 working days",
      ownership: "100 percent code ownership with zero monthly software fees"
    }
  },
  {
    id: "04",
    title: "Engine 04 / Professional Advisory Layout",
    badge: "Interactive Preview / Mobile First",
    accent: "#38BDF8",
    defaultView: "mobile",
    description: "Built for chartered surveyors, valuers, and property consultants requiring a clear fee guide and trust markers.",
    tags: ["Fee Calculator", "Compliance Badges", "Direct Enquiry Form"],
    specs: {
      bestFor: "Surveyors, property consultants, and advisory firms",
      keyFeatures: [
        "Interactive survey fee and timeline estimator",
        "Industry accreditation and insurance badges",
        "Direct instruction button for new client briefs"
      ],
      delivery: "Complete setup with your branding within 5 working days",
      ownership: "100 percent code ownership with zero monthly software fees"
    }
  },
  {
    id: "05",
    title: "Engine 05 / Systems & Lead Router Layout",
    badge: "Interactive Preview / Desktop First",
    accent: "#10B981",
    defaultView: "desktop",
    description: "Built for technology services, automation specialists, and businesses managing automated phone and lead capture pipelines.",
    tags: ["Live System Log", "Direct CRM Links", "Fast Lead Routing"],
    specs: {
      bestFor: "Automation consultants, tech providers, and system builders",
      keyFeatures: [
        "Interactive live simulation showing automated call routing",
        "Integration badges for standard CRM and payment tools",
        "Direct system booking and setup buttons"
      ],
      delivery: "Complete setup with your branding within 7 working days",
      ownership: "100 percent code ownership with zero monthly software fees"
    }
  },
  {
    id: "06",
    title: "Engine 06 / Vehicle Studio & Package Layout",
    badge: "Interactive Preview / Mobile First",
    accent: "#2563EB",
    defaultView: "mobile",
    description: "Built for vehicle detailing studios, surface protection labs, and trade specialists offering tiered packages.",
    tags: ["Tiered Packages", "Bay Availability", "WhatsApp Booking"],
    specs: {
      bestFor: "Detailing studios, surface protection, and specialist workshops",
      keyFeatures: [
        "Three tiered package comparison for easy package selection",
        "Live bay availability status bar",
        "One tap WhatsApp booking button"
      ],
      delivery: "Complete setup with your branding within 5 working days",
      ownership: "100 percent code ownership with zero monthly software fees"
    }
  }
];"""

content = re.sub(
    r"export const PORTFOLIO_ENGINES: EngineArchetype\[\] = \[.*?\n\];",
    new_engines,
    content,
    flags=re.DOTALL
)

with open("src/pages/DemosPage.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Updated DemosPage")
