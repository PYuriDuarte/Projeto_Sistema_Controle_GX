from flask import Flask, request, jsonify
import os
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as rotas

# Configurações
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'txt', 'csv', 'pdf'}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB

app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.errorhandler(413)
def request_entity_too_large(error):
    return jsonify({
        'error': f'Arquivo muito grande. O tamanho máximo permitido é {MAX_FILE_SIZE/1024/1024}MB'
    }), 413

@app.route('/api/upload', methods=['POST'])
def upload_file():
    # Verifica se o arquivo foi enviado
    if 'file' not in request.files:
        return jsonify({'error': 'Nenhum arquivo enviado'}), 400
    
    file = request.files['file']
    
    # Verifica se um arquivo foi selecionado
    if file.filename == '':
        return jsonify({'error': 'Nenhum arquivo selecionado'}), 400
    
    # Obtém os parâmetros do formulário
    server_path = request.form.get('serverPath')
    file_name = request.form.get('fileName')
    
    if not server_path or not file_name:
        return jsonify({'error': 'Caminho do servidor ou nome do arquivo não especificado'}), 400
    
    # Valida a extensão do arquivo
    if not allowed_file(file.filename):
        return jsonify({
            'error': 'Tipo de arquivo não permitido',
            'allowed_extensions': list(ALLOWED_EXTENSIONS)
        }), 400
    
    # Sanitiza o nome do arquivo
    file_name = secure_filename(file_name)
    
    try:
        # Cria o diretório se não existir
        os.makedirs(server_path, exist_ok=True)
        
        # Monta o caminho completo
        full_path = os.path.join(server_path, file_name)
        
        # Verifica se o arquivo já existe
        if os.path.exists(full_path):
            return jsonify({'error': 'Um arquivo com este nome já existe'}), 400
        
        # Salva o arquivo
        file.save(full_path)
        
        # Obtém informações do arquivo
        file_size = os.path.getsize(full_path)
        
        return jsonify({
            'success': True,
            'message': 'Arquivo salvo com sucesso',
            'path': full_path,
            'fileName': file_name,
            'originalName': file.filename,
            'size': file_size,
            'sizeMB': round(file_size / (1024 * 1024), 2)
        })
    except Exception as e:
        # Remove o arquivo se ocorrer algum erro durante o salvamento
        if 'full_path' in locals() and os.path.exists(full_path):
            os.remove(full_path)
        return jsonify({'error': f'Erro ao salvar o arquivo: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)