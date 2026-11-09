@echo off
title EduAudit Pro - GitHub Deployment & Version Control
echo =========================================================================
echo    EduAudit Pro: GitHub Version Control & Automated Deployment
echo =========================================================================
echo.

:: Check if git remote origin is configured
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo [FIRST TIME SETUP]
    echo No GitHub remote repository is linked to this folder yet.
    echo.
    echo Please create a new EMPTY repository on GitHub (e.g., https://github.com/new).
    echo Then paste your repository URL below:
    echo (Example: https://github.com/your-username/teaching-file-quality.git)
    echo.
    set /p REPO_URL="Enter your GitHub Repository URL: "
    if "%REPO_URL%"=="" (
        echo [ERROR] No URL provided. Aborting.
        pause
        exit /b 1
    )
    git remote add origin %REPO_URL%
    echo Remote origin set to: %REPO_URL%
    echo.
)

:: Prompt for version/commit message
echo.
set /p COMMIT_MSG="Enter version update note (e.g., v1.1 - Added HOD and KLUST Logo): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG="Version update"

echo.
echo [1/3] Staging modified files...
git add .

echo.
echo [2/3] Creating commit: "%COMMIT_MSG%"...
git commit -m "%COMMIT_MSG%"

echo.
echo [3/3] Pushing to GitHub (main branch)...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo =========================================================================
    echo    SUCCESS! Changes pushed to GitHub!
    echo    GitHub Actions is now automatically building and deploying
    echo    your new version to GitHub Pages.
    echo =========================================================================
) else (
    echo.
    echo [NOTICE] If push failed due to authentication, please ensure you are
    echo logged into GitHub in your browser or Git Credential Manager.
)

echo.
pause
