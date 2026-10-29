$baseDir = "C:\Users\Usuario\Downloads\barberia-tarea-main (2)\barberia-tarea-main"
$services = @(
    @{ Name = "service-clientes"; Port = 8082 },
    @{ Name = "service-agendamiento"; Port = 8083 },
    @{ Name = "service-barberos"; Port = 8084 },
    @{ Name = "service-servicios"; Port = 8085 },
    @{ Name = "service-pagos"; Port = 8086 },
    @{ Name = "service-sucursales"; Port = 8087 },
    @{ Name = "service-resenas"; Port = 8088 },
    @{ Name = "service-promociones"; Port = 8089 },
    @{ Name = "service-inventario"; Port = 8090 },
    @{ Name = "service-empleados"; Port = 8091 },
    @{ Name = "api-gateway"; Port = 8081 }
)

foreach ($s in $services) {
    $name = $s.Name
    $port = $s.Port
    $conn = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    if (-not $conn) {
        $jar = (Get-ChildItem -Path "$baseDir\$name\target\*.jar" | Where-Object { $_.Name -notlike "*original*" }).FullName
        Write-Host "Iniciando $name en puerto $port..."
        Start-Process -FilePath "java" -ArgumentList "-Xmx256m", "-jar", "`"$jar`"" -WorkingDirectory "$baseDir\$name" -WindowStyle Minimized
        Start-Sleep -Seconds 1
    } else {
        Write-Host "$name ya está escuchando en puerto $port."
    }
}
