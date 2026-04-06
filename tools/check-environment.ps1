$checks = @(
    @{ Name = "git"; Command = "git"; Args = @("--version") },
    @{ Name = "node"; Command = "node"; Args = @("--version") },
    @{ Name = "npm"; Command = "npm"; Args = @("--version") }
)

Write-Host "Verification de l'environnement local`n"

foreach ($check in $checks) {
    try {
        $output = & $check.Command @($check.Args) 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host ("[OK] {0}: {1}" -f $check.Name, ($output | Select-Object -First 1))
        }
        else {
            Write-Host ("[A verifier] {0}: commande presente mais retour non confirme" -f $check.Name)
        }
    }
    catch {
        Write-Host ("[Manquant] {0}: non detecte sur ce poste" -f $check.Name)
    }
}

Write-Host "`nConseil : completez ensuite le guide docs/how-to/run-target-app.md selon le stack confirme."
