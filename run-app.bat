@echo off
title EduAudit Pro 2026 - Teaching & Learning Quality Auditor
echo =========================================================================
echo    EduAudit Pro 2026: Teaching & Learning Quality Auditor
echo    Outcome-Based Education (OBE) Internal Quality Audit System
echo =========================================================================
echo.
echo Starting application server...
echo The app will open automatically in your web browser at http://localhost:3000
echo.
timeout /t 2 /nobreak >nul
start http://localhost:3000
cmd.exe /c "npm run dev"
pause
