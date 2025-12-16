# PowerShell script to push portfolio to GitHub
# Make sure Git is installed before running this script

Write-Host "Checking Git installation..." -ForegroundColor Yellow

# Check if Git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "After installation, restart PowerShell and run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host "Git is installed!" -ForegroundColor Green
Write-Host "`nInitializing repository..." -ForegroundColor Yellow

# Initialize git if not already initialized
if (-not (Test-Path .git)) {
    git init
    Write-Host "Repository initialized." -ForegroundColor Green
}

# Add remote (remove if exists, then add)
git remote remove origin 2>$null
git remote add origin https://github.com/jagdishop090/TanishqPurohitPortfolio.git
Write-Host "Remote repository added." -ForegroundColor Green

# Add all files
Write-Host "`nAdding files..." -ForegroundColor Yellow
git add .
Write-Host "Files added." -ForegroundColor Green

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host "`nCreating commit..." -ForegroundColor Yellow
    git commit -m "Initial commit: Portfolio website with all features"
    Write-Host "Commit created." -ForegroundColor Green
} else {
    Write-Host "`nNo changes to commit." -ForegroundColor Yellow
}

# Set main branch
git branch -M main

# Push to GitHub
Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
Write-Host "You may be prompted for your GitHub credentials." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSuccessfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Repository URL: https://github.com/jagdishop090/TanishqPurohitPortfolio" -ForegroundColor Cyan
} else {
    Write-Host "`nPush failed. Please check your credentials and try again." -ForegroundColor Red
    Write-Host "If you need to use a Personal Access Token:" -ForegroundColor Yellow
    Write-Host "1. Go to GitHub Settings > Developer settings > Personal access tokens" -ForegroundColor Yellow
    Write-Host "2. Generate a new token with 'repo' permissions" -ForegroundColor Yellow
    Write-Host "3. Use the token as your password when prompted" -ForegroundColor Yellow
}

