import React from "react";
import Tasks from "./Tasks.jsx";
import "./App.css";

class App extends Tasks {
    state = { tasks: [], currentTask: "" };

    getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    }

    render() {
        const { tasks, currentTask } = this.state;
        const completedCount = tasks.filter((t) => t.completed).length;
        const totalCount = tasks.length;
        const pendingCount = totalCount - completedCount;
        const progressPct = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

        return (
            <div className="app">
                {/* Sidebar Accent */}
                <div className="sidebar-accent" />

                {/* Header */}
                <header className="app-header">
                    <div className="header-left">
                        <span className="greeting">{this.getGreeting()}</span>
                        <h1>Task Board</h1>
                    </div>
                    <div className="header-right">
                        {totalCount > 0 && (
                            <div className="header-badge">
                                <span className="badge-count">{pendingCount}</span>
                                <span className="badge-label">pending</span>
                            </div>
                        )}
                        <div className="header-date">
                            {new Date().toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                            })}
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="main-content">
                    <div className="todo-container">
                        {/* Progress Section */}
                        {totalCount > 0 && (
                            <div className="progress-section">
                                <div className="progress-header">
                                    <div className="progress-info">
                                        <span className="progress-title">Progress</span>
                                        <span className="progress-pct">{progressPct}%</span>
                                    </div>
                                    <div className="progress-stats">
                                        <span className="ps-item">
                                            <span className="ps-dot ps-dot-pending" />
                                            {pendingCount} open
                                        </span>
                                        <span className="ps-item">
                                            <span className="ps-dot ps-dot-done" />
                                            {completedCount} done
                                        </span>
                                    </div>
                                </div>
                                <div className="progress-track">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${progressPct}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Input Form */}
                        <form onSubmit={this.handleSubmit} className="task-form">
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="12" y1="8" x2="12" y2="16"/>
                                        <line x1="8" y1="12" x2="16" y2="12"/>
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    className="task-input"
                                    value={currentTask}
                                    required
                                    onChange={this.handleChange}
                                    placeholder="Add a new task..."
                                />
                            </div>
                            <button className="add-task-btn" type="submit">
                                Add Task
                            </button>
                        </form>

                        {/* Section Label */}
                        {totalCount > 0 && (
                            <div className="section-label">
                                <span>Tasks</span>
                                <span className="section-count">{totalCount}</span>
                            </div>
                        )}

                        {/* Task List */}
                        <div className="tasks-list">
                            {tasks.length === 0 && (
                                <div className="empty-state">
                                    <div className="empty-illustration">
                                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                            <rect x="16" y="12" width="48" height="56" rx="6" stroke="#C4B5A4" strokeWidth="2" fill="none"/>
                                            <line x1="26" y1="28" x2="54" y2="28" stroke="#D4C8B8" strokeWidth="2" strokeLinecap="round"/>
                                            <line x1="26" y1="38" x2="48" y2="38" stroke="#D4C8B8" strokeWidth="2" strokeLinecap="round"/>
                                            <line x1="26" y1="48" x2="42" y2="48" stroke="#D4C8B8" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    </div>
                                    <h3 className="empty-title">No tasks yet</h3>
                                    <p className="empty-desc">Your task list is empty. Add something above to get started.</p>
                                </div>
                            )}
                            {tasks.map((task, index) => (
                                <div
                                    key={task._id}
                                    className={`task-item ${task.completed ? "task-completed" : ""}`}
                                    style={{ animationDelay: `${index * 0.04}s` }}
                                >
                                    <button
                                        className={`check-btn ${task.completed ? "checked" : ""}`}
                                        onClick={() => this.handleUpdate(task._id)}
                                        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
                                    >
                                        {task.completed && (
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                    </button>
                                    <span className={`task-text ${task.completed ? "completed" : ""}`}>
                                        {task.task}
                                    </span>
                                    <button
                                        className="delete-btn"
                                        onClick={() => this.handleDelete(task._id)}
                                        aria-label="Delete task"
                                        title="Remove task"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M5.5 2.5H8.5M2 4H12M10.667 4L10.235 9.756C10.156 10.811 9.276 11.625 8.218 11.625H5.782C4.724 11.625 3.844 10.811 3.765 9.756L3.333 4M5.5 6.5V9M8.5 6.5V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="app-footer">
                    <div className="footer-line" />
                    <p>Designed &amp; built by <strong>Nitish</strong></p>
                </footer>
            </div>
        );
    }
}

export default App;

