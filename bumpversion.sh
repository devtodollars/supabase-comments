#!/bin/bash
set -e

VERSION=""

# Function to display usage
usage() {
  echo "Usage: $0 --version <version-number>"
  exit 1
}

# Manual parsing of arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --version) VERSION="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; usage ;;
    esac
    shift
done

# Check for mandatory version option
if [ -z "$VERSION" ]; then
    echo "--version argument is required."
    usage
fi

# Locate the project root directory
PROJECT_ROOT=$(git rev-parse --show-toplevel)

# Path to the manifest.json file
PACKAGEJSONPATH="$PROJECT_ROOT/package.json"
PACKAGELOCKPATH="$PROJECT_ROOT/package-lock.json"

# Check if manifest.json exists
if [ ! -f "$PACKAGEJSONPATH" ]; then
    echo "manifest.json does not exist at $PACKAGEJSONPATH"
    exit 1
fi

# Update the version in manifest.json
sed -i '' 's|\(.*"version"\): "\(.*\)",.*|\1: '"\"$VERSION\",|" $PACKAGEJSONPATH

# Update package-lock.json
npm install

# Commit the changes (optional)
git add "$PACKAGEJSONPATH" "$PACKAGELOCKPATH"
git commit -m "Update version to $VERSION" $PACKAGEJSONPATH

# git push changes
git push
git tag $VERSION
git push origin refs/tags/$VERSION

echo "Version updated to $VERSION in package.json and ran build command"
