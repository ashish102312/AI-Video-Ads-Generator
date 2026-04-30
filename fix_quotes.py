import os
import re

root_dir = 'frontend/src'
# Match single or double quotes around the expression
pattern = re.compile(r"(['\"])\$\{import\.meta\.env\.VITE_API_URL \|\| \"http://localhost:5001\"\}(.*?)\1")

for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith(('.jsx', '.js', '.tsx', '.ts')):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
            
            # Replace with backticks
            new_content = pattern.sub(r"`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}\2`", content)
            
            if content != new_content:
                with open(path, 'w') as f:
                    f.write(new_content)
                print(f"Fixed: {path}")
