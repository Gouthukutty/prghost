import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)

  const loadTasks = async () => {
    const response = await fetch('/api/tasks')
    const data = await response.json()
    setTasks(data)
    setLoading(false)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const addTask = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })

    setTitle('')
    loadTasks()
  }

  const toggleTask = async (task) => {
    await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    })

    loadTasks()
  }

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    })

    loadTasks()
  }

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-logo">TaskFlow</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#tasks">Tasks</a>
          <a href="#about">About</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container" id="home">
        <section className="card" id="tasks">

          <h1>TaskFlow</h1>

          <p className="subtitle">
            Production-style DevOps demo application
          </p>

          <form onSubmit={addTask} className="form">
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter a task..."
            />

            <button type="submit">
              Add Task
            </button>
          </form>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="tasks">

              {tasks.length === 0 && (
                <p className="empty">
                  No tasks yet.
                </p>
              )}

              {tasks.map(task => (
                <div className="task" key={task.id}>

                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task)}
                    />

                    <span className={task.completed ? 'done' : ''}>
                      {task.title}
                    </span>
                  </label>

                  <button
                    className="delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>

                </div>
              ))}

            </div>
          )}
        </section>

        {/* About Section */}
        <section className="about" id="about">
          <h2>About TaskFlow</h2>

          <p>
            TaskFlow is a production-style Goutham's application
            using React, Spring Boot, MySQL, Docker and AWS.
          </p>
        </section>

      </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)