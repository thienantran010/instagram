#!/bin/bash

# Exit if anything fails
set -e

echo "🛠️ Building project and generating OpenAPI document..."
dotnet build

echo "📄 Generating Kiota client from OpenAPI..."
dotnet tool run kiota generate \
    --language typescript \
    --openapi ./obj/instagram.ApiService.json \
    --output ../instagram.Web/src/api

echo "✅ Kiota client generated!"
