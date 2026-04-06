$targetPort = 4173

$lines = netstat -ano | Select-String ":$targetPort"
$targetPids = @()

foreach ($line in $lines) {
    $parts = ($line.ToString() -split '\s+') | Where-Object { $_ -ne '' }

    if ($parts.Length -ge 5 -and $parts[0] -eq 'TCP' -and $parts[1] -like "127.0.0.1:$targetPort" -and $parts[3] -eq 'LISTENING') {
        $targetPids += [int]$parts[4]
    }
}

$targetPids = $targetPids | Select-Object -Unique

if (-not $targetPids) {
    Write-Host "Aucun serveur local detecte sur le port $targetPort."
    exit 0
}

foreach ($targetPid in $targetPids) {
    Stop-Process -Id $targetPid -Force -ErrorAction SilentlyContinue
    Write-Host "Serveur local arrete pour le processus $targetPid."
}

Start-Sleep -Seconds 1
Write-Host "Verification terminee."
