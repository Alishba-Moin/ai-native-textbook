import os
import yaml
import re

# Directory containing the original chapter specifications
CHAPTER_SPECS_DIR = "specs/1-ai-native-textbook/"
# Directory where Docusaurus loads its documentation files
DOCS_DIR = "docs/"

def slugify(text):
    text = re.sub(r'[\s_]+', '-', text).lower()
    text = re.sub(r'[^a-z0-9-]', '', text)
    return text

def ingest_chapter_spec(chapter_file_path: str):
    print(f"Processing chapter spec: {chapter_file_path}")

    with open(chapter_file_path, 'r', encoding='utf-8') as f:
        content_lines = f.readlines()

    frontmatter_str = ""
    body_content_lines = []
    in_frontmatter = False
    frontmatter_delimiter_count = 0

    for line in content_lines:
        if line.strip() == "---":
            frontmatter_delimiter_count += 1
            if frontmatter_delimiter_count == 1:
                in_frontmatter = True
            elif frontmatter_delimiter_count == 2:
                in_frontmatter = False
                continue # Skip the closing '---'

        if in_frontmatter and frontmatter_delimiter_count == 1:
            frontmatter_str += line
        elif frontmatter_delimiter_count == 2 or not in_frontmatter:
            body_content_lines.append(line)

    frontmatter = yaml.safe_load(frontmatter_str) if frontmatter_str else {}
    body_content = "".join(body_content_lines).strip()

    # Validate required fields as per chapter-metadata.json
    required_fields = ["id", "title", "week_number", "module_id", "original_language"]
    for field in required_fields:
        if field not in frontmatter:
            print(f"Error: Missing required frontmatter field '{field}' in {chapter_file_path}")
            return

    # Generate slug if not provided
    if "slug" not in frontmatter or not frontmatter["slug"]:
        frontmatter["slug"] = slugify(frontmatter["title"])

    # Ensure Docusaurus-specific frontmatter is correct
    docusaurus_frontmatter = {
        "id": frontmatter["id"],
        "title": frontmatter["title"],
        "sidebar_label": frontmatter["title"],
        "slug": frontmatter["slug"],
        "week_number": frontmatter["week_number"],
        "module_id": frontmatter["module_id"],
        "original_language": frontmatter["original_language"],
        **{k: v for k, v in frontmatter.items() if k not in required_fields and k != "slug"} # Include other fields
    }

    # Construct the MDX content
    mdx_content = f"---\n{yaml.dump(docusaurus_frontmatter, sort_keys=False)}---\n\n{body_content}"

    # Define output path
    output_filename = f"{frontmatter["slug"]}.mdx"
    output_file_path = os.path.join(DOCS_DIR, output_filename)

    os.makedirs(DOCS_DIR, exist_ok=True)
    with open(output_file_path, 'w', encoding='utf-8') as f:
        f.write(mdx_content)
    print(f"Successfully ingested {chapter_file_path} to {output_file_path}")

def main():
    print("Starting content ingestion process...")
    os.makedirs(DOCS_DIR, exist_ok=True)

    # Create a dummy chapter spec for testing if it doesn't exist
    dummy_chapter_dir = os.path.join(CHAPTER_SPECS_DIR, "chapter_specs")
    os.makedirs(dummy_chapter_dir, exist_ok=True)
    dummy_chapter_path = os.path.join(dummy_chapter_dir, "intro_to_robotics.md")
    if not os.path.exists(dummy_chapter_path):
        with open(dummy_chapter_path, 'w', encoding='utf-8') as f:
            f.write("---\nid: 123e4567-e89b-12d3-a456-426614174000\ntitle: Introduction to Robotics\nweek_number: 1\nmodule_id: 123e4567-e89b-12d3-a456-426614174001\noriginal_language: en\n---\n\n# Introduction to Robotics\n\nThis is a dummy chapter for testing content ingestion.\n")

    for file in os.listdir(dummy_chapter_dir):
        if file.endswith(".md") or file.endswith(".mdx"):
            ingest_chapter_spec(os.path.join(dummy_chapter_dir, file))
    print("Content ingestion process completed.")

if __name__ == "__main__":
    main()
