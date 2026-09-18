package com.taskflow.task;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    private final TaskRepository repository;

    public TaskController(TaskRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Task> getTasks() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task createTask(@Valid @RequestBody CreateTaskRequest request) {
        return repository.save(new Task(request.title()));
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody UpdateTaskRequest request) {
        Task task = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        if (request.title() != null) task.setTitle(request.title());
        if (request.completed() != null) task.setCompleted(request.completed());
        return repository.save(task);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable Long id) {
        repository.deleteById(id);
    }

    public record CreateTaskRequest(@NotBlank String title) {}
    public record UpdateTaskRequest(String title, Boolean completed) {}
}
