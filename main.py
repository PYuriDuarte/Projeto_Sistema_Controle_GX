from functools import partial
from http.server import HTTPServer, SimpleHTTPRequestHandler

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

if __name__ == "__main__":
    handler = partial(NoCacheHandler, directory=r"E:/Projetos/Projeto_Controle_Chamados")
    HTTPServer(("0.0.0.0", 5501), handler).serve_forever()