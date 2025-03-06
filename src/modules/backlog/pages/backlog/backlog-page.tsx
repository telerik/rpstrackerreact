import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./backlog-page.css";

import { PresetType } from "../../../../core/models/domain/types";
import { PtItem } from "../../../../core/models/domain";
import { AppPresetFilter } from "../../../../shared/components/preset-filter/preset-filter";
import { PtNewItem } from "../../../../shared/models/dto/pt-new-item";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AddItemModal } from "../../components/add-item-modal/add-item-modal";
import { BacklogList } from "../../components/backlog-list/backlog-list";
import { PtBacklogServiceContext, PtStoreContext } from "../../../../App";

export function BacklogPage() {
    const store = useContext(PtStoreContext);
    const backlogService = useContext(PtBacklogServiceContext);

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const { preset } = useParams() as { preset: PresetType };
    const [currentPreset, setCurrentPreset] = useState<PresetType>(preset ? preset : 'open');

    const useItems = (...params: Parameters<typeof backlogService.getItems>) => {
        return useQuery<PtItem[], Error>(getQueryKey(), () => backlogService.getItems(...params));
    };
    const queryResult = useItems(currentPreset);
    const items = queryResult.data;

    function getQueryKey() {
        return ["items", currentPreset];
      }

    const addItemMutation = useMutation(async (newItem: PtNewItem) => {
        if (store.value.currentUser) {
            const createdItem = await backlogService.addNewPtItem(newItem, store.value.currentUser);
            return createdItem;
        }
    });
    
    useEffect(() => {
        navigate(`/backlog/${currentPreset}`);
      }, [currentPreset, navigate]);
    
    const [isAddModalShowing, setIsAddModalShowing] = useState(false);

    function onSelectPresetTap(preset: PresetType) {
        setCurrentPreset(preset);
    }

    function toggleModal() {
        setIsAddModalShowing(!isAddModalShowing);
    }

    function onNewItemSave(newItem: PtNewItem) {
        return addItemMutation.mutateAsync(newItem, {
            onSuccess(createdItem, variables, context) {
                queryClient.invalidateQueries(getQueryKey());
            },
        });
    }

    if (queryResult.isLoading) {
        return <div>Loading...</div>;
    }
    
    if (!items) {
        return <div>No items</div>;
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-auto">
                        <div className="frame13 d-flex flex-column align-items-start gap-2">
                            <div className="dashboard-title text-center">Backlog</div>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="Tools d-flex gap-3">
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                    <AppPresetFilter selectedPreset={currentPreset} onSelectPresetTap={onSelectPresetTap} />
                                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={toggleModal}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: "20px" }}>
                <BacklogList items={items} />
            </div>

            <AddItemModal 
                onNewItemSave={onNewItemSave} 
                modalShowing={isAddModalShowing}
                setIsAddModalShowing={setIsAddModalShowing}
                />
        </React.Fragment >
    );
}