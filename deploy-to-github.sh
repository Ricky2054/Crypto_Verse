#!/bin/bash

# Initialize git repository if not already initialized
if [ ! -d .git ]; then
  git init
  echo "Git repository initialized."
else
  echo "Git repository already exists."
fi

# Add all files to git
git add .
echo "Files added to git."

# Commit changes
git commit -m "Initial commit for Vercel deployment"
echo "Changes committed."

# Instructions for connecting to GitHub
echo ""
echo "=== NEXT STEPS ==="
echo "1. Create a new repository on GitHub (https://github.com/new)"
echo "2. Run the following commands to push your code to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Then go to Vercel (https://vercel.com/) and import your GitHub repository"
echo "4. Follow the Vercel deployment steps"
echo ""
echo "Happy deploying!" 