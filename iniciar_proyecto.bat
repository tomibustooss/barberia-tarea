@echo off
chcp 65001 >nul
echo ========================================================
echo   INICIANDO PROYECTO SISTEMA DE GESTION DE BARBERIA
echo ========================================================

set BASE_DIR=%~dp0
cd /d "%BASE_DIR%"

echo [1/3] Verificando base de datos MariaDB...
netstat -ano | findstr :3306 >nul
if %errorlevel% neq 0 (
    echo Iniciando MariaDB en segundo plano...
    start "MariaDB" /min "%BASE_DIR%mariadb-10.11.2-winx64\bin\mysqld.exe" --defaults-file="%BASE_DIR%mariadb-10.11.2-winx64\data\my.ini" --console
    timeout /t 3 /nobreak >nul
) else (
    echo MariaDB ya esta en ejecucion en el puerto 3306.
)

echo [2/3] Levantando microservicios...
set SERVICES=service-clientes service-agendamiento service-barberos service-servicios service-pagos service-sucursales service-resenas service-promociones service-inventario service-empleados api-gateway

for %%s in (%SERVICES%) do (
    for /f "delims=" %%j in ('dir /b /s "%BASE_DIR%%%s\target\*.jar" 2^>nul ^| findstr /v "original"') do (
        echo   - Levantando %%s...
        start "%%s" /min java -Xmx256m -jar "%%j"
    )
    timeout /t 1 /nobreak >nul
)

echo [3/3] Abriendo interfaz en el navegador...
timeout /t 5 /nobreak >nul
start "" "http://localhost:8084/swagger-ui.html"
start "" "%BASE_DIR%index.html"

echo ========================================================
echo   ¡PROYECTO INICIADO CORRECTAMENTE!
echo   - Gateway y Swagger UI: http://localhost:8081/swagger-ui.html
echo   - Pagina Web: index.html
echo ========================================================
pause
