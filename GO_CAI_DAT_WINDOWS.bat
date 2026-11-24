@echo off
title Antigravity Custom Theme Pro - Go Cai Dat (Windows)
set "INSTALLED_SCRIPT=%USERPROFILE%\.gemini\config\skills\antigravity-custom-theme\scripts\uninstall.js"
if exist "%INSTALLED_SCRIPT%" (
    node "%INSTALLED_SCRIPT%"
) else (
    node "%~dp0antigravity-custom-theme\scripts\uninstall.js"
)
echo.
echo [INFO] Muon xoa hoan toan thu muc skill, ban co the xoa:
echo        %USERPROFILE%\.gemini\config\skills\antigravity-custom-theme
echo.
pause
