#!/bin/bash

# Define the file to store the repository URL
REPO_FILE=".git_repo_url"

# Function to prompt the user to confirm an action
confirm() {
    while true; do
        read -p "$1 [y/n]: " yn
        case $yn in
            [Yy]* ) return 0;;
            [Nn]* ) return 1;;
            * ) echo "Please answer yes or no.";;
        esac
    done
}

# Check if the repository URL is already stored
if [ -f "$REPO_FILE" ]; then
  # Read the stored repository URL
  STORED_REPO_URL=$(cat "$REPO_FILE")
  echo "Current GitHub repository URL: $STORED_REPO_URL"
  
  # Ask if the user wants to change the URL
  if confirm "Do you want to change the repository URL?"; then
    # Prompt the user to enter the new repository URL
    read -p "Enter the new GitHub repository URL: " REPO_URL
    NEW_URL=true
  else
    REPO_URL="$STORED_REPO_URL"  # Use the stored URL
    NEW_URL=false
  fi

else
  # If the repo URL file doesn't exist, prompt the user to enter it
  read -p "Enter the GitHub repository URL: " REPO_URL
  NEW_URL=true
fi

# Initialize the repository if not already initialized
if [ ! -d ".git" ]; then
  git init
  if [ $? -ne 0 ]; then
    echo "Failed to initialize Git repository. Aborting."
    exit 1
  fi
else
  echo "Git repository already initialized."
fi

# Create the main branch if it doesn't already exist
git branch -M main

# If the user chose to update the URL, or if it's the first time, add or update the remote repository
if $NEW_URL; then
  git remote | grep origin &>/dev/null
  if [ $? -ne 0 ]; then
    git remote add origin "$REPO_URL"
    if [ $? -ne 0 ]; then
      echo "Failed to add remote repository. Aborting."
      exit 1
    fi
  else
    echo "Remote origin already exists. Updating the remote URL."
    git remote set-url origin "$REPO_URL"
  fi

  # Save the new repository URL for future use
  echo "$REPO_URL" > "$REPO_FILE"
fi

# Ask for the commit message
read -p "Enter commit message: " COMMIT_MESSAGE

# Add all changes
git add .
if [ $? -ne 0 ]; then
  echo "Failed to add changes. Aborting."
  exit 1
fi

# Commit the changes
git commit -m "$COMMIT_MESSAGE"
if [ $? -ne 0 ]; then
  echo "Failed to commit changes. Aborting."
  exit 1
fi

# Push to the remote repository
git push -u origin main
if [ $? -ne 0 ]; then
  echo "Failed to push changes. Aborting."
  exit 1
fi

echo "Project successfully uploaded to GitHub!"
