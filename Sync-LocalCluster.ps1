# This cmdlet reloads the nginx configuration of the local cluster.
Function Register-Watcher {
    param ($folder)
    $filter = "*.*" #all files
    $watcher = New-Object IO.FileSystemWatcher $folder, $filter -Property @{ 
        IncludeSubdirectories = $false
        EnableRaisingEvents   = $true
    }

    $changeAction = [scriptblock]::Create('
        $path = $Event.SourceEventArgs.FullPath
        $name = $Event.SourceEventArgs.Name
        $changeType = $Event.SourceEventArgs.ChangeType
        $timeStamp = $Event.TimeGenerated
        Write-Host "The file $name was $changeType at $timeStamp, reloading nginx"
        Invoke-Expression "docker-compose restart reverse-proxy"
    ')

    @("Changed", "Created", "Deleted", "Renamed") | ForEach-Object { Register-ObjectEvent $Watcher -EventName $PSItem -Action $changeAction };
}

Register-Watcher "$pwd\Cluster\local\ReverseProxy\Configs"
