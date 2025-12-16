# Deploy to GitHub Instructions

## Step 1: Install Git
If Git is not installed, download and install it from: https://git-scm.com/download/win

## Step 2: Initialize Git Repository
Open PowerShell or Command Prompt in this directory and run:

```bash
# Initialize git repository
git init

# Add remote repository
git remote add origin https://github.com/jagdishop090/TanishqPurohitPortfolio.git

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio website"

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: If you encounter authentication issues
You may need to use a Personal Access Token instead of password:
1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Generate a new token with `repo` permissions
3. Use the token as your password when pushing

## Alternative: Using GitHub Desktop
1. Download GitHub Desktop from: https://desktop.github.com/
2. Sign in with your GitHub account
3. File > Add Local Repository
4. Select this folder
5. Publish repository to GitHub

