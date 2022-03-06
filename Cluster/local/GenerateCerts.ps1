$ErrorActionPreference = "Stop"

$rootCN = "CompediaRootCert"
$compediaCNs = "compedia.local", "localhost"
$identityCNs = "identity.compedia.local", "localhost"
$searchCNs = "search.compedia.local", "localhost"
$parserCNs = "parser.compedia.local", "localhost"
$webappCNs = "webapp.compedia.local", "localhost"

function Remove-RootCertificate {
    param (
        [string[]]$CertificateName
    )

    Get-ChildItem -Path Cert:\LocalMachine\My -Recurse
    | Where-Object { $_.Subject -eq "CN=$CertificateName" }
    | Remove-Item
}
function Remove-ChildCertificate {
    param (
        [string[]]$CertificateName
    )

    Get-ChildItem -Path Cert:\LocalMachine\My -Recurse
    | Where-Object { $_.Subject -eq ("CN={0}" -f $CertificateName[0]) }
    | Remove-Item
}

Remove-RootCertificate $rootCN
Remove-ChildCertificate  $compediaCNs
Remove-ChildCertificate  $identityCNs
Remove-ChildCertificate  $searchCNs
Remove-ChildCertificate  $parserCNs
Remove-ChildCertificate  $webappCNs

$testRootCA = New-SelfSignedCertificate -Subject $rootCN -KeyUsageProperty Sign -KeyUsage CertSign -CertStoreLocation Cert:\LocalMachine\My
$compediaCert = New-SelfSignedCertificate -DnsName $compediaCNs -Signer $testRootCA -CertStoreLocation Cert:\LocalMachine\My
$identityCert = New-SelfSignedCertificate -DnsName $identityCNs -Signer $testRootCA -CertStoreLocation Cert:\LocalMachine\My
$searchCert = New-SelfSignedCertificate -DnsName $searchCNs -Signer $testRootCA -CertStoreLocation Cert:\LocalMachine\My
$parserCert = New-SelfSignedCertificate -DnsName $parserCNs -Signer $testRootCA -CertStoreLocation Cert:\LocalMachine\My
$webappCert = New-SelfSignedCertificate -DnsName $webappCNs -Signer $testRootCA -CertStoreLocation Cert:\LocalMachine\My

# Export it for docker container to pick up later.
$password = ConvertTo-SecureString -String "password" -Force -AsPlainText

$rootCertPathPfx = "Certs"

New-Item -ItemType Directory -Path $rootCertPathPfx -Force | Out-Null

Export-PfxCertificate -Cert $testRootCA -FilePath "$rootCertPathPfx/root-cert.pfx" -Password $password | Out-Null
Export-PfxCertificate -Cert $compediaCert -FilePath "$rootCertPathPfx/compedia.local.pfx" -Password $password | Out-Null
Export-PfxCertificate -Cert $identityCert -FilePath "$rootCertPathPfx/identity.compedia.local.pfx" -Password $password | Out-Null
Export-PfxCertificate -Cert $searchCert -FilePath "$rootCertPathPfx/search.compedia.local.pfx" -Password $password | Out-Null
Export-PfxCertificate -Cert $parserCert -FilePath "$rootCertPathPfx/parser.compedia.local.pfx" -Password $password | Out-Null
Export-PfxCertificate -Cert $webappCert -FilePath "$rootCertPathPfx/web-app.compedia.local.pfx" -Password $password | Out-Null

# Convert to an unprotected crt + key format which nginx can understand
docker run --rm -v "${PSScriptRoot}:/work" -it nginx /work/convert.certificates.sh

# Export .cer to be converted to .crt to be trusted within each service Docker container.
$rootCertPathCer = "$rootCertPathPfx/root-cert.cer"
Export-Certificate -Cert $testRootCA -FilePath $rootCertPathCer -Type CERT | Out-Null

Import-Certificate -FilePath $rootCertPathCer -CertStoreLocation 'Cert:\LocalMachine\Root'
