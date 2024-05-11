import React, { useEffect } from 'react'
import NewTaskBar from '../components/NewTaskBar';
import NoTasksYet from '../components/NoTasksYet';
import { Task } from '../types/Task';
import TaskList from '../components/TaskList';


function TaskListPage() {

    const [taskList, updateTaskList] = React.useState<Task[]>([])
    const [inputValue, setInputValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    // const deletedRef = React.useRef<number[]>([])

    function focusInput() {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    }


    function addTask() {
        updateTaskList((prevTaskList) => {
            const newTask: Task = {
                id: prevTaskList.length + "-" + Date.now().toString(),
                text: inputValue,
                done: false,
            }
            return [newTask, ...prevTaskList]
        })
        setInputValue('')
        focusInput()
    }

    // Makes sure the correct task is deleted AND makes sure it doesn't get deleted when the user unchecks.
    function deleteTaskDelay(task: Task) {
        setTimeout(() => {
            updateTaskList((prevTaskList) => {
                return prevTaskList.filter((t) => {
                    if (t.id === task.id && t.done === true) {
                        return false
                    }
                    return true
                });
            });
        }, 4000)
    }

    function deleteTask(index: number) {
        updateTaskList((prevTaskList) => {
            return prevTaskList.filter((_, i) => i !== index)
        })
    }

    function completeTask(index: number) {
        updateTaskList((prevTaskList) => {
            //Re-create our task list. This is required for React to update the UI, otherwise our checkboxes won't update.
            const newTaskList: Task[] = []
            for (let i = 0; i < prevTaskList.length; ++i) {
                if (i === index) {
                    newTaskList.push({
                        id: prevTaskList[i].id,
                        text: prevTaskList[i].text,
                        done: !prevTaskList[i].done
                    })
                    continue
                }
                newTaskList.push({
                    id: prevTaskList[i].id,
                    text: prevTaskList[i].text,
                    done: prevTaskList[i].done
                })
            }
            return newTaskList
        })
    }


    // Focus on the input field when mounted
    useEffect(() => {
        focusInput()
    }, []);


    return (
        <>
            <h1>Task List</h1>
            <NewTaskBar
                inputValue={inputValue}
                addTask={addTask}
                handleInputChange={handleInputChange}
                handleKeyDown={handleKeyDown}
            />
            <TaskList
                taskList={taskList}
                completeTask={completeTask}
                deleteTaskDelay={deleteTaskDelay}
                deleteTask={deleteTask}
            />
            {taskList.length === 0 && (
                <NoTasksYet />
            )}
        </>
    )
}

export default TaskListPage
