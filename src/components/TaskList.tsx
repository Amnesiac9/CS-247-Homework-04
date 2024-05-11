import type { Task } from '../types/Task';


export default function TaskList(props: { taskList: Task[], completeTask: (index: number) => void, deleteTaskDelay: (task: Task) => void, deleteTask: (index: number) => void }) {
    return (
        <div className='card flex center'>
            <ul className='flex1'>
                {props.taskList.map((task, index) => (
                    <li className='flex checkListItem' key={index}>
                        <div className={task.done ? 'checkboxInputChecked' : 'checkboxInput'}>
                            {<input type='checkbox' id={'checkbox' + index} checked={task.done} onChange={() => {
                                props.completeTask(index)
                                props.deleteTaskDelay(task)
                            }} />}
                        </div>
                        <div className={task.done ? 'flex1 alignLeft strikethru' : 'flex1 alignLeft'}>{task.text}</div>
                        {<button className='link' onClick={() => props.deleteTask(index)}><img height='16px' src='/iconmonstr-trash-can-thin-240-white.png' /></button>}
                    </li>
                ))}
            </ul>
        </div>
    )
}
