export const COURSES = {
  python: {
    title: "Python: Operational Security & Scripting",
    description: "Master Python for security automation, payload development, and data extraction.",
    levels: [
      {
        id: 'beginner',
        name: 'Infiltration 101',
        lessons: [
          {
            id: 'py-01',
            title: "Hello World Payload",
            theory: "Every hacker starts somewhere. In Python, the print() function allows you to output data to the terminal. Execute a script that exactly logs 'System Intrusions Detected' to the console.",
            initialCode: "# Write your payload below\n",
            expectedOutput: "System Intrusions Detected",
            xpReward: 50
          },
          {
            id: 'py-02',
            title: "Variable Extraction",
            theory: "Variables are containers for storing data. Use a variable named 'target' with the value 'mainframe' and print it to reveal the target node.",
            initialCode: "# Define 'target' and print it\n",
            expectedOutput: "mainframe",
            xpReward: 75
          }
        ]
      },
      {
        id: 'intermediate',
        name: 'Mesh Network Analysis',
        lessons: [
          {
            id: 'py-03',
            title: "Looping Through Ports",
            theory: "Loops are essential for scanning. Create a for loop that iterates from 1 to 5 and prints each number to simulate a port scan.",
            initialCode: "# Loop from 1 to 5\n",
            expectedOutput: "1\n2\n3\n4\n5",
            xpReward: 150
          },
          {
            id: 'py-04',
            title: "Conditional Access",
            theory: "If-statements allow for decision making. Print 'ACCESS_GRANTED' if the variable 'key' is equal to 123.",
            initialCode: "key = 123\n# Check key and print result\n",
            expectedOutput: "ACCESS_GRANTED",
            xpReward: 200
          }
        ]
      },
      {
        id: 'advanced',
        name: 'Kernel Overload',
        lessons: [
          {
            id: 'py-05',
            title: "Dictionary Extraction",
            theory: "Dictionaries store key-value pairs. Create a dictionary named 'creds' with a key 'root' and value 'pass123', then print the value of 'root'.",
            initialCode: "# Define 'creds' and print value for 'root'\n",
            expectedOutput: "pass123",
            xpReward: 300
          }
        ]
      }
    ]
  },
  javascript: {
    title: "JavaScript: Web Exploitation",
    description: "Learn JS for XSS research, frontend manipulation, and Node.js security.",
    levels: [
      {
        id: 'beginner',
        name: 'Client-Side Breach',
        lessons: [
          {
            id: 'js-01',
            title: "Console Logging",
            theory: "The console.log() function is your eyes in the browser. Print 'Access Granted' to the console.",
            initialCode: "// Log 'Access Granted'\n",
            expectedOutput: "Access Granted",
            xpReward: 50
          }
        ]
      }
    ]
  },
  cpp: {
    title: "C++: Buffer Overflow & Low-Level Kernels",
    description: "Master low-level programming for exploit development and firmware research.",
    levels: [
      {
        id: 'beginner',
        name: 'System Assembly',
        lessons: [
          {
            id: 'cpp-01',
            title: "Basic I/O",
            theory: "In C++, std::cout is used for output. Print 'Kernel Loaded' to the system stream.",
            initialCode: "#include <iostream>\nint main() {\n  // Print 'Kernel Loaded'\n  return 0;\n}\n",
            expectedOutput: "Kernel Loaded",
            xpReward: 100
          }
        ]
      }
    ]
  },
  ruby: {
    title: "Ruby: Exploit Payload Crafting",
    description: "The language of Metasploit. Build powerful scripts for rapid exploitation.",
    levels: [
      {
        id: 'beginner',
        name: 'Gem Infiltration',
        lessons: [
          {
            id: 'rb-01',
            title: "Puts Method",
            theory: "In Ruby, 'puts' outputs a string with a newline. Print 'Gem Detected'.",
            initialCode: "# Print 'Gem Detected'\n",
            expectedOutput: "Gem Detected",
            xpReward: 50
          }
        ]
      }
    ]
  },
  php: {
    title: "PHP: Server-Side Vulnerabilities",
    description: "Master the backend language of the web to find and fix SQLi and LFI.",
    levels: [
      {
        id: 'beginner',
        name: 'Server Infiltration',
        lessons: [
          {
            id: 'php-01',
            title: "Echo Output",
            theory: "PHP uses 'echo' to send data to the browser. Print 'Server Online'.",
            initialCode: "<?php\n// Print 'Server Online'\n",
            expectedOutput: "Server Online",
            xpReward: 50
          }
        ]
      }
    ]
  }
};

export const getCourse = (id) => COURSES[id] || COURSES.python;
