import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { WebLinksAddon } from "xterm-addon-web-links";

const TerminalComponent = () => {
  const terminalRef = useRef(null);

  useEffect(() => {
    const terminal = new Terminal({
      cursorBlink: true,
      rows: 20,
      cols: 80,
    });
    terminal.loadAddon(new WebLinksAddon());

    if (terminalRef.current) {
      terminal.open(terminalRef.current);

      terminal.writeln("Welcome to the CUBE monitor");
      terminal.writeln("Type 'help' for a list of commands");
      terminal.write("$ ");

      let inputBuffer = "";

      terminal.onData((data) => {
        if (data === "\r") {
          handleCommand(inputBuffer.trim());
          inputBuffer = "";
          terminal.write("\r\n$ ");
        } else if (data === "\u007F") {
          if (inputBuffer.length > 0) {
            inputBuffer = inputBuffer.slice(0, -1);
            terminal.write("\b \b");
          }
        } else {
          inputBuffer += data;
          terminal.write(data);
        }
      });

      const handleCommand = (command) => {
        switch (command) {
          case "help":
            terminal.writeln("\r\nAvailable commands:");
            terminal.writeln("  help - Show available commands");
            terminal.writeln("  date - Show the current date and time");
            terminal.writeln("  clear - Clear the terminal");
            terminal.writeln("  exit - Exit the monitor");
            break;
          case "date":
            terminal.writeln("\r\n" + new Date().toString());
            break;
          case "clear":
            terminal.clear();
            terminal.write("$ ");
            break;
          case "exit":
            terminal.writeln("\r\nExiting...");
            setTimeout(() => {
              terminal.dispose();
            }, 1000);
            break;
          default:
            terminal.writeln(`\r\nCommand not found: ${command}`);
            terminal.writeln("Type 'help' for a list of commands");
        }
      };

      return () => {
        terminal.dispose();
      };
    }
  }, []);

  return (
    <div
      ref={terminalRef}
      className="custom--monitor"
    />
  );
};

export default TerminalComponent;
