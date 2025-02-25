import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { Observable } from "rxjs";

import { PtItem, PtUser, PtTask } from "../../../../core/models/domain";
import { DetailScreenType } from "../../../../shared/models/ui/types/detail-screens";
import { PtItemFormComponent } from "../../components/item-form/pt-item-form";
import { PtItemTasksComponent } from "../../components/item-tasks/pt-item-tasks";
import { PtNewTask } from "../../../../shared/models/dto/pt-new-task";
import { PtTaskTitleUpdate } from "../../../../shared/models/dto/pt-task-update";
import { PtItemChitchatComponent } from "../../components/item-chitchat/pt-item-chitchat";
import { PtNewComment } from "../../../../shared/models/dto/pt-new-comment";

import { PtBacklogServiceContext, PtStoreContext, PtUserServiceContext } from "../../../../App";


const queryTag = 'item';

const screenPositionMap: { [key in DetailScreenType | number]: number | DetailScreenType } = {
    0: 'form',
    1: 'tasks',
    2: 'chitchat',
    'form': 0,
    'tasks': 1,
    'chitchat': 2
};


export function DetailPage() {

    const store = useContext(PtStoreContext);
    const backlogService = useContext(PtBacklogServiceContext);
    const userService = useContext(PtUserServiceContext);

    const currentUser = store.value.currentUser;
    const users$: Observable<PtUser[]> = store.select<PtUser[]>('users');

    const { id: itemId, screen } = useParams() as { id: string, screen: DetailScreenType };

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const useItem = (...params: Parameters<typeof backlogService.getPtItem>) => {
        return useQuery<PtItem, Error>(queryTag, () => backlogService.getPtItem(...params));
    }
    const queryResult = useItem(parseInt(itemId));
    const item = queryResult.data;

    const [selectedDetailsScreen, setSelectedDetailsScreen] = useState<DetailScreenType>(screen ? screen : 'form');

    const updateItemMutation = useMutation(async (itemToUpdate: PtItem) => {
        const updatedItem = await backlogService.updatePtItem(itemToUpdate);
        return updatedItem;
    });
    
    const addTaskMutation = useMutation(async (newTaskItem: PtNewTask) => {
        const createdTask = await backlogService.addNewPtTask(newTaskItem, item!);
        return createdTask;
    });

    const toggleTaskCompletionMutation = useMutation(async (task: PtTask) => {
        const updatedTask = await backlogService.updatePtTask(item!, task, true);
        return updatedTask;
    });

    const updateTaskMutation = useMutation(async (taskUpdate: PtTaskTitleUpdate) => {
        const updatedTask = await backlogService.updatePtTask(item!, taskUpdate.task, taskUpdate.task.completed, taskUpdate.newTitle);
        return updatedTask;
    });

    const deleteTaskMutation = useMutation(async (task: PtTask ) => {
        const ok = await backlogService.deletePtTask(item!, task);
        return ok;
    });

    const addCommentMutation = useMutation(async (newCommentItem: PtNewComment) => {
        const createdComment = await backlogService.addNewPtComment(newCommentItem, item!);
        return createdComment;
    });

    function onScreenSelected(screen: DetailScreenType) {
        setSelectedDetailsScreen(screen);
        navigate(`/detail/${itemId}/${screen}`);
    }

    function onItemSaved(item: PtItem) {
        updateItemMutation.mutate(item, {
            onSuccess: (updatedItem) => {
                queryClient.setQueryData(queryTag, updatedItem);
            }
        });
    }

    function onUsersRequested() {
        userService.fetchUsers();
    }

    function screenRender(screen: DetailScreenType, item: PtItem) {
        switch (screen) {
            case 'form':
                return <PtItemFormComponent
                    item={item} 
                    users$={users$} 
                    usersRequested={onUsersRequested} 
                    itemSaved={onItemSaved} />;
            case 'tasks':
                return <PtItemTasksComponent 
                    tasks={item.tasks} 
                    addTaskMutation={addTaskMutation} 
                    deleteTaskMutation={deleteTaskMutation}
                    toggleTaskCompletionMutation={toggleTaskCompletionMutation}
                    updateTaskMutation={updateTaskMutation}
                    />;
            case 'chitchat':
                return <PtItemChitchatComponent 
                    comments={item.comments} 
                    currentUser={currentUser!} 
                    addCommentMutation={addCommentMutation} 
                />;

            default:
                return <PtItemFormComponent item={item} users$={users$} usersRequested={() => onUsersRequested()} itemSaved={(item) => onItemSaved(item)} />;
        }
    }

    if (!screen) {
        return (
            <Navigate replace to={`/detail/${itemId}/form`}/>
        );
    }
    
    if (queryResult.isLoading) {
        return <div>Loading...</div>
    }

    if (!item) {
        return <div>No item</div>
    }
    
    return (

        <div>
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-auto">
                        <div className="frame13 d-flex flex-column align-items-start gap-2">
                            <div className="dashboard-title text-center">{item.title}</div>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="Tools d-flex gap-3">
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                    <button
                                        type="button"
                                        onClick={(e) => onScreenSelected('form')}
                                        className={"btn btn-sm btn-outline-secondary " + (selectedDetailsScreen === 'form' ? 'active' : '')}
                                    >
                                        Form
                                    </button>
                                    
                                    <button
                                        type="button"
                                        onClick={(e) => onScreenSelected('tasks')}
                                        className={"btn btn-sm btn-outline-secondary " + (selectedDetailsScreen === 'tasks' ? 'active' : '')}
                                    >
                                        Tasks
                                    </button>
                                    
                                    <button
                                        type="button"
                                        onClick={(e) => onScreenSelected('chitchat')}
                                        className={"btn btn-sm btn-outline-secondary " + (selectedDetailsScreen === 'chitchat' ? 'active' : '')}
                                    >
                                        Chitchat
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {screenRender(selectedDetailsScreen, item)}

        </div>
    );
   
}