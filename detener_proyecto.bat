@echo off
chcp 65001 >nul
echo ========================================================
echo   DETENIENDO SISTEMA DE GESTION DE BARBERIA
echo ========================================================

echo Deteniendo microservicios Java...
taskkill /f /im java.exe 2>nul
taskkill /f /im javaw.exe 2>nul

echo Deteniendo MariaDB...
taskkill /f /im mysqld.exe 2>nul

echo ========================================================
echo   Todos los servicios han sido detenidos.
echo ========================================================
pause
