#!/bin/sh
# Ejecutar una vez tras clonar:  sh scripts/setup-git-guards.sh
git config core.hooksPath .githooks
chmod +x .githooks/*
echo "✅ Guardas activadas (pre-commit + pre-push)."
