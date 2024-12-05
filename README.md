# DownTube
*yt-dlp DownLoad Helper*

## Usage
From terminal: `node DownTube.mjs` <br>
[video](https://asciinema.org/a/kw6NET0XEbxDbcxIxt4e1Neim)


## Installation 
If you want to install it and run DownTube from your DE menu, run: `sudo bash install.sh` <br>
[video](https://www.youtube.com/watch?v=NMtOQq_aM2g)

## Uninstall
`sudo bash UNINSTALL-DOWNTUBE`


### THANKS
Thanks to [greasyfork.org](https://greasyfork.org/en/scripts/500374-generate-youtube-download-commands-for-yt-dlp-terminal/code) and ChatGPT for the code and idea.


---
Slackware users you have everything needed here to create your SlackBuild ;)
  - for Debian based disrtos your yt-dlp is bloked and not allowed to work as expected...
> yt-dlp: error: yt-dlp's self-update mechanism is disabled on Debian.
> Please update yt-dlp using apt(8).
> See https://packages.debian.org/sid/yt-dlp for the latest packaged version.
   
  - to solve this issue you must remove apt installed yt-dlp and install it from gihub in `/usr/local/bin`
```
sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp 
```
