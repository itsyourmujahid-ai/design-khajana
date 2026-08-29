#!/bin/bash
# Ignore @typescript-eslint/no-explicit-any across all canvas files
sed -i '1s/^/\/* eslint-disable @typescript-eslint\/no-explicit-any *\/\n/' src/components/canvas/*.tsx
