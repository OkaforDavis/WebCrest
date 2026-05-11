import glob

files = glob.glob('*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    if 'floating-ui' not in content:
        old_script = '<script src="js/script.js"></script>'
        new_scripts = '<script src="https://cdn.jsdelivr.net/npm/@floating-ui/core@1.6.4"></script>\n  <script src="https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.7"></script>\n  <script src="js/script.js"></script>'
        content = content.replace(old_script, new_scripts)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated {f}")
