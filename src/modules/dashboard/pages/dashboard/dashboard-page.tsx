import { cloneElement, useContext, useState } from "react";
import { useQueries } from "react-query";
import { Observable } from "rxjs";
import "./dashboard-page.css";

import {
  DashboardFilter,
  FilteredIssues,
} from "../../repositories/dashboard.repository";
import { ActiveIssuesComponent } from "../../components/active-issues/active-issues";
import { StatusCounts } from "../../models";
import { PtUser } from "../../../../core/models/domain";
import {
  PtDashboardServiceContext,
  PtStoreContext,
  PtUserServiceContext,
} from "../../../../App";

type DateRange = {
  dateStart: Date;
  dateEnd: Date;
};

export function DashboardPage() {
  const store = useContext(PtStoreContext);
  const userService = useContext(PtUserServiceContext);
  const dashboardService = useContext(PtDashboardServiceContext);

  const [filter, setFilter] = useState<DashboardFilter>({});

  const users$: Observable<PtUser[]> = store.select<PtUser[]>("users");
  const [users, setUsers] = useState<PtUser[]>([]);

  function getQueryKey(keybase: string) {
    return [keybase, filter];
  }

  const useDashboardData = (filter: DashboardFilter) => {
    return useQueries<[StatusCounts, FilteredIssues]>([
      {
        queryKey: getQueryKey("items"),
        queryFn: () => dashboardService.getStatusCounts(filter),
      },
      {
        queryKey: getQueryKey("issues"),
        queryFn: () => dashboardService.getFilteredIssues(filter),
      },
    ]);
  };

  const queryResults = useDashboardData(filter);
  const queryResult0 = queryResults[0];
  const statusCounts = queryResult0.data as StatusCounts;

  function onMonthRangeTap(months: number) {
    const range = getDateRange(months);
    setFilter({
      userId: filter.userId,
      dateEnd: range.dateEnd,
      dateStart: range.dateStart,
    });
  }

  function getDateRange(months: number): DateRange {
    const now = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - months);
    return {
      dateStart: start,
      dateEnd: now,
    };
  }

  if (queryResult0.isLoading) {
    return <div>Loading...</div>;
  }

  if (!statusCounts) {
    return <div>No data</div>;
  }

  return (
    <div className="dashboard-page page">

      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-auto">
            <div className="frame13 d-flex flex-column align-items-start gap-2">
              <div className="page-title">Dashboard</div>
            </div>
          </div>

          <div className="col-auto">
            <div className="Tools d-flex gap-3">
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button type="button" onClick={() => onMonthRangeTap(3)}>
                    3 Months
                  </button>
                  <button type="button" onClick={() => onMonthRangeTap(6)}>
                    6 Months
                  </button>
                  <button type="button" onClick={() => onMonthRangeTap(12)}>
                    1 Year
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagram and Statistics Section */}
      <div className="container">
        <div className="DiagramAndStatistics">
          {/* Active Issues */}
          <div className="StatisticsBlock">
            <ActiveIssuesComponent statusCounts={statusCounts} />
          </div>

          {/* Additional Statistics Section */}
          <div className="frame36 stretch-height">
            <div className="frame38">
              {/* Left Statistics Block */}
              <div className="Statistics left-stat-block">
                <div className="Label inline-flex">
                  <div className="BaseInputLabel gap-6">
                  <div className="statistics-heading">All Issues</div>
                  </div>
                </div>
                <div className="Label inline-flex">
                  <div className="BaseInputLabel gap-6">
                  <div className="statistics-subheading">Active Issues</div>
                  </div>
                </div>
              </div>

              {/* Right Statistics Block */}
              <div className="Statistics right-stat-block">
                <div className="Label inline-flex">
                  <div className="BaseInputLabel gap-6">
                    <div className="statistics-subheading">
                      Highest: 100% on Oct 11, 2018
                    </div>
                  </div>
                </div>
                <div className="Label inline-flex">
                  <div className="BaseInputLabel gap-6">
                    <div className="statistics-subheading">
                      Lowest: 20% on Oct 9, 2018
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="frame36 chart-section">
            {/* Insert your chart component or markup here */}
          </div>
        </div>
      </div>
    </div>
  );
}
