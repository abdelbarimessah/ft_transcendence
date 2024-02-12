#!/bin/bash
osascript <<EOF
tell application "iTerm"
    tell current window
        create tab with default profile
        tell current session of current tab
            write text "cd ~/Desktop/ft_transcendence/frontend && npm i && npm run dev"
        end tell
    end tell
end tell
EOF
