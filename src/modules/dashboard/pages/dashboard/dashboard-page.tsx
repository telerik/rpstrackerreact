import { useContext, useState } from "react";
import { useQuery } from "react-query";

import "./dashboard-page.css"; // <-- New stylesheet import

import { DashboardFilter } from "../../repositories/dashboard.repository";
import { formatDateEnUs } from "../../../../core/helpers/date-utils";
import { ActiveIssuesComponent } from "../../components/active-issues/active-issues";
import { StatusCounts } from "../../models";
import { PtDashboardServiceContext } from "../../../../App";

type DateRange = {
  dateStart: Date;
  dateEnd: Date;
};

export function DashboardPage() {
  const dashboardService = useContext(PtDashboardServiceContext);

  const [filter, setFilter] = useState<DashboardFilter>({});

  function getQueryKey() {
    return ["items", filter];
  }

  const useStatusCounts = (
    ...params: Parameters<typeof dashboardService.getStatusCounts>
  ) => {
    return useQuery<StatusCounts, Error>(
      getQueryKey(),
      () => dashboardService.getStatusCounts(...params)
    );
  };
  const queryResult = useStatusCounts(filter);
  const statusCounts = queryResult.data;

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

  if (queryResult.isLoading) {
    return <div>Loading...</div>;
  }

  if (!statusCounts) {
    return <div>No data</div>;
  }

  return (
    <div className="dashboard-page">
      {/* Header Section */}
      <div className="container">
        <div className="row align-items-center justify-content-between">
          {/* Left: Dashboard Title */}
          <div className="col-auto">
            <div className="frame13 d-flex flex-column align-items-start gap-2">
              <div className="dashboard-title text-center">Dashboard</div>
            </div>
          </div>

          {/* Right: Month Range Buttons */}
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
      <div className="DiagramAndStatistics">
        {/* Active Issues */}
        <div className="Statistics StatisticsBlock">
          <ActiveIssuesComponent statusCounts={statusCounts} />
        </div>

        {/* Additional Statistics Section */}
        <div className="frame36 stretch-height">
          <div className="frame38">
            {/* Left Statistics Block */}
            <div className="Statistics left-stat-block">
              <div className="Label inline-flex">
                <div className="BaseInputLabel gap-6">
                  <div className="statistics-heading">
                    All Issues
                  </div>
                </div>
              </div>
              <div className="Label inline-flex">
                <div className="BaseInputLabel gap-6">
                  <div className="statistics-subheading">
                    Active Issues
                  </div>
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

        {/* Chart Section (Placeholder) */}
        <div className="frame36 chart-section">
          {/* Insert your chart component or markup here */}
        </div>
      </div>
    </div>
  );
}