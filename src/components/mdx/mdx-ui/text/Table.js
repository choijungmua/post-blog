import React from "react";
import {
  Table as UITable,
  TableHeader as UITableHeader,
  TableBody as UITableBody,
  TableRow as UITableRow,
  TableHead as UITableHead,
  TableCell as UITableCell,
  TableCaption as UITableCaption,
} from "@/components/shadcn/table";

// MDX용 테이블 컴포넌트 - UI 컴포넌트를 래핑하여 MDX에 맞게 조정
export const Table = (props) => (
  <div className="my-8 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-800">
    <UITable
      className="min-w-full divide-y divide-gray-200 dark:divide-gray-800"
      {...props}
    />
  </div>
);

// 테이블 헤더 - UI 컴포넌트 재사용
export const TableHead = (props) => (
  <UITableHeader
    className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900"
    {...props}
  />
);

// 테이블 본문 - UI 컴포넌트 재사용
export const TableBody = (props) => (
  <UITableBody
    className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900"
    {...props}
  />
);

// 테이블 행 - UI 컴포넌트 재사용
export const TableRow = (props) => (
  <UITableRow
    className="transition-colors hover:bg-blue-50/50 dark:hover:bg-gray-800/70"
    {...props}
  />
);

// 테이블 헤더 셀 - UI 컴포넌트를 확장하여 정렬 기능 추가
export const TableHeader = ({ align, ...props }) => {
  let alignClass = "text-left";
  if (align === "center") alignClass = "text-center";
  if (align === "right") alignClass = "text-right";

  return (
    <UITableHead
      className={`${alignClass} px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-800 last:border-r-0 tracking-wider uppercase`}
      {...props}
    />
  );
};

// 테이블 데이터 셀 - UI 컴포넌트를 확장하여 정렬 기능 추가
export const TableCell = ({ align, ...props }) => {
  let alignClass = "text-left";
  if (align === "center") alignClass = "text-center";
  if (align === "right") alignClass = "text-right";

  return (
    <UITableCell
      className={`${alignClass} px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-100 dark:border-gray-800 last:border-r-0 whitespace-normal`}
      {...props}
    />
  );
};

// 테이블 캡션 - UI 컴포넌트 재사용 및 스타일 개선
export const TableCaption = (props) => (
  <UITableCaption
    className="p-4 text-sm italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
    {...props}
  />
);

// MDX 컴포넌트에서 사용할 테이블 컴포넌트 맵핑
export const tableComponents = {
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
  caption: TableCaption,
};
