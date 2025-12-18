import React, { useMemo, useState, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Chip,
} from "@heroui/react";
import type { SortDescriptor, Selection } from "@heroui/react";

// --- Icons ---
const PlusIcon = ({ size = 20, width, height, ...props }: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </g>
    </svg>
  );
};

const ChevronDownIconSvg = ({ strokeWidth = 1.5, ...otherProps }: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

const SearchIconSvg = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

const FilterIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

// --- Types ---
export interface ColumnDef {
  uid: string;
  name: string;
  sortable?: boolean;
}

interface ERPGridTableProps {
  data: any[];
  columns: ColumnDef[];
  renderCell: (item: any, columnKey: React.Key) => React.ReactNode;
  initialVisibleColumns?: string[];
  enableSearch?: boolean;
  enablePagination?: boolean;
  onAddNew?: () => void;
  title?: string;
  description?: string;
}

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const ResuableTable: React.FC<ERPGridTableProps> = ({
  data,
  columns,
  renderCell,
  initialVisibleColumns,
  enableSearch = true,
  enablePagination = true,
  onAddNew,
  title,
  description,
}) => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    initialVisibleColumns
      ? new Set(initialVisibleColumns)
      : new Set(columns.map((c) => c.uid))
  );

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: columns[0]?.uid || "id",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns, columns]);

  const filteredItems = useMemo(() => {
    let filteredData = [...data];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(filterValue.toLowerCase())
        )
      );
    }

    if (selectedStatus !== "all" && data.length > 0 && data[0].status) {
      filteredData = filteredData.filter(
        (item) => item.status === selectedStatus
      );
    }

    return filteredData;
  }, [data, filterValue, selectedStatus]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column as string];
      const second = b[sortDescriptor.column as string];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const statusOptions = useMemo(() => {
    if (data.length === 0) return ["all"];
    const statusSet = new Set(data.map((item) => item.status).filter(Boolean));
    return ["all", ...Array.from(statusSet)];
  }, [data]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        {(title || description) && (
          <div className="flex flex-col gap-1">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            )}
            {description && (
              <p className="text-gray-500 text-sm">{description}</p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              {enableSearch && (
                <div className="relative flex-1">
                  <Input
                    isClearable
                    className="w-full"
                    placeholder="Search..."
                    startContent={<SearchIconSvg className="text-gray-400" />}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                    classNames={{
                      base: "w-full",
                      inputWrapper: [
                        "border",
                        "border-gray-300",
                        "bg-white",
                        "rounded",
                        "!shadow-none",
                        "hover:border-gray-300",
                        "focus-within:border-gray-300",
                        "data-[hover=true]:border-gray-300",
                        "data-[focus=true]:border-gray-300",
                      ].join(" "),
                      input: "text-gray-900 placeholder:text-gray-400",
                      clearButton:
                        "text-gray-400 hover:text-gray-600 !border-none !p-0 !bg-transparent",
                    }}
                  />
                </div>
              )}

              {statusOptions.length > 1 && (
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="flat"
                      className="border border-gray-300 bg-white rounded h-10 data-[hover=true]:bg-gray-50 data-[hover=true]:border-gray-400"
                      style={{
                        backgroundColor: "white",
                        color: "#4b5563",
                        borderColor: "#d1d5db",
                      }}
                      startContent={
                        <FilterIcon className="text-gray-400" size={16} />
                      }
                      endContent={
                        <ChevronDownIconSvg className="text-gray-400 text-small" />
                      }
                    >
                      {selectedStatus === "all" ? "All Status" : selectedStatus}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Status filter"
                    selectionMode="single"
                    selectedKeys={[selectedStatus]}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      setSelectedStatus(selected);
                      setPage(1);
                    }}
                    classNames={{
                      base: "bg-white border border-gray-200 rounded-lg shadow-lg min-w-[140px]",
                    }}
                    itemClasses={{
                      base: "text-gray-700 data-[hover=true]:bg-gray-100 data-[selected=true]:bg-blue-50 data-[selected=true]:text-blue-700 rounded-md px-3 py-2",
                    }}
                  >
                    {statusOptions.map((status) => (
                      <DropdownItem key={status} className="capitalize">
                        {status === "all" ? "All Status" : status}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              )}
            </div>

            <div className="flex gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    className="border border-gray-300 bg-white rounded h-10 data-[hover=true]:bg-gray-50 data-[hover=true]:border-gray-400"
                    style={{
                      backgroundColor: "white",
                      color: "#4b5563",
                      borderColor: "#d1d5db",
                    }}
                    endContent={
                      <ChevronDownIconSvg className="text-gray-400 text-small" />
                    }
                  >
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                  classNames={{
                    base: "bg-white border border-gray-200 rounded-lg shadow-lg min-w-[140px]",
                  }}
                  itemClasses={{
                    base: "text-gray-700 data-[hover=true]:bg-gray-100 data-[selected=true]:bg-blue-50 data-[selected=true]:text-blue-700 rounded-md px-3 py-2",
                  }}
                >
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {column.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              {onAddNew && (
                <Button
                  color="primary"
                  className="bg-green-600 text-white rounded h-10 px-4 font-medium data-[hover=true]:bg-green-700"
                  style={{ backgroundColor: "#22c55e", color: "white" }}
                  endContent={<PlusIcon />}
                  onPress={onAddNew}
                >
                  Add New
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-sm">
                Total {data.length} items
              </span>
              {filteredItems.length !== data.length && (
                <Chip
                  variant="flat"
                  className="border border-gray-200 bg-gray-100 text-gray-700 text-sm px-2 py-1"
                >
                  {filteredItems.length} filtered
                </Chip>
              )}
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center text-gray-600 text-sm">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-gray-700 text-sm ml-2 cursor-pointer border border-gray-300 rounded px-2 py-1 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={onRowsPerPageChange}
                  value={rowsPerPage}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onRowsPerPageChange,
    data.length,
    filteredItems.length,
    onSearchChange,
    columns,
    enableSearch,
    onAddNew,
    rowsPerPage,
    title,
    description,
    statusOptions,
    selectedStatus,
  ]);

  const bottomContent = useMemo(() => {
    if (!enablePagination) return null;

    return (
      <div className="py-2 px-2 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="w-full sm:w-[30%]">
          {selectedKeys !== "all" && Array.from(selectedKeys).length > 0 && (
            <Chip
              variant="flat"
              className="border border-gray-200 bg-gray-100 text-gray-700 text-sm px-2 py-1"
            >
              {Array.from(selectedKeys).length} selected
            </Chip>
          )}
        </div>

        <Pagination
          isCompact
          showControls
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
          classNames={{
            wrapper: "gap-1",
            item: "min-w-8 h-8 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100",
            cursor: "bg-green-600 text-white border-green-600",
            prev: "min-w-8 h-8 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-100",
            next: "min-w-8 h-8 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-100",
          }}
        />

        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={page === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
            className="pagination-btn text-gray-700 border border-gray-300 bg-white hover:bg-gray-100"
            style={{ color: "#4b5563", borderColor: "#d1d5db" }}
          >
            Previous
          </Button>
          <Button
            isDisabled={page >= pages}
            size="sm"
            variant="flat"
            onPress={onNextPage}
            className="pagination-btn text-gray-700 border border-gray-300 bg-white hover:bg-gray-100"
            style={{ color: "#4b5563", borderColor: "#d1d5db" }}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, enablePagination, selectedKeys, onPreviousPage, onNextPage]);

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4">
      <Table
        isHeaderSticky
        aria-label="Table"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "min-h-[400px]",
          th: `
              bg-gray-100 
              text-gray-700 
              font-semibold 
              border-b 
              border-gray-300
              data-[hover=true]:bg-gray-100
              data-[active=true]:bg-gray-100
            `,
          td: "text-gray-900 border-b border-gray-200",
          table: "text-gray-900",
          thead: "",
          tr: "data-[hover=true]:bg-gray-50",
          base: "[&>thead>tr:first-child>th:first-child]:rounded-none",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column: ColumnDef) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
              className="text-gray-700"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={
            <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
              <SearchIconSvg className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-gray-500">No items found</p>
            </div>
          }
          items={sortedItems}
        >
          {(item: any) => (
            <TableRow
              key={item.id ?? Math.random()}
              className="data-[hover=true]:bg-gray-50"
            >
              {(columnKey) => (
                <TableCell className="text-gray-900">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResuableTable;
