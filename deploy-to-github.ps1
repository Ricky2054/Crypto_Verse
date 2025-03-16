# Initialize git repository if not already initialized
if (-not (Test-Path -Path ".git")) {
    git init
    Write-Host "Git repository initialized."
} else {
    Write-Host "Git repository already exists."
}

# Add all files to git
git add .
Write-Host "Files added to git."

# Commit changes
git commit -m "Initial commit for Vercel deployment"
Write-Host "Changes committed."

# Instructions for connecting to GitHub
Write-Host ""
Write-Host "=== NEXT STEPS ===" -ForegroundColor Green
Write-Host "1. Create a new repository on GitHub (https://github.com/new)"
Write-Host "2. Run the following commands to push your code to GitHub:"
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
Write-Host "   git branch -M main"
Write-Host "   git push -u origin main"
Write-Host ""
Write-Host "3. Then go to Vercel (https://vercel.com/) and import your GitHub repository"
Write-Host "4. Follow the Vercel deployment steps"
Write-Host ""
Write-Host "Happy deploying!" -ForegroundColor Green 