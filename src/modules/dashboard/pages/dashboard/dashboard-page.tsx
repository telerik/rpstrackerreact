import { useContext, useState } from "react";
import { useQuery } from "react-query";

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
    <div className="dashboard">
      {/* Header Section */}
      <div className="container">
        <div className="row align-items-center justify-content-between">
          {/* Left: Dashboard Title */}
          <div className="col-auto">
            <div
              className="Frame13 d-flex flex-column align-items-start gap-2"
              style={{ width: "700px" }}
            >
              <div
                className="Label text-center"
                style={{
                  color: "#3D3D3D",
                  fontSize: "40px",
                  fontFamily: "Roboto",
                  fontWeight: 500,
                }}
              >
                Dashboard
              </div>
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
      <div
        className="DiagramAndStatistics"
        style={{
          height: "525px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Active Issues (Styled similarly to Angular’s <app-active-issues> element) */}
        <div
          className="Statistics"
          style={{
            alignSelf: "stretch",
            paddingLeft: "192px",
            paddingRight: "192px",
            paddingTop: "16px",
            paddingBottom: "16px",
            background: "#FAFAFA",
            borderRadius: "4px",
            justifyContent: "space-between",
            alignItems: "center",
            display: "inline-flex",
          }}
        >
          <ActiveIssuesComponent statusCounts={statusCounts} />
        </div>

        {/* Additional Statistics Section */}
        <div
          className="Frame36"
          style={{
            alignSelf: "stretch",
            height: "405px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            gap: "8px",
          }}
        >
          <div
            className="Frame38"
            style={{
              alignSelf: "stretch",
              display: "inline-flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {/* Left Statistics Block */}
            <div
              className="Statistics"
              style={{
                width: "218px",
                display: "inline-flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <div
                className="Label"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <div
                  className="BaseInputLabel"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <div
                    className="Label"
                    style={{
                      color: "#3D3D3D",
                      fontSize: "21px",
                      fontFamily: "Roboto",
                      fontWeight: 700,
                      lineHeight: "27.93px",
                      wordWrap: "break-word",
                    }}
                  >
                    All Issues
                  </div>
                </div>
              </div>
              <div
                className="Label"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <div
                  className="BaseInputLabel"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <div
                    className="Label"
                    style={{
                      color: "#3D3D3D",
                      fontSize: "16px",
                      fontFamily: "Roboto",
                      fontWeight: 400,
                      lineHeight: "24px",
                      wordWrap: "break-word",
                    }}
                  >
                    Active Issues
                  </div>
                </div>
              </div>
            </div>

            {/* Right Statistics Block */}
            <div
              className="Statistics"
              style={{
                width: "218px",
                alignSelf: "stretch",
                display: "inline-flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div
                className="Label"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <div
                  className="BaseInputLabel"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <div
                    className="Label"
                    style={{
                      color: "#3D3D3D",
                      fontSize: "16px",
                      fontFamily: "Roboto",
                      fontWeight: 400,
                      lineHeight: "24px",
                      wordWrap: "break-word",
                    }}
                  >
                    Highest: 100% on Oct 11, 2018
                  </div>
                </div>
              </div>
              <div
                className="Label"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <div
                  className="BaseInputLabel"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <div
                    className="Label"
                    style={{
                      color: "#3D3D3D",
                      fontSize: "16px",
                      fontFamily: "Roboto",
                      fontWeight: 400,
                      lineHeight: "24px",
                      wordWrap: "break-word",
                    }}
                  >
                    Lowest: 20% on Oct 9, 2018
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section (Placeholder) */}
        <div className="Frame36" style={{ display: "block", width: "100%" }}>
          {/* Insert your chart component or markup here */}
        </div>
      </div>
    </div>
  );
}
