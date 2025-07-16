#!/bin/bash

# Exit if anything fails
set -e

echo "🔄 Applying EF migrations..."
dotnet ef database update

./generateClient.sh
