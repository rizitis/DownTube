#!/usr/bin/env node

import readline from 'readline';
import { exec } from 'child_process';

// Default configuration
let folderLocation = '/tmp'; // Default to /tmp if no path is provided.
let disableViaYtDlp = false; // Set to true to remove " (via yt-dlp)" from filenames.
let setToTrueToMoveChannelNameToEnd = false; // Set to true to move channel name to the end of the filename.

// Utility functions
const isSingleOrPlaylistVideo = (url) => url.includes("/watch?v=") || url.includes("/v/");
const isPlaylist = (url) => url.includes("&list=");
const isFullChannel = (url) => url.includes("/channel/") || url.includes("/@");

const ytDlpCommand = (url, mode, quality = '', downloadPath) => {
    let command = "yt-dlp ";
    let isSPV = isSingleOrPlaylistVideo(url);
    let isPL = isPlaylist(url);
    let isFullCH = isFullChannel(url);

    let outputFolder = downloadPath || folderLocation;
    if (isPL) {
        outputFolder += '/%(playlist)s';
    } else if (isFullCH) {
        outputFolder += '/%(uploader)s';
    }

    // Define output template
    let outputTemplate = `${outputFolder}/%(title)s (via yt-dlp).%(ext)s`;
    if (!isPL && !isFullCH) {
        outputTemplate = `${outputFolder}/%(uploader)s - %(title)s (via yt-dlp).%(ext)s`;
    }

    if (isPL || isFullCH) {
        command += isPL ? "--yes-playlist " : "";
        command += isFullCH ? "--download-archive channel_archive.txt " : ""; // Using an archive file to avoid re-downloads
    }

    switch (mode) {
        case 'audio':
            command += `--extract-audio --audio-format m4a --audio-quality 0 -o "${outputTemplate}" -f "bestaudio[ext=m4a]/bestaudio/bestvideo+bestaudio" "${url}"`;
            break;
        case 'video':
            let videoQuality = 'bestvideo+bestaudio';
            if (quality) {
                videoQuality = `bestvideo[height<=${quality}]+bestaudio/best`;
            }
            command += `-f "${videoQuality}" --merge-output-format mkv -o "${outputTemplate}" "${url}"`;
            break;
        case 'comments':
        case 'chat':
            command += `--write-${mode} -o "${outputTemplate}" "${url}"`;
            break;
    }

    // Remove channel-specific parts if not a full channel download
    if (!isFullCH) {
        command = command.replace(/--download-archive channel_archive\.txt /g, "");
    }

    if (disableViaYtDlp === true) {
        command = command.replace(" (via yt-dlp)", "");
    }

    if (setToTrueToMoveChannelNameToEnd === true) {
        command = command.replace("%(uploader)s - ", "");
        command = command.replace(".%(ext)s", " - %(uploader)s.%(ext)s");
    }

    // Execute the command directly in the terminal
    console.log("Executing the following yt-dlp command:\n" + command);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        console.log(`stdout:\n${stdout}`);
        console.log("\x1b[32mDownload completed successfully!\x1b[0m"); // Green success message

        // Pause for 3 seconds before exiting
        setTimeout(() => {
            console.log("Exiting in 3 seconds...");
        }, 3000);
    });
};

// CLI Interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter the folder location for downloads (leave empty for default: /tmp):\n> ", (inputFolder) => {
    const downloadPath = inputFolder || '/tmp';

    rl.question("Enter the YouTube URL:\n> ", (url) => {
        console.log("Select download mode:");
        console.log("1: Audio (m4a)");
        console.log("2: Video (Best)");
        console.log("3: Video (4K)");
        console.log("4: Video (1080p)");
        console.log("5: Video (720p)");
        console.log("6: Comments");
        console.log("7: Chat");

        rl.question("> ", (mode) => {
            switch (mode) {
                case '1':
                    ytDlpCommand(url, 'audio', '', downloadPath);
                    break;
                case '2':
                    ytDlpCommand(url, 'video', '', downloadPath);
                    break;
                case '3':
                    ytDlpCommand(url, 'video', '2160', downloadPath);
                    break;
                case '4':
                    ytDlpCommand(url, 'video', '1080', downloadPath);
                    break;
                case '5':
                    ytDlpCommand(url, 'video', '720', downloadPath);
                    break;
                case '6':
                    ytDlpCommand(url, 'comments', '', downloadPath);
                    break;
                case '7':
                    ytDlpCommand(url, 'chat', '', downloadPath);
                    break;
                default:
                    console.log("Invalid choice.");
            }
            rl.close();
        });
    });
});
