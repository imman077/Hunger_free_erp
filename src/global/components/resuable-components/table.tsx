import { ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
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
} from "@heroui/react";
import type { SortDescriptor, Selection } from "@heroui/react";
import HeroDateRangePicker from "./HeroDateRangePicker";

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

const RowIcon = (props: any) => {
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
        d="M3 12h18M3 6h18M3 18h18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
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
  enableDateFilter?: boolean;
  onDateRangeChange?: (
    range: { start: string | null; end: string | null } | null
  ) => void;
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
  enableDateFilter = false,
  onDateRangeChange,
  onAddNew,
  title,
  description,
}) => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{
    start: string | null;
    end: string | null;
  }>({ start: null, end: null });
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <div className="flex flex-col gap-4 p-4 pb-0">
        {(title || description) && (
          <div className="flex flex-col gap-0.5">
            {title && (
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-slate-500 text-xs font-medium">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row items-end gap-3">
            <div className="flex flex-col sm:flex-row items-end gap-3 flex-1">
              {enableSearch && (
                <div className="relative flex-1 w-full sm:w-auto">
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
                        "border-slate-200",
                        "bg-slate-50/50",
                        "rounded-sm",
                        "!shadow-none",
                        "h-10",
                        "hover:bg-white",
                        "hover:border-hf-green/30",
                        "focus-within:!border-hf-green/50",
                        "transition-all duration-200",
                      ].join(" "),
                      input:
                        "text-slate-700 placeholder:text-slate-400 text-sm font-medium pl-2",
                      clearButton:
                        "text-slate-400 hover:text-slate-600 !border-none !p-0 !bg-transparent",
                    }}
                  />
                </div>
              )}

              {statusOptions.length > 1 && (
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button
                      variant="flat"
                      className="border border-slate-200 bg-white rounded-sm h-10 px-4 text-[11px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
                      style={{
                        backgroundColor: "white",
                      }}
                      startContent={
                        <FilterIcon className="text-slate-400" size={14} />
                      }
                      endContent={
                        <ChevronDownIconSvg className="text-slate-400 text-[10px]" />
                      }
                    >
                      {selectedStatus === "all"
                        ? "ALL STATUS"
                        : selectedStatus.toUpperCase()}
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
                      base: "bg-white border border-slate-200 rounded-sm min-w-[160px] p-1",
                    }}
                    itemClasses={{
                      base: [
                        "text-slate-600 text-[11px] font-bold uppercase tracking-tight",
                        "data-[hover=true]:bg-slate-50 data-[hover=true]:text-hf-green",
                        "data-[selected=true]:bg-emerald-50 data-[selected=true]:text-hf-green",
                        "rounded-sm",
                        "px-3",
                        "py-2.5",
                        "transition-colors duration-200",
                      ].join(" "),
                      selectedIcon: "text-hf-green w-4 h-4 ml-auto",
                    }}
                  >
                    {statusOptions.map((status) => (
                      <DropdownItem key={status}>
                        {status === "all" ? "All Status" : status}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              )}

              {enableDateFilter && (
                <div className="flex gap-3 relative" ref={pickerRef}>
                  <button
                    type="button"
                    onClick={() => setShowPicker(!showPicker)}
                    className="flex items-center gap-2.5 px-4 h-10 bg-white border border-slate-200 rounded-sm font-bold text-[11px] text-slate-600 uppercase tracking-tight hover:bg-slate-50 hover:border-slate-300 transition-all group/picker"
                  >
                    <CalendarIcon
                      size={14}
                      className={`transition-colors ${
                        dateRange.start || dateRange.end
                          ? "text-hf-green"
                          : "text-slate-400 group-hover/picker:text-slate-500"
                      }`}
                    />
                    <span className="min-w-[120px] text-left">
                      {!dateRange.start && !dateRange.end
                        ? "SELECT RANGE"
                        : `${dateRange.start || "..."} — ${
                            dateRange.end || "..."
                          }`}
                    </span>
                    <ChevronDownIconSvg
                      className={`text-slate-400 text-[10px] transition-transform duration-300 ${
                        showPicker ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showPicker && (
                    <HeroDateRangePicker
                      initialStart={dateRange.start}
                      initialEnd={dateRange.end}
                      onRangeSelect={(start, end) => {
                        const newRange = { start, end };
                        setDateRange(newRange);
                        if (onDateRangeChange) {
                          onDateRangeChange(newRange);
                        }
                      }}
                      onClose={() => setShowPicker(false)}
                    />
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-2 items-center">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    className="border border-slate-200 bg-white rounded-sm h-10 px-4 text-[11px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
                    style={{
                      backgroundColor: "white",
                    }}
                    endContent={
                      <ChevronDownIconSvg className="text-slate-400 text-[10px]" />
                    }
                  >
                    COLUMNS
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
                    base: "bg-white border border-slate-200 rounded-sm min-w-[180px] p-1",
                  }}
                  itemClasses={{
                    base: [
                      "text-slate-600 text-[11px] font-bold uppercase tracking-tight",
                      "data-[hover=true]:bg-slate-50 data-[hover=true]:text-hf-green",
                      "data-[selected=true]:bg-white data-[selected=true]:text-slate-900",
                      "rounded-sm",
                      "px-3",
                      "py-2.5",
                      "transition-all duration-200",
                    ].join(" "),
                    selectedIcon: "text-hf-green w-4 h-4 ml-auto",
                  }}
                >
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} showDivider={false}>
                      {column.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              {onAddNew && (
                <Button
                  color="primary"
                  className="bg-hf-green text-white rounded-sm h-10 px-6 font-bold hover:bg-emerald-600 transition-all active:scale-95"
                  style={{ backgroundColor: "#22c55e", color: "white" }}
                  endContent={<PlusIcon size={18} />}
                  onPress={onAddNew}
                >
                  Add New
                </Button>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center bg-slate-50/50 rounded-lg p-2 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5">
                <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                  Total Records:
                </span>
                <span className="text-slate-900 text-sm font-black bg-white px-2 py-0.5 rounded-sm border border-slate-200">
                  {data.length}
                </span>
              </div>
              {filteredItems.length !== data.length && (
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-amber-700 text-[10px] font-bold uppercase tracking-tight">
                    {filteredItems.length} Result
                    {filteredItems.length !== 1 ? "s" : ""} Found
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center text-gray-600 text-sm">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-gray-700 text-sm ml-2 cursor-pointer border border-gray-300 rounded-sm px-2 py-1 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
    showPicker,
    dateRange,
    enableDateFilter,
    onDateRangeChange,
  ]);

  const bottomContent = useMemo(() => {
    if (!enablePagination) return null;

    return (
      <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Show Rows:
            </span>
            <select
              className="bg-white border border-slate-200 rounded-sm text-xs font-bold px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-hf-green/20 focus:border-hf-green/50 cursor-pointer transition-all"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              {[5, 10, 15, 20, 25, 50].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPreviousPage}
            disabled={page === 1}
            className={`w-8 h-8 flex items-center justify-center rounded-sm border border-slate-200 transition-all ${
              page === 1
                ? "text-slate-300 bg-slate-50 cursor-not-allowed border-slate-100"
                : "text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300 active:scale-95"
            }`}
          >
            <ChevronDownIconSvg className="w-4 h-4 rotate-90" />
          </button>
          <div className="flex gap-1 px-1.5">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-sm text-[11px] font-bold transition-all ${
                  page === i + 1
                    ? "bg-hf-green text-white font-black scale-105"
                    : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={onNextPage}
            disabled={page >= pages}
            className={`w-8 h-8 flex items-center justify-center rounded-sm border border-slate-200 transition-all ${
              page >= pages
                ? "text-slate-300 bg-slate-50 cursor-not-allowed border-slate-100"
                : "text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300 active:scale-95"
            }`}
          >
            <ChevronDownIconSvg className="w-4 h-4 -rotate-90" />
          </button>
        </div>
      </div>
    );
  }, [
    page,
    pages,
    enablePagination,
    rowsPerPage,
    onRowsPerPageChange,
    onNextPage,
    onPreviousPage,
  ]);

  return (
    <div className="bg-white border border-slate-200 rounded-sm flex flex-col relative gap-4 w-full">
      <Table
        isCompact
        isHeaderSticky
        aria-label="Master Audit Ledger"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "p-0 no-scrollbar rounded-none border-none shadow-none",
          th: "bg-[#fcfdfe] text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500 py-4 px-6 border-b border-slate-200 text-center first:rounded-tl-sm last:rounded-tr-sm",
          td: "py-4 px-6 text-center border-b border-slate-100 group-hover:bg-slate-50/80 transition-all font-medium text-slate-700 text-sm",
          tr: "group cursor-pointer transition-colors duration-200",
          base: "border-collapse",
        }}
        selectedKeys={undefined}
        selectionMode="none"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column: ColumnDef) => (
            <TableColumn
              key={column.uid}
              align="center"
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={
            <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
              <SearchIconSvg className="w-10 h-10 text-slate-300 mb-2" />
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                No records found
              </p>
            </div>
          }
          items={sortedItems}
        >
          {(item: any) => (
            <TableRow key={item.id ?? Math.random()}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export { RowIcon };
export default ResuableTable;
