import React, { useState, useEffect } from "react";
import { PtTask } from "../../../../core/models/domain";

export type PtTaskDisplayComponentProps = {
    task: PtTask;
    onToggleTaskCompletion: (task: PtTask) => void;
    onDeleteTask: (task: PtTask) => void;
    onTaskFocused: (task: PtTask) => void;
    onTaskBlurred: (task: PtTask, newTitle: string) => void;
    taskTitleChange: (task: PtTask, newTitle: string) => void;
};

export function PtTaskDisplayComponent(props: PtTaskDisplayComponentProps) {
    const { task, onToggleTaskCompletion, onDeleteTask } = props;

    // Local state for text so user sees typed changes right away
    const [titleLocal, setTitleLocal] = useState(task.title);

    // If the prop's title changes (e.g., new tasks from server), update local
    useEffect(() => {
        setTitleLocal(task.title);
    }, [task.title]);

    function toggleTapped() {
        onToggleTaskCompletion(task);
    }

    function deleteTapped() {
        onDeleteTask(task);
    }

    function onFocused() {
        // Pass up to parent, in case it does something
        props.onTaskFocused(task);
        // Also ensure local state matches current title
        setTitleLocal(task.title);
    }

    function onBlurred() {
        // If the user changed text, call parent's 'taskTitleChange' and then 'onTaskBlurred'
        if (titleLocal !== task.title) {
            props.taskTitleChange(task, titleLocal || "");
        }
        props.onTaskBlurred(task, titleLocal || "");
    }

    function onTitleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTitleLocal(e.target.value);
    }

    return (
        <div className="row mb-3">
            <div className="col">
                <div className="input-group">
                    <div className="input-group-text">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={toggleTapped}
                            aria-label="Checkbox for following text input"
                            name={"checked" + task.id}
                        />
                    </div>
                    <input
                        value={titleLocal}
                        onChange={onTitleInputChange}
                        onFocus={onFocused}
                        onBlur={onBlurred}
                        type="text"
                        className="form-control"
                        aria-label="Text input with checkbox"
                        name={"tasktitle" + task.id}
                    />
                </div>
            </div>
            <div className="col-1">
                <div
                    style={{
                        borderRadius: "6px",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        display: "flex"
                    }}
                >
                    <div
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px rgba(255, 255, 255, 0) solid",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "8px",
                            display: "flex"
                        }}
                    >
                        <div
                            style={{
                                width: "16px",
                                height: "16px",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex"
                            }}
                        >
                            <div
                                style={{
                                    width: "16px",
                                    height: "16px",
                                    position: "relative",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    display: "flex"
                                }}
                            >
                                <span
                                    style={{ color: "red", cursor: "pointer", width: "16px" }}
                                    onClick={deleteTapped}
                                >
                                    <svg viewBox="0 0 512 512">
                                        <path d="M416 96h-96V64c0-17.6-14.4-32-32-32h-96c-17.6 0-32 14.4-32 32v32H64v64h32v288c0 17.6 14.4 32 32 32h224c17.6 0 32-14.4 32-32V160h32zM192 64h95.9l.1.1V96h-96c.1-.1.1-32.1 0-32m160 384H128.1l-.1-.1V160h32v256h32V160h32v256h32V160h32v256h32V160h32z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}