# Source: https://stackoverflow.com/a/62060315
# Generate self-signed certificate to be used by IdentityServer.
# When using localhost - API cannot see the IdentityServer from within the docker-compose'd network.
# You have to run this script as Administrator (open Powershell by right click -> Run as Administrator).

$ErrorActionPreference = "Stop"

$rootCN = "IdentityServerDockerDemoRootCert"
$identityCNs = "identity", "localhost"
$searchCNs = "search", "localhost"
$parserCNs = "parser", "localhost"
$webappCNs = "webapp", "localhost"

$alreadyExistingCertsRoot = Get-ChildItem -Path Cert:\LocalMachine\My -Recurse | Where-Object { $_.Subject -eq "CN=$rootCN" }
$alreadyExistingCertsIdentity = Get-ChildItem -Path Cert:\LocalMachine\My -Recurse | Where-Object { $_.Subject -eq ("CN={0}" -f $identityCNs[0]) }
$alreadyExistingCertsSearch = Get-ChildItem -Path Cert:\LocalMachine\My -Recurse | Where-Object { $_.Subject -eq ("CN={0}" -f $searchCNs[0]) }
$alreadyExistingCertsParser = Get-ChildItem -Path Cert:\LocalMachine\My -Recurse | Where-Object { $_.Subject -eq ("CN={0}" -f $parserCNs[0]) }
$alreadyExistingCertsWebapp = Get-ChildItem -Path Cert:\LocalMachine\My -Recurse | Where-Object { $_.Subject -eq ("CN={0}" -f $webappCNs[0]) }

if ($alreadyExistingCertsRoot.Count -eq 1) {
    Write-Output "Skipping creating Root CA certificate as it already exists."
    $testRootCA = [Microsoft.CertificateServices.Commands.Certificate] $alreadyExistingCertsRoot[0]
}
else {
    $testRootCA = New-SelfSignedCertificate -Subject $rootCN -KeyUsageProperty Sign -KeyUsage CertSign -CertStoreLocation Cert:\LocalMachine\My
}

if ($alreadyExistingCertsIdentity.Count -eq 1) {
    Write-Output "Skipping creating Identity Server certificate as it already exists."
    $identityCert = [Microsoft.CertificateServices.Commands.Certificate] $alreadyExistingCertsIdentity[0]
}
else {
    # Create a SAN cert for both identity-server and localhost.
    $identityCert = New-SelfSignedCertificate -DnsName $identityCNs -Signer $testRootCA -CertStoreLocation Cert:\LocalMachine\My
}

if ($alreadyExistingCertsSeach.Count -eq 1) {
    Write-Output "Skipping creating Search Service certificate as it already exists."
    $searchCert = [Microsoft.CertificateServices.Commands.Certificate] $alreadyExistingCertsSearch[0]
}
else {
    # Create a SAN cert for both search service and localhost.
    $searchCert = New-SelfSignedCertificate -DnsName $searchCNs -Signer $testRootCA -CertStoreLocation Cert:\LocalMachine\My
}

if ($alreadyExistingCertsParser.Count -eq 1) {
    Write-Output "Skipping creating Parser Service certificate as it already exists."
    $parserCert = [Microsoft.CertificateServices.Commands.Certificate] $alreadyExistingCertsParser[0]
}
else {
    # Create a SAN cert for both search service and localhost.
    $parserCert = New-SelfSignedCertificate -DnsName $parserCNs -Signer $testRootCA -CertStoreLocation Cert:\LocalMachine\My
}

if ($alreadyExistingCertsWebapp.Count -eq 1) {
    Write-Output "Skipping creating webapp certificate as it already exists."
    $webappCert = [Microsoft.CertificateServices.Commands.Certificate] $alreadyExistingCertsWebapp[0]
}
else {
    # Create a SAN cert for both webapp and localhost.
    $webappCert = New-SelfSignedCertificate -DnsName $webappCNs -Signer $testRootCA -CertStoreLocation Cert:\LocalMachine\My
}

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
    $store.AddRange($testRootCA)
}

$store.Close()