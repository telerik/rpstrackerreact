import React from "react";
import { StatusCounts } from "../../models";
import "./active-issues.css";

interface ActiveIssuesProps {
  statusCounts: StatusCounts;
}

export function ActiveIssuesComponent(props: ActiveIssuesProps) {
  if (!props.statusCounts) {
    return (
      <div className="card">
        <h3 className="card-header">Active Issues</h3>
        <div className="card-block" />
      </div>
    );
  }

  return (
    <div
      className="active-issues-container"
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
            display: "inline-flex"
      }}
    >
      {/* Active Issues */}
      <div
        className="Numbers"
        style={{
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="Label"
          style={{
            width: "105px",
            height: "48px",
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
                fontSize: "42px",
                fontFamily: "Roboto",
                fontWeight: 400,
                lineHeight: "55.86px",
                wordWrap: "break-word",
              }}
            >
              {props.statusCounts.activeItemsCount}
            </div>
          </div>
        </div>
        <div
          className="Label"
          style={{
            alignSelf: "stretch",
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

      {/* Closed Issues */}
      <div
        className="Numbers"
        style={{
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="Label"
          style={{
            width: "105px",
            height: "48px",
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
                color: "#399D60",
                fontSize: "42px",
                fontFamily: "Roboto",
                fontWeight: 400,
                lineHeight: "55.86px",
                wordWrap: "break-word",
              }}
            >
              {props.statusCounts.closedItemsCount}
            </div>
          </div>
        </div>
        <div
          className="Label"
          style={{
            alignSelf: "stretch",
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
                color: "#399D60",
                fontSize: "16px",
                fontFamily: "Roboto",
                fontWeight: 400,
                lineHeight: "24px",
                wordWrap: "break-word",
              }}
            >
              Closed Issues
            </div>
          </div>
        </div>
      </div>

      {/* Open Issues */}
      <div
        className="Numbers"
        style={{
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="Label"
          style={{
            width: "105px",
            height: "48px",
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
                color: "#8142BF",
                fontSize: "42px",
                fontFamily: "Roboto",
                fontWeight: 400,
                lineHeight: "55.86px",
                wordWrap: "break-word",
              }}
            >
              {props.statusCounts.openItemsCount}
            </div>
          </div>
        </div>
        <div
          className="Label"
          style={{
            alignSelf: "stretch",
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
                color: "#8142BF",
                fontSize: "16px",
                fontFamily: "Roboto",
                fontWeight: 400,
                lineHeight: "24px",
                wordWrap: "break-word",
              }}
            >
              Open Issues
            </div>
          </div>
        </div>
      </div>

      {/* Close Rate */}
      <div
        className="Numbers"
        style={{
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <div
          className="Frame35"
          style={{
            alignSelf: "stretch",
            height: "72px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div
            className="Label"
            style={{
              height: "48px",
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
                  fontSize: "42px",
                  fontFamily: "Roboto",
                  fontWeight: 400,
                  lineHeight: "55.86px",
                  wordWrap: "break-word",
                }}
              >
                {Intl.NumberFormat("en-US", {
                  maximumSignificantDigits: 4,
                }).format(props.statusCounts.closeRate)}
                %
              </div>
            </div>
          </div>
          <div
            className="Label"
            style={{
              alignSelf: "stretch",
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
                Close Rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
