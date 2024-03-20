from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:\\sqlite3\\db\\todo.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()

    @app.route('/')
    def hello_world():
        return 'Hello, World!'
    
    # Create a new task
    @app.route('/tasks', methods=['POST'])
    def create_task():
        data = request.get_json()
        new_task = Task(title=data['title'], description=data['description'], completed=False)
        db.session.add(new_task)
        db.session.commit()
        return jsonify({'message': 'Task created successfully', 'task': str(new_task)})
    
    # Get all tasks
    @app.route('/tasks', methods=['GET'])
    def get_tasks():
        tasks = Task.query.all()
        output = []
        for task in tasks:
            task_data = {'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed}
            output.append(task_data)
        return jsonify({'tasks': output}), 200
    
    # Get task by ID
    @app.route('/tasks/<id>', methods=['GET'])
    def get_task(id):
        task = Task.query.get_or_404(id)
        return jsonify({'task': {'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed}}), 200
    
    # Update task by ID
    @app.route('/tasks/<id>', methods=['PUT'])
    def update_task(id):
        task = Task.query.get_or_404(id)
        data = request.get_json()
        task.title = data.get('title', task.title)
        task.description = data.get('description', task.description)
        task.completed = data.get('completed', task.completed)
        db.session.commit()
        return jsonify({'message': 'Task updated successfully', 'task': str(task)}), 200
    
    # Delete task by ID
    @app.route('/tasks/<id>', methods=['DELETE'])
    def delete_task(id):
        task = Task.query.get_or_404(id)
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': 'Task deleted successfully'}), 204
       

    return app

db = SQLAlchemy()

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(100), nullable=True)
    completed = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Task {self.title}>'

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
