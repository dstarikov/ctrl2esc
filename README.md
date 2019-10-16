# ctrl2esc
Like [caps2esc](https://github.com/oblitum/caps2esc), but for Chrome OS.

## Usage
1. Set *Launcher* to *Control* in `chrome://settings/keyboard-overlay`
2. Enable the *Developer mode* switch in the top right of `chrome://extensions`
3. Press the *Load unpacked* button and select the `ctrl2esc` folder
4. Press *Input method* -> *Manage input methods* and select `ctrl2esc` in `chrome://settings/languages`
5. Enable *Show input options in the shelf*
6. Select `EN ctrl2esc` in the Chrome OS shelf, near the notifications

## Caveats
Custom IME's are not supported with Linux apps yet. Luckily, the ctrl2esc remapping functionality can be replicated in Linux using [xcape](https://github.com/alols/xcape) using the following command: `xcape -e 'Control_L=Escape'`.
This currently only works with X11 apps (no wayland support)
Please let me know if you find a way to remap this key in wayland!
