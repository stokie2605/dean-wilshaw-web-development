import os
import sys
import subprocess

try:
    from dotenv import load_dotenv
    load_dotenv()  # Load variables from .env file before anything else
except ImportError:
    print("Error: The 'python-dotenv' package is not installed. Run: pip install python-dotenv")
    sys.exit(1)

try:
    from groq import Groq
except ImportError:
    print("Error: The 'groq' package is not installed. Run: pip install groq")
    sys.exit(1)

try:
    import pyperclip
except ImportError:
    print("Error: The 'pyperclip' package is not installed. Run: pip install pyperclip")
    sys.exit(1)

def get_latest_commit_message():
    try:
        # Run git command to get the latest commit message
        result = subprocess.run(
            ['git', 'log', '-1', '--pretty=%B'],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError:
        print("Error: Failed to retrieve git commit. Are you in a git repository?")
        sys.exit(1)
    except FileNotFoundError:
        print("Error: 'git' command not found. Ensure Git is installed and in your PATH.")
        sys.exit(1)

def main():
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        print("Error: GROQ_API_KEY environment variable is missing in your .env file.")
        sys.exit(1)

    commit_message = get_latest_commit_message()
    if not commit_message:
        print("Error: The latest commit message is empty.")
        sys.exit(1)

    print(f"Latest commit found: '{commit_message.splitlines()[0]}...'")
    print("Drafting LinkedIn update with Groq (Llama-3.3)...\n")

    client = Groq(api_key=api_key)

    system_instruction = (
        "Generate a brief, 2-sentence update suitable for LinkedIn based on the provided git commit message. "
        "Use plain English and a grounded, reliable tone. "
        "Avoid buzzwords, corporate jargon, or hype. "
        "Do not mention specific pricing, discounts, costs, or money."
    )

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": system_instruction,
                },
                {
                    "role": "user",
                    "content": commit_message,
                }
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.7,
        )
        
        linkedin_post = chat_completion.choices[0].message.content.strip()
        
        # Copy to clipboard
        pyperclip.copy(linkedin_post)
        
        print("---")
        print(linkedin_post)
        print("---")
        print("✅ Post copied to clipboard! Just press Ctrl+V on LinkedIn.")

    except Exception as e:
        print(f"Error generating content with Groq API: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
