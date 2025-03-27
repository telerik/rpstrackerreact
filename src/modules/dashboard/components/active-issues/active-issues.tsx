import { StatusCounts } from "../../models";
import "./active-issues.css";

interface ActiveIssuesProps {
  statusCounts: StatusCounts | undefined;
}

export function ActiveIssuesComponent(props: ActiveIssuesProps) {

  return (
    <div className="active-issues-container">
      {/* Active Issues */}
      <div className="numbers">
        <div className="label-container">
          <div className="base-input-label">
            <div className="count-label color-default">
              {props.statusCounts?.activeItemsCount ?? ''}
            </div>
          </div>
        </div>
        <div className="label-full-width">
          <div className="base-input-label">
            <div className="text-label color-default">
              Active Issues
            </div>
          </div>
        </div>
      </div>

      {/* Closed Issues */}
      <div className="numbers">
        <div className="label-container">
          <div className="base-input-label">
            <div className="count-label color-closed">
              {props.statusCounts?.closedItemsCount ?? ''}
            </div>
          </div>
        </div>
        <div className="label-full-width">
          <div className="base-input-label">
            <div className="text-label color-closed">
              Closed Issues
            </div>
          </div>
        </div>
      </div>

      {/* Open Issues */}
      <div className="numbers">
        <div className="label-container">
          <div className="base-input-label">
            <div className="count-label color-open">
              {props.statusCounts?.openItemsCount ?? ''}
            </div>
          </div>
        </div>
        <div className="label-full-width">
          <div className="base-input-label">
            <div className="text-label color-open">
              Open Issues
            </div>
          </div>
        </div>
      </div>

      {/* Close Rate */}
      <div className="numbers">
        <div className="close-rate-container">
          <div className="label-container">
            <div className="base-input-label">
            <div className="count-label color-default">
                {Intl.NumberFormat("en-US", {
                  maximumSignificantDigits: 4,
                }).format(props.statusCounts?.closeRate ?? 0)}
                %
              </div>
            </div>
          </div>
          <div className="label-full-width">
            <div className="base-input-label">
              <div className="text-label color-default">
                Close Rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
