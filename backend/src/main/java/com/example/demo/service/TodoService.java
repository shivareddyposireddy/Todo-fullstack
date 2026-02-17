package com.example.demo.service;

import com.example.demo.model.Todo;
import com.example.demo.repository.Todorepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TodoService {

    private final Todorepository repository;

    public TodoService(Todorepository repository) {
        this.repository = repository;
    }

    public Todo create(Todo todo) {
        return repository.save(todo);
    }

    public List<Todo> getAll(Boolean completed) {
        if (completed != null) {
            return repository.findByCompleted(completed);
        }
        return repository.findAll();
    }

    public Todo update(Long id, Todo updatedTodo) {
        Todo todo = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todo.setTitle(updatedTodo.getTitle());
        todo.setDescription(updatedTodo.getDescription());
        todo.setCompleted(updatedTodo.getCompleted());

        return repository.save(todo);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
