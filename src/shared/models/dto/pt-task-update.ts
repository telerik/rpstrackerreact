import { PtTask } from '../../../core/models/domain';

type PtTaskCommonUpdate = {
    task: PtTask;
};

export type PtTaskTitleUpdate = PtTaskCommonUpdate & {
    newTitle: string;
};

export type PtTaskDatesUpdate = PtTaskCommonUpdate & {
    dateStart: Date;
    dateEnd: Date;
};

export type PtTaskAllUpdate = PtTaskCommonUpdate & PtTaskTitleUpdate & PtTaskDatesUpdate;