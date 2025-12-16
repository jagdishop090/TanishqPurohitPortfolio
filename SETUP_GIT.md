# Git Setup Instructions

## Step 1: Install Git

1. Download Git for Windows from: **https://git-scm.com/download/win**
2. Run the installer and follow the setup wizard
3. **Important**: After installation, **close and reopen** your terminal/PowerShell

## Step 2: Verify Git Installation

Open PowerShell and run:
```powershell
git --version
```

You should see something like: `git version 2.x.x`

## Step 3: Initialize Git Repository

After Git is installed, run these commands in PowerShell (in this project directory):

```powershell
# Initialize git repository
git init

# Add remote repository
git remote add origin https://github.com/jagdishop090/TanishqPurohitPortfolio.git

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio website with all features"

# Set main branch
git branch -M main

# Push to GitHub (you'll be prompted for credentials)
git push -u origin main
```

## Step 4: Authentication

When pushing, you'll need to authenticate:

**Option A: Personal Access Token (Recommended)**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" > "Generate new token (classic)"
3. Give it a name like "Portfolio Push"
4. Select scope: **repo** (check the box)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When Git asks for password, paste the token instead

**Option B: GitHub Desktop (Easier)**
1. Download: https://desktop.github.com/
2. Sign in with your GitHub account
3. File > Add Local Repository
4. Select this folder
5. Click "Publish repository"

## Quick Setup Script

After installing Git, you can run the `push-to-github.ps1` script:
```powershell
.\push-to-github.ps1
```

---

**Note**: Make sure Git is installed and your terminal is restarted before running any git commands!

