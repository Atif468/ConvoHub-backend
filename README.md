<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatApp Documentation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            color: #333;
        }

        header {
            background: #4CAF50;
            color: white;
            padding: 20px 10px;
            text-align: center;
        }

        header h1 {
            margin: 0;
            font-size: 2.5rem;
        }

        main {
            padding: 20px;
            max-width: 900px;
            margin: auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        h2 {
            color: #4CAF50;
            margin-top: 20px;
        }

        p {
            margin: 10px 0;
        }

        ul {
            margin: 10px 0;
            padding-left: 20px;
        }

        ul li {
            margin: 5px 0;
        }

        .btn {
            display: inline-block;
            background: #4CAF50;
            color: white;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
        }

        .btn:hover {
            background: #45a049;
        }

        code {
            background: #f4f4f9;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: "Courier New", Courier, monospace;
        }

        pre {
            background: #333;
            color: #fff;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }

        .screenshot {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 20px;
        }

        .screenshot img {
            width: 100%;
            max-width: 400px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        footer {
            text-align: center;
            margin-top: 20px;
            padding: 10px;
            background: #f4f4f9;
            color: #333;
        }
    </style>
</head>

<body>
    <header>
        <h1>ChatApp Documentation</h1>
        <p>Real-time communication made easy and seamless.</p>
    </header>
    <main>
        <h2>Features</h2>
        <ul>
            <li>Real-time Messaging with instant delivery.</li>
            <li>Online Users List to see who's available.</li>
            <li>Typing Indicator for better user experience.</li>
            <li>File and Code Snippet Sharing functionality.</li>
            <li>Responsive Design for both desktop and mobile devices.</li>
        </ul>

        <h2>Technologies Used</h2>
        <ul>
            <li><strong>Frontend:</strong> React.js, TailwindCSS, Aceternity UI</li>
            <li><strong>Backend:</strong> Node.js, Express.js, Socket.IO</li>
            <li><strong>Other:</strong> react-notification-badge</li>
        </ul>

        <h2>Installation and Setup</h2>
        <ol>
            <li><strong>Clone the Repository:</strong></li>
            <pre><code>git clone https://github.com/your-username/chatapp.git</code></pre>
            <li><strong>Install Dependencies:</strong></li>
            <pre><code>npm install</code></pre>
            <li><strong>Start Backend Server:</strong></li>
            <pre><code>cd backend && node server.js</code></pre>
            <li><strong>Start Frontend:</strong></li>
            <pre><code>cd frontend && npm start</code></pre>
            <li><strong>Open:</strong> <code>http://localhost:3000</code> in your browser.</li>
        </ol>

        <h2>Screenshots</h2>
        <div class="screenshot">
            <img src="screenshot1.png" alt="Desktop View">
            <img src="screenshot2.png" alt="Mobile View">
        </div>

        <h2>Future Improvements</h2>
        <ul>
            <li>Add user authentication for secure access.</li>
            <li>Implement persistent chat history.</li>
            <li>Introduce group chat functionality.</li>
        </ul>

        <h2>Contributing</h2>
        <p>We welcome contributions! Follow these steps:</p>
        <ol>
            <li>Fork the repository.</li>
            <li>Create a new branch: <code>git checkout -b feature-name</code></li>
            <li>Commit your changes: <code>git commit -m "Add feature"</code></li>
            <li>Push: <code>git push origin feature-name</code></li>
            <li>Open a Pull Request.</li>
        </ol>

        <h2>License</h2>
        <p>This project is licensed under the MIT License.</p>

        <h2>Contact</h2>
        <p>
            <strong>Author:</strong> Mohammad Atif Ansari<br>
            <strong>Email:</strong> <a href="mailto:your-email@example.com">your-email@example.com</a><br>
            <strong>GitHub:</strong> <a href="https://github.com/your-username" target="_blank">your-username</a>
        </p>
    </main>
    <footer>
        <p>&copy; 2024 ChatApp. All rights reserved.</p>
    </footer>
</body>

</html>
