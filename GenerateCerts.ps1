# Source: https://stackoverflow.com/a/62060315
# Generate self-signed certificate to be used by IdentityServer.
# When using localhost - API cannot see the IdentityServer from within the docker-compose'd network.
# You have to run this script as Administrator (open Powershell by right click -> Run as Administrator).

$ErrorActionPreference = "Stop"

$rootCN = "CompediaRootCert"
$identityCNs = "identity", "localhost"
$searchCNs = "search", "localhost"
$parserCNs = "parser", "localhost"
$webappCNs = "webapp", "localhost"

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
Remove-ChildCertificate  $identityCNs
Remove-ChildCertificate  $searchCNs
Remove-ChildCertificate  $parserCNs
Remove-ChildCertificate  $webappCNs

$testRootCA = New-SelfSignedCertificate -Subject $rootCN -KeyUsageProperty Sign -KeyUsage CertSign -CertStoreLocation Cert:\LocalMachine\My
$identityCert = New-SelfSignedCertificate -DnsName $identityCNs -Signer $testRootCA -CertStoreLocation Cert:\LocalMachine\My
$searchCert = New-SelfSignedCertificate -DnsName $searchCNs -Signer $testRootCA -CertStoreLocation Cert:\LocalMachine\My
$parserCert = New-SelfSignedCertificate -DnsName $parserCNs -Signer $testRootCA -CertStoreLocation Cert:\LocalMachine\My
$webappCert = New-SelfSignedCertificate -DnsName $webappCNs -Signer $testRootCA -CertStoreLocation Cert:\LocalMachine\My

# Export it for docker container to pick up later.
$password = ConvertTo-SecureString -String "password" -Force -AsPlainText

$rootCertPathPfx = "Certs"

New-Item -ItemType Directory -Path $rootCertPathPfx -Force | Out-Null

Export-PfxCertificate -Cert $testRootCA -FilePath "$rootCertPathPfx/aspnetapp-root-cert.pfx" -Password $password | Out-Null
Export-PfxCertificate -Cert $identityCert -FilePath "$rootCertPathPfx/aspnetapp-identity.pfx" -Password $password | Out-Null
Export-PfxCertificate -Cert $searchCert -FilePath "$rootCertPathPfx/aspnetapp-search.pfx" -Password $password | Out-Null
Export-PfxCertificate -Cert $parserCert -FilePath "$rootCertPathPfx/aspnetapp-parser.pfx" -Password $password | Out-Null
Export-PfxCertificate -Cert $webappCert -FilePath "$rootCertPathPfx/aspnetapp-web-app.pfx" -Password $password | Out-Null

# Export .cer to be converted to .crt to be trusted within the Docker container.
$rootCertPathCer = "$rootCertPathPfx/aspnetapp-root-cert.cer"
Export-Certificate -Cert $testRootCA -FilePath $rootCertPathCer -Type CERT | Out-Null

# Trust it on your host machine.
$store = New-Object -TypeName System.Security.Cryptography.X509Certificates.X509Store "Root", "LocalMachine"
$store.Open("ReadWrite")

$rootCertAlreadyTrusted = ($store.Certificates | Where-Object { $_.Subject -eq "CN=$rootCN" } | Measure-Object).Count -eq 1

if ($rootCertAlreadyTrusted -eq $false) {
    Write-Output "Adding the root CA certificate to the trust store."
    $store.Add($testRootCA)
}

$store.Close()