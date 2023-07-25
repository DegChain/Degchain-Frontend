#!/bin/bash

# Read the package.json file
json=$(cat package.json)

# Replace "se-2" with "certchain" using sed
new_json=$(echo "$json" | sed 's/se-2/certchain/g')

# Write the updated package.json file
echo "$new_json" > package.json
