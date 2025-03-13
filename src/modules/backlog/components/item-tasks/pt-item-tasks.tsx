import { useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";

import { PtTask } from "../../../../core/models/domain";
import { EMPTY_STRING } from "../../../../core/helpers";
import { PtTaskTitleUpdate } from "../../../../shared/models/dto/pt-task-update";
import { PtNewTask } from "../../../../shared/models/dto/pt-new-task";
import { NewTaskForm } from "./new-task-form";
import { PtTaskDisplayComponent } from "./pt-task-display";

export type PtItemTasksComponentProps = {
    tasks: PtTask[];
    addTaskMutation: UseMutationResult<PtTask, unknown, PtNewTask, unknown>;
    deleteTaskMutation: UseMutationResult<boolean, unknown, PtTask, unknown>;
    toggleTaskCompletionMutation: UseMutationResult<PtTask, unknown, PtTask, unknown>;
    updateTaskMutation: UseMutationResult<PtTask, unknown, PtTaskTitleUpdate, unknown>;
};

export function PtItemTasksComponent(props: PtItemTasksComponentProps) {

    const [tasks, setTasks] = useState<PtTask[]>(props.tasks);
    const [lastUpdatedTitle, setLastUpdatedTitle] = useState<string>(EMPTY_STRING);

    const addTask = (text: string) => {
        const newTask: PtNewTask = { title: text, completed: false };
        props.addTaskMutation.mutate(newTask, {
            onSuccess(createdTask) {
                const newTasks = [createdTask, ...tasks];
                setTasks(newTasks);
            },
        });
    };

    const toggleTaskCompletion = (index: number) => {
        const theTask = tasks[index];
        props.toggleTaskCompletionMutation.mutate(theTask, {
            onSuccess(toggledTask) {
                const newTasks = [...tasks];
                newTasks[index].completed = toggledTask.completed;
                setTasks(newTasks);
            },
        });
    };

    function toggleTapped(task: PtTask) {
        const index = tasks.findIndex(t => t.id === task.id);
        toggleTaskCompletion(index);
    }

    function taskTitleChange(task: PtTask, newTitle: string) {
        if (task.title === newTitle) {
            return;
        }
        setLastUpdatedTitle(newTitle);
    }

    function onTaskFocused(task: PtTask) {
        setLastUpdatedTitle(task.title ? task.title : EMPTY_STRING);
    }

    function updateTask(task: PtTask, newTitle: string) {
        const index = tasks.findIndex(t => t.id === task.id);
        const taskUpdate: PtTaskTitleUpdate = {
            task: task,
            newTitle: newTitle
        };

        props.updateTaskMutation.mutate(taskUpdate, {
            onSuccess(updatedTask) {
                const newTasks = [...tasks];
                newTasks[index].title = updatedTask.title;
                setTasks(newTasks);
            },
        });
    }

    function onTaskBlurred(task: PtTask, newTitle: string) {
        if (task.title === newTitle) {
            return;
        }
        updateTask(task, newTitle);
        setLastUpdatedTitle(EMPTY_STRING);
    }

    const removeTask = (index: number) => {
        const theTask = tasks[index];
        props.deleteTaskMutation.mutate(theTask!, {
            onSuccess(deleted) {
                if (deleted) {
                    const newTasks = [...tasks];
                    newTasks.splice(index, 1);
                    setTasks(newTasks);
                }
            },
        });
    };

    function deleteTapped(task: PtTask) {
        const index = tasks.findIndex(t => t.id === task.id);
        removeTask(index);
    }

    return (
        <div
            style={{
                width: "1160px",
                paddingLeft: "16px",
                paddingRight: "16px",
                paddingTop: "24px",
                paddingBottom: "24px",
                background: "white",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
                border: "1px rgba(33, 37, 41, 0.13) solid",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "inline-flex"
            }}
        >
            <div
                style={{
                    alignSelf: "stretch",
                    width: "550px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "normal",
                    gap: "16px",
                    display: "flex"
                }}
            >
                <NewTaskForm addTask={addTask} />

                <div
                    style={{
                        width: "1126px",
                        height: "1px",
                        paddingRight: "2.81px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "inline-flex"
                    }}
                >
                    <div
                        style={{
                            width: "1123.19px",
                            height: "1px",
                            position: "relative",
                            background: "rgba(33, 37, 41, 0.13)"
                        }}
                    />
                </div>

                {tasks.map((task) => (
                    <PtTaskDisplayComponent
                        key={task.id}
                        task={task}
                        onToggleTaskCompletion={toggleTapped}
                        onDeleteTask={deleteTapped}
                        onTaskFocused={onTaskFocused}
                        onTaskBlurred={onTaskBlurred}
                        taskTitleChange={taskTitleChange}
                    />
                ))}
            </div>
        </div>
    );
}
