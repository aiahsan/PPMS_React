import React from "react";
import Dropdown from "../components/dropdown";
import Select from "react-select/";
import { Ifilter } from "../interfaces";
import { StackOption } from "../utiles/constants";
export default ({
  _filter,
  _setFilter,
}: {
  _filter: Ifilter;
  _setFilter: React.Dispatch<React.SetStateAction<Ifilter>>;
}) => {
  return (
    <div className="d-flex mb-3 align-items-center filter-bar">
      <div className="mx-2">
        <Dropdown
          values={[
            { value: 1, label: "AZ" },
            { value: 2, label: "ZA" },
          ]}
          onChange={(e) => {
            if (e == 2) {
              _setFilter({
                ..._filter,
                orderByName: 2,
                orderByDate: 0,
              });
            } else {
              _setFilter({
                ..._filter,
                orderByName: 1,
                orderByDate: 0,
              });
            }
          }}
        >
          Sort By Name
        </Dropdown>
      </div>
      <div className="mx-2">
        <Dropdown
          values={[
            { value: 1, label: "New To Old" },
            { value: 2, label: "Old To New" },
          ]}
          onChange={(e) => {
            if (e == 2) {
              _setFilter({
                ..._filter,
                orderByDate: 2,
                orderByName: 0,
              });
            } else {
              _setFilter({
                ..._filter,
                orderByDate: 1,
                orderByName: 0,
              });
            }
          }}
        >
          Sort By Date
        </Dropdown>
      </div>
      <div className="mx-2 w-100">
        <div className="field-box">
          <h6>Search</h6>
          <input
            value={_filter.search}
            onChange={(e) =>
              _setFilter({
                ..._filter,
                search: e.target.value,
              })
            }
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="mx-2 w-100">
        <h6>Sort Tech Stacks</h6>
        <Select
          isMulti={true}
          className="w-100 mb-2"
          onChange={(option, actionMeta) => {
            _setFilter({
              ..._filter,
              searchStack: option.map((x) => x.label),
            });
          }}
          options={StackOption}
        />
      </div>
    </div>
  );
};
