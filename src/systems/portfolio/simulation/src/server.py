import http.server
import socketserver
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from urllib.parse import parse_qs, urlparse

PORT = 5173
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Map routes to specific HTML files
        if self.path == '/' or self.path == '/index.html':
            self.path = '/index.html'
        elif self.path == '/fund-settings' or self.path == '/fund-settings/':
            self.path = '/fund-settings.html'
        elif self.path == '/portfolio-generation' or self.path == '/portfolio-generation/':
            self.path = '/portfolio-generation.html'
        elif self.path == '/fund-overview' or self.path == '/fund-overview/':
            self.path = '/fund-overview.html'
        elif self.path == '/gp-economics' or self.path == '/gp-economics/':
            self.path = '/gp-economics.html'
        elif self.path == '/lp-economics' or self.path == '/lp-economics/':
            self.path = '/lp-economics.html'
        
        # Disable caching
        self.send_response(200)
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        
        if self.path.endswith('.html'):
            self.send_header('Content-type', 'text/html')
        elif self.path.endswith('.css'):
            self.send_header('Content-type', 'text/css')
        elif self.path.endswith('.js'):
            self.send_header('Content-type', 'application/javascript')
        
        self.end_headers()
        
        # Read the file and send its contents
        try:
            with open(os.curdir + self.path, 'rb') as file:
                self.wfile.write(file.read())
        except FileNotFoundError:
            self.send_error(404, 'File not found')
        
        return

    def do_POST(self):
        # Handle API requests
        if self.path.startswith('/api/'):
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Mock API responses
            response = {'success': True}
            
            if self.path == '/api/fund':
                response['fund'] = data
            elif self.path == '/api/portfolio/generate':
                response['portfolio'] = {
                    'num_loans': 400,
                    'total_loan_amount': 100000000,
                    'avg_loan_size': 250000,
                    'avg_ltv': 0.5
                }
            
            # Send response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))
            return

# Change directory to the directory containing this script
os.chdir(DIRECTORY)

# Create an HTTP server
handler = MyHttpRequestHandler
httpd = socketserver.TCPServer(("", PORT), handler)

print(f"Server started at http://localhost:{PORT}")
httpd.serve_forever()
