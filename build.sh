#!/bin/bash

# Stop the script if any command fails
set -e

# Navigate to frontend directory and build it
echo "Building frontend..."
cd client
npm install
npm run build

# Navigate back to root and install backend dependencies
echo "Installing backend dependencies..."
cd ..
cd server
npm install

echo "Build and installation complete."
