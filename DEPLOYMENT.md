# Deploying CryptoVerse to Vercel

This guide will walk you through the process of deploying your CryptoVerse application to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (you can sign up at [vercel.com](https://vercel.com/))
- Git installed on your computer

## Step 1: Push Your Code to GitHub

1. Create a new repository on GitHub:
   - Go to [github.com/new](https://github.com/new)
   - Name your repository (e.g., "cryptoverse")
   - Choose whether to make it public or private
   - Click "Create repository"

2. Initialize Git in your project (if not already done):
   ```bash
   git init
   ```

3. Add all files to Git:
   ```bash
   git add .
   ```

4. Commit your changes:
   ```bash
   git commit -m "Initial commit for Vercel deployment"
   ```

5. Link your local repository to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

6. Push your code to GitHub:
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

1. Sign in to Vercel:
   - Go to [vercel.com](https://vercel.com/)
   - Sign in with your GitHub account or create a new account

2. Import your GitHub repository:
   - Click "Add New..." and select "Project"
   - Connect your GitHub account if not already connected
   - Select the repository you just created
   - Click "Import"

3. Configure your project:
   - Vercel will automatically detect that it's a Next.js project
   - The default settings should work fine for most cases
   - You can customize the project name if you want
   - Click "Deploy"

4. Wait for the deployment to complete:
   - Vercel will build and deploy your application
   - This usually takes a few minutes

5. Access your deployed application:
   - Once the deployment is complete, Vercel will provide you with a URL
   - Click on the URL to view your deployed application

## Step 3: Set Up Custom Domain (Optional)

If you want to use a custom domain for your application:

1. Go to your project dashboard on Vercel
2. Click on "Settings" and then "Domains"
3. Add your domain and follow the instructions to set up DNS records

## Continuous Deployment

Vercel automatically sets up continuous deployment for your project. This means that whenever you push changes to your GitHub repository, Vercel will automatically rebuild and redeploy your application.

## Environment Variables (Optional)

If your application uses environment variables:

1. Go to your project dashboard on Vercel
2. Click on "Settings" and then "Environment Variables"
3. Add your environment variables and click "Save"

## Troubleshooting

If you encounter any issues during deployment:

1. Check the build logs on Vercel for error messages
2. Make sure your project builds locally with `npm run build`
3. Verify that your `next.config.js` file is correctly configured
4. Check that all dependencies are correctly listed in your `package.json` file

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Documentation](https://docs.github.com/en) 