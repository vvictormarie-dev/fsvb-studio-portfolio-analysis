param(
    [switch]$Help
)

if ($Help) {
    Write-Host "Consultez docs/how-to/run-target-app.md pour la commande adaptee au stack detecte."
    exit 0
}

$targetPath = Join-Path $PSScriptRoot "..\\fsvb-studio-portfolio"
$resolvedTargetPath = Resolve-Path -Path $targetPath -ErrorAction SilentlyContinue

if (-not $resolvedTargetPath) {
    Write-Error "Application cible introuvable. Verifiez que le subtree a bien ete importe dans fsvb-studio-portfolio/."
    exit 1
}

Write-Host "Application cible detectee dans $resolvedTargetPath"
Write-Host "Lisez docs/how-to/run-target-app.md pour lancer la commande adaptee au projet."
